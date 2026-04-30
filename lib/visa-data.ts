export interface VisaQuestion {
    id: number;
    question: string;
    category: "personal" | "academic" | "financial" | "intent" | "ties";
    difficulty: "easy" | "medium" | "hard";
    tips: string;
}

export interface InterviewFeedback {
    confidenceScore: number;
    clarityScore: number;
    overallScore: number;
    verdict: "strong" | "adequate" | "weak";
    strengths: string[];
    redFlags: string[];
    suggestions: string[];
    sampleAnswer: string;
}

export type InterviewMode = "quick" | "standard" | "full";
export type VisaCountry = "uk" | "usa" | "canada" | "australia" | "germany";

export const visaCountries: { value: VisaCountry; label: string; flagUrl: string }[] = [
    { value: "uk", label: "United Kingdom", flagUrl: "https://cdn.countryflags.com/thumbs/united-kingdom/flag-square-500.png" },
    { value: "usa", label: "United States", flagUrl: "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-500.png" },
    { value: "canada", label: "Canada", flagUrl: "https://cdn.countryflags.com/thumbs/canada/flag-square-500.png" },
    { value: "australia", label: "Australia", flagUrl: "https://cdn.countryflags.com/thumbs/australia/flag-square-500.png" },
    { value: "germany", label: "Germany", flagUrl: "https://cdn.countryflags.com/thumbs/germany/flag-square-500.png" },
];

export const interviewModes: { value: InterviewMode; label: string; questions: number; duration: string }[] = [
    { value: "quick", label: "Quick Practice", questions: 5, duration: "~10 min" },
    { value: "standard", label: "Standard", questions: 10, duration: "~20 min" },
    { value: "full", label: "Full Simulation", questions: 15, duration: "~35 min" },
];

export type LiveInterviewerPersona = "strict" | "supportive" | "neutral";

export const liveInterviewerPersonas: { value: LiveInterviewerPersona; label: string }[] = [
    { value: "strict", label: "Strict & direct (realistic)" },
    { value: "supportive", label: "Supportive coach" },
    { value: "neutral", label: "Neutral embassy style" },
];

export const liveSessionDurations: { value: string; label: string }[] = [
    { value: "15", label: "Standard (15 mins)" },
    { value: "25", label: "Extended (25 mins)" },
    { value: "35", label: "Deep dive (35 mins)" },
];

export const liveInterviewFocusAreas: { id: string; label: string }[] = [
    { id: "academic", label: "Academic intent" },
    { id: "financial", label: "Financial ability" },
    { id: "ties", label: "Home ties" },
];

/** AI mock interview hub: country + visa category (F-1, Tier 4, B1/B2, etc.) */
export interface VisaInterviewCategory {
    id: string;
    country: VisaCountry;
    /** Card heading, e.g. "USA F-1 Student Visa" */
    cardTitle: string;
    /** Short label for tables and chips */
    tableLabel: string;
    description: string;
    durationLine: string;
    detailLine: string;
    popular?: boolean;
}

export const visaInterviewCategories: VisaInterviewCategory[] = [
    {
        id: "usa-f1",
        country: "usa",
        cardTitle: "USA F-1 Student Visa",
        tableLabel: "USA F-1 Student",
        description:
            "Comprehensive interview practice focusing on academic intent, financial ability, and home ties.",
        durationLine: "15–20 minutes",
        detailLine: "Personalized feedback report",
        popular: true,
    },
    {
        id: "uk-tier4",
        country: "uk",
        cardTitle: "UK Student (Tier 4)",
        tableLabel: "UK Tier 4 Student",
        description:
            "Credibility interview practice focusing on course choice, institution, and funding.",
        durationLine: "10–15 minutes",
        detailLine: "Focus on credibility",
    },
    {
        id: "usa-b2",
        country: "usa",
        cardTitle: "USA B1/B2 Tourist",
        tableLabel: "USA B1/B2 Tourist",
        description:
            "Practice demonstrating strong home ties and clear, temporary intent for your visit.",
        durationLine: "5–10 minutes",
        detailLine: "Focus on intent and ties",
    },
];

export interface PreviousSessionRow {
    id: string;
    categoryId: string;
    dateLabel: string;
    score: number;
}

/** Seed rows for the Previous Sessions table (demo data). */
export const demoPreviousSessions: PreviousSessionRow[] = [
    { id: "demo-1", categoryId: "usa-f1", dateLabel: "Oct 24, 2023", score: 85 },
    { id: "demo-2", categoryId: "usa-f1", dateLabel: "Oct 18, 2023", score: 62 },
    { id: "demo-3", categoryId: "uk-tier4", dateLabel: "Oct 10, 2023", score: 91 },
];

export function getVisaInterviewCategoryById(id: string): VisaInterviewCategory | undefined {
    return visaInterviewCategories.find((c) => c.id === id);
}

