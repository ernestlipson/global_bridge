export type BlogCategory =
    | "Study abroad"
    | "Visa & immigration"
    | "Scholarships & funding"
    | "Preparation";

export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    /** Cover for listing cards / hero */
    coverImage: string;
    category: BlogCategory;
    publishedAt: string;
    readingMinutes: number;
    paragraphs: string[];
};

export const blogPosts: BlogPost[] = [
    {
        slug: "uk-student-visa-financial-proof",
        title: "UK Student visa: making your financial evidence interview-ready",
        excerpt:
            "How caseworkers read bank statements, sponsorship letters, and timelines—and how to present a clear funding story without gaps.",
        coverImage:
            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop",
        category: "Visa & immigration",
        publishedAt: "2026-03-18",
        readingMinutes: 8,
        paragraphs: [
            "Applicants often focus on hitting a minimum balance on CAS day, but credibility comes from **how** money moved into the account, who owns it, and whether it can realistically cover tuition and living costs for the whole course window you’re claiming.",
            "If a parent or sponsor funds you, a short letter tying their relationship to you, their income source, and why they’re supporting your studies will carry more weight than generic statements. Align dates with payslips, tax documents, or business filings where possible.",
            "Practice explaining large deposits in one or two calm sentences. Consular and visa teams are not trying to trick you—they need a narrative that matches the paperwork. Rehearse with a friend until you can answer without reading from notes.",
        ],
    },
    {
        slug: "first-90-days-studying-abroad",
        title: "Your first 90 days abroad: housing, bank accounts, and staying legal",
        excerpt:
            "A practical checklist for new international students before classes speed up—registration, part-time work rules, and local IDs.",
        coverImage:
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80&auto=format&fit=crop",
        category: "Study abroad",
        publishedAt: "2026-03-04",
        readingMinutes: 6,
        paragraphs: [
            "Before you leave, save offline copies of your lease or hall confirmation, enrollment letter, and insurance. Many countries require a local address for a phone plan or bank appointment; book the bank slot in your first week if appointments are scarce.",
            "Immigration conditions usually spell out work limits and registration steps (police or university). Missing a deadline can affect renewals later, so add calendar reminders the day you land.",
            "Culture shock is normal. Build one routine—grocery run, library hour, or a club meetup—to anchor your week while academics ramp up.",
        ],
    },
    {
        slug: "schengen-vs-national-student-visa",
        title: "Schengen visits vs national student residence: what the stamp really means",
        excerpt:
            "Why a short-stay Schengen visa is not a substitute for a long-term study permit—and how overlaps cause refusals.",
        coverImage:
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80&auto=format&fit=crop",
        category: "Visa & immigration",
        publishedAt: "2026-02-21",
        readingMinutes: 7,
        paragraphs: [
            "A Schengen Type C visa is built for tourism, family visits, or short courses under a defined day limit. Enrolling in a degree program that lasts multiple years requires the **national** route of the country where your school is based.",
            "Overstaying or mixing purposes—like entering as a visitor then attempting to convert onshore without a permitted process—shows up in systems and weakens future applications. Always match your stated purpose to the visa category.",
            "If you plan side travel in Europe, understand when your student residence card allows Schengen movement and when you still need careful entry stamping. Keep copies of enrollment and insurance when crossing borders.",
        ],
    },
    {
        slug: "scholarship-essays-that-get-read",
        title: "Scholarship essays that actually get read past the first paragraph",
        excerpt:
            "Selection panels skim hundreds of files. Concrete goals, costs, and impact beat vague passion every time.",
        coverImage:
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80&auto=format&fit=crop",
        category: "Scholarships & funding",
        publishedAt: "2026-02-08",
        readingMinutes: 5,
        paragraphs: [
            "Open with a single scene: a problem you’ve worked on, a budget you managed, or a community project with measurable outcomes. Then connect it to what you will study and how funding unlocks the next step.",
            "Quote **numbers**: tuition gap, living shortfall, family contribution, other aid. Panels use this to see seriousness and fit with their award size.",
            "Revise for specificity to the funder’s mission. A generic essay pasted across ten schemes is easy to spot; one tailored paragraph referencing their priorities can lift you into the shortlist.",
        ],
    },
    {
        slug: "canada-study-permit-genuine-student",
        title: "Canada study permits and the ‘genuine student’ bar in 2026",
        excerpt:
            "What IRCC-style reviews look for in study plans, prior education, and ties to your home country.",
        coverImage:
            "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80&auto=format&fit=crop",
        category: "Visa & immigration",
        publishedAt: "2026-01-30",
        readingMinutes: 9,
        paragraphs: [
            "Officers assess whether your program fits your history. A sharp pivot—say, arts to aviation—with no bridge story raises questions. Use your SOP to explain skills you’re building and how the credential supports a realistic path.",
            "Ties to home country are not about wealth displays; they’re about reasons you’re likely to comply with visa conditions. Family, property, job offers, or ongoing projects can all be mentioned factually.",
            "Biometrics, medicals, and police certificates have processing windows. Submit complete packages once to avoid cascading delays through term start dates.",
        ],
    },
    {
        slug: "health-insurance-overseas-student",
        title: "Health insurance overseas: what universities require vs what you actually need",
        excerpt:
            "Mandatory campus plans, waivers, travel cover for breaks, and mental health access—sorted in plain language.",
        coverImage:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop",
        category: "Preparation",
        publishedAt: "2026-01-14",
        readingMinutes: 5,
        paragraphs: [
            "Many institutions auto-enroll you in a group plan and bill it with tuition. Check if comparable coverage lets you waive out and what proof they need—sometimes a schedule of benefits isn’t enough.",
            "Travel insurance for the flight and orientation week can differ from the mandatory plan. Read exclusions for sports, winter activities, or trips outside your host country between terms.",
            "Bookmark how to book counseling or GP visits; early setup prevents crisis shopping for care during exams.",
        ],
    },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
    return blogPosts.map((p) => p.slug);
}
