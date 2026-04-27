export type EventItem = {
    slug: string;
    title: string;
    dateLabel: string;
    monthLabel: string;
    summary: string;
    location: string;
    image: string;
};

export const events: EventItem[] = [
    {
        slug: "study-abroad-qa",
        title: "Study Abroad Q&A for Parents and Students",
        dateLabel: "10 May 2026",
        monthLabel: "May",
        summary:
            "Ask experts about admissions, timelines, visas, and scholarships.",
        location: "Accra + Live Stream",
        image:
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    },
    {
        slug: "scholarship-masterclass",
        title: "UK and Canada Scholarship Masterclass",
        dateLabel: "18 May 2026",
        monthLabel: "May",
        summary:
            "Practical tactics to find and win partial or fully funded scholarships.",
        location: "Kumasi Hub",
        image:
            "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
    },
    {
        slug: "visa-bootcamp",
        title: "Visa Interview Bootcamp",
        dateLabel: "02 Jun 2026",
        monthLabel: "Jun",
        summary:
            "Mock interview drills with actionable feedback to improve confidence.",
        location: "Virtual Event",
        image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    },
    {
        slug: "visa-workshop",
        title: "US Student Visa Workshop",
        dateLabel: "15 Jun 2026",
        monthLabel: "Jun",
        summary:
            "Everything you need to know about F-1 visa applications and interviews.",
        location: "Accra Mall",
        image: "/images/visa-workshop.png",
    },
    {
        slug: "research-funding",
        title: "Graduate Research Funding Webinar",
        dateLabel: "22 Jun 2026",
        monthLabel: "Jun",
        summary:
            "Find and apply for research grants and assistantships in STEM fields.",
        location: "Virtual Event",
        image:
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    },
];
