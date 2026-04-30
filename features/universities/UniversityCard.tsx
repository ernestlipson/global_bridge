"use client";

import { useState } from "react";
import Image from "next/image";
import type { University } from "@/features/universities/types";
import { Location01Icon, Link01Icon, StudentIcon } from "hugeicons-react";

function formatCurrency(value?: number | null) {
    if (typeof value !== "number") return null;
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
}

function formatEnrollment(value?: number | null) {
    if (typeof value !== "number") return "Enrollment not available";
    return `${new Intl.NumberFormat("en-US").format(value)} students`;
}

export function UniversityCard({ university }: { university: University }) {
    const [logoFailed, setLogoFailed] = useState(false);
    const location = [university.city, university.regionCode || university.regionName, university.country]
        .filter(Boolean)
        .join(", ");
    const tuition =
        university.tuitionMin && university.tuitionMax && university.tuitionMin !== university.tuitionMax
            ? `${formatCurrency(university.tuitionMin)} - ${formatCurrency(university.tuitionMax)}`
            : formatCurrency(university.tuitionMin);

    return (
        <article className="flex min-h-[238px] flex-col rounded-xl border border-border bg-white p-4 transition-shadow hover:shadow-md">
            <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface">
                    {university.logoUrl && !logoFailed ? (
                        <Image
                            src={university.logoUrl}
                            alt=""
                            width={32}
                            height={32}
                            unoptimized
                            className="h-8 w-8 object-contain"
                            onError={() => setLogoFailed(true)}
                        />
                    ) : (
                        <span className="text-sm font-semibold text-primary">
                            {university.name.slice(0, 1).toUpperCase()}
                        </span>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-semibold leading-snug text-text-primary">{university.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-[13px] text-text-secondary">
                        <Location01Icon size={14} className="shrink-0 text-text-muted" />
                        {location || "Location not available"}
                    </p>
                </div>
            </div>

            <div className="mt-4 grid gap-2 text-[13px] text-text-secondary">
                <div className="rounded-lg bg-surface px-3 py-2">
                    <p className="text-[11px] font-medium uppercase tracking-[0.03em] text-text-muted">Tuition</p>
                    <p className="mt-1 font-medium text-text-primary">{tuition || "Tuition not available"}</p>
                </div>
                <div className="rounded-lg bg-surface px-3 py-2">
                    <p className="text-[11px] font-medium uppercase tracking-[0.03em] text-text-muted">Enrollment</p>
                    <p className="mt-1 flex items-center gap-1.5 font-medium text-text-primary">
                        <StudentIcon size={14} className="text-text-muted" />
                        {formatEnrollment(university.enrollment)}
                    </p>
                </div>
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                {university.website ? (
                    <a
                        href={university.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-w-0 items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark"
                    >
                        <Link01Icon size={14} className="shrink-0" />
                        <span className="truncate">Visit website</span>
                    </a>
                ) : (
                    <p className="text-sm text-text-muted">Website not available</p>
                )}
                <span className="shrink-0 rounded-md bg-accent-light px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.03em] text-accent-dark">
                    API Ninjas
                </span>
            </div>
        </article>
    );
}
