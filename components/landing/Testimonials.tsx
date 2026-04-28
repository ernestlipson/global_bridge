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
        <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <HonourStarIcon
                    key={i}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                />
            ))}
        </div>
    );
}

export function Testimonials() {
    const [featured, ...rest] = testimonials;

    return (
        <section id="testimonials" className="relative overflow-hidden bg-slate-50/50 py-24 sm:py-32">
            {/* Soft background accents */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[400px] bg-[#1f639b]/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-[#2d8a4e]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center justify-center rounded-full border border-[#1f639b]/20 bg-[#1f639b]/5 px-4 py-1.5 text-sm font-medium text-[#1f639b] mb-6">
                        Student Success Stories
                    </span>
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem] leading-[1.1]">
                        Hear from students who made it
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
                        Real students, real results. See how GlobalBridge helped them
                        achieve their study abroad dreams.
                    </p>
                </div>

                {/* Featured + rest layout */}
                <div className="mt-20 grid gap-8 lg:grid-cols-5">
                    {/* Featured testimonial — spans 2 cols */}
                    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[1rem] bg-white p-5 sm:p-6 lg:col-span-2 shadow-sm ring-1 ring-slate-200/50 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#1f639b]/10 hover:ring-[#1f639b]/20">
                        <div className="relative z-10">
                            <StarRow />
                            <p className="mt-4 text-lg font-medium leading-relaxed text-slate-900 group-hover:text-[#1f639b] transition-colors duration-300">
                                &ldquo;{featured.quote}&rdquo;
                            </p>
                        </div>
                        <div className="relative z-10 mt-6 flex items-center gap-3 pt-5 border-t border-slate-100">
                            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#2d8a4e]/20">
                                <Image
                                    src={featured.image}
                                    alt={featured.name}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-bold text-slate-900 group-hover:text-[#1f639b] transition-colors">
                                    {featured.name}
                                </p>
                                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                    {featured.university}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Remaining testimonials */}
                    <div className="grid gap-4 sm:grid-cols-3 lg:col-span-3">
                        {rest.map((t) => (
                            <div
                                key={t.name}
                                className="group relative flex flex-col rounded-[1rem] bg-white p-5 ring-1 ring-slate-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#1f639b]/10 hover:ring-[#1f639b]/20"
                            >
                                <StarRow />
                                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-slate-600">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-slate-100">
                                    <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#2d8a4e]/20">
                                        <Image
                                            src={t.image}
                                            alt={t.name}
                                            fill
                                            className="object-cover"
                                            sizes="32px"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-bold text-slate-900 group-hover:text-[#1f639b] transition-colors">
                                            {t.name}
                                        </p>
                                        <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wider text-slate-400">
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
