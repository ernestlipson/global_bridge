"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search01Icon } from "hugeicons-react";
import { getUniversities } from "@/features/universities/api/getUniversities";
import { UniversityCard } from "@/features/universities/UniversityCard";
import type { SupportedUniversityCountry, University } from "@/features/universities/types";
import { getRegionsForCountry } from "@/lib/regions";

function normalizeCountryParam(value: string | null): SupportedUniversityCountry | null {
    if (!value) return null;
    const normalized = value.toLowerCase().trim();
    if (normalized === "usa" || normalized === "united states" || normalized === "united states of america") return "USA";
    if (normalized === "canada") return "Canada";
    return null;
}

export function UniversitySearchClient() {
    const searchParams = useSearchParams();
    const initialCountry = normalizeCountryParam(searchParams.get("country"));
    const unsupportedCountry = searchParams.get("country") && !initialCountry ? searchParams.get("country") : null;
    const initialName = searchParams.get("name") || "";
    const hasAutoSearched = useRef(false);

    const [country, setCountry] = useState<SupportedUniversityCountry>(initialCountry || "USA");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [name, setName] = useState(initialName);
    const [universities, setUniversities] = useState<University[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const regions = useMemo(() => getRegionsForCountry(country), [country]);

    const runSearch = useCallback(async (nextCountry = country) => {
        setIsLoading(true);
        setError(null);
        setHasSearched(true);

        try {
            const data = await getUniversities({
                country: nextCountry,
                state,
                city,
                name,
            });
            setUniversities(data);
        } catch (err) {
            setUniversities([]);
            setError(err instanceof Error ? err.message : "Unable to load universities.");
        } finally {
            setIsLoading(false);
        }
    }, [city, country, name, state]);

    useEffect(() => {
        if (unsupportedCountry || hasAutoSearched.current) return;
        hasAutoSearched.current = true;
        void runSearch(initialCountry || country);
    }, [country, initialCountry, runSearch, unsupportedCountry]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        void runSearch();
    };

    return (
        <section className="rounded-xl border border-border bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-dark">University directory</p>
                    <h2 className="mt-1 text-lg font-semibold text-text-primary">Browse universities</h2>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-text-secondary">
                        Search schools in the USA and Canada. State, province, and city filters are included, but may require an upgraded API Ninjas plan.
                    </p>
                    {unsupportedCountry && (
                        <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                            API-backed university results currently support USA and Canada. Pick one below to continue.
                        </p>
                    )}
                </div>
                <span className="w-fit rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary">
                    Server-side API proxy
                </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-3 lg:grid-cols-[160px_190px_minmax(0,1fr)_minmax(0,1fr)_auto]">
                <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-text-primary">Country</label>
                    <select
                        value={country}
                        onChange={(event) => {
                            const nextCountry = event.target.value as SupportedUniversityCountry;
                            setCountry(nextCountry);
                            setState("");
                        }}
                        className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                    >
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                    </select>
                </div>
                <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-text-primary">
                        {country === "USA" ? "State" : "Province"}
                    </label>
                    <select
                        value={state}
                        onChange={(event) => setState(event.target.value)}
                        className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                    >
                        <option value="">Any region</option>
                        {regions.map((region) => (
                            <option key={region.code} value={region.code}>
                                {region.code} - {region.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-text-primary">City</label>
                    <input
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        placeholder="Boston, Toronto..."
                        className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-text-primary">University name</label>
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Harvard, Waterloo..."
                        className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-[23px] inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Search01Icon size={16} />
                    {isLoading ? "Searching" : "Search"}
                </button>
            </form>

            <div className="mt-5">
                {isLoading && (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
                            <div key={item} className="h-[238px] animate-pulse rounded-xl border border-border bg-surface" />
                        ))}
                    </div>
                )}

                {!isLoading && error && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-800">
                        {error}
                    </div>
                )}

                {!isLoading && !error && hasSearched && universities.length === 0 && (
                    <div className="rounded-xl border border-border bg-surface p-5 text-sm text-text-secondary">
                        No universities found. Try searching by country only or using a broader university name.
                    </div>
                )}

                {!isLoading && !error && universities.length > 0 && (
                    <>
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <p className="text-sm font-medium text-text-primary">{universities.length} universities found</p>
                            <p className="text-xs text-text-muted">Results from API Ninjas</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                            {universities.map((university) => (
                                <UniversityCard key={university.id} university={university} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
