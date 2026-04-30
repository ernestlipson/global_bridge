import { NextRequest } from "next/server";
import { fetchUniversitiesFromApiNinjas } from "@/services/api-ninjas-university.service";
import type { SupportedUniversityCountry } from "@/features/universities/types";

export const dynamic = "force-dynamic";

const supportedCountries = new Set(["USA", "Canada"]);

function normalizeCountry(value: string | null): SupportedUniversityCountry | null {
    if (!value) return null;
    const normalized = value.trim().toLowerCase();
    if (normalized === "usa" || normalized === "united states" || normalized === "united states of america") return "USA";
    if (normalized === "canada") return "Canada";
    return null;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const country = normalizeCountry(searchParams.get("country"));

    if (!searchParams.get("country")) {
        return Response.json(
            { success: false, message: "Country is required. Supported countries are USA and Canada." },
            { status: 400 }
        );
    }

    if (!country || !supportedCountries.has(country)) {
        return Response.json(
            { success: false, message: "Unsupported country. API university search currently supports USA and Canada." },
            { status: 400 }
        );
    }

    const filters = {
        country,
        state: searchParams.get("state")?.trim() || undefined,
        city: searchParams.get("city")?.trim() || undefined,
        name: searchParams.get("name")?.trim() || undefined,
    };

    try {
        const data = await fetchUniversitiesFromApiNinjas({
            ...filters,
            limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
        });

        return Response.json({
            success: true,
            data,
            meta: {
                count: data.length,
                source: "api_ninjas",
                filters,
            },
        });
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Unable to fetch universities right now.",
            },
            { status: 500 }
        );
    }
}
