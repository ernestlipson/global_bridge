import { UserStatusIcon, BrainIcon, RocketIcon } from "hugeicons-react";

const steps = [
    {
        step: "01",
        icon: UserStatusIcon,
        title: "Create Your Profile",
        description:
            "Tell us about your academic background, budget, career goals, and preferred countries. It takes just 5 minutes.",
    },
    {
        step: "02",
        icon: BrainIcon,
        title: "Get AI-Powered Matches",
        description:
            "Our AI analyzes your profile and matches you with the best universities, scholarships, and programs that fit you.",
    },
    {
        step: "03",
        icon: RocketIcon,
        title: "Apply & Succeed",
        description:
            "Use our tools to ace your visa interview, write your SOP, track applications, and get ready for life abroad.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="relative overflow-hidden bg-white py-24 sm:py-32">
            {/* Soft background accents */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-[#2d8a4e]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#1f639b]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center justify-center rounded-full border border-[#2d8a4e]/20 bg-[#2d8a4e]/5 px-4 py-1.5 text-sm font-medium text-[#2d8a4e] mb-6">
                        How It Works
                    </span>
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem] leading-[1.1]">
                        Your journey in 3 simple steps
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
                        We&apos;ve simplified the entire study abroad process so you can
                        focus on what matters — your future.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative mt-20 grid gap-10 lg:grid-cols-3">
                    {/* Connecting line (desktop) */}
                    <div
                        className="absolute left-[16%] right-[16%] top-16 hidden h-0.5 bg-gradient-to-r from-[#1f639b]/0 via-[#1f639b]/20 to-[#2d8a4e]/0 lg:block"
                        aria-hidden="true"
                    />

                    {steps.map((item) => (
                        <div key={item.step} className="group relative flex flex-col items-center text-center rounded-[1rem] bg-slate-50/50 p-5 ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-[#1f639b]/5 hover:ring-[#1f639b]/20 overflow-hidden">
                            {/* Card gradient effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1f639b]/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            
                            {/* Step number circle */}
                            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white text-[#1f639b] shadow-sm ring-1 ring-slate-100 transition-all duration-300 group-hover:bg-[#1f639b] group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-[#1f639b]/20">
                                <item.icon size={24} strokeWidth={1.5} className="transition-transform duration-300" />
                                <div className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#2d8a4e] text-[10px] font-extrabold text-white shadow-sm ring-[3px] ring-white">
                                    {item.step}
                                </div>
                            </div>

                            <div className="relative z-10 flex-1 mt-4">
                                <h3 className="text-[17px] font-bold text-slate-900 group-hover:text-[#1f639b] transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="mt-2.5 text-[13px] leading-relaxed text-slate-500">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
