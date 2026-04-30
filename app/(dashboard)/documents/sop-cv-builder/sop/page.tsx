"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
    ArrowLeft01Icon,
    AiBrain01Icon,
    SparklesIcon,
} from "hugeicons-react";

export default function SopBuilderPage() {
    const [university, setUniversity] = useState("");
    const [programme, setProgramme] = useState("");
    const [background, setBackground] = useState("");
    const [goals, setGoals] = useState("");
    const [tone, setTone] = useState<"Formal" | "Warm">("Formal");
    const [length, setLength] = useState("750");

    const [generated, setGenerated] = useState<string | null>(null);

    const draft = useMemo(() => {
        if (!university.trim() && !programme.trim() && !background.trim() && !goals.trim()) {
            return "Fill the form and tap Generate draft to see an AI-assisted outline tailored to GlobalBridge prompts. Fine-tune facts before submitting anywhere.";
        }
        const u = university.trim() || "[University]";
        const p = programme.trim() || "[Programme]";
        return `Dear Admissions Committee,\n\nI am applying to the ${p} at ${u} because it bridges my analytical foundation with the applied rigour I need for [your target career]. Courses such as [module names] mirror challenges I have already approached through ${background.slice(0, 120) || "[your research, work, or projects]"}…\n\nIn the near term, ${goals.slice(0, 140) || "[state concrete goal]"}; in the longer term I intend to return strengths to my home region while maintaining global collaboration—aligning with the ${tone.toLowerCase()} narrative I have prepared for visa interviews.\n\nThank you for considering my application.\n\nSincerely,\n[Your name]`;
    }, [university, programme, background, goals, tone]);

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
                    <h1 className="text-lg font-bold text-text-primary">Statement of Purpose</h1>
                    <p className="mt-0.5 max-w-xl text-xs leading-snug text-text-secondary">
                        Add accurate details—we shape structure, pacing, and emphasis for admissions and visa dialogue.
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

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div className="space-y-3 rounded-lg border border-border bg-white p-4">
                    <Field
                        label="Target university"
                        value={university}
                        onChange={setUniversity}
                        placeholder="e.g. University of Manchester"
                    />
                    <Field
                        label="Programme / degree"
                        value={programme}
                        onChange={setProgramme}
                        placeholder="e.g. MSc Computer Science"
                    />
                    <div>
                        <label className="mb-1 block text-[13px] font-medium text-text-primary">Academic &amp; work background</label>
                        <textarea
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                            rows={4}
                            className="w-full rounded-lg border border-border px-3 py-2 text-[13px] text-text-primary outline-none placeholder:text-text-muted focus:border-primary/35 focus:outline-none"
                            placeholder="Degrees, GPA context, internships, publications—facts only."
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-[13px] font-medium text-text-primary">Goals after graduation</label>
                        <textarea
                            value={goals}
                            onChange={(e) => setGoals(e.target.value)}
                            rows={3}
                            className="w-full rounded-lg border border-border px-3 py-2 text-[13px] text-text-primary outline-none placeholder:text-text-muted focus:border-primary/35 focus:outline-none"
                            placeholder="Return plans, sector, realism for visa storyline."
                        />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-[13px] font-medium text-text-primary">Target length (words)</label>
                            <select
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                                className="w-full rounded-lg border border-border px-3 py-2 text-[13px] text-text-primary outline-none focus:border-primary/35 focus:outline-none"
                            >
                                <option value="500">~500</option>
                                <option value="750">~750</option>
                                <option value="1000">~1000</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-[13px] font-medium text-text-primary">Tone</label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value as "Formal" | "Warm")}
                                className="w-full rounded-lg border border-border px-3 py-2 text-[13px] text-text-primary outline-none focus:border-primary/35 focus:outline-none"
                            >
                                <option value="Formal">Formal</option>
                                <option value="Warm">Warm conversational</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col rounded-lg border border-border bg-surface/40 p-4">
                    <div className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-text-primary">
                        <AiBrain01Icon size={16} className="text-primary" aria-hidden />
                        Live preview
                    </div>
                    <pre className="min-h-[220px] flex-1 whitespace-pre-wrap rounded-lg border border-border bg-white p-3 font-sans text-[12px] leading-relaxed text-text-secondary">
                        {generated ?? "Your draft appears here after you generate. Edit iteratively—never submit unchecked facts."}
                    </pre>
                    <p className="mt-2 text-[11px] text-text-muted">
                        Demo output only. Replace bracketed placeholders and verify every claim with originals before use.
                    </p>
                </div>
            </div>
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}) {
    return (
        <div>
            <label className="mb-1 block text-[13px] font-medium text-text-primary">{label}</label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-[13px] text-text-primary outline-none placeholder:text-text-muted focus:border-primary/35 focus:outline-none"
                placeholder={placeholder}
            />
        </div>
    );
}
