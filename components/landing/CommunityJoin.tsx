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
        <section id="community" className="relative overflow-hidden bg-slate-50/50 py-24 sm:py-32">
            {/* Background glowing orbs */}
            <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[800px] h-[800px] bg-[#1f639b]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-[#2d8a4e]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#1f639b]/20 bg-[#1f639b]/5 px-4 py-1.5 text-sm font-semibold text-[#1f639b] mb-6">
                        <UserSearch01Icon size={16} />
                        Student Community
                    </span>
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem] leading-[1.1]">
                        Join The Study Abroad Community
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed text-slate-500 max-w-2xl mx-auto">
                        Connect with other students preparing for admissions and visas. Join any
                        channel below to start networking.
                    </p>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                    {communityChannels.map((channel) => (
                        <a
                            key={channel.name}
                            href={channel.href}
                            className="group relative flex w-full sm:w-[260px] items-center gap-3 rounded-[1rem] border border-slate-200/60 bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1f639b]/30 hover:shadow-xl hover:shadow-[#1f639b]/10 overflow-hidden"
                            aria-label={`Join ${channel.name}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#1f639b]/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            
                            <div
                                className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 shadow-sm ring-1 ring-slate-100 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                                style={{ color: channel.brand }}
                            >
                                <channel.icon size={20} strokeWidth={2} />
                            </div>

                            <div className="relative z-10 flex-1 text-left">
                                <p className="text-[14px] font-bold text-slate-900 group-hover:text-[#1f639b] transition-colors">
                                    {channel.name}
                                </p>
                                <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                                    {channel.subtitle}
                                </p>
                            </div>

                            <div className="relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1f639b]/5 text-[#1f639b] transition-all duration-300 group-hover:bg-[#1f639b] group-hover:text-white">
                                <ArrowRight01Icon size={14} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
