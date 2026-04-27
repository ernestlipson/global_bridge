import { ArrowRight01Icon, UserSearch01Icon } from "hugeicons-react";
import { DiscordIcon, SlackIcon, WhatsappIcon } from "hugeicons-react";

const communityChannels = [
    {
        name: "Slack Community",
        subtitle: "Career tips and scholarship updates",
        href: "#",
        brand: "#4A154B",
        icon: SlackIcon,
    },
    {
        name: "Discord Community",
        subtitle: "Live student groups and voice chat",
        href: "#",
        brand: "#5865F2",
        icon: DiscordIcon,
    },
    {
        name: "WhatsApp Community",
        subtitle: "Quick alerts and mentor support",
        href: "#",
        brand: "#25D366",
        icon: WhatsappIcon,
    },
];

export function CommunityJoin() {
    return (
        <section id="community" className="bg-surface/45 py-12 sm:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                        <UserSearch01Icon size={14} />
                        Student Community
                    </span>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                        Join The Study Abroad Community
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
                        Connect with other students preparing for admissions and visas. Join any
                        channel below. You can plug in the final links later.
                    </p>
                </div>

                <div className="mt-7 flex flex-wrap justify-center gap-2.5 sm:gap-3">
                    {communityChannels.map((channel) => (
                        <a
                            key={channel.name}
                            href={channel.href}
                            className="group inline-flex items-center gap-3 rounded-full border border-border bg-white/90 px-3.5 py-2.5 transition-all duration-200 hover:border-primary/30 hover:bg-white"
                            aria-label={`Join ${channel.name}`}
                        >
                            <div
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white"
                                style={{ color: channel.brand }}
                            >
                                <channel.icon size={18} strokeWidth={2.2} />
                            </div>

                            <div className="text-left">
                                <p className="text-sm font-semibold text-text-primary">
                                    {channel.name}
                                </p>
                                <p className="text-xs text-text-muted">{channel.subtitle}</p>
                            </div>

                            <div className="ml-1 text-primary transition-transform duration-200 group-hover:translate-x-0.5">
                                <ArrowRight01Icon size={15} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
