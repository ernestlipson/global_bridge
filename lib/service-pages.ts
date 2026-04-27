export type ServicePage = {
    slug: string;
    title: string;
    tagline: string;
    summary: string;
    highlights: string[];
};

export const servicePages: ServicePage[] = [
    {
        slug: "ai-visa-interview-prep",
        title: "AI Visa Interview Prep",
        tagline: "Practice smart. Answer with confidence.",
        summary:
            "Prepare for embassy interviews with realistic mock questions, instant feedback, and confidence scoring tailored to your profile and destination.",
        highlights: [
            "Mock interview simulations by country",
            "Red flag detection and answer coaching",
            "Confidence and clarity scoring",
        ],
    },
    {
        slug: "university-matching",
        title: "University Matching",
        tagline: "Find schools that truly fit.",
        summary:
            "Get university recommendations based on budget, academic profile, course preference, and career goals, then compare options in one place.",
        highlights: [
            "Profile-based university shortlist",
            "Tuition and acceptance comparison",
            "Country and course fit insights",
        ],
    },
    {
        slug: "transcript-evaluation",
        title: "Transcript Evaluation",
        tagline: "Understand your eligibility early.",
        summary:
            "Upload your transcript to get conversion insights, eligibility indicators, and guidance on how to strengthen weak points before applying.",
        highlights: [
            "Academic profile breakdown",
            "GPA and credential interpretation",
            "Program eligibility pointers",
        ],
    },
    {
        slug: "scholarship-finder",
        title: "Scholarship Finder",
        tagline: "Funding opportunities made clear.",
        summary:
            "Discover scholarships that match your program and profile, with practical filtering for country, level, value, and deadlines.",
        highlights: [
            "Personalized scholarship discovery",
            "Deadline and requirement tracking",
            "Affordability-focused recommendations",
        ],
    },
    {
        slug: "sop-cv-builder",
        title: "SOP & CV Builder",
        tagline: "Write documents that stand out.",
        summary:
            "Build strong, application-ready SOPs and CVs with guided structure, AI suggestions, and export-ready formatting.",
        highlights: [
            "Guided SOP structure by goal",
            "Academic CV formatting support",
            "Review-ready export workflow",
        ],
    },
    {
        slug: "financial-guidance",
        title: "Financial Guidance",
        tagline: "Plan your budget with clarity.",
        summary:
            "Estimate study costs, compare destination affordability, and map practical funding options before making final decisions.",
        highlights: [
            "Cost-of-study planning tools",
            "Currency and budget calculators",
            "Loan and funding strategy tips",
        ],
    },
    {
        slug: "visa-success-system",
        title: "Visa Success System",
        tagline: "Maximize approval readiness.",
        summary:
            "Track your visa preparation with document checklists, financial proof guidance, and risk indicators to improve approval confidence.",
        highlights: [
            "Country-specific document checklists",
            "Financial proof planning",
            "Readiness and risk review",
        ],
    },
];
