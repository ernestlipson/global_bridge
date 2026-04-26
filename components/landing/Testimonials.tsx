import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Kwame Mensah",
        university: "University of Manchester, UK",
        quote:
            "GlobalBridge helped me prepare for my visa interview and I got approved on the first try! The mock interview feature is incredible.",
        initials: "KM",
    },
    {
        name: "Ama Serwaa",
        university: "University of Toronto, Canada",
        quote:
            "I found a scholarship I never knew existed through their platform. It covered 70% of my tuition. Life-changing!",
        initials: "AS",
    },
    {
        name: "Kofi Asante",
        university: "TU Munich, Germany",
        quote:
            "The university matching was spot on. They recommended programs that fit my budget and career goals perfectly.",
        initials: "KA",
    },
    {
        name: "Adwoa Frimpong",
        university: "University of Melbourne, Australia",
        quote:
            "From SOP writing to pre-departure tips — GlobalBridge was with me every step. I couldn't have done it without them.",
        initials: "AF",
    },
];

export function Testimonials() {
    return (
        <section id="testimonials" className="bg-surface py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                        Student Success Stories
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                        Hear from students who made it
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                        Real students, real results. See how GlobalBridge helped them achieve
                        their study abroad dreams.
                    </p>
                </div>

                {/* Testimonial cards */}
                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className="flex flex-col rounded-2xl border border-border/60 bg-white p-6 transition-shadow hover:shadow-md"
                        >
                            {/* Stars */}
                            <div className="mb-4 flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className="fill-amber-400 text-amber-400"
                                    />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-text-primary">
                                        {t.name}
                                    </p>
                                    <p className="text-xs text-text-muted">{t.university}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
