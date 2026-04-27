"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight01Icon, Calendar01Icon } from "hugeicons-react";

import { events } from "@/data/events";

export function Events() {
    return (
        <section id="events" className="bg-surface/30 py-16 sm:py-24 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 max-w-xl">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
                        Stay Updated
                    </span>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                        Latest Events
                    </h2>
                </div>

                <div className="relative group/scroll">
                    <div className="flex overflow-x-auto gap-5 pb-8 no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        {events.map((eventItem) => (
                            <article
                                key={`${eventItem.title}-${eventItem.dateLabel}`}
                                className="group relative flex min-w-[280px] max-w-[320px] flex-col overflow-hidden rounded-2xl border border-border/40 bg-white/80 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 snap-start"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                    <Image
                                        src={eventItem.image}
                                        alt={eventItem.title}
                                        fill
                                        sizes="(max-width: 768px) 280px, 320px"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                    
                                    <div className="absolute left-3 top-3">
                                        <div className="flex flex-col items-center justify-center rounded-xl bg-white/95 px-2.5 py-1.5 text-center shadow-xl backdrop-blur-md">
                                            <span className="text-[10px] font-bold uppercase tracking-tighter text-primary">
                                                {eventItem.monthLabel}
                                            </span>
                                            <span className="text-sm font-black text-text-primary">
                                                {eventItem.dateLabel.split(" ")[0]}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                        <Link
                                            href={`/events/register/${eventItem.slug}`}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-bold text-white shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            Register Now
                                            <ArrowRight01Icon size={14} />
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col p-5">
                                    <div className="mb-2 flex items-center gap-2">
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                                            <span className="h-1 w-1 rounded-full bg-primary" />
                                            {eventItem.location}
                                        </span>
                                    </div>
                                    
                                    <h3 className="mb-2 line-clamp-2 text-base font-bold leading-tight text-text-primary group-hover:text-primary transition-colors">
                                        {eventItem.title}
                                    </h3>

                                    <p className="line-clamp-2 text-[13px] leading-relaxed text-text-secondary/80">
                                        {eventItem.summary}
                                    </p>
                                    
                                    <div className="mt-auto pt-4 flex items-center justify-between">
                                        <Link
                                            href={`/events/register/${eventItem.slug}`}
                                            className="text-[11px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors"
                                        >
                                            View Details
                                        </Link>
                                        <Calendar01Icon size={14} className="text-text-secondary/40" />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Gradient Fades for Scrolling */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-surface/30 to-transparent opacity-0 sm:opacity-100" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-surface/30 to-transparent opacity-0 sm:opacity-100" />
                </div>
            </div>
            
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
