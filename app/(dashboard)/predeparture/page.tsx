import {
    Airplane01Icon,
    Calendar01Icon,
    CheckmarkCircle01Icon,
    Location01Icon,
    Loading03Icon,
    TimeHalfPassIcon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";

const steps = [
    { label: "Visa decision received", description: "CAS used, visa granted 12 Apr", status: "done" as const },
    { label: "Flight booked", description: "BA 0078 Accra to Manchester, 14 Sep", status: "done" as const },
    { label: "Accommodation confirmed", description: "Fallowfield campus halls, awaiting deposit", status: "active" as const },
    { label: "Airport pickup assigned", description: "Will be coordinated by the arrival team", status: "pending" as const },
];

const statusIcon = {
    done: CheckmarkCircle01Icon,
    active: Loading03Icon,
    pending: TimeHalfPassIcon,
};

const statusStyle = {
    done: "text-accent",
    active: "text-primary",
    pending: "text-text-muted",
};

export default function PredeparturePage() {
    const completed = steps.filter((s) => s.status === "done").length;
    const progress = Math.round((completed / steps.length) * 100);

    return (
        <div className="pb-12">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">Pre-departure</h1>
                <p className="mt-1 max-w-xl text-sm text-text-secondary">
                    Track departure preparation from visa decision through to airport pickup.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
                <div className="space-y-5">
                    {/* Travel info */}
                    <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-border bg-white p-4">
                            <p className="text-xs text-text-muted">Destination</p>
                            <p className="mt-1.5 flex items-center gap-2 text-[14px] font-semibold text-text-primary">
                                <Location01Icon size={14} className="text-primary" />
                                Manchester, UK
                            </p>
                        </div>
                        <div className="rounded-xl border border-border bg-white p-4">
                            <p className="text-xs text-text-muted">Departure</p>
                            <p className="mt-1.5 flex items-center gap-2 text-[14px] font-semibold text-text-primary">
                                <Calendar01Icon size={14} className="text-primary" />
                                14 Sep 2026
                            </p>
                        </div>
                        <div className="rounded-xl border border-border bg-white p-4">
                            <p className="text-xs text-text-muted">Progress</p>
                            <p className="mt-1.5 text-[14px] font-semibold text-text-primary">{completed} of {steps.length} complete</p>
                            <div className="mt-2 h-1.5 rounded-full bg-surface">
                                <div
                                    className="h-1.5 rounded-full bg-accent transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Checklist */}
                    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        <div className="flex items-center gap-3">
                            <Airplane01Icon size={18} className="text-primary" />
                            <h2 className="text-[15px] font-semibold text-text-primary">Departure checklist</h2>
                        </div>
                        <div className="mt-5 space-y-2.5">
                            {steps.map((item) => {
                                const Icon = statusIcon[item.status];
                                return (
                                    <div
                                        key={item.label}
                                        className={cn(
                                            "flex gap-3 rounded-lg px-4 py-3",
                                            item.status === "active" ? "border border-primary/15 bg-primary/4" : "bg-surface"
                                        )}
                                    >
                                        <Icon size={16} className={cn("mt-0.5 shrink-0", statusStyle[item.status])} />
                                        <div className="min-w-0">
                                            <p className={cn(
                                                "text-[13px] font-medium",
                                                item.status === "done" ? "text-text-muted line-through" : "text-text-primary"
                                            )}>
                                                {item.label}
                                            </p>
                                            <p className="mt-0.5 text-xs text-text-secondary">{item.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">Packing essentials</p>
                        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-secondary">
                            <li>Original admission letter and CAS printout.</li>
                            <li>Passport with valid visa vignette.</li>
                            <li>Bank statements used in visa application.</li>
                            <li>Accommodation booking confirmation.</li>
                            <li>TB test results (if applicable).</li>
                        </ul>
                    </div>
                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">First-week reminders</p>
                        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-secondary">
                            <li>Collect BRP within 10 days of arrival.</li>
                            <li>Register with a local GP surgery.</li>
                            <li>Open a UK bank account with your uni letter.</li>
                            <li>Attend programme induction sessions.</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
