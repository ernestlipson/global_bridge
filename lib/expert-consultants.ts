export type ExpertConsultant = {
    id: string;
    name: string;
    verified: boolean;
    title: string;
    bio: string;
    rating: number;
    reviewCount: number;
    specialties: string[];
    priceUsd: number;
    durationMin: number;
    availability: string;
    imageUrl: string;
    visaTypes: string[];
    destinations: string[];
    /** Lower = higher in "recommended" sort */
    recommendedRank: number;
};

export const visaTypeFilterOptions = ["All", "F-1", "B1/B2", "Tier 4", "H-1B", "Tourist", "Student"] as const;

export const destinationFilterOptions = [
    "All",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Schengen",
] as const;

export type SortOption = "recommended" | "rating" | "price_low" | "price_high";

export const expertConsultants: ExpertConsultant[] = [
    {
        id: "sarah-jenkins",
        name: "Sarah Jenkins",
        verified: true,
        title: "Former US Consular Officer",
        bio: "Twelve years adjudicating F-1 and H-1B cases. Now coaches applicants on credible answers, funding clarity, and refusal recovery.",
        rating: 4.9,
        reviewCount: 128,
        specialties: ["F-1 visas", "Mock interviews", "US specialist"],
        priceUsd: 150,
        durationMin: 45,
        availability: "Available tomorrow",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80",
        visaTypes: ["F-1", "H-1B"],
        destinations: ["United States"],
        recommendedRank: 1,
    },
    {
        id: "david-chen",
        name: "David Chen",
        verified: true,
        title: "Immigration Lawyer",
        bio: "Licensed in UK and Canada student routes. Reviews SOP alignment, gap years, and credibility threads for competitive programmes.",
        rating: 4.8,
        reviewCount: 94,
        specialties: ["UK & Canada", "SOP review", "Student visas"],
        priceUsd: 120,
        durationMin: 45,
        availability: "Available today",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80",
        visaTypes: ["Tier 4", "Student"],
        destinations: ["United Kingdom", "Canada"],
        recommendedRank: 2,
    },
    {
        id: "maria-rodriguez",
        name: "Maria Rodriguez",
        verified: true,
        title: "Student Visa Consultant",
        bio: "Former DSO assistant focusing on US nonimmigrant intent, Spanish-speaking applicants, and bank statement storytelling.",
        rating: 4.9,
        reviewCount: 211,
        specialties: ["US & Spanish routes", "Financial docs", "Mock interviews"],
        priceUsd: 90,
        durationMin: 30,
        availability: "Available today",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80",
        visaTypes: ["F-1", "Student"],
        destinations: ["United States", "Schengen"],
        recommendedRank: 3,
    },
    {
        id: "james-wilson",
        name: "James Wilson",
        verified: true,
        title: "Tourist & Business Visa Expert",
        bio: "Specializes in B1/B2 narratives, employment boundaries abroad, and proving home ties without overstuffed folders.",
        rating: 4.7,
        reviewCount: 76,
        specialties: ["B1/B2", "Home ties", "Interview prep"],
        priceUsd: 80,
        durationMin: 30,
        availability: "Next week",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80",
        visaTypes: ["B1/B2", "Tourist"],
        destinations: ["United States"],
        recommendedRank: 4,
    },
];

export function filterExperts(
    experts: ExpertConsultant[],
    visaType: string,
    destination: string,
    sort: SortOption,
    search: string
): ExpertConsultant[] {
    const q = search.trim().toLowerCase();
    let list = experts.filter((e) => {
        const visaOk =
            visaType === "All" || e.visaTypes.some((v) => v.toLowerCase().includes(visaType.toLowerCase()));
        const destOk =
            destination === "All" || e.destinations.some((d) => d.toLowerCase().includes(destination.toLowerCase()));
        const searchOk =
            !q ||
            e.name.toLowerCase().includes(q) ||
            e.title.toLowerCase().includes(q) ||
            e.bio.toLowerCase().includes(q) ||
            e.specialties.some((s) => s.toLowerCase().includes(q));
        return visaOk && destOk && searchOk;
    });

    list = [...list];
    if (sort === "recommended") {
        list.sort((a, b) => a.recommendedRank - b.recommendedRank);
    } else if (sort === "rating") {
        list.sort((a, b) => b.rating - a.rating);
    } else if (sort === "price_low") {
        list.sort((a, b) => a.priceUsd - b.priceUsd);
    } else if (sort === "price_high") {
        list.sort((a, b) => b.priceUsd - a.priceUsd);
    }
    return list;
}

export function getExpertById(id: string | null | undefined): ExpertConsultant | null {
    if (!id) return null;
    return expertConsultants.find((e) => e.id === id) ?? null;
}
