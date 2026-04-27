"use client";

import { useMemo, useState } from "react";
import {
    Calendar01Icon,
    SearchVisualIcon,
    Wallet01Icon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";

const scholarships = [
    { name: "Chevening Scholarship", country: "United Kingdom", flag: "🇬🇧", field: "Public Policy", level: "Masters", deadline: "2026-11-05", funding: "Full" as const, amount: "Tuition + stipend" },
    { name: "DAAD EPOS", country: "Germany", flag: "🇩🇪", field: "Engineering", level: "Masters", deadline: "2026-10-18", funding: "Full" as const, amount: "Tuition + living" },
    { name: "Vanier CGS", country: "Canada", flag: "🇨🇦", field: "Health Sciences", level: "PhD", deadline: "2026-09-20", funding: "Full" as const, amount: "CAD 50,000 / year" },
    { name: "Commonwealth Shared", country: "United Kingdom", flag: "🇬🇧", field: "Development Studies", level: "Masters", deadline: "2026-12-01", funding: "Full" as const, amount: "Shared award" },
    { name: "Fulbright Foreign Student", country: "United States", flag: "🇺🇸", field: "Computer Science", level: "Masters", deadline: "2026-08-29", funding: "Full" as const, amount: "Varies by placement" },
    { name: "Australia Awards", country: "Australia", flag: "🇦🇺", field: "Education", level: "Masters", deadline: "2026-09-15", funding: "Full" as const, amount: "Tuition + travel" },
];

function daysUntil(dateStr: string) {
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function ScholarshipsPage() {
    const [query, setQuery] = useState("");
    const [country, setCountry] = useState("All countries");
    const [field, setField] = useState("All fields");

    const filtered = useMemo(() => {
        return scholarships.filter((item) => {
            const matchesQuery =
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.field.toLowerCase().includes(query.toLowerCase());
            const matchesCountry = country === "All countries" || item.country === country;
            const matchesField = field === "All fields" || item.field === field;
            return matchesQuery && matchesCountry && matchesField;
        });
    }, [country, field, query]);

    const soonest = [...scholarships].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())[0];

    return (
        <div className="pb-12">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">Scholarships</h1>
                <p className="mt-1 max-w-xl text-sm text-text-secondary">
                    Filter by country, field, or deadline and keep funding search disciplined.
                </p>
            </div>

            {/* Stats row */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Available</p>
                    <p className="mt-1 text-2xl font-semibold text-text-primary">{scholarships.length}</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Full funding</p>
                    <p className="mt-1 text-2xl font-semibold text-accent">{scholarships.filter((s) => s.funding === "Full").length}</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Countries</p>
                    <p className="mt-1 text-2xl font-semibold text-text-primary">{new Set(scholarships.map((s) => s.country)).size}</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Next deadline</p>
                    <p className="mt-1 text-[15px] font-semibold text-amber-600">{daysUntil(soonest.deadline)} days</p>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
                <div className="space-y-4">
                    {/* Filters */}
                    <div className="flex flex-col gap-3 rounded-xl border border-border bg-white p-4 sm:flex-row sm:items-end">
                        <div className="flex-1">
                            <label className="mb-1 block text-[11px] font-medium text-text-muted">Search</label>
                            <div className="relative">
                                <SearchVisualIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Scholarship or field"
                                    className="h-9 w-full rounded-lg border border-border bg-white pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-44">
                            <label className="mb-1 block text-[11px] font-medium text-text-muted">Country</label>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                            >
                                {["All countries", ...Array.from(new Set(scholarships.map((s) => s.country)))].map((opt) => (
                                    <option key={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full sm:w-44">
                            <label className="mb-1 block text-[11px] font-medium text-text-muted">Field</label>
                            <select
                                value={field}
                                onChange={(e) => setField(e.target.value)}
                                className="h-9 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                            >
                                {["All fields", ...Array.from(new Set(scholarships.map((s) => s.field)))].map((opt) => (
                                    <option key={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Scholarship list */}
                    <div className="space-y-2.5">
                        {filtered.map((item) => {
                            const days = daysUntil(item.deadline);
                            const urgent = days <= 90;
                            return (
                                <article
                                    key={item.name}
                                    className="rounded-xl border border-border bg-white p-4 sm:p-5"
                                >
                                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex items-start gap-3">
                                            <span className="mt-0.5 text-xl">{item.flag}</span>
                                            <div className="min-w-0">
                                                <h2 className="text-[14px] font-semibold text-text-primary">{item.name}</h2>
                                                <p className="mt-0.5 text-xs text-text-secondary">
                                                    {item.country} &middot; {item.field} &middot; {item.level}
                                                </p>
                                                <p className="mt-0.5 text-xs text-text-muted">{item.amount}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
                                            <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-light px-2.5 py-1 text-xs font-medium text-accent-dark">
                                                <Wallet01Icon size={12} />
                                                {item.funding}
                                            </span>
                                            <span className={cn(
                                                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium",
                                                urgent ? "bg-amber-50 text-amber-700" : "bg-surface text-text-secondary"
                                            )}>
                                                <Calendar01Icon size={12} />
                                                {days}d left
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}

                        {filtered.length === 0 && (
                            <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white py-16 text-center">
                                <Wallet01Icon size={28} className="text-text-muted" />
                                <p className="text-sm text-text-secondary">No scholarships match your filters.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">Funding strategy</p>
                        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-secondary">
                            <li>Prioritize full awards first if tuition is your biggest blocker.</li>
                            <li>Apply to at least 3 scholarships to spread risk.</li>
                            <li>Start essays 6 weeks before deadline, not 6 days.</li>
                        </ul>
                    </div>
                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">Deadline awareness</p>
                        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-secondary">
                            <li>Build your calendar around the earliest deadline, not the easiest form.</li>
                            <li>Some awards close for Ghanaian applicants before the global deadline.</li>
                            <li>Referee letters often take 2 weeks to arrange.</li>
                        </ul>
                    </div>
                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">By the numbers</p>
                        <div className="mt-3 space-y-2.5">
                            {["United Kingdom", "Canada", "Germany", "United States", "Australia"].map((c) => {
                                const count = scholarships.filter((s) => s.country === c).length;
                                return count > 0 ? (
                                    <div key={c} className="flex items-center justify-between text-xs">
                                        <span className="text-text-secondary">{c}</span>
                                        <span className="font-semibold text-text-primary">{count}</span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
