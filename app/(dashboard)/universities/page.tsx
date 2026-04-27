"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
    AiBrain01Icon,
    ArrowLeft01Icon,
    ArrowRight01Icon,
    Briefcase01Icon,
    CheckmarkCircle01Icon,
    CloudUploadIcon,
    DocumentAttachmentIcon,
    GraduationScrollIcon,
    Location01Icon,
    NoteIcon,
    SearchVisualIcon,
    SparklesIcon,
} from "hugeicons-react";
import { countryOptions } from "@/lib/university-data";
import { matchUniversities, type MatchResult, type UserProfile } from "@/lib/ai-matcher";

const levelOptions = ["Undergraduate", "Masters", "PhD"] as const;
const examOptions = ["None", "GRE", "GMAT", "SAT", "IELTS", "TOEFL"] as const;
const fundingOptions = [
    "Self-funded",
    "Partial scholarship",
    "Full scholarship",
    "Assistantship",
] as const;
const budgetOptions = [
    "Below $10k / year",
    "$10k - $20k / year",
    "$20k - $35k / year",
    "$35k+ / year",
] as const;
const studyModeOptions = ["Coursework", "Research", "Flexible"] as const;
const documentLabels = ["CV / Resume", "Transcript", "Statement of Purpose", "Recommendation"] as const;

const steps = [
    { id: 0, label: "Study target", icon: SearchVisualIcon },
    { id: 1, label: "Academics", icon: GraduationScrollIcon },
    { id: 2, label: "Budget & goals", icon: Briefcase01Icon },
    { id: 3, label: "Documents", icon: DocumentAttachmentIcon },
] as const;

function FieldLabel({ children }: { children: React.ReactNode }) {
    return <label className="mb-1.5 block text-[13px] font-medium text-text-primary">{children}</label>;
}

function TextField({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    type?: string;
}) {
    return (
        <div>
            <FieldLabel>{label}</FieldLabel>
            <input
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
            />
        </div>
    );
}

