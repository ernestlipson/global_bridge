import { universities, type University } from "./university-data";

export interface UserProfile {
    destination: string;
    level: string;
    program: string;
    gpa: string;
    testType: string;
    testScore: string;
    englishScore: string;
    funding: string;
    budget: string;
    studyMode: string;
    goals: string;
    documents: File[];
}

export interface MatchResult extends University {
    aiRationale: string;
    matchStrength: "High" | "Medium" | "Low";
}

function parseScore(value: string) {
    const match = value.match(/[\d.]+/);
    return match ? Number(match[0]) : 0;
}

export async function matchUniversities(profile: UserProfile): Promise<MatchResult[]> {
    await new Promise((resolve) => setTimeout(resolve, 2200));

    const gpa = parseScore(profile.gpa);
    const testScore = parseScore(profile.testScore);
    const englishScore = parseScore(profile.englishScore);
    const program = profile.program.trim().toLowerCase();
    const goals = profile.goals.trim().toLowerCase();

    return universities
        .map((university) => {
            let matchScore = university.matchScore - 8;
            const reasons: string[] = [];

            if (profile.destination !== "All Countries" && university.country === profile.destination) {
                matchScore += 16;
                reasons.push(`It lands directly in your preferred destination, ${profile.destination}.`);
            }

            if (program && university.programs.some((item) => item.toLowerCase().includes(program) || program.includes(item.toLowerCase()))) {
                matchScore += 12;
                reasons.push(`Its programme mix overlaps with your interest in ${profile.program}.`);
            }

            if (profile.level === "PhD" && profile.studyMode === "Research") {
                matchScore += 6;
                reasons.push("Your research-oriented brief favors schools that can support deeper academic work.");
            } else if (profile.level === "Undergraduate" && profile.testType === "SAT") {
                matchScore += 5;
                reasons.push("Your undergraduate profile is easier to calibrate with a standardized score.");
            }

            if (gpa >= 3.6 || gpa >= 75) {
                matchScore += 8;
                reasons.push("Your academic record reads as competitive for selective applications.");
            } else if (gpa > 0 && gpa < 3.0) {
                matchScore -= 7;
                reasons.push("Your GPA suggests this option may need a stronger supporting story.");
            }

            if (profile.testType === "GRE" && testScore >= 320) {
                matchScore += 5;
                reasons.push("A strong GRE score improves competitiveness for analytical programmes.");
            }

            if ((profile.testType === "IELTS" || profile.testType === "TOEFL" || englishScore > 0) && !university.ieltsRequired) {
                matchScore += 2;
                reasons.push("Language readiness gives you flexibility beyond minimum entry requirements.");
            }

            if (profile.funding === "Full scholarship" && university.scholarships) {
                matchScore += 8;
                reasons.push("This school is worth attention because funding matters heavily in your brief.");
            } else if (profile.funding === "Full scholarship" && !university.scholarships) {
                matchScore -= 6;
                reasons.push("It may be harder to justify if scholarship support is non-negotiable.");
            }

            if (profile.budget === "Below $10k / year" && university.tuitionUSD <= 10000) {
                matchScore += 12;
                reasons.push("Its tuition level aligns well with your tighter budget range.");
            } else if (profile.budget === "$10k - $20k / year" && university.tuitionUSD <= 20000) {
                matchScore += 8;
                reasons.push("The tuition sits inside the affordability band you selected.");
            } else if (profile.budget === "$20k - $35k / year" && university.tuitionUSD <= 35000) {
                matchScore += 5;
                reasons.push("Cost remains within the upper budget comfort range you gave.");
            } else if (profile.budget && profile.budget !== "$35k+ / year" && university.tuitionUSD > 35000) {
                matchScore -= 7;
                reasons.push("Tuition pressure may be a concern given the budget guardrails in your brief.");
            }

            if (profile.documents.length > 0) {
                matchScore += 4;
                reasons.push("Uploaded documents give the AI more confidence in the recommendation.");
            }

            if (goals.includes("scholarship") && university.scholarships) {
                matchScore += 4;
            }
            if ((goals.includes("return") || goals.includes("career")) && university.programs.length > 0) {
                matchScore += 2;
            }

            matchScore = Math.max(52, Math.min(98, Math.round(matchScore)));

            let matchStrength: MatchResult["matchStrength"] = "Medium";
            if (matchScore >= 87) matchStrength = "High";
            if (matchScore <= 72) matchStrength = "Low";

            return {
                ...university,
                matchScore,
                matchStrength,
                aiRationale:
                    reasons.slice(0, 3).join(" ") ||
                    "This option remains on the board because it balances destination fit, academic feasibility, and programme relevance reasonably well.",
            };
        })
        .sort((left, right) => right.matchScore - left.matchScore);
}
