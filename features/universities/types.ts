export type SupportedUniversityCountry = "USA" | "Canada";

export interface University {
    id: string;
    name: string;
    country: string;
    regionCode?: string | null;
    regionName?: string | null;
    city?: string | null;
    website?: string | null;
    logoUrl?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    tuitionMin?: number | null;
    tuitionMax?: number | null;
    enrollment?: number | null;
    source: "api_ninjas";
}

export interface UniversitySearchParams {
    country: SupportedUniversityCountry;
    state?: string;
    city?: string;
    name?: string;
    limit?: number;
}

export interface UniversitySearchResponse {
    success: boolean;
    data: University[];
    meta?: {
        count: number;
        source: "api_ninjas";
        filters: {
            country: SupportedUniversityCountry;
            state?: string;
            city?: string;
            name?: string;
        };
    };
    message?: string;
}