export const visaQuestions: VisaQuestion[] = [
    {
        id: 1,
        question: "Why do you want to study abroad?",
        category: "intent",
        difficulty: "easy",
        tips: "Be specific about your academic and career goals. Avoid generic answers like 'better life'.",
    },
    {
        id: 2,
        question: "Why did you choose this particular university and program?",
        category: "academic",
        difficulty: "medium",
        tips: "Show you've researched the program. Mention specific faculty, curriculum, or ranking.",
    },
    {
        id: 3,
        question: "How will you fund your education and living expenses?",
        category: "financial",
        difficulty: "hard",
        tips: "Be clear about funding sources — personal savings, family, scholarships, or loans.",
    },
    {
        id: 4,
        question: "What are your plans after completing your studies?",
        category: "intent",
        difficulty: "hard",
        tips: "Show strong ties to your home country. Mention career plans in Ghana.",
    },
    {
        id: 5,
        question: "Tell me about your academic background.",
        category: "academic",
        difficulty: "easy",
        tips: "Summarize your degree, GPA, and relevant achievements clearly.",
    },
    {
        id: 6,
        question: "Do you have any family members living in the destination country?",
        category: "ties",
        difficulty: "medium",
        tips: "Be honest. If yes, explain their status. If no, simply say so.",
    },
    {
        id: 7,
        question: "Have you ever been refused a visa before?",
        category: "personal",
        difficulty: "hard",
        tips: "Be truthful. If yes, explain what has changed since then.",
    },
    {
        id: 8,
        question: "Who is sponsoring your education and what do they do?",
        category: "financial",
        difficulty: "medium",
        tips: "Provide clear details about your sponsor's occupation and financial capacity.",
    },
    {
        id: 9,
        question: "Why didn't you choose to study this program in Ghana?",
        category: "intent",
        difficulty: "hard",
        tips: "Focus on program availability, quality, and career advantages — not criticizing Ghana.",
    },
    {
        id: 10,
        question: "What is your current job or what have you been doing since graduation?",
        category: "personal",
        difficulty: "easy",
        tips: "Explain your activities clearly. Gaps are okay if you can justify them.",
    },
    {
        id: 11,
        question: "How much is your tuition fee and have you paid any deposits?",
        category: "financial",
        difficulty: "medium",
        tips: "Know the exact figures. Mentioning deposits shows commitment.",
    },
    {
        id: 12,
        question: "What ties do you have to Ghana that will bring you back?",
        category: "ties",
        difficulty: "hard",
        tips: "Mention family, property, job offers, or business plans in Ghana.",
    },
    {
        id: 13,
        question: "Have you researched the cost of living in your destination city?",
        category: "financial",
        difficulty: "medium",
        tips: "Know approximate rent, food, and transport costs for the specific city.",
    },
    {
        id: 14,
        question: "Do you plan to work while studying?",
        category: "intent",
        difficulty: "medium",
        tips: "Know the visa work rules. Show that work is supplementary, not primary.",
    },
    {
        id: 15,
        question: "How did you hear about this university?",
        category: "academic",
        difficulty: "easy",
        tips: "Be genuine — mention agents, online research, alumni recommendations, etc.",
    },
];

/**
 * Generate dummy AI feedback for a given answer.
 * In production, this would call the OpenAI API.
 */
export function generateDummyFeedback(
    questionId: number,
    answer: string
): InterviewFeedback {
    const wordCount = answer.trim().split(/\s+/).length;
    const hasSpecifics = /university|program|degree|career|ghana|family|job|scholarship/i.test(answer);
    const isDetailed = wordCount > 30;
    const isVague = wordCount < 15;

    // Simulate scoring
    let confidenceScore = Math.min(95, Math.max(25, 40 + wordCount * 1.2 + (hasSpecifics ? 20 : 0)));
    let clarityScore = Math.min(95, Math.max(20, 35 + wordCount * 1.0 + (isDetailed ? 15 : 0)));
    const overallScore = Math.round((confidenceScore + clarityScore) / 2);

    confidenceScore = Math.round(confidenceScore);
    clarityScore = Math.round(clarityScore);

    const strengths: string[] = [];
    const redFlags: string[] = [];
    const suggestions: string[] = [];

    if (isDetailed) strengths.push("Your answer provides good detail and context.");
    if (hasSpecifics) strengths.push("You mentioned specific names and facts — this builds credibility.");
    if (wordCount > 20) strengths.push("Good length — not too short, not too rambling.");

    if (isVague) {
        redFlags.push("Answer is too short. Visa officers may see this as evasive.");
        suggestions.push("Expand your answer with specific examples and details.");
    }
    if (!hasSpecifics) {
        redFlags.push("Answer lacks specific details (university name, program, career plans).");
        suggestions.push("Mention the specific university, program name, and how it connects to your career.");
    }
    if (wordCount > 80) {
        redFlags.push("Answer may be too long — visa officers prefer concise responses.");
        suggestions.push("Trim your answer to the key points. Aim for 2-3 sentences.");
    }

    if (strengths.length === 0) strengths.push("You attempted to answer the question directly.");
    if (suggestions.length === 0) suggestions.push("Consider adding a personal touch — mention a specific experience.");

    const verdict: InterviewFeedback["verdict"] =
        overallScore >= 70 ? "strong" : overallScore >= 45 ? "adequate" : "weak";

    const sampleAnswer =
        "I want to study a Master's in Data Science at the University of Manchester because of their strong industry partnerships and cutting-edge AI research. My career goal is to return to Ghana and work in fintech, where data science skills are increasingly in demand. This program specifically offers modules in financial machine learning which directly aligns with my plans.";

    return {
        confidenceScore,
        clarityScore,
        overallScore,
        verdict,
        strengths,
        redFlags,
        suggestions,
        sampleAnswer,
    };
}

/** Builds placeholder results for viewing a saved session row at a fixed score. */
export function buildPreviewSessionResults(overallScore: number): {
    question: VisaQuestion;
    answer: string;
    feedback: InterviewFeedback;
}[] {
    const picks = visaQuestions.slice(0, 4);
    return picks.map((question) => {
        const fb = generateDummyFeedback(question.id, "Saved session preview.");
        return {
            question,
            answer: "Answer on file for this session.",
            feedback: {
                ...fb,
                overallScore,
                confidenceScore: overallScore,
                clarityScore: overallScore,
            },
        };
    });
}
