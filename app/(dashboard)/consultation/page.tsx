"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ConsultationBookingWizard } from "@/components/consultation/ConsultationBookingWizard";
import { cn } from "@/lib/utils";
import {
    destinationFilterOptions,
    expertConsultants,
    filterExperts,
    type ExpertConsultant,
    type SortOption,
    visaTypeFilterOptions,
} from "@/lib/expert-consultants";
import {
    ArrowRight01Icon,
    Calendar01Icon,
    Clock01Icon,
    HonourStarIcon,
    Search01Icon,
    Tick02Icon,
} from "hugeicons-react";

const sortLabels: { value: SortOption; label: string }[] = [
    { value: "recommended", label: "Recommended" },
    { value: "rating", label: "Highest rated" },
    { value: "price_low", label: "Price: low to high" },
    { value: "price_high", label: "Price: high to low" },
];

type ConsultTab = "experts" | "book";

function ExpertCard({
    expert,
    onBook,
}: {
    expert: ExpertConsultant;
    onBook: (e: ExpertConsultant) => void;
}) {
    return (
        <article className="rounded-xl border border-border bg-white p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-5">
                <div className="flex shrink-0 gap-3 lg:flex-col lg:items-start">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-surface">
                        <Image
                            src={expert.imageUrl}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="64px"
                        />
                        <span
                            className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-accent"
                            title="Online"
                            aria-hidden
                        />
                    </div>
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                            <h2 className="text-[15px] font-semibold text-text-primary">{expert.name}</h2>
                            {expert.verified && (
                                <span className="inline-flex items-center gap-0.5 text-primary" title="Verified expert">
                                    <Tick02Icon size={15} strokeWidth={2} />
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-1 text-[12px] text-text-secondary">
                            <HonourStarIcon size={14} className="text-warning" />
                            <span className="font-semibold text-text-primary">{expert.rating.toFixed(1)}</span>
                            <span className="text-text-muted">({expert.reviewCount})</span>
                        </div>
                    </div>
                    <p className="mt-0.5 text-[13px] font-medium text-primary">{expert.title}</p>
                    <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">{expert.bio}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {expert.specialties.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md bg-primary-50 px-2 py-0.5 text-[11px] font-medium text-primary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex shrink-0 flex-col justify-center border-t border-border pt-4 lg:w-[200px] lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                    <p className="text-[15px] font-semibold text-text-primary">
                        ${expert.priceUsd}{" "}
                        <span className="text-[12px] font-normal text-text-muted">/ {expert.durationMin} min</span>
                    </p>
                    <button
                        type="button"
                        onClick={() => onBook(expert)}
                        className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
                    >
                        Book session
                        <ArrowRight01Icon size={15} />
                    </button>
                    <p className="mt-2 flex items-center gap-1.5 text-[11px] text-text-muted">
                        <Clock01Icon size={12} className="shrink-0" />
                        {expert.availability}
                    </p>
                </div>
            </div>
        </article>
    );
}

export default function ConsultationPage() {
    const [tab, setTab] = useState<ConsultTab>("experts");
    const [selectedExpert, setSelectedExpert] = useState<ExpertConsultant | null>(null);

    const [visaType, setVisaType] = useState<string>("All");
    const [destination, setDestination] = useState<string>("All");
    const [sort, setSort] = useState<SortOption>("recommended");
    const [search, setSearch] = useState("");

    const filtered = useMemo(
        () => filterExperts(expertConsultants, visaType, destination, sort, search),
        [visaType, destination, sort, search]
    );

    function handleBookExpert(expert: ExpertConsultant) {
        setSelectedExpert(expert);
        setTab("book");
    }

    function handleTab(next: ConsultTab) {
        setTab(next);
        if (next === "experts") {
            /* keep selectedExpert so returning to Book preserves choice */
        }
    }

    return (
        <div className="pb-10">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-text-primary">Book consultation</h1>
                    <p className="mt-1 max-w-2xl text-[13px] leading-snug text-text-secondary">
                        Choose an expert and complete your booking, or use standard packages without selecting a consultant.
                    </p>
                </div>
                <Link
                    href="/consultation/bookings"
                    className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-border bg-white px-3 text-sm font-medium text-text-primary transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                    <Calendar01Icon size={16} />
                    My bookings
                </Link>
            </div>

            {/* Tabs */}
            <div className="mb-5 flex flex-wrap gap-2 rounded-xl border border-border bg-surface/80 p-1">
                <button
                    type="button"
                    onClick={() => handleTab("experts")}
                    className={cn(
                        "rounded-lg px-4 py-2 text-[13px] font-medium transition-colors",
                        tab === "experts"
                            ? "bg-white text-primary ring-1 ring-border"
                            : "text-text-secondary hover:text-text-primary"
                    )}
                >
                    Choose expert
                </button>
                <button
                    type="button"
                    onClick={() => handleTab("book")}
                    className={cn(
                        "rounded-lg px-4 py-2 text-[13px] font-medium transition-colors",
                        tab === "book"
                            ? "bg-white text-primary ring-1 ring-border"
                            : "text-text-secondary hover:text-text-primary"
                    )}
                >
                    Book session
                </button>
            </div>

            {tab === "experts" && (
                <>
                    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-border bg-white p-3 sm:flex-row sm:flex-wrap sm:items-end">
                        <label className="flex min-w-[130px] flex-1 flex-col gap-1">
                            <span className="text-[11px] font-medium text-text-muted">Visa type</span>
                            <select
                                value={visaType}
                                onChange={(e) => setVisaType(e.target.value)}
                                className="h-9 rounded-lg border border-border bg-white px-2.5 text-[13px] text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                            >
                                {visaTypeFilterOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="flex min-w-[130px] flex-1 flex-col gap-1">
                            <span className="text-[11px] font-medium text-text-muted">Destination</span>
                            <select
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="h-9 rounded-lg border border-border bg-white px-2.5 text-[13px] text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                            >
                                {destinationFilterOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="flex min-w-[140px] flex-1 flex-col gap-1">
                            <span className="text-[11px] font-medium text-text-muted">Sort by</span>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value as SortOption)}
                                className="h-9 rounded-lg border border-border bg-white px-2.5 text-[13px] text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                            >
                                {sortLabels.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <div className="relative min-w-[200px] flex-[2]">
                            <Search01Icon
                                size={16}
                                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted"
                            />
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or keyword..."
                                className="h-9 w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-[13px] text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {filtered.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-border bg-surface/50 px-4 py-10 text-center text-[13px] text-text-secondary">
                                No experts match your filters. Try clearing search or choosing &quot;All&quot; for visa type and destination.
                            </div>
                        ) : (
                            filtered.map((expert) => (
                                <ExpertCard key={expert.id} expert={expert} onBook={handleBookExpert} />
                            ))
                        )}
                    </div>

                    <p className="mt-6 text-center text-[12px] text-text-muted">
                        Already know what you need?{" "}
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedExpert(null);
                                setTab("book");
                            }}
                            className="font-medium text-primary hover:text-primary-dark"
                        >
                            Book with standard packages (no expert)
                        </button>
                    </p>
                </>
            )}

            {tab === "book" && (
                <div className="rounded-xl border border-border bg-surface/40 p-4 sm:p-6">
                    {!selectedExpert && (
                        <div className="mb-4 rounded-lg border border-border bg-primary-50/50 px-4 py-3 text-[13px] text-text-secondary">
                            <span className="font-medium text-text-primary">No expert selected.</span> Pricing uses standard GHS packages.{" "}
                            <button
                                type="button"
                                className="font-medium text-primary hover:text-primary-dark"
                                onClick={() => setTab("experts")}
                            >
                                Pick an expert
                            </button>{" "}
                            to lock in their rate and session length.
                        </div>
                    )}
                    {selectedExpert && (
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-primary/20 bg-primary-50/60 px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border bg-white">
                                    <Image
                                        src={selectedExpert.imageUrl}
                                        alt=""
                                        fill
                                        className="object-cover"
                                        sizes="40px"
                                    />
                                </div>
                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">Consultant</p>
                                    <p className="text-sm font-semibold text-text-primary">{selectedExpert.name}</p>
                                    <p className="text-[12px] text-primary">
                                        ${selectedExpert.priceUsd} USD · {selectedExpert.durationMin} min
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setTab("experts")}
                                className="text-[13px] font-medium text-primary hover:text-primary-dark"
                            >
                                Change expert
                            </button>
                        </div>
                    )}
                    <ConsultationBookingWizard
                        key={selectedExpert?.id ?? "standard"}
                        expert={selectedExpert}
                        embedded
                        onNavigateExperts={() => setTab("experts")}
                        onResetBooking={() => setSelectedExpert(null)}
                    />
                </div>
            )}
        </div>
    );
}
