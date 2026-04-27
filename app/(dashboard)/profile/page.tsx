import {
    AiUserIcon,
    Briefcase01Icon,
    GraduationScrollIcon,
    Location01Icon,
    PencilEdit01Icon,
    Wallet01Icon,
} from "hugeicons-react";

const infoFields = [
    { label: "Home country", value: "Ghana", icon: Location01Icon },
    { label: "Target degree", value: "MSc Data Science", icon: GraduationScrollIcon },
    { label: "Funding style", value: "Scholarship-led", icon: Wallet01Icon },
    { label: "Preferred destinations", value: "UK, Canada", icon: Location01Icon },
    { label: "Current GPA", value: "3.7 / 4.0", icon: Briefcase01Icon },
];

export default function ProfilePage() {
    return (
        <div className="pb-12">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-text-primary">Profile</h1>
                    <p className="mt-1 max-w-xl text-sm text-text-secondary">
                        Your central student record for academic intent, funding, and personal planning.
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-primary/30 hover:text-primary"
                >
                    <PencilEdit01Icon size={13} />
                    Edit profile
                </button>
            </div>

            <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
                {/* Identity card */}
                <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
                    <div className="rounded-xl border border-border bg-white p-5">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-base font-semibold text-white">
                                ED
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-text-primary">Ernest Darko</h2>
                                <p className="mt-0.5 text-xs text-text-secondary">Study abroad applicant</p>
                            </div>
                        </div>
                        <div className="mt-5 space-y-3">
                            {infoFields.map((field) => {
                                const Icon = field.icon;
                                return (
                                    <div key={field.label} className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2.5">
                                        <Icon size={14} className="shrink-0 text-primary" />
                                        <div className="min-w-0">
                                            <p className="text-[11px] text-text-muted">{field.label}</p>
                                            <p className="truncate text-[13px] font-medium text-text-primary">{field.value}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="space-y-5">
                    {/* Personal brief */}
                    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        <div className="flex items-center gap-2">
                            <AiUserIcon size={16} className="text-primary" />
                            <h2 className="text-[15px] font-semibold text-text-primary">Personal brief</h2>
                        </div>
                        <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
                            Ernest is aiming for analytically strong programmes that improve his ability to work in data-driven industries back in Ghana. He prefers destinations with realistic scholarship access and strong post-study academic reputation.
                        </p>
                    </div>

                    {/* Application posture */}
                    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        <div className="flex items-center gap-2">
                            <Briefcase01Icon size={16} className="text-primary" />
                            <h2 className="text-[15px] font-semibold text-text-primary">Application posture</h2>
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-lg bg-surface p-3">
                                <p className="text-[11px] text-text-muted">GPA</p>
                                <p className="mt-1 text-lg font-semibold text-text-primary">3.7 / 4.0</p>
                            </div>
                            <div className="rounded-lg bg-surface p-3">
                                <p className="text-[11px] text-text-muted">Destinations</p>
                                <p className="mt-1 text-lg font-semibold text-text-primary">UK, Canada</p>
                            </div>
                            <div className="rounded-lg bg-surface p-3">
                                <p className="text-[11px] text-text-muted">Applications</p>
                                <p className="mt-1 text-lg font-semibold text-text-primary">4 active</p>
                            </div>
                            <div className="rounded-lg bg-surface p-3">
                                <p className="text-[11px] text-text-muted">Offers</p>
                                <p className="mt-1 text-lg font-semibold text-accent">1 received</p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        <h2 className="text-[15px] font-semibold text-text-primary">Recent activity</h2>
                        <div className="mt-4 space-y-2.5">
                            {[
                                { event: "Offer received from University of Manchester", time: "2 days ago" },
                                { event: "Transcript evaluation completed", time: "5 days ago" },
                                { event: "Visa interview practice session (score: 88%)", time: "1 week ago" },
                                { event: "Application submitted to Arizona State University", time: "2 weeks ago" },
                            ].map((item) => (
                                <div key={item.event} className="flex items-center justify-between rounded-lg bg-surface px-4 py-3">
                                    <p className="text-[13px] text-text-secondary">{item.event}</p>
                                    <span className="shrink-0 text-xs text-text-muted">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
