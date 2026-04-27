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

export const visaCountries: { value: VisaCountry; label: string; flag: string }[] = [
    { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
    { value: "usa", label: "United States", flag: "🇺🇸" },
    { value: "canada", label: "Canada", flag: "🇨🇦" },
    { value: "australia", label: "Australia", flag: "🇦🇺" },
    { value: "germany", label: "Germany", flag: "🇩🇪" },
];

export const interviewModes: { value: InterviewMode; label: string; questions: number; duration: string }[] = [
    { value: "quick", label: "Quick Practice", questions: 5, duration: "~10 min" },
    { value: "standard", label: "Standard", questions: 10, duration: "~20 min" },
    { value: "full", label: "Full Simulation", questions: 15, duration: "~35 min" },
];

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
