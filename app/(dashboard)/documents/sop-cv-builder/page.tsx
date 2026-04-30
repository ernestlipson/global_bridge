import Link from "next/link";
import { recentBuilderDocuments } from "@/lib/sop-cv-builder";
import { cn } from "@/lib/utils";
import {
    ArrowRight01Icon,
    Briefcase01Icon,
    CheckmarkCircle01Icon,
    Download01Icon,
    Edit02Icon,
    FileEditIcon,
    NoteIcon,
    TimeQuarterPassIcon,
} from "hugeicons-react";

const sopFeatures = [
    "University & programme-specific tailoring",
    "Strong home-ties emphasis for visa realism",
    "Plagiarism-free, authentic tone",
];

const cvFeatures = [
    "ATS-friendly international formats",
    "AI-enhanced bullet points",
    "One-click PDF export (soon)",
];

function StatusBadge({ status }: { status: "Completed" | "Draft" }) {
    const isDone = status === "Completed";
    return (
        <span
            className={cn(
                "rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                isDone
                    ? "bg-amber-100 text-amber-800"
                    : "bg-surface text-text-muted"
            )}
        >
            {status}
        </span>
    );
}

export default function SopCvBuilderHubPage() {
    return (
        <div className="pb-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Document Builder</p>
                    <h1 className="mt-0.5 text-xl font-bold tracking-tight text-text-primary">
                        AI SOP &amp; CV Builder
                    </h1>
                    <p className="mt-1.5 max-w-2xl text-xs leading-snug text-text-secondary">
                        Generate polished Statements of Purpose and academic CVs tailored for admissions and visa
                        applications—with structure you can defend in interviews.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                    <a
                        href="#recent-documents"
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-white px-3 text-[13px] font-semibold text-text-primary transition-colors hover:bg-surface"
                    >
                        <TimeQuarterPassIcon size={15} aria-hidden />
                        My documents
                    </a>
                    <Link
                        href="/documents/sop-cv-builder/sop"
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-[13px] font-semibold text-white transition-colors hover:bg-primary-dark"
                    >
                        + New document
                    </Link>
                </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
                {/* SOP card */}
                <article className="flex flex-col rounded-lg border border-border bg-white p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <NoteIcon size={20} aria-hidden />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-[15px] font-semibold leading-tight text-text-primary">
                                Statement of Purpose (SOP)
                            </h2>
                            <p className="mt-1 text-xs leading-snug text-text-secondary">
                                Tell a coherent story: why this programme, why now, how it fits your trajectory—without
                                generic praise or hollow promises.
                            </p>
                        </div>
                    </div>
                    <ul className="mt-4 space-y-1.5">
                        {sopFeatures.map((text) => (
                            <li key={text} className="flex items-start gap-2 text-[13px] leading-snug text-text-secondary">
                                <CheckmarkCircle01Icon size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <Link
                            href="/documents/sop-cv-builder/sop"
                            className="flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-primary/8 text-[13px] font-semibold text-primary transition-colors hover:bg-primary/12"
                        >
                            Build SOP
                            <ArrowRight01Icon size={14} aria-hidden />
                        </Link>
                    </div>
                </article>

                {/* CV card */}
                <article className="flex flex-col rounded-lg border border-border bg-white p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                            <Briefcase01Icon size={20} aria-hidden />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-[15px] font-semibold leading-tight text-text-primary">
                                Academic &amp; professional CV
                            </h2>
                            <p className="mt-1 text-xs leading-snug text-text-secondary">
                                Compress research, internships, and impact into recruiter-friendly bullets that embassy
                                and admissions readers can skim in under a minute.
                            </p>
                        </div>
                    </div>
                    <ul className="mt-4 space-y-1.5">
                        {cvFeatures.map((text) => (
                            <li key={text} className="flex items-start gap-2 text-[13px] leading-snug text-text-secondary">
                                <CheckmarkCircle01Icon size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <Link
                            href="/documents/sop-cv-builder/cv"
                            className="flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-primary/25 bg-white text-[13px] font-semibold text-primary transition-colors hover:bg-primary/[0.04]"
                        >
                            Build CV
                            <ArrowRight01Icon size={14} aria-hidden />
                        </Link>
                    </div>
                </article>
            </div>

            <section
                id="recent-documents"
                className="mt-8 scroll-mt-24 rounded-lg border border-border bg-white p-4"
            >
                <h2 className="text-sm font-semibold text-text-primary">Recent documents</h2>
                <p className="mt-0.5 text-[11px] text-text-muted">Drafts and exports from this workspace (sample data).</p>
                <ul className="mt-3 divide-y divide-border">
                    {recentBuilderDocuments.map((doc) => (
                        <li
                            key={doc.id}
                            className="flex flex-col gap-2 py-2.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex min-w-0 items-start gap-2.5">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface text-primary">
                                    <FileEditIcon size={15} aria-hidden />
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-[13px] font-semibold text-text-primary">{doc.title}</p>
                                    <p className="mt-0.5 text-[11px] text-text-muted">
                                        {doc.updatedLabel} · {doc.kind}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pl-10 sm:shrink-0 sm:pl-0">
                                <StatusBadge status={doc.status} />
                                <button
                                    type="button"
                                    title="Edit (coming soon)"
                                    className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface hover:text-text-primary"
                                >
                                    <Edit02Icon size={16} />
                                </button>
                                <button
                                    type="button"
                                    title="Download (coming soon)"
                                    className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface hover:text-text-primary"
                                >
                                    <Download01Icon size={16} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-3 border-t border-border pt-3">
                    <Link href="/documents" className="text-[11px] font-semibold text-primary hover:underline">
                        View all uploaded files in Documents
                    </Link>
                </div>
            </section>
        </div>
    );
}
