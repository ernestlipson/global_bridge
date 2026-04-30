"use client";

import { cn } from "@/lib/utils";
import {
    AiBrain01Icon,
    ArrowRight01Icon,
    Calendar01Icon,
    CameraMicrophone01Icon,
    CheckmarkCircle01Icon,
    DocumentAttachmentIcon,
    GraduationScrollIcon,
    InformationCircleIcon,
    Target01Icon,
    Wallet01Icon,
} from "hugeicons-react";
import Link from "next/link";

const metrics = [
    { label: "Visa readiness", value: "72%", bar: 72, accent: "bg-primary" },
    { label: "Documents", value: "4 / 7", bar: 57, accent: "bg-amber-500" },
    { label: "Applications", value: "3 active", bar: 62, accent: "bg-accent" },
    { label: "Offers", value: "1", bar: 25, accent: "bg-primary" },
];

const actions = [
    {
        title: "Upload funding proof",
        body: "Manchester file set is incomplete. Upload the final financial statement and revised SOP.",
        href: "/documents",
        icon: DocumentAttachmentIcon,
        iconBg: "bg-amber-50 text-amber-600",
    },
    {
        title: "Practice visa interview",
        body: "A second session this week will tighten your funding answers and return-plan story.",
        href: "/visa",
        icon: CameraMicrophone01Icon,
        iconBg: "bg-primary/6 text-primary",
    },
    {
        title: "Review university shortlist",
        body: "Matcher results have enough context to start narrowing realistic schools.",
        href: "/university-matcher",
        icon: GraduationScrollIcon,
        iconBg: "bg-accent-light text-accent-dark",
    },
];

const activity = [
    { text: "Completed visa practice", detail: "78% overall, strongest in clarity", time: "2 hours ago", icon: Target01Icon },
    { text: "Uploaded financial statement", detail: "Waiting for advisor review", time: "Yesterday", icon: DocumentAttachmentIcon },
    { text: "Shortlisted University of Manchester", detail: "Fit score in the top tier", time: "2 days ago", icon: GraduationScrollIcon },
];

const quickNav = [
    { label: "Scholarships", sub: "Funding deadlines", href: "/scholarships", icon: Wallet01Icon },
    { label: "Transcript", sub: "Evaluation advice", href: "/transcript", icon: GraduationScrollIcon },
    { label: "Applications", sub: "All applied schools", href: "/applications", icon: DocumentAttachmentIcon },
];

export default function DashboardPage() {
    return (
        <div className="pb-12">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">Welcome back, Ernest</h1>
                <p className="mt-1 max-w-xl text-sm text-text-secondary">
                    Documents and visa readiness are the two things that matter most right now.
                </p>
            </div>

            {/* Metrics row */}
            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-border bg-white p-4">
                        <p className="text-xs text-text-muted">{m.label}</p>
                        <p className="mt-1 text-2xl font-semibold text-text-primary">{m.value}</p>
                        <div className="mt-2 h-1.5 rounded-full bg-surface">
                            <div className={cn("h-1.5 rounded-full transition-all", m.accent)} style={{ width: `${m.bar}%` }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Chat card */}
            <Link
                href="/chat"
                className="group mb-6 flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-colors hover:border-primary/20"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <AiBrain01Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-text-primary">Ask GlobalBridge AI</p>
                    <p className="mt-0.5 text-xs text-text-secondary">
                        Get instant answers about scholarships, visas, SOPs, or your applications.
                    </p>
                </div>
                <ArrowRight01Icon size={15} className="shrink-0 text-text-muted group-hover:text-primary transition-colors" />
            </Link>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
                <div className="space-y-5">
                    {/* Milestone card */}
                    <div className="rounded-xl border border-border bg-white p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-[13px] font-semibold text-text-primary">Nearest milestone</p>
                                <p className="mt-0.5 text-sm text-text-secondary">University of Manchester application</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 text-xs text-text-muted">
                                    <Calendar01Icon size={13} />
                                    Deposit target: 15 Mar 2026
                                </div>
                                <span className="rounded-md bg-primary/8 px-2.5 py-1 text-[13px] font-semibold text-primary">65%</span>
                            </div>
                        </div>
                        <div className="mt-3 h-1.5 rounded-full bg-surface">
                            <div className="h-1.5 w-[65%] rounded-full bg-primary transition-all" />
                        </div>
                    </div>

                    {/* Action items */}
                    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        <h2 className="text-[15px] font-semibold text-text-primary">Needs attention</h2>
                        <div className="mt-4 space-y-2.5">
                            {actions.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-start gap-3 rounded-lg bg-surface px-4 py-3 transition-colors hover:bg-surface/70"
                                >
                                    <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", item.iconBg)}>
                                        <item.icon size={15} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-[13px] font-semibold text-text-primary">{item.title}</p>
                                            <ArrowRight01Icon size={13} className="shrink-0 text-text-muted" />
                                        </div>
                                        <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">{item.body}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Advisor notes */}
                    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        <div className="flex items-center gap-2">
                            <InformationCircleIcon size={15} className="text-primary" />
                            <h2 className="text-[15px] font-semibold text-text-primary">Advisor notes</h2>
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                            <div className="rounded-lg bg-surface p-4">
                                <p className="text-[13px] font-semibold text-text-primary">Priority this week</p>
                                <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                                    Complete the missing financial document before scheduling another application submission.
                                </p>
                            </div>
                            <div className="rounded-lg bg-surface p-4">
                                <p className="text-[13px] font-semibold text-text-primary">Visa risk to watch</p>
                                <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                                    Your sponsor explanation still needs sharper exact figures and clearer occupation detail.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick navigation */}
                    <div className="grid gap-3 md:grid-cols-3">
                        {quickNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-colors hover:border-primary/20"
                            >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/6 text-primary">
                                    <item.icon size={16} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[13px] font-semibold text-text-primary">{item.label}</p>
                                    <p className="text-xs text-text-muted">{item.sub}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Activity sidebar */}
                <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">Recent activity</p>
                        <div className="mt-4 space-y-4">
                            {activity.map((item, i) => (
                                <div key={item.text} className="flex gap-3">
                                    <div className="relative flex flex-col items-center">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface text-primary">
                                            <item.icon size={14} />
                                        </div>
                                        {i < activity.length - 1 && <div className="mt-1 h-full w-px bg-border" />}
                                    </div>
                                    <div className="min-w-0 pb-1">
                                        <p className="text-[13px] font-medium text-text-primary">{item.text}</p>
                                        <p className="mt-0.5 text-xs text-text-secondary">{item.detail}</p>
                                        <p className="mt-1 text-[11px] text-text-muted">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">Quick stats</p>
                        <div className="mt-3 space-y-2.5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-text-secondary">Schools applied to</span>
                                <span className="font-semibold text-text-primary">4</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-text-secondary">Offers received</span>
                                <span className="font-semibold text-accent">1</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-text-secondary">Visa practice sessions</span>
                                <span className="font-semibold text-text-primary">3</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-text-secondary">Days to next deadline</span>
                                <span className="font-semibold text-amber-600">21</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
