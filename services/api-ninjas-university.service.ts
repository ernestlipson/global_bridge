import { getRegionName } from "@/lib/regions";
import type { SupportedUniversityCountry, University, UniversitySearchParams } from "@/features/universities/types";

const API_NINJAS_UNIVERSITY_URL = "https://api.api-ninjas.com/v1/university";

export interface ApiNinjasUniversityResponse {
    name?: string;
    degree_types?: string[];
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    county?: string;
    timezone?: string;
    latitude?: number | string;
    longitude?: number | string;
    phone?: string;
    email?: string;
    website?: string;
    institution_type?: string;
    years?: string;
    enrollment?: number | string;
    student_faculty_ratio?: string;
    tuition?: number | string;
}

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function toNumber(value: number | string | undefined | null) {
    if (typeof value === "number") return Number.isFinite(value) ? value : null;
    if (!value) return null;
    const parsed = Number(String(value).replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
}

function normalizeWebsite(value: string | undefined) {
    if (!value) return null;
    const trimmed = value.trim();
    if (!trimmed) return null;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function getLogoUrl(website: string | null) {
    if (!website) return null;

    try {
        const domain = new URL(website).hostname.replace(/^www\./, "");
        return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
    } catch {
        return null;
    }
}

function normalizeCountry(value: string | undefined): SupportedUniversityCountry {
    return value?.trim().toLowerCase() === "canada" ? "Canada" : "USA";
}

function normalizeUniversity(item: ApiNinjasUniversityResponse): University {
    const country = normalizeCountry(item.country);
    const regionCode = item.state?.trim() || null;
    const city = item.city?.trim() || null;
    const name = item.name?.trim() || "Unnamed university";
    const tuition = toNumber(item.tuition);
    const website = normalizeWebsite(item.website);

    return {
        id: slugify([name, country, city, regionCode].filter(Boolean).join("-")),
        name,
        country,
        regionCode,
        regionName: getRegionName(country, regionCode),
        city,
        website,
        logoUrl: getLogoUrl(website),
        latitude: toNumber(item.latitude),
        longitude: toNumber(item.longitude),
        tuitionMin: tuition,
        tuitionMax: tuition,
        enrollment: toNumber(item.enrollment),
        source: "api_ninjas",
    };
}

function buildApiError(status: number, body: unknown) {
    const message =
        typeof body === "object" && body && "error" in body && typeof body.error === "string"
            ? body.error
            : typeof body === "object" && body && "message" in body && typeof body.message === "string"
                ? body.message
                : `API Ninjas request failed with status ${status}.`;

    if (/premium|upgrade|plan|subscription/i.test(message)) {
        return new Error("Advanced location filtering may require an upgraded API Ninjas plan. Try searching by country or university name.");
    }

    return new Error(message);
}

export async function fetchUniversitiesFromApiNinjas(params: UniversitySearchParams): Promise<University[]> {
    const apiKey = process.env.API_NINJAS_KEY;
    if (!apiKey) {
        throw new Error("API_NINJAS_KEY is missing. Add it to .env.local to enable university search.");
    }

    const searchParams = new URLSearchParams();
    searchParams.set("country", params.country);
    if (params.name?.trim()) searchParams.set("name", params.name.trim());
    if (params.state?.trim()) searchParams.set("state", params.state.trim());
    if (params.city?.trim()) searchParams.set("city", params.city.trim());
    if (params.limit) searchParams.set("limit", String(params.limit));

    const response = await fetch(`${API_NINJAS_UNIVERSITY_URL}?${searchParams.toString()}`, {
        headers: {
            "X-Api-Key": apiKey,
        },
        cache: "no-store",
    });

    const body = await response.json().catch(() => null);

    if (!response.ok) {
        throw buildApiError(response.status, body);
    }

    if (!Array.isArray(body)) {
        throw new Error("API Ninjas returned an unexpected university response.");
    }

    return body.map((item) => normalizeUniversity(item as ApiNinjasUniversityResponse));
}