function SelectField({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: readonly string[];
}) {
    return (
        <div>
            <FieldLabel>{label}</FieldLabel>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

function OptionPills({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: readonly string[];
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <FieldLabel>{label}</FieldLabel>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => onChange(option)}
                        className={cn(
                            "rounded-lg border px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                            value === option
                                ? "border-primary bg-primary/8 text-primary"
                                : "border-border bg-white text-text-secondary hover:border-primary/30 hover:text-primary"
                        )}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

function ReadinessMeter({
    profile,
    hasProgram,
    hasDocuments,
}: {
    profile: UserProfile;
    hasProgram: boolean;
    hasDocuments: boolean;
}) {
    const readiness = useMemo(() => {
        let score = 36;
        if (profile.destination !== "All Countries") score += 12;
        if (hasProgram) score += 16;
        if (profile.gpa) score += 12;
        if (profile.testType !== "None") score += 10;
        if (profile.budget) score += 8;
        if (profile.goals) score += 10;
        if (hasDocuments) score += 12;
        return Math.min(100, score);
    }, [hasDocuments, hasProgram, profile]);

    const checks = [
        { done: hasProgram, label: "Programme specified" },
        { done: !!profile.gpa, label: "GPA provided" },
        { done: !!profile.budget, label: "Budget set" },
        { done: hasDocuments, label: "Documents uploaded" },
    ];

    return (
        <div className="rounded-xl border border-border bg-white p-5">
            <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-text-primary">Profile readiness</p>
                <span className="text-sm font-semibold text-primary">{readiness}%</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-surface">
                <div
                    className="h-1.5 rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${readiness}%` }}
                />
            </div>
            <div className="mt-4 space-y-2">
                {checks.map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-[13px]">
                        <CheckmarkCircle01Icon
                            size={15}
                            className={item.done ? "text-accent" : "text-text-muted/50"}
                        />
                        <span className={item.done ? "text-text-secondary" : "text-text-muted"}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ResultCard({
    university,
    rank,
}: {
    university: MatchResult;
    rank: number;
}) {
    return (
        <article className="rounded-xl border border-border bg-white transition-shadow hover:shadow-md">
            <div className="flex items-start gap-4 p-5">
                <div className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl",
                    university.imageColor
                )}>
                    {university.crest}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="text-[15px] font-semibold text-text-primary">{university.name}</h3>
                            <p className="mt-0.5 flex items-center gap-1 text-[13px] text-text-secondary">
                                <Location01Icon size={13} className="text-text-muted" />
                                {university.city}, {university.country} {university.flag}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className={cn(
                                    "rounded-md px-2 py-0.5 text-xs font-medium",
                                    university.matchStrength === "High" && "bg-accent-light text-accent-dark",
                                    university.matchStrength === "Medium" && "bg-amber-50 text-amber-700",
                                    university.matchStrength === "Low" && "bg-slate-100 text-slate-600"
                                )}
                            >
                                {university.matchStrength}
                            </span>
                            <span className="rounded-lg bg-primary/6 px-2.5 py-1 text-sm font-semibold text-primary">
                                {university.matchScore}%
                            </span>
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-text-secondary">
                        <span>Rank #{university.ranking}</span>
                        <span>${university.tuitionUSD.toLocaleString()}/yr</span>
                        <span className={university.scholarships ? "text-accent" : ""}>
                            {university.scholarships ? "Scholarships available" : "Limited funding"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-t border-border px-5 py-4">
                <div className="flex items-start gap-2">
                    <SparklesIcon size={14} className="mt-0.5 shrink-0 text-primary/60" />
                    <p className="text-[13px] leading-relaxed text-text-secondary">{university.aiRationale}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {university.programs.slice(0, 3).map((program) => (
                        <span
                            key={program}
                            className="rounded-md bg-surface px-2 py-0.5 text-xs font-medium text-text-secondary"
                        >
                            {program}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}

export default function UniversitiesPage() {
    const [view, setView] = useState<"form" | "analyzing" | "results">("form");
    const [activeStep, setActiveStep] = useState(0);
    const [profile, setProfile] = useState<UserProfile>({
        destination: "United Kingdom",
        level: "Masters",
        program: "",
        gpa: "",
        testType: "None",
        testScore: "",
        englishScore: "",
        funding: "Partial scholarship",
        budget: "",
        studyMode: "Flexible",
        goals: "",
        documents: [],
    });
    const [results, setResults] = useState<MatchResult[]>([]);

    const hasProgram = profile.program.trim().length > 0;
    const hasDocuments = profile.documents.length > 0;

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        setProfile((current) => ({ ...current, documents: Array.from(files) }));
    };

    const handleStartAnalysis = async () => {
        setView("analyzing");
        const matches = await matchUniversities(profile);
        setResults(matches);
        setView("results");
    };

    /* ------------------------------------------------------------------ */
    /*  Analyzing state                                                    */
    /* ------------------------------------------------------------------ */
    if (view === "analyzing") {
        return (
            <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                    <AiBrain01Icon size={32} className="animate-pulse" />
                </div>
                <h1 className="mt-6 text-xl font-semibold text-text-primary">Building your shortlist</h1>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-secondary">
                    Weighing destination fit, academics, budget, and scholarship potential to rank schools for you.
                </p>
                <div className="mt-8 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="h-1.5 w-8 rounded-full bg-primary/20 animate-pulse"
                            style={{ animationDelay: `${i * 200}ms` }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    /* ------------------------------------------------------------------ */
    /*  Results                                                            */
    /* ------------------------------------------------------------------ */
    if (view === "results") {
        const highCount = results.filter((r) => r.matchStrength === "High").length;
        const scholarshipCount = results.filter((r) => r.scholarships).length;

        return (
            <div className="space-y-6 pb-12">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-text-primary">
                            {results.length} universities matched
                        </h1>
                        <p className="mt-1 text-sm text-text-secondary">
                            {highCount} high-confidence picks, {scholarshipCount} with scholarship options
                        </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setView("form")}>
                        <ArrowLeft01Icon size={15} />
                        Edit brief
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {[
                        profile.destination,
                        profile.level,
                        profile.program || "No programme",
                        profile.funding,
                        profile.budget || "No budget set",
                    ].map((chip) => (
                        <span
                            key={chip}
                            className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-text-secondary"
                        >
                            {chip}
                        </span>
                    ))}
                </div>

                <div className="space-y-3">
                    {results.slice(0, 6).map((university, index) => (
                        <ResultCard key={university.id} university={university} rank={index + 1} />
                    ))}
                </div>
            </div>
        );
    }

    /* ------------------------------------------------------------------ */
    /*  Form (stepped wizard)                                              */
    /* ------------------------------------------------------------------ */
    return (
        <div className="pb-12">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">University matcher</h1>
                <p className="mt-1 max-w-xl text-sm text-text-secondary">
                    Tell us about your goals and academics. The AI will rank universities by fit, funding, and admissibility.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
                {/* Main form area */}
                <div>
                    {/* Step navigation */}
                    <nav className="mb-6 flex gap-1 rounded-xl border border-border bg-white p-1">
                        {steps.map((s) => {
                            const StepIcon = s.icon;
                            return (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => setActiveStep(s.id)}
                                    className={cn(
                                        "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors",
                                        activeStep === s.id
                                            ? "bg-primary text-white"
                                            : "text-text-secondary hover:bg-surface hover:text-text-primary"
                                    )}
                                >
                                    <StepIcon size={15} />
                                    <span className="hidden sm:inline">{s.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Step content */}
                    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        {/* Step 0: Study target */}
                        {activeStep === 0 && (
                            <div>
                                <h2 className="text-[15px] font-semibold text-text-primary">Study target</h2>
                                <p className="mt-1 text-[13px] text-text-secondary">
                                    Where do you want to study, what degree, and what style of learning?
                                </p>
                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    <SelectField
                                        label="Destination country"
                                        value={profile.destination}
                                        onChange={(v) => setProfile((c) => ({ ...c, destination: v }))}
                                        options={countryOptions}
                                    />
                                    <SelectField
                                        label="Level of study"
                                        value={profile.level}
                                        onChange={(v) => setProfile((c) => ({ ...c, level: v }))}
                                        options={levelOptions}
                                    />
                                    <TextField
                                        label="Programme"
                                        value={profile.program}
                                        onChange={(v) => setProfile((c) => ({ ...c, program: v }))}
                                        placeholder="Computer Science, Public Health, Finance..."
                                    />
                                    <OptionPills
                                        label="Study style"
                                        options={studyModeOptions}
                                        value={profile.studyMode}
                                        onChange={(v) => setProfile((c) => ({ ...c, studyMode: v }))}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 1: Academics */}
                        {activeStep === 1 && (
                            <div>
                                <h2 className="text-[15px] font-semibold text-text-primary">Academic strength</h2>
                                <p className="mt-1 text-[13px] text-text-secondary">
                                    GPA and test scores help the AI gauge competitiveness and ambition level.
                                </p>
                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    <TextField
                                        label="Current GPA"
                                        value={profile.gpa}
                                        onChange={(v) => setProfile((c) => ({ ...c, gpa: v }))}
                                        placeholder="3.6 / 4.0 or 78 / 100"
                                    />
                                    <SelectField
                                        label="Standardized exam"
                                        value={profile.testType}
                                        onChange={(v) => setProfile((c) => ({ ...c, testType: v }))}
                                        options={examOptions}
                                    />
                                    <TextField
                                        label={profile.testType === "None" ? "Exam score" : `${profile.testType} score`}
                                        value={profile.testScore}
                                        onChange={(v) => setProfile((c) => ({ ...c, testScore: v }))}
                                        placeholder={profile.testType === "None" ? "Optional" : "Enter your score"}
                                    />
                                    <TextField
                                        label="English proficiency score"
                                        value={profile.englishScore}
                                        onChange={(v) => setProfile((c) => ({ ...c, englishScore: v }))}
                                        placeholder="Optional if covered already"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Budget & goals */}
                        {activeStep === 2 && (
                            <div>
                                <h2 className="text-[15px] font-semibold text-text-primary">Budget and career direction</h2>
                                <p className="mt-1 text-[13px] text-text-secondary">
                                    Funding preference and career goals shape the shortlist toward realistic options.
                                </p>
                                <div className="mt-5 space-y-4">
                                    <OptionPills
                                        label="Funding preference"
                                        options={fundingOptions}
                                        value={profile.funding}
                                        onChange={(v) => setProfile((c) => ({ ...c, funding: v }))}
                                    />
                                    <OptionPills
                                        label="Budget comfort"
                                        options={budgetOptions}
                                        value={profile.budget}
                                        onChange={(v) => setProfile((c) => ({ ...c, budget: v }))}
                                    />
                                    <div>
                                        <FieldLabel>Career goal or intended outcome</FieldLabel>
                                        <textarea
                                            value={profile.goals}
                                            onChange={(e) => setProfile((c) => ({ ...c, goals: e.target.value }))}
                                            placeholder="Industries you care about, whether scholarship access matters more than rankings..."
                                            rows={4}
                                            className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm leading-relaxed text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Documents */}
                        {activeStep === 3 && (
                            <div>
                                <h2 className="text-[15px] font-semibold text-text-primary">Supporting documents</h2>
                                <p className="mt-1 text-[13px] text-text-secondary">
                                    A transcript or CV helps the AI sharpen recommendations. Optional but recommended.
                                </p>
                                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                                    <label className="group relative flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-5 text-center transition-colors hover:border-primary/30 hover:bg-primary/4">
                                        <CloudUploadIcon size={28} className="text-primary/70" />
                                        <p className="mt-3 text-sm font-medium text-text-primary">
                                            Drop files or click to upload
                                        </p>
                                        <p className="mt-1 text-xs text-text-muted">
                                            PDF, DOC, or image files
                                        </p>
                                        <input
                                            type="file"
                                            multiple
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                            onChange={(e) => handleFiles(e.target.files)}
                                            className="absolute inset-0 cursor-pointer opacity-0"
                                        />
                                    </label>

                                    <div>
                                        <p className="text-xs font-medium text-text-muted">Suggested</p>
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {documentLabels.map((label) => (
                                                <span
                                                    key={label}
                                                    className="rounded-md bg-surface px-2.5 py-1 text-xs text-text-secondary"
                                                >
                                                    {label}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            {profile.documents.length > 0 ? (
                                                profile.documents.map((file) => (
                                                    <div
                                                        key={`${file.name}-${file.lastModified}`}
                                                        className="flex items-center justify-between rounded-lg bg-surface px-3 py-2.5"
                                                    >
                                                        <div className="flex items-center gap-2.5">
                                                            <NoteIcon size={15} className="text-primary" />
                                                            <div>
                                                                <p className="text-[13px] font-medium text-text-primary">
                                                                    {file.name}
                                                                </p>
                                                                <p className="text-xs text-text-muted">
                                                                    {Math.max(1, Math.round(file.size / 1024))} KB
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <CheckmarkCircle01Icon size={16} className="text-accent" />
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="rounded-lg bg-surface px-3 py-3 text-[13px] text-text-muted">
                                                    No files yet. You can still run the matcher without them.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step navigation buttons */}
                        <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                                disabled={activeStep === 0}
                            >
                                <ArrowLeft01Icon size={15} />
                                Back
                            </Button>

                            {activeStep < 3 ? (
                                <Button
                                    size="sm"
                                    onClick={() => setActiveStep((s) => Math.min(3, s + 1))}
                                >
                                    Next
                                    <ArrowRight01Icon size={15} />
                                </Button>
                            ) : (
                                <Button
                                    size="sm"
                                    onClick={handleStartAnalysis}
                                    disabled={!hasProgram}
                                >
                                    <AiBrain01Icon size={16} />
                                    Run AI matcher
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
                    <ReadinessMeter profile={profile} hasProgram={hasProgram} hasDocuments={hasDocuments} />

                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">How matching works</p>
                        <div className="mt-3 space-y-3">
                            {[
                                {
                                    title: "Admission realism",
                                    body: "GPA and exams determine whether a school is safe, balanced, or ambitious.",
                                },
                                {
                                    title: "Destination confidence",
                                    body: "A strong country preference keeps the shortlist focused.",
                                },
                                {
                                    title: "Funding practicality",
                                    body: "Budget and scholarship needs can elevate financially realistic schools.",
                                },
                            ].map((item) => (
                                <div key={item.title}>
                                    <p className="text-[13px] font-medium text-text-primary">{item.title}</p>
                                    <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">Tips for better results</p>
                        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-secondary">
                            <li>Use specific programme names like "Data Science" instead of "Tech".</li>
                            <li>Include test scores if you have them, even optional ones.</li>
                            <li>If funding is critical, say so. It changes results materially.</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
