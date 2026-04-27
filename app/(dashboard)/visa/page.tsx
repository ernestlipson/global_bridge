"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
    generateDummyFeedback,
    interviewModes,
    visaCountries,
    visaQuestions,
    type InterviewFeedback,
    type InterviewMode,
    type VisaCountry,
    type VisaQuestion,
} from "@/lib/visa-data";
import {
    Alert01Icon,
    ArrowLeft01Icon,
    ArrowRight01Icon,
    Award01Icon,
    BulbIcon,
    CheckmarkCircle01Icon,
    Message01Icon,
    PlayIcon,
    Rotate01Icon,
    Shield01Icon,
    SparklesIcon,
    Target01Icon,
} from "hugeicons-react";

type SessionResult = {
    question: VisaQuestion;
    answer: string;
    feedback: InterviewFeedback;
};

/* ------------------------------------------------------------------ */
/*  Score ring (shared between interview + results)                    */
/* ------------------------------------------------------------------ */
function ScoreRing({
    score,
    label,
    size = 72,
}: {
    score: number;
    label: string;
    size?: number;
}) {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const tone =
        score >= 72
            ? "text-accent stroke-accent"
            : score >= 50
                ? "text-warning stroke-warning"
                : "text-danger stroke-danger";

    return (
        <div className="flex flex-col items-center gap-1.5">
            <div className="relative" style={{ width: size, height: size }}>
                <svg className="h-full w-full -rotate-90">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={5}
                        className="text-border"
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        strokeWidth={5}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className={cn("transition-all duration-500", tone)}
                    />
                </svg>
                <span className={cn("absolute inset-0 flex items-center justify-center text-lg font-semibold", tone.split(" ")[0])}>
                    {score}
                </span>
            </div>
            <span className="text-xs text-text-muted">{label}</span>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Setup screen                                                       */
/* ------------------------------------------------------------------ */
function SetupScreen({
    onStart,
}: {
    onStart: (country: VisaCountry, mode: InterviewMode, inputMode: "voice" | "text") => void;
}) {
    const [country, setCountry] = useState<VisaCountry>("uk");
    const [mode, setMode] = useState<InterviewMode>("quick");
    const [inputMode, setInputMode] = useState<"voice" | "text">("text");

    return (
        <div className="pb-12">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">Visa interview trainer</h1>
                <p className="mt-1 max-w-xl text-sm text-text-secondary">
                    Practice Ghana-specific study visa questions, get instant feedback on confidence and clarity, and spot refusal risks early.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
                <div className="space-y-5">
                    {/* Destination */}
                    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        <h2 className="text-[15px] font-semibold text-text-primary">Destination country</h2>
                        <p className="mt-1 text-[13px] text-text-secondary">
                            Questioning style varies by destination. Pick the country for your current visa plan.
                        </p>
                        <div className="mt-4 grid gap-2 sm:grid-cols-3 xl:grid-cols-5">
                            {visaCountries.map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => setCountry(item.value)}
                                    className={cn(
                                        "rounded-lg border px-3 py-3 text-left transition-colors",
                                        item.value === country
                                            ? "border-primary bg-primary/6 text-primary"
                                            : "border-border bg-white text-text-secondary hover:border-primary/30"
                                    )}
                                >
                                    <div className="text-lg">{item.flag}</div>
                                    <p className="mt-1.5 text-[13px] font-medium">{item.label}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Practice depth */}
                    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        <h2 className="text-[15px] font-semibold text-text-primary">Practice depth</h2>
                        <p className="mt-1 text-[13px] text-text-secondary">
                            Quick to warm up, standard to rehearse, or full simulation for refusal-risk pressure.
                        </p>
                        <div className="mt-4 grid gap-2 md:grid-cols-3">
                            {interviewModes.map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => setMode(item.value)}
                                    className={cn(
                                        "rounded-lg border px-4 py-3 text-left transition-colors",
                                        item.value === mode
                                            ? "border-primary bg-primary text-white"
                                            : "border-border bg-white text-text-secondary hover:border-primary/30"
                                    )}
                                >
                                    <p className={cn("text-[13px] font-semibold", item.value === mode ? "text-white" : "text-text-primary")}>
                                        {item.label}
                                    </p>
                                    <p className={cn("mt-1 text-xs", item.value === mode ? "text-white/75" : "text-text-muted")}>
                                        {item.questions} questions, {item.duration}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Answer mode */}
                    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        <h2 className="text-[15px] font-semibold text-text-primary">Answer mode</h2>
                        <p className="mt-1 text-[13px] text-text-secondary">
                            Text for drafting and refining. Voice for pressure rehearsal and verbal flow.
                        </p>
                        <div className="mt-4 grid gap-2 md:grid-cols-2">
                            {[
                                {
                                    value: "text" as const,
                                    title: "Text practice",
                                    body: "Type deliberately, test structure, refine language.",
                                },
                                {
                                    value: "voice" as const,
                                    title: "Voice rehearsal",
                                    body: "Speak aloud while typing notes for AI feedback.",
                                },
                            ].map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => setInputMode(item.value)}
                                    className={cn(
                                        "rounded-lg border px-4 py-3 text-left transition-colors",
                                        inputMode === item.value
                                            ? "border-primary bg-primary/6"
                                            : "border-border bg-white hover:border-primary/30"
                                    )}
                                >
                                    <p className="text-[13px] font-semibold text-text-primary">{item.title}</p>
                                    <p className="mt-1 text-xs leading-relaxed text-text-secondary">{item.body}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Launch */}
                    <div className="flex items-center justify-between rounded-xl border border-border bg-white p-5">
                        <div>
                            <h2 className="text-[15px] font-semibold text-text-primary">Ready to start</h2>
                            <p className="mt-1 text-[13px] text-text-secondary">
                                The mock interviewer will begin with Ghana-relevant intent, finance, and return-plan questions.
                            </p>
                        </div>
                        <Button size="sm" onClick={() => onStart(country, mode, inputMode)}>
                            <PlayIcon size={15} />
                            Start interview
                        </Button>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">What officers look for</p>
                        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-secondary">
                            <li>Why this school and programme, specifically.</li>
                            <li>Whether your sponsor story is exact and believable.</li>
                            <li>A clear reason to return to Ghana after study.</li>
                        </ul>
                    </div>
                    <div className="rounded-xl border border-border bg-white p-5">
                        <p className="text-[13px] font-semibold text-text-primary">Before you begin</p>
                        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-secondary">
                            <li>Know your tuition amount, sponsor occupation, and deposit status.</li>
                            <li>Use proper school and programme names, not generic placeholders.</li>
                            <li>Keep answers concise, but never empty.</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Interview screen                                                   */
/* ------------------------------------------------------------------ */
function InterviewScreen({
    questions,
    inputMode,
    country,
    onFinish,
    onExit,
}: {
    questions: VisaQuestion[];
    inputMode: "voice" | "text";
    country: VisaCountry;
    onFinish: (results: SessionResult[]) => void;
    onExit: () => void;
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [results, setResults] = useState<SessionResult[]>([]);

    const currentQuestion = questions[currentIndex];
    const progress = Math.round(((currentIndex + (submitted ? 1 : 0)) / questions.length) * 100);
    const answeredCount = results.length;
    const lastFeedback = results.at(-1)?.feedback ?? null;

    function handleSubmit() {
        if (!answer.trim()) return;
        const nextFeedback = generateDummyFeedback(currentQuestion.id, answer);
        const result: SessionResult = {
            question: currentQuestion,
            answer,
            feedback: nextFeedback,
        };
        setFeedback(nextFeedback);
        setSubmitted(true);
        setResults((current) => [...current, result]);
    }

    function handleAdvance() {
        if (currentIndex === questions.length - 1) {
            onFinish(results);
            return;
        }
        setCurrentIndex((current) => current + 1);
        setAnswer("");
        setFeedback(null);
        setSubmitted(false);
    }

    return (
        <div className="grid gap-6 pb-10 xl:grid-cols-[minmax(0,1fr)_280px]">
            <section className="space-y-5">
                {/* Progress header */}
                <div className="rounded-xl border border-border bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-[15px] font-semibold text-text-primary">
                                Question {currentIndex + 1} of {questions.length}
                            </h1>
                            <p className="mt-0.5 text-xs text-text-secondary">
                                {visaCountries.find((c) => c.value === country)?.label} &middot; {inputMode} mode
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={onExit}
                            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary"
                        >
                            <ArrowLeft01Icon size={14} />
                            Exit
                        </button>
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-surface">
                        <div className="h-1.5 rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                </div>

                {/* Question + answer */}
                <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="rounded-md bg-primary/8 px-2 py-0.5 text-xs font-medium text-primary">
                            {currentQuestion.category}
                        </span>
                        <span
                            className={cn(
                                "rounded-md px-2 py-0.5 text-xs font-medium",
                                currentQuestion.difficulty === "easy" && "bg-accent-light text-accent-dark",
                                currentQuestion.difficulty === "medium" && "bg-amber-50 text-amber-700",
                                currentQuestion.difficulty === "hard" && "bg-red-50 text-danger"
                            )}
                        >
                            {currentQuestion.difficulty}
                        </span>
                    </div>

                    <h2 className="mt-4 text-lg font-semibold leading-7 text-text-primary">
                        {currentQuestion.question}
                    </h2>
                    <p className="mt-2 text-[13px] text-text-secondary">
                        Tip: {currentQuestion.tips}
                    </p>

                    <div className="mt-5">
                        <label className="mb-1.5 block text-[13px] font-medium text-text-primary">
                            {inputMode === "voice" ? "Voice rehearsal notes" : "Your answer"}
                        </label>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            disabled={submitted}
                            placeholder={
                                inputMode === "voice"
                                    ? "Speak aloud, then type the core points you said."
                                    : "Type your answer as if a visa officer is waiting."
                            }
                            rows={5}
                            className={cn(
                                "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm leading-relaxed text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12",
                                submitted && "opacity-70"
                            )}
                        />
                        {!submitted && (
                            <div className="mt-3 flex justify-end">
                                <Button size="sm" variant="accent" onClick={handleSubmit} disabled={!answer.trim()}>
                                    <SparklesIcon size={15} />
                                    Analyze answer
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Feedback */}
                    {feedback && (
                        <div className="mt-5 space-y-4 border-t border-border pt-5">
                            <div className="flex flex-wrap items-center justify-center gap-6">
                                <ScoreRing score={feedback.confidenceScore} label="Confidence" />
                                <ScoreRing score={feedback.clarityScore} label="Clarity" />
                                <ScoreRing score={feedback.overallScore} label="Overall" size={80} />
                            </div>

                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="rounded-lg border border-danger/15 bg-red-50/50 p-4">
                                    <h3 className="flex items-center gap-1.5 text-[13px] font-semibold text-danger">
                                        <Alert01Icon size={14} />
                                        Red flags
                                    </h3>
                                    <div className="mt-2 space-y-1 text-[13px] leading-relaxed text-text-secondary">
                                        {feedback.redFlags.length > 0 ? (
                                            feedback.redFlags.map((item) => <p key={item}>{item}</p>)
                                        ) : (
                                            <p>No immediate refusal trigger detected.</p>
                                        )}
                                    </div>
                                </div>
                                <div className="rounded-lg border border-accent/15 bg-accent-light/30 p-4">
                                    <h3 className="flex items-center gap-1.5 text-[13px] font-semibold text-accent-dark">
                                        <CheckmarkCircle01Icon size={14} />
                                        What worked
                                    </h3>
                                    <div className="mt-2 space-y-1 text-[13px] leading-relaxed text-text-secondary">
                                        {feedback.strengths.map((item) => <p key={item}>{item}</p>)}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-primary/15 bg-primary-50/40 p-4">
                                <h3 className="flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                                    <BulbIcon size={14} />
                                    Suggestions
                                </h3>
                                <div className="mt-2 space-y-1 text-[13px] leading-relaxed text-text-secondary">
                                    {feedback.suggestions.map((item) => <p key={item}>{item}</p>)}
                                </div>
                            </div>

                            <div className="rounded-lg bg-surface p-4">
                                <h3 className="flex items-center gap-1.5 text-[13px] font-semibold text-text-primary">
                                    <Shield01Icon size={14} className="text-primary" />
                                    Stronger sample answer
                                </h3>
                                <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">{feedback.sampleAnswer}</p>
                            </div>

                            <div className="flex justify-end">
                                <Button size="sm" onClick={handleAdvance}>
                                    {currentIndex === questions.length - 1 ? "View final review" : "Next question"}
                                    <ArrowRight01Icon size={15} />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Sidebar */}
            <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
                <div className="rounded-xl border border-border bg-white p-5">
                    <p className="text-[13px] font-semibold text-text-primary">Session progress</p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-surface p-3">
                            <p className="text-xs text-text-muted">Answered</p>
                            <p className="mt-1 text-xl font-semibold text-text-primary">{answeredCount}</p>
                        </div>
                        <div className="rounded-lg bg-surface p-3">
                            <p className="text-xs text-text-muted">Progress</p>
                            <p className="mt-1 text-xl font-semibold text-text-primary">{progress}%</p>
                        </div>
                    </div>
                    {lastFeedback && (
                        <div className="mt-3 rounded-lg border border-border bg-white p-3">
                            <p className="text-xs text-text-muted">Last answer</p>
                            <p className="mt-1 text-[13px] text-text-secondary">
                                Confidence {lastFeedback.confidenceScore}, clarity {lastFeedback.clarityScore}
                            </p>
                        </div>
                    )}
                </div>

                <div className="rounded-xl border border-border bg-white p-5">
                    <p className="text-[13px] font-semibold text-text-primary">Officer lens</p>
                    <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-secondary">
                        <li>Do you sound certain about your funding source?</li>
                        <li>Have you named the exact university and programme?</li>
                        <li>Have you explained why you will return to Ghana?</li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Results screen                                                     */
/* ------------------------------------------------------------------ */
function ResultsScreen({
    results,
    onRestart,
}: {
    results: SessionResult[];
    onRestart: () => void;
}) {
    const averages = useMemo(() => {
        const total = results.length || 1;
        const confidence = Math.round(results.reduce((sum, item) => sum + item.feedback.confidenceScore, 0) / total);
        const clarity = Math.round(results.reduce((sum, item) => sum + item.feedback.clarityScore, 0) / total);
        const overall = Math.round(results.reduce((sum, item) => sum + item.feedback.overallScore, 0) / total);
        return { confidence, clarity, overall };
    }, [results]);

    const refusalRisk =
        averages.overall >= 75
            ? {
                verdict: "Low refusal risk",
                tone: "bg-accent-light text-accent-dark",
                body: "Your answers are mostly precise, credible, and tied to a believable Ghana return plan.",
            }
            : averages.overall >= 55
                ? {
                    verdict: "Moderate refusal risk",
                    tone: "bg-amber-50 text-amber-700",
                    body: "You have workable answers, but a visa officer may still challenge weak detail or vague intent.",
                }
                : {
                    verdict: "High refusal risk",
                    tone: "bg-red-50 text-danger",
                    body: "A real interview could go badly unless you tighten your funding, intent, and home-tie answers.",
                };

    const repeatedFlags = Array.from(
        new Set(results.flatMap((item) => item.feedback.redFlags))
    ).slice(0, 4);

    return (
        <div className="space-y-6 pb-12">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-text-primary">Session review</h1>
                    <p className="mt-1 text-sm text-text-secondary">
                        {results.length} questions reviewed across confidence, clarity, and refusal risk
                    </p>
                </div>
                <span className={cn("rounded-md px-3 py-1.5 text-[13px] font-semibold", refusalRisk.tone)}>
                    {refusalRisk.verdict}
                </span>
            </div>

            {/* Score overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-5">
                    <ScoreRing score={averages.confidence} label="Confidence" size={80} />
                    <div>
                        <p className="text-[13px] font-medium text-text-primary">Average confidence</p>
                        <p className="mt-0.5 text-xs text-text-secondary">Across all questions</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-5">
                    <ScoreRing score={averages.clarity} label="Clarity" size={80} />
                    <div>
                        <p className="text-[13px] font-medium text-text-primary">Average clarity</p>
                        <p className="mt-0.5 text-xs text-text-secondary">Across all questions</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-5">
                    <ScoreRing score={averages.overall} label="Overall" size={80} />
                    <div>
                        <p className="text-[13px] font-medium text-text-primary">Overall readiness</p>
                        <p className="mt-0.5 text-xs text-text-secondary">{refusalRisk.body}</p>
                    </div>
                </div>
            </div>

            {/* Refusal + Replay */}
            <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl border border-danger/15 bg-red-50/40 p-5">
                    <h2 className="flex items-center gap-2 text-[15px] font-semibold text-text-primary">
                        <Alert01Icon size={16} className="text-danger" />
                        Mock refusal explanation
                    </h2>
                    <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">{refusalRisk.body}</p>
                    <div className="mt-4 space-y-2">
                        {repeatedFlags.length > 0 ? (
                            repeatedFlags.map((item) => (
                                <div key={item} className="rounded-lg bg-white px-3 py-2.5 text-[13px] leading-relaxed text-text-secondary shadow-sm">
                                    {item}
                                </div>
                            ))
                        ) : (
                            <div className="rounded-lg bg-white px-3 py-2.5 text-[13px] text-text-muted">
                                No repeated red flag surfaced strongly enough to justify a refusal narrative.
                            </div>
                        )}
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-white p-5">
                    <h2 className="flex items-center gap-2 text-[15px] font-semibold text-text-primary">
                        <Target01Icon size={16} className="text-primary" />
                        Replay and improve
                    </h2>
                    <div className="mt-4 space-y-2">
                        {results.map((item, index) => (
                            <details key={`${item.question.id}-${index}`} className="rounded-lg border border-border bg-surface/50">
                                <summary className="flex cursor-pointer items-center justify-between gap-3 px-3 py-3 text-[13px]">
                                    <div className="min-w-0">
                                        <p className="font-medium text-text-primary truncate">{item.question.question}</p>
                                    </div>
                                    <span className="shrink-0 rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-primary shadow-sm">
                                        {item.feedback.overallScore}%
                                    </span>
                                </summary>
                                <div className="border-t border-border px-3 py-3 text-[13px] leading-relaxed text-text-secondary">
                                    <p className="font-medium text-text-primary">Your answer</p>
                                    <p className="mt-1">{item.answer}</p>
                                    <p className="mt-3 font-medium text-text-primary">Better angle</p>
                                    <p className="mt-1">{item.feedback.sampleAnswer}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <Button size="sm" variant="accent" onClick={onRestart}>
                    <Rotate01Icon size={15} />
                    Practice again
                </Button>
                <Button size="sm" variant="outline" onClick={onRestart}>
                    <Award01Icon size={15} />
                    Try another mode
                </Button>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Page root                                                          */
/* ------------------------------------------------------------------ */
export default function VisaInterviewPage() {
    const [screen, setScreen] = useState<"setup" | "interview" | "results">("setup");
    const [selectedCountry, setSelectedCountry] = useState<VisaCountry>("uk");
    const [inputMode, setInputMode] = useState<"voice" | "text">("text");
    const [questions, setQuestions] = useState<VisaQuestion[]>([]);
    const [results, setResults] = useState<SessionResult[]>([]);

    function handleStart(country: VisaCountry, mode: InterviewMode, nextInputMode: "voice" | "text") {
        const count = mode === "quick" ? 5 : mode === "standard" ? 10 : 15;
        const selectedQuestions = [...visaQuestions].sort(() => Math.random() - 0.5).slice(0, count);
        setSelectedCountry(country);
        setInputMode(nextInputMode);
        setQuestions(selectedQuestions);
        setResults([]);
        setScreen("interview");
    }

    function handleFinish(nextResults: SessionResult[]) {
        setResults(nextResults);
        setScreen("results");
    }

    function handleRestart() {
        setQuestions([]);
        setResults([]);
        setScreen("setup");
    }

    return (
        <div className="pb-10">
            {screen === "setup" && <SetupScreen onStart={handleStart} />}
            {screen === "interview" && (
                <InterviewScreen
                    questions={questions}
                    country={selectedCountry}
                    inputMode={inputMode}
                    onFinish={handleFinish}
                    onExit={handleRestart}
                />
            )}
            {screen === "results" && (
                <ResultsScreen results={results} onRestart={handleRestart} />
            )}
        </div>
    );
}
