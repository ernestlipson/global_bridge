import { UserStatusIcon, BrainIcon, RocketIcon } from "hugeicons-react";

const steps = [
    {
        step: "01",
        icon: UserStatusIcon,
        title: "Create Your Profile",
        description:
            "Tell us about your academic background, budget, career goals, and preferred countries. It takes just 5 minutes.",
        color: "bg-primary",
    },
    {
        step: "02",
        icon: BrainIcon,
        title: "Get AI-Powered Matches",
        description:
            "Our AI analyzes your profile and matches you with the best universities, scholarships, and programs that fit you.",
        color: "bg-accent",
    },
    {
        step: "03",
        icon: RocketIcon,
        title: "Apply & Succeed",
        description:
            "Use our tools to ace your visa interview, write your SOP, track applications, and get ready for life abroad.",
        color: "bg-primary-dark",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="bg-surface py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                        How It Works
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                        Your journey in 3 simple steps
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                        We&apos;ve simplified the entire study abroad process so you can
                        focus on what matters — your future.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative mt-16 grid gap-8 lg:grid-cols-3">
                    {/* Connecting line (desktop) */}
                    <div
                        className="absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-primary/20 via-accent/20 to-primary-dark/20 lg:block"
                        aria-hidden="true"
                    />

                    {steps.map((item) => (
                        <div key={item.step} className="relative flex flex-col items-center text-center">
                            {/* Step number circle */}
                            <div
                                className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} text-white shadow-lg`}
                            >
                                <item.icon size={24} />
                            </div>

                            {/* Step number */}
                            <span className="mt-5 text-xs font-bold uppercase tracking-widest text-text-muted">
                                Step {item.step}
                            </span>

                            <h3 className="mt-2 text-xl font-semibold text-text-primary">
                                {item.title}
                            </h3>
                            <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
