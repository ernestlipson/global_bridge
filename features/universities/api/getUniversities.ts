import type { University, UniversitySearchResponse, SupportedUniversityCountry } from "@/features/universities/types";

export async function getUniversities(params: {
    country: SupportedUniversityCountry;
    state?: string;
    city?: string;
    name?: string;
}) {
    const searchParams = new URLSearchParams();
    searchParams.set("country", params.country);
    if (params.state?.trim()) searchParams.set("state", params.state.trim());
    if (params.city?.trim()) searchParams.set("city", params.city.trim());
    if (params.name?.trim()) searchParams.set("name", params.name.trim());

    const response = await fetch(`/api/universities?${searchParams.toString()}`);
    const payload = (await response.json()) as UniversitySearchResponse;

    if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load universities.");
    }

    return payload.data as University[];
}
