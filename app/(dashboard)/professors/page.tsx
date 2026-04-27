"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
    SearchVisualIcon,
    Mail01Icon,
    MailSend01Icon,
    MailOpen01Icon,
    MailReply01Icon,
    Copy01Icon,
    TeacherIcon,
    Cancel01Icon,
    CheckmarkCircle01Icon,
    ArrowRight01Icon,
    Clock01Icon,
    ViewIcon,
    BookOpen01Icon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";
import {
    professors,
    emailTemplates,
    researchAreaOptions,
    type Professor,
    type TrackedEmail,
    type EmailTemplate,
} from "@/lib/professor-data";

/* ------------------------------------------------------------------ */
/*  localStorage helpers                                               */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "globalbridge_tracked_emails";

function loadTrackedEmails(): TrackedEmail[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as TrackedEmail[]) : [];
    } catch {
        return [];
    }
}

function saveTrackedEmails(emails: TrackedEmail[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(emails));
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getInitials(name: string) {
    return name
        .replace(/^(Dr\.|Prof\.) /, "")
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function daysSince(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

function fillTemplate(
    template: EmailTemplate,
    professor: Professor,
    userInfo: { name: string; background: string; field: string; skills: string; level: string }
) {
    const lastName = professor.name.replace(/^(Dr\.|Prof\.) /, "").split(" ").pop() ?? "";
    const titlePrefix = professor.name.startsWith("Prof.") ? "Prof." : "Dr.";

    const replacements: Record<string, string> = {
        "{{professorTitle}}": titlePrefix,
        "{{professorLastName}}": lastName,
        "{{professorName}}": professor.name,
        "{{university}}": professor.university,
        "{{department}}": professor.department,
        "{{researchArea}}": professor.researchAreas[0] ?? "",
        "{{publication}}": professor.recentPublications[0]?.replace(/ \(\d{4}\)$/, "") ?? "",
        "{{labName}}": professor.labName ?? `your research group`,
        "{{userName}}": userInfo.name || "[Your Name]",
        "{{userBackground}}": userInfo.background || "[your current role/status]",
        "{{userField}}": userInfo.field || "[your field]",
        "{{userSkills}}": userInfo.skills || "[relevant skills]",
        "{{level}}": userInfo.level || "research",
        "{{previousSubject}}": "",
        "{{previousDate}}": "",
    };

    let subject = template.subject;
    let body = template.body;

    for (const [key, value] of Object.entries(replacements)) {
        subject = subject.replaceAll(key, value);
        body = body.replaceAll(key, value);
    }

    return { subject, body };
}

const statusConfig: Record<TrackedEmail["status"], { label: string; color: string }> = {
    draft: { label: "Draft", color: "bg-slate-100 text-slate-600" },
    sent: { label: "Sent", color: "bg-blue-50 text-blue-700" },
    delivered: { label: "Delivered", color: "bg-sky-50 text-sky-700" },
    opened: { label: "Opened", color: "bg-emerald-50 text-emerald-700" },
    replied: { label: "Replied", color: "bg-green-50 text-green-700" },
    "no-response": { label: "No response", color: "bg-amber-50 text-amber-700" },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProfessorsPage() {
    const [tab, setTab] = useState<"search" | "sent">("search");
    const [query, setQuery] = useState("");
    const [country, setCountry] = useState("All countries");
    const [university, setUniversity] = useState("All universities");
    const [area, setArea] = useState("All areas");

    /* email composer state */
    const [composerOpen, setComposerOpen] = useState(false);
    const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState(emailTemplates[0]);
    const [emailSubject, setEmailSubject] = useState("");
    const [emailBody, setEmailBody] = useState("");
    const [copied, setCopied] = useState(false);
    const [userInfo] = useState({
        name: "",
        background: "",
        field: "",
        skills: "",
        level: "Masters",
    });

    /* tracked emails */
    const [trackedEmails, setTrackedEmails] = useState<TrackedEmail[]>([]);

    useEffect(() => {
        setTrackedEmails(loadTrackedEmails());
    }, []);

    /* ---------------------------------------------------------------- */
    /*  Derived state                                                    */
    /* ---------------------------------------------------------------- */

    const countries = useMemo(
        () => ["All countries", ...Array.from(new Set(professors.map((p) => p.country))).sort()],
        []
    );

    const universities = useMemo(
        () => ["All universities", ...Array.from(new Set(professors.map((p) => p.university))).sort()],
        []
    );

    const filtered = useMemo(() => {
        return professors.filter((p) => {
            const matchesQuery =
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.department.toLowerCase().includes(query.toLowerCase()) ||
                p.researchAreas.some((a) => a.toLowerCase().includes(query.toLowerCase()));
            const matchesCountry = country === "All countries" || p.country === country;
            const matchesUni = university === "All universities" || p.university === university;
            const matchesArea =
                area === "All areas" || p.researchAreas.some((a) => a === area);
            return matchesQuery && matchesCountry && matchesUni && matchesArea;
        });
    }, [query, country, university, area]);

    const acceptingCount = professors.filter((p) => p.acceptingStudents).length;

    const emailStats = useMemo(() => {
        const sent = trackedEmails.filter((e) => e.status !== "draft").length;
        const opened = trackedEmails.filter((e) => e.status === "opened" || e.status === "replied").length;
        const replied = trackedEmails.filter((e) => e.status === "replied").length;
        return { sent, opened, replied };
    }, [trackedEmails]);

    /* ---------------------------------------------------------------- */
    /*  Composer actions                                                 */
    /* ---------------------------------------------------------------- */

    const openComposer = useCallback(
        (professor: Professor) => {
            setSelectedProfessor(professor);
            const template = emailTemplates[0];
            setSelectedTemplate(template);
            const { subject, body } = fillTemplate(template, professor, userInfo);
            setEmailSubject(subject);
            setEmailBody(body);
            setComposerOpen(true);
            setCopied(false);
        },
        [userInfo]
    );

    const changeTemplate = useCallback(
        (templateId: string) => {
            const template = emailTemplates.find((t) => t.id === templateId) ?? emailTemplates[0];
            setSelectedTemplate(template);
            if (selectedProfessor) {
                const { subject, body } = fillTemplate(template, selectedProfessor, userInfo);
                setEmailSubject(subject);
                setEmailBody(body);
            }
        },
        [selectedProfessor, userInfo]
    );

    const copyToClipboard = useCallback(async () => {
        const full = `Subject: ${emailSubject}\n\n${emailBody}`;
        await navigator.clipboard.writeText(full);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [emailSubject, emailBody]);

    const saveAsSent = useCallback(() => {
        if (!selectedProfessor) return;
        const email: TrackedEmail = {
            id: crypto.randomUUID(),
            professorId: selectedProfessor.id,
            professorName: selectedProfessor.name,
            university: selectedProfessor.university,
            templateUsed: selectedTemplate.name,
            subject: emailSubject,
            body: emailBody,
            status: "sent",
            sentAt: new Date().toISOString(),
        };
        const updated = [email, ...trackedEmails];
        setTrackedEmails(updated);
        saveTrackedEmails(updated);
        setComposerOpen(false);
    }, [selectedProfessor, selectedTemplate, emailSubject, emailBody, trackedEmails]);

    const updateEmailStatus = useCallback(
        (id: string, status: TrackedEmail["status"]) => {
            const updated = trackedEmails.map((e) => (e.id === id ? { ...e, status } : e));
            setTrackedEmails(updated);
            saveTrackedEmails(updated);
        },
        [trackedEmails]
    );

    /* ---------------------------------------------------------------- */
    /*  Render                                                           */
    /* ---------------------------------------------------------------- */

    return (
        <div className="pb-12">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">Professor Search</h1>
                <p className="mt-1 max-w-xl text-sm text-text-secondary">
                    Find research supervisors, generate cold emails, and track your outreach.
                </p>
            </div>

            {/* Stats row */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Professors</p>
                    <p className="mt-1 text-2xl font-semibold text-text-primary">{professors.length}</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Accepting students</p>
                    <p className="mt-1 text-2xl font-semibold text-accent">{acceptingCount}</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Countries</p>
                    <p className="mt-1 text-2xl font-semibold text-text-primary">
                        {new Set(professors.map((p) => p.country)).size}
                    </p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Emails sent</p>
                    <p className="mt-1 text-2xl font-semibold text-primary">{emailStats.sent}</p>
                </div>
            </div>

            {/* Tab toggle */}
            <div className="mb-5 flex gap-1 rounded-lg bg-surface p-1 w-fit">
                <button
                    onClick={() => setTab("search")}
                    className={cn(
                        "rounded-md px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                        tab === "search"
                            ? "bg-white text-text-primary shadow-sm"
                            : "text-text-secondary hover:text-text-primary"
                    )}
                >
                    Search
                </button>
                <button
                    onClick={() => setTab("sent")}
                    className={cn(
                        "rounded-md px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                        tab === "sent"
                            ? "bg-white text-text-primary shadow-sm"
                            : "text-text-secondary hover:text-text-primary"
                    )}
                >
                    Sent Emails
                    {trackedEmails.length > 0 && (
                        <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1.5 text-[11px] font-semibold text-primary">
                            {trackedEmails.length}
                        </span>
                    )}
                </button>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
                <div className="space-y-4">
                    {/* ============================================= */}
                    {/*  SEARCH TAB                                    */}
                    {/* ============================================= */}
                    {tab === "search" && (
                        <>
                            {/* Filters */}
                            <div className="flex flex-col gap-3 rounded-xl border border-border bg-white p-4 sm:flex-row sm:items-end">
                                <div className="flex-1">
                                    <label className="mb-1 block text-[11px] font-medium text-text-muted">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <SearchVisualIcon
                                            size={14}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                                        />
                                        <input
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Name, department, or research area"
                                            className="h-9 w-full rounded-lg border border-border bg-white pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                                        />
                                    </div>
                                </div>
                                <div className="w-full sm:w-40">
                                    <label className="mb-1 block text-[11px] font-medium text-text-muted">
                                        Country
                                    </label>
                                    <select
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                                    >
                                        {countries.map((opt) => (
                                            <option key={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-full sm:w-48">
                                    <label className="mb-1 block text-[11px] font-medium text-text-muted">
                                        University
                                    </label>
                                    <select
                                        value={university}
                                        onChange={(e) => setUniversity(e.target.value)}
                                        className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                                    >
                                        {universities.map((opt) => (
                                            <option key={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-full sm:w-40">
                                    <label className="mb-1 block text-[11px] font-medium text-text-muted">
                                        Research area
                                    </label>
                                    <select
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                        className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                                    >
                                        {researchAreaOptions.map((opt) => (
                                            <option key={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Professor list */}
                            <div className="space-y-2.5">
                                {filtered.map((prof) => (
                                    <article
                                        key={prof.id}
                                        className="rounded-xl border border-border bg-white p-4 sm:p-5"
                                    >
                                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                                    {getInitials(prof.name)}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h2 className="text-[14px] font-semibold text-text-primary">
                                                            {prof.name}
                                                        </h2>
                                                        {prof.acceptingStudents ? (
                                                            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                                                                <CheckmarkCircle01Icon size={11} />
                                                                Accepting
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                                                                Not accepting
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="mt-0.5 text-xs text-text-secondary">
                                                        {prof.title} &middot; {prof.department} &middot;{" "}
                                                        <span>{prof.flag}</span> {prof.university}
                                                    </p>
                                                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                                                        {prof.researchAreas.map((a) => (
                                                            <span
                                                                key={a}
                                                                className="rounded-md bg-surface px-2 py-0.5 text-[11px] text-text-secondary"
                                                            >
                                                                {a}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    {prof.labName && (
                                                        <p className="mt-1 text-[11px] text-text-muted">
                                                            {prof.labName}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex shrink-0 items-center gap-2">
                                                {prof.profileUrl && (
                                                    <a
                                                        href={prof.profileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface"
                                                    >
                                                        <ViewIcon size={13} />
                                                        Profile
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => openComposer(prof)}
                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary/90 cursor-pointer"
                                                >
                                                    <Mail01Icon size={13} />
                                                    Write Email
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))}

                                {filtered.length === 0 && (
                                    <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white py-16 text-center">
                                        <TeacherIcon size={28} className="text-text-muted" />
                                        <p className="text-sm text-text-secondary">
                                            No professors match your filters.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* ============================================= */}
                    {/*  SENT EMAILS TAB                               */}
                    {/* ============================================= */}
                    {tab === "sent" && (
                        <div className="space-y-2.5">
                            {trackedEmails.length === 0 ? (
                                <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white py-16 text-center">
                                    <MailSend01Icon size={28} className="text-text-muted" />
                                    <p className="text-sm text-text-secondary">
                                        No emails sent yet. Search for a professor to get started.
                                    </p>
                                </div>
                            ) : (
                                trackedEmails.map((email) => {
                                    const days = daysSince(email.sentAt);
                                    const needsFollowUp =
                                        days >= 7 &&
                                        email.status !== "replied" &&
                                        email.status !== "opened";
                                    const cfg = statusConfig[email.status];
                                    return (
                                        <article
                                            key={email.id}
                                            className="rounded-xl border border-border bg-white p-4 sm:p-5"
                                        >
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="min-w-0">
                                                    <p className="text-[14px] font-semibold text-text-primary truncate">
                                                        {email.subject}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-text-secondary">
                                                        To: {email.professorName} &middot;{" "}
                                                        {email.university}
                                                    </p>
                                                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                                                        <span
                                                            className={cn(
                                                                "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium",
                                                                cfg.color
                                                            )}
                                                        >
                                                            {cfg.label}
                                                        </span>
                                                        <span className="text-[11px] text-text-muted">
                                                            {days === 0
                                                                ? "Today"
                                                                : `${days}d ago`}
                                                        </span>
                                                        {needsFollowUp && (
                                                            <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                                                                <Clock01Icon size={11} />
                                                                Follow up
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 items-center gap-2">
                                                    <select
                                                        value={email.status}
                                                        onChange={(e) =>
                                                            updateEmailStatus(
                                                                email.id,
                                                                e.target.value as TrackedEmail["status"]
                                                            )
                                                        }
                                                        className="h-8 rounded-lg border border-border bg-white px-2 text-xs text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                                                    >
                                                        {Object.entries(statusConfig).map(
                                                            ([key, val]) => (
                                                                <option key={key} value={key}>
                                                                    {val.label}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    {needsFollowUp && (
                                                        <button
                                                            onClick={() => {
                                                                const prof = professors.find(
                                                                    (p) =>
                                                                        p.id === email.professorId
                                                                );
                                                                if (prof) {
                                                                    setSelectedProfessor(prof);
                                                                    const tpl = emailTemplates.find(
                                                                        (t) => t.id === "follow-up"
                                                                    )!;
                                                                    setSelectedTemplate(tpl);
                                                                    const { subject, body } =
                                                                        fillTemplate(
                                                                            tpl,
                                                                            prof,
                                                                            userInfo
                                                                        );
                                                                    setEmailSubject(subject);
                                                                    setEmailBody(body);
                                                                    setComposerOpen(true);
                                                                    setCopied(false);
                                                                }
                                                            }}
                                                            className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface cursor-pointer"
                                                        >
                                                            <MailReply01Icon size={12} />
                                                            Follow up
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>

                {/* ===================================================== */}
                {/*  SIDEBAR                                               */}
                {/* ===================================================== */}
                <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
                    {/* Email stats */}
                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">Outreach stats</p>
                        <div className="mt-3 space-y-2.5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1.5 text-text-secondary">
                                    <MailSend01Icon size={13} />
                                    Sent
                                </span>
                                <span className="font-semibold text-text-primary">
                                    {emailStats.sent}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1.5 text-text-secondary">
                                    <MailOpen01Icon size={13} />
                                    Opened
                                </span>
                                <span className="font-semibold text-text-primary">
                                    {emailStats.opened}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1.5 text-text-secondary">
                                    <MailReply01Icon size={13} />
                                    Replied
                                </span>
                                <span className="font-semibold text-text-primary">
                                    {emailStats.replied}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Cold email tips */}
                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">Cold email tips</p>
                        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-secondary">
                            <li>Reference a specific paper or project: generic emails get ignored.</li>
                            <li>Keep it under 200 words. Professors skim, they do not read walls of text.</li>
                            <li>State what you can contribute, not just what you want.</li>
                            <li>Follow up once after 7 to 10 days. More than two follow-ups is too many.</li>
                            <li>Send between Tuesday and Thursday, 9 to 11am in their timezone.</li>
                        </ul>
                    </div>

                    {/* Research advisor guidance */}
                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">
                            Finding the right advisor
                        </p>
                        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-secondary">
                            <li>Read 2 to 3 of their recent papers before reaching out.</li>
                            <li>Check if their lab has funded positions or if you need external funding.</li>
                            <li>Look at their PhD students&apos; publication records to gauge mentorship style.</li>
                            <li>Attend their public talks or webinars if available.</li>
                        </ul>
                    </div>

                    {/* Quick breakdown */}
                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">By country</p>
                        <div className="mt-3 space-y-2.5">
                            {countries
                                .filter((c) => c !== "All countries")
                                .map((c) => {
                                    const count = professors.filter((p) => p.country === c).length;
                                    return (
                                        <div
                                            key={c}
                                            className="flex items-center justify-between text-xs"
                                        >
                                            <span className="text-text-secondary">{c}</span>
                                            <span className="font-semibold text-text-primary">
                                                {count}
                                            </span>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </aside>
            </div>

            {/* ========================================================= */}
            {/*  EMAIL COMPOSER MODAL                                       */}
            {/* ========================================================= */}
            {composerOpen && selectedProfessor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-2xl rounded-xl border border-border bg-white shadow-xl">
                        {/* Modal header */}
                        <div className="flex items-center justify-between border-b border-border px-5 py-4">
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-text-primary">
                                    Email to {selectedProfessor.name}
                                </p>
                                <p className="text-xs text-text-muted">
                                    {selectedProfessor.email} &middot;{" "}
                                    {selectedProfessor.university}
                                </p>
                            </div>
                            <button
                                onClick={() => setComposerOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface hover:text-text-primary cursor-pointer"
                            >
                                <Cancel01Icon size={16} />
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="max-h-[70vh] overflow-y-auto px-5 py-4 space-y-4">
                            {/* Template selector */}
                            <div>
                                <label className="mb-1 block text-[11px] font-medium text-text-muted">
                                    Template
                                </label>
                                <select
                                    value={selectedTemplate.id}
                                    onChange={(e) => changeTemplate(e.target.value)}
                                    className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                                >
                                    {emailTemplates.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="mb-1 block text-[11px] font-medium text-text-muted">
                                    Subject
                                </label>
                                <input
                                    value={emailSubject}
                                    onChange={(e) => setEmailSubject(e.target.value)}
                                    className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                                />
                            </div>

                            {/* Body */}
                            <div>
                                <div className="mb-1 flex items-center justify-between">
                                    <label className="text-[11px] font-medium text-text-muted">
                                        Body
                                    </label>
                                    <span className="text-[11px] text-text-muted">
                                        {emailBody.split(/\s+/).filter(Boolean).length} words
                                    </span>
                                </div>
                                <textarea
                                    value={emailBody}
                                    onChange={(e) => setEmailBody(e.target.value)}
                                    rows={14}
                                    className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm leading-relaxed text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12 resize-y"
                                />
                            </div>

                            {/* Placeholder hints */}
                            <div className="rounded-lg bg-surface p-3">
                                <p className="text-[11px] font-medium text-text-muted mb-1">
                                    Replace bracketed placeholders with your details
                                </p>
                                <p className="text-[11px] text-text-muted">
                                    [Your Name], [your current role/status], [your field], [relevant skills]
                                </p>
                            </div>
                        </div>

                        {/* Modal footer */}
                        <div className="flex items-center justify-between border-t border-border px-5 py-3">
                            <div className="flex items-center gap-2">
                                <BookOpen01Icon size={14} className="text-text-muted" />
                                <span className="text-[11px] text-text-muted">
                                    {selectedProfessor.recentPublications[0] ?? "No recent publications"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={copyToClipboard}
                                    className={cn(
                                        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                                        copied
                                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                            : "border-border text-text-secondary hover:bg-surface"
                                    )}
                                >
                                    {copied ? (
                                        <>
                                            <CheckmarkCircle01Icon size={13} />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy01Icon size={13} />
                                            Copy to clipboard
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={saveAsSent}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary/90 cursor-pointer"
                                >
                                    <ArrowRight01Icon size={13} />
                                    Mark as sent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
