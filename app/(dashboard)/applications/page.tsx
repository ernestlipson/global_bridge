import {
    Calendar01Icon,
    CheckmarkCircle01Icon,
    ClipboardIcon,
    Location01Icon,
    TimeHalfPassIcon,
    Upload04Icon,
    ViewIcon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";

const applications = [
    { school: "University of Manchester", program: "MSc Data Science", stage: "Offer received" as const, country: "United Kingdom", flag: "🇬🇧", deadline: "Deposit due May 18" },
    { school: "University of Waterloo", program: "MEng Software Engineering", stage: "Under review" as const, country: "Canada", flag: "🇨🇦", deadline: "Decision expected in 2 weeks" },
    { school: "RWTH Aachen University", program: "MSc Electrical Engineering", stage: "Documents missing" as const, country: "Germany", flag: "🇩🇪", deadline: "Upload degree certificate" },
    { school: "Arizona State University", program: "MS Business Analytics", stage: "Applied" as const, country: "United States", flag: "🇺🇸", deadline: "Interview not required" },
];

const stageConfig = {
    "Offer received": { bg: "bg-accent-light", text: "text-accent-dark", icon: CheckmarkCircle01Icon },
    "Under review": { bg: "bg-amber-50", text: "text-amber-700", icon: TimeHalfPassIcon },
    "Documents missing": { bg: "bg-red-50", text: "text-danger", icon: Upload04Icon },
    Applied: { bg: "bg-primary/6", text: "text-primary", icon: ViewIcon },
};

export default function ApplicationsPage() {
    const offers = applications.filter((a) => a.stage === "Offer received").length;
    const reviewing = applications.filter((a) => a.stage === "Under review" || a.stage === "Applied").length;
    const action = applications.filter((a) => a.stage === "Documents missing").length;

    return (
        <div className="pb-12">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">Applications</h1>
                <p className="mt-1 max-w-xl text-sm text-text-secondary">
                    Track offers, pending reviews, and missing documents across all schools.
                </p>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Total</p>
                    <p className="mt-1 text-2xl font-semibold text-text-primary">{applications.length}</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Offers</p>
                    <p className="mt-1 text-2xl font-semibold text-accent">{offers}</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">In review</p>
                    <p className="mt-1 text-2xl font-semibold text-amber-600">{reviewing}</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Needs action</p>
                    <p className="mt-1 text-2xl font-semibold text-danger">{action}</p>
                </div>
            </div>

            {/* Application rows */}
            <div className="space-y-3">
                {applications.map((item) => {
                    const stage = stageConfig[item.stage];
                    const StageIcon = stage.icon;
                    return (
                        <article
                            key={item.school}
                            className="rounded-xl border border-border bg-white p-4 sm:p-5"
                        >
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex items-start gap-4">
                                    <span className="mt-0.5 text-2xl">{item.flag}</span>
                                    <div className="min-w-0">
                                        <h2 className="text-[15px] font-semibold text-text-primary">{item.school}</h2>
                                        <p className="mt-0.5 text-[13px] text-text-secondary">{item.program}</p>
                                        <p className="mt-1 flex items-center gap-1.5 text-xs text-text-muted">
                                            <Location01Icon size={12} />
                                            {item.country}
                                        </p>
                                    </div>
                                </div>
                                <span className={cn("inline-flex w-fit items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium", stage.bg, stage.text)}>
                                    <StageIcon size={13} />
                                    {item.stage}
                                </span>
                            </div>
                            <div className="mt-4 flex items-center justify-between rounded-lg bg-surface px-4 py-3">
                                <div className="flex items-center gap-2 text-[13px] text-text-secondary">
                                    <Calendar01Icon size={14} className="text-text-muted" />
                                    {item.deadline}
                                </div>
                                <button
                                    type="button"
                                    className="text-[13px] font-medium text-primary hover:underline"
                                >
                                    View details
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
