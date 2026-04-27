import { HonourStarIcon } from "hugeicons-react";
import Image from "next/image";

const testimonials = [
    {
        name: "Kwame Mensah",
        university: "University of Manchester, UK",
        quote:
            "GlobalBridge helped me prepare for my visa interview and I got approved on the first try! The mock interview feature is incredible.",
        image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=60",
    },
    {
        name: "Ama Serwaa",
        university: "University of Toronto, Canada",
        quote:
            "I found a scholarship I never knew existed through their platform. It covered 70% of my tuition. Life-changing!",
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=60",
    },
    {
        name: "Kofi Asante",
        university: "TU Munich, Germany",
        quote:
            "The university matching was spot on. They recommended programs that fit my budget and career goals perfectly.",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=60",
    },
    {
        name: "Adwoa Frimpong",
        university: "University of Melbourne, Australia",
        quote:
            "From SOP writing to pre-departure tips, GlobalBridge was with me every step. I couldn't have done it without them.",
        image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=60",
    },
];

function StarRow() {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <HonourStarIcon
                    key={i}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                />
            ))}
        </div>
    );
}

export function Testimonials() {
    const [featured, ...rest] = testimonials;

    return (
        <section id="testimonials" className="bg-surface py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Student Success Stories
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-[2.75rem]">
                        Hear from students who made it
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-[1.05rem]">
                        Real students, real results. See how GlobalBridge helped them
                        achieve their study abroad dreams.
                    </p>
                </div>

                {/* Featured + rest layout */}
                <div className="mt-16 grid gap-6 lg:grid-cols-5">
                    {/* Featured testimonial — spans 2 cols */}
                    <div className="flex flex-col justify-between rounded-2xl border border-border/50 bg-white p-7 sm:p-8 lg:col-span-2">
                        <div>
                            <StarRow />
                            <p className="mt-5 text-lg font-medium leading-relaxed text-text-primary">
                                &ldquo;{featured.quote}&rdquo;
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-primary/10">
                                <Image
                                    src={featured.image}
                                    alt={featured.name}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-text-primary">
                                    {featured.name}
                                </p>
                                <p className="text-xs text-text-muted">
                                    {featured.university}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Remaining testimonials */}
                    <div className="grid gap-6 sm:grid-cols-3 lg:col-span-3">
                        {rest.map((t) => (
                            <div
                                key={t.name}
                                className="flex flex-col rounded-2xl border border-border/50 bg-white p-6 transition-shadow duration-200 ease-out hover:shadow-md"
                            >
                                <StarRow />
                                <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div className="mt-6 flex items-center gap-3 border-t border-border/40 pt-4">
                                    <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-border/60">
                                        <Image
                                            src={t.image}
                                            alt={t.name}
                                            fill
                                            className="object-cover"
                                            sizes="36px"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-text-primary">
                                            {t.name}
                                        </p>
                                        <p className="text-xs text-text-muted">
                                            {t.university}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
