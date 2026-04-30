"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
    ArrowLeft01Icon,
    AiBrain01Icon,
    SparklesIcon,
} from "hugeicons-react";

function sectionBody(content: string, fallback: string) {
    const t = content.trim();
    return t || fallback;
}

export default function CvBuilderPage() {
    const [headline, setHeadline] = useState("");
    const [education, setEducation] = useState("");
    const [researchInterests, setResearchInterests] = useState("");
    const [experience, setExperience] = useState("");
    const [projects, setProjects] = useState("");
    const [researchProjects, setResearchProjects] = useState("");
    const [papers, setPapers] = useState("");
    const [skills, setSkills] = useState("");
    const [references, setReferences] = useState("");

    const [generated, setGenerated] = useState<string | null>(null);

    const draft = useMemo(() => {
        const h = headline.trim() || "Graduate applicant — STEM / research";
        const sections = [
            `# ${h}`,
            "",
            "## Education",
            sectionBody(education, "- [Degree, institution, dates, highlights]"),
            "",
            "## Research interests",
            sectionBody(researchInterests, "- [Themes, methods, supervisors or labs you'd fit—keep factual]"),
            "",
            "## Experience",
            sectionBody(experience, "- [Role · organisation · metric-led bullets]"),
            "",
            "## Projects",
            sectionBody(projects, "- [Capstone, internship deliverables, competitions—problem / stack / outcome]"),
            "",
            "## Research projects",
            sectionBody(
                researchProjects,
                "- [Lab / thesis / grant work—question, methods, finding or stage]"
            ),
            "",
            "## Publications & papers",
            sectionBody(
                papers,
                "- [Author list, title, venue, year, DOI or link if published]\n- [Preprints: mark clearly as under review if needed]"
            ),
            "",
            "## Skills & tools",
            sectionBody(skills, "[Tools, languages, frameworks — match programme or role keywords]"),
            "",
            "## References",
            sectionBody(
                references,
                "- [Name, title, institution, email / phone — only with permission]\n- [Relationship: e.g. thesis advisor, employer]"
            ),
        ];
        return sections.join("\n");
    }, [
        headline,
        education,
        researchInterests,
        experience,
        projects,
        researchProjects,
        papers,
        skills,
        references,
    ]);

    return (
        <div className="pb-10">
            <Link
                href="/documents/sop-cv-builder"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
            >
                <ArrowLeft01Icon size={16} aria-hidden />
                Back to builder
            </Link>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-lg font-bold text-text-primary">Academic &amp; professional CV</h1>
                    <p className="mt-0.5 max-w-xl text-xs leading-snug text-text-secondary">
                        Feed raw facts—we suggest ATS-friendly headings and sharper bullets you can defend in interview.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setGenerated(draft)}
                    className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-[13px] font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                    <SparklesIcon size={15} aria-hidden />
                    Generate draft
                </button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2 lg:items-start">
                <div className="space-y-3 rounded-lg border border-border bg-white p-4">
                    <div>
                        <label className="mb-1 block text-[13px] font-medium text-text-primary">
                            Professional headline
                        </label>
                        <input
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                            className="w-full rounded-lg border border-border px-3 py-2 text-[13px] text-text-primary outline-none placeholder:text-text-muted focus:border-primary/35 focus:outline-none"
                            placeholder="One line: who you are + target field"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-[13px] font-medium text-text-primary">Education (raw)</label>
                        <textarea
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            rows={3}
                            className="w-full rounded-lg border border-border px-3 py-2 text-[13px] text-text-primary outline-none placeholder:text-text-muted focus:border-primary/35 focus:outline-none"
                            placeholder="School, degree, dates, honours, GPA if strong"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-[13px] font-medium text-text-primary">
                            Research interests
                        </label>
                        <textarea
                            value={researchInterests}
                            onChange={(e) => setResearchInterests(e.target.value)}
                            rows={2}
                            className="w-full rounded-lg border border-border px-3 py-2 text-[13px] text-text-primary outline-none placeholder:text-text-muted focus:border-primary/35 focus:outline-none"
                            placeholder="Themes, subspecialties, methods—match lab or programme wording where honest"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-[13px] font-medium text-text-primary">Experience (raw)</label>
                        <textarea
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            rows={4}
                            className="w-full rounded-lg border border-border px-3 py-2 text-[13px] text-text-primary outline-none placeholder:text-text-muted focus:border-primary/35 focus:outline-none"
                            placeholder="Roles, organisations, dates, wins (numbers help)"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-[13px] font-medium text-text-primary">Projects</label>
                        <textarea
                            value={projects}
                            onChange={(e) => setProjects(e.target.value)}
                            rows={3}
                            className="w-full rounded-lg border border-border px-3 py-2 text-[13px] text-text-primary outline-none placeholder:text-text-muted focus:border-primary/35 focus:outline-none"
                            placeholder="Capstone, internships, competitions—outside formal research labs"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-[13px] font-medium text-text-primary">
                            Research projects
                        </label>
                        <textarea
                            value={researchProjects}
                            onChange={(e) => setResearchProjects(e.target.value)}
                            rows={3}
                            className="w-full rounded-lg border border-border px-3 py-2 text-[13px] text-text-primary outline-none placeholder:text-text-muted focus:border-primary/35 focus:outline-none"
                            placeholder="Thesis, lab work, supervised research—question, methods, outcomes"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-[13px] font-medium text-text-primary">Papers</label>
                        <textarea
                            value={papers}
                            onChange={(e) => setPapers(e.target.value)}
                            rows={3}
                            className="w-full rounded-lg border border-border px-3 py-2 text-[13px] text-text-primary outline-none placeholder:text-text-muted focus:border-primary/35 focus:outline-none"
                            placeholder="Peer-reviewed, posters, preprints—in consistent citation style"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-[13px] font-medium text-text-primary">Skills &amp; tools</label>
                        <textarea
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            rows={2}
                            className="w-full rounded-lg border border-border px-3 py-2 text-[13px] text-text-primary outline-none placeholder:text-text-muted focus:border-primary/35 focus:outline-none"
                            placeholder="Comma or line separated"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-[13px] font-medium text-text-primary">References</label>
                        <textarea
                            value={references}
                            onChange={(e) => setReferences(e.target.value)}
                            rows={3}
                            className="w-full rounded-lg border border-border px-3 py-2 text-[13px] text-text-primary outline-none placeholder:text-text-muted focus:border-primary/35 focus:outline-none"
                            placeholder="Name, role, institution, contact—only with permission"
                        />
                    </div>
                </div>

                <div className="flex flex-col rounded-lg border border-border bg-violet-50/35 p-4 lg:sticky lg:top-4">
                    <div className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-text-primary">
                        <AiBrain01Icon size={16} className="text-violet-700" aria-hidden />
                        Markdown-style preview
                    </div>
                    <pre className="min-h-[260px] max-h-[min(70vh,640px)] flex-1 overflow-y-auto whitespace-pre-wrap rounded-lg border border-border bg-white p-3 font-sans text-[12px] leading-relaxed text-text-secondary">
                        {generated ?? "Generate to stack sections. Export to PDF will ship in a later release—copy to Word or Google Docs for now."}
                    </pre>
                    <p className="mt-2 text-[11px] text-text-muted">
                        Keep to 1–2 pages for most graduate applications; trim older items if needed.
                    </p>
                </div>
            </div>
        </div>
    );
}
