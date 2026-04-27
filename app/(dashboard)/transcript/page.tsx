import {
    Alert01Icon,
    ArrowRight01Icon,
    BulbIcon,
    CheckListIcon,
    CheckmarkCircle01Icon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";

const breakdown = [
    { label: "Academic standing", value: "Strong", tone: "text-accent", bg: "bg-accent-light" },
    { label: "Grade consistency", value: "Mixed", tone: "text-amber-600", bg: "bg-amber-50" },
    { label: "Programme readiness", value: "Good fit", tone: "text-primary", bg: "bg-primary/6" },
];

const nextSteps = [
    "Target schools where your transcript supports the median admitted profile, not only the top-ranked names.",
    "Use your SOP to explain progression and stronger later-semester performance.",
    "If possible, add one stronger standardized test score to balance weaker modules.",
    "Keep your visa prep aligned with the academic story so the officer hears a coherent plan.",
];

export default function TranscriptPage() {
    return (
        <div className="pb-12">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">Transcript evaluation</h1>
                <p className="mt-1 max-w-xl text-sm text-text-secondary">
                    See how an admissions team would read your transcript, with flags and next-step advice.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
                <div className="space-y-5">
                    {/* Evaluation summary */}
                    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        <div className="flex items-center gap-3">
                            <CheckListIcon size={18} className="text-primary" />
                            <h2 className="text-[15px] font-semibold text-text-primary">Evaluation summary</h2>
                        </div>
                        <p className="mt-2 text-[13px] text-text-secondary">
                            Standard readout based on academic strength and pattern stability.
                        </p>
                        <div className="mt-4 grid gap-3 md:grid-cols-3">
                            {breakdown.map((item) => (
                                <div key={item.label} className={cn("rounded-lg p-4", item.bg)}>
                                    <p className="text-xs text-text-muted">{item.label}</p>
                                    <p className={cn("mt-1.5 text-lg font-semibold", item.tone)}>{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Risk flags */}
                    <div className="rounded-xl border border-danger/15 bg-red-50/40 p-5 sm:p-6">
                        <h2 className="flex items-center gap-2 text-[15px] font-semibold text-text-primary">
                            <Alert01Icon size={16} className="text-danger" />
                            Risk flags
                        </h2>
                        <div className="mt-3 space-y-2 text-[13px] leading-relaxed text-text-secondary">
                            <p>Visible dip in two quantitative modules that may need explanation for competitive programmes.</p>
                            <p>If targeting top-tier schools, pair this transcript with stronger exam performance or a sharper statement of purpose.</p>
                        </div>
                    </div>

                    {/* Next steps */}
                    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        <h2 className="flex items-center gap-2 text-[15px] font-semibold text-text-primary">
                            <BulbIcon size={16} className="text-primary" />
                            Recommended next steps
                        </h2>
                        <div className="mt-4 space-y-2.5">
                            {nextSteps.map((item, index) => (
                                <div key={index} className="flex gap-3 rounded-lg bg-surface px-4 py-3">
                                    <CheckmarkCircle01Icon size={15} className="mt-0.5 shrink-0 text-accent" />
                                    <p className="text-[13px] leading-relaxed text-text-secondary">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">Quick overview</p>
                        <div className="mt-3 space-y-3">
                            <div className="rounded-lg bg-surface p-3">
                                <p className="text-xs text-text-muted">Overall grade</p>
                                <p className="mt-1 text-lg font-semibold text-text-primary">3.7 / 4.0</p>
                            </div>
                            <div className="rounded-lg bg-surface p-3">
                                <p className="text-xs text-text-muted">Credits completed</p>
                                <p className="mt-1 text-lg font-semibold text-text-primary">120 / 120</p>
                            </div>
                            <div className="rounded-lg bg-surface p-3">
                                <p className="text-xs text-text-muted">Strongest area</p>
                                <p className="mt-1 text-[13px] font-semibold text-text-primary">Statistics &amp; research methods</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">What admissions teams check</p>
                        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-secondary">
                            <li>Upward grade trend across semesters.</li>
                            <li>Performance in programme-relevant modules.</li>
                            <li>Consistency, not just the final average.</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
