"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { LiveVideoSetup } from "@/components/visa/LiveVideoSetup";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
    buildPreviewSessionResults,
    demoPreviousSessions,
    generateDummyFeedback,
    getVisaInterviewCategoryById,
    interviewModes,
    visaCountries,
    visaInterviewCategories,
    visaQuestions,
    type InterviewFeedback,
    type InterviewMode,
    type PreviousSessionRow,
    type VisaCountry,
    type VisaInterviewCategory,
    type VisaQuestion,
} from "@/lib/visa-data";
import {
    Alert01Icon,
    ArrowLeft01Icon,
    ArrowRight01Icon,
    Award01Icon,
    BulbIcon,
    CheckmarkCircle01Icon,
    Clock01Icon,
    Mic01Icon,
    PlayIcon,
    Rotate01Icon,
    Shield01Icon,
    SparklesIcon,
    StopCircleIcon,
    Target01Icon,
} from "hugeicons-react";

type SessionResult = {
    question: VisaQuestion;
    answer: string;
    voiceNoteUrl?: string;
    feedback: InterviewFeedback;
};

function formatRecordingTime(seconds: number) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
}

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
/*  Interview mode (AI vs live person)                                 */
/* ------------------------------------------------------------------ */
/** Pill tabs + title (consultation-style). Title only renders with tabs to avoid duplicate h1 on inner flows. */
function InterviewModeTabs({
    value,
    onChange,
}: {
    value: "ai" | "live";
    onChange: (next: "ai" | "live") => void;
}) {
    return (
        <div className="mb-5">
            <div className="mb-4">
                <h1 className="text-xl font-semibold text-text-primary">Visa interview</h1>
                <p className="mt-1 max-w-2xl text-[13px] leading-snug text-text-secondary">
                    Choose AI mock interviews for structured feedback after each answer, or live video with a person for
                    realistic embassy-style pacing and follow-through.
                </p>
            </div>

            <div
                role="tablist"
                aria-label="Interview format"
                className="flex flex-wrap gap-2 rounded-xl border border-border bg-surface/80 p-1"
            >
                <button
                    type="button"
                    role="tab"
                    aria-selected={value === "ai"}
                    onClick={() => onChange("ai")}
                    className={cn(
                        "rounded-lg px-4 py-2 text-[13px] font-medium transition-colors",
                        value === "ai"
                            ? "bg-white text-primary ring-1 ring-border"
                            : "text-text-secondary hover:text-text-primary"
                    )}
                >
                    AI Mock Interview
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={value === "live"}
                    onClick={() => onChange("live")}
                    className={cn(
                        "rounded-lg px-4 py-2 text-[13px] font-medium transition-colors",
                        value === "live"
                            ? "bg-white text-primary ring-1 ring-border"
                            : "text-text-secondary hover:text-text-primary"
                    )}
                >
                    Live Video With Person
                </button>
            </div>
        </div>
    );
}

function SessionScoreBar({ score }: { score: number }) {
    const barTone =
        score >= 72 ? "bg-accent" : score >= 50 ? "bg-warning" : "bg-danger";
    return (
        <div className="flex items-center justify-end gap-1.5">
            <span className="text-xs font-semibold tabular-nums text-text-primary">{score}</span>
            <div className="h-1.5 w-14 max-w-full overflow-hidden rounded-full bg-surface">
                <div
                    className={cn("h-full rounded-full transition-all duration-300", barTone)}
                    style={{ width: `${Math.min(100, score)}%` }}
                />
            </div>
        </div>
    );
}

function MockInterviewCenter({
    onSelectCategory,
    previousSessions,
    onViewReport,
}: {
    onSelectCategory: (c: VisaInterviewCategory) => void;
    previousSessions: PreviousSessionRow[];
    onViewReport: (row: PreviousSessionRow) => void;
}) {
    return (
        <div className="space-y-5 pb-10">
            <div>
                <h2 className="text-lg font-semibold text-text-primary">Mock interview center</h2>
                <p className="mt-0.5 max-w-2xl text-[13px] leading-snug text-text-secondary">
                    Practice with specialized AI officers for different visa types.
                </p>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                {visaInterviewCategories.map((cat) => {
                    const flagMeta = visaCountries.find((c) => c.value === cat.country);
                    const flagUrl = flagMeta?.flagUrl;
                    return (
                        <article
                            key={cat.id}
                            className="relative flex flex-col rounded-lg border border-border bg-white p-3"
                        >
                            {cat.popular && (
                                <span className="absolute right-2 top-2 rounded bg-primary-50 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-primary">
                                    Popular
                                </span>
                            )}
                            <div className="flex gap-2.5">
                                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-border bg-surface">
                                    {flagUrl && (
                                        <Image src={flagUrl} alt="" fill className="object-cover" sizes="32px" />
                                    )}
                                </div>
                                <div className="min-w-0 flex-1 pr-12">
                                    <h2 className="text-[13px] font-semibold leading-tight text-text-primary">{cat.cardTitle}</h2>
                                    <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-text-secondary">{cat.description}</p>
                                    <div className="mt-2 space-y-0.5 text-[10px] text-text-muted">
                                        <div className="flex items-center gap-1">
                                            <Clock01Icon size={11} className="shrink-0 text-primary/70" />
                                            <span>{cat.durationLine}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <SparklesIcon size={11} className="shrink-0 text-primary/70" />
                                            <span className="line-clamp-1">{cat.detailLine}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2.5">
                                <Button
                                    size="sm"
                                    variant={cat.popular ? "primary" : "outline"}
                                    className="h-8 w-full gap-1.5 px-2.5 text-xs"
                                    onClick={() => onSelectCategory(cat)}
                                    type="button"
                                >
                                    <PlayIcon size={13} />
                                    Start session
                                </Button>
                            </div>
                        </article>
                    );
                })}

                <div className="flex flex-col justify-center rounded-lg border border-dashed border-border bg-surface/40 px-3 py-4 text-center">
                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-base font-light leading-none text-text-muted">
                        +
                    </div>
                    <p className="mt-2 text-[12px] font-medium text-text-primary">Request category</p>
                    <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-text-secondary">
                        Suggest a visa type to add to the library.
                    </p>
                    <Button size="sm" variant="outline" className="mx-auto mt-2 h-8 px-2.5 text-xs" type="button" disabled title="Coming soon">
                        Submit request
                    </Button>
                </div>
            </div>

            <section className="overflow-hidden rounded-lg border border-border bg-white">
                <div className="border-b border-border px-3 py-2">
                    <h2 className="text-[13px] font-semibold text-text-primary">Previous sessions</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[480px] text-left text-[12px]">
                        <thead>
                            <tr className="border-b border-border bg-surface/60">
                                <th className="px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-text-muted">
                                    Interview type
                                </th>
                                <th className="px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-text-muted">
                                    Date
                                </th>
                                <th className="px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-text-muted">
                                    Score
                                </th>
                                <th className="px-3 py-2 text-right text-[9px] font-semibold uppercase tracking-wide text-text-muted">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {previousSessions.map((row) => {
                                const cat = getVisaInterviewCategoryById(row.categoryId);
                                const flagUrl = cat
                                    ? visaCountries.find((c) => c.value === cat.country)?.flagUrl
                                    : undefined;
                                return (
                                    <tr key={row.id} className="border-b border-border last:border-0">
                                        <td className="px-3 py-2">
                                            <div className="flex items-center gap-2">
                                                <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-border bg-surface">
                                                    {flagUrl && (
                                                        <Image src={flagUrl} alt="" fill className="object-cover" sizes="24px" />
                                                    )}
                                                </div>
                                                <span className="font-medium text-text-primary">{cat?.tableLabel ?? "Session"}</span>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-2 text-text-secondary">{row.dateLabel}</td>
                                        <td className="px-3 py-2">
                                            <SessionScoreBar score={row.score} />
                                        </td>
                                        <td className="px-3 py-2 text-right">
                                            <button
                                                type="button"
                                                onClick={() => onViewReport(row)}
                                                className="text-[12px] font-medium text-primary hover:text-primary-dark"
                                            >
                                                View report
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

const aiSetupSteps = [
    { id: 0, label: "Practice depth", icon: Target01Icon },
    { id: 1, label: "Answer mode", icon: Mic01Icon },
    { id: 2, label: "Review", icon: CheckmarkCircle01Icon },
] as const;

/* ------------------------------------------------------------------ */
/*  Setup screen                                                       */
/* ------------------------------------------------------------------ */
function SetupScreen({
    category,
    onBackToHub,
    onStart,
}: {
    category: VisaInterviewCategory;
    onBackToHub: () => void;
    onStart: (mode: InterviewMode, inputMode: "voice" | "text") => void;
}) {
    const [activeStep, setActiveStep] = useState(0);
    const [mode, setMode] = useState<InterviewMode>("quick");
    const [inputMode, setInputMode] = useState<"voice" | "text">("text");

    const flagMeta = visaCountries.find((c) => c.value === category.country);
    const flagUrl = flagMeta?.flagUrl;

    const activeStepMeta = aiSetupSteps[activeStep];
    const ActiveStepIcon = activeStepMeta.icon;
    const modeMeta = interviewModes.find((m) => m.value === mode);
    const sessionBadge = modeMeta ? `${modeMeta.questions} questions` : "";

    return (
        <div className="pb-12">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-text-primary">AI visa interview trainer</h2>
                <p className="mt-1 max-w-xl text-sm text-text-secondary">
                    Practice study visa questions with instant AI feedback on confidence and clarity, and spot refusal risks early.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
                <div>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-surface">
                                {flagUrl && (
                                    <Image src={flagUrl} alt="" fill className="object-cover" sizes="40px" />
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">Interview type</p>
                                <p className="truncate text-[15px] font-semibold text-text-primary">{category.cardTitle}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" type="button" onClick={onBackToHub}>
                            <ArrowLeft01Icon size={15} />
                            Hub
                        </Button>
                    </div>

                    {/* Progress header (matches universities stepped layout) */}
                    <div className="mb-4 rounded-xl border border-border bg-white p-3">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
                                    <ActiveStepIcon size={17} />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-text-muted">
                                        Step {activeStep + 1} of {aiSetupSteps.length}
                                    </p>
                                    <h2 className="text-[15px] font-semibold text-text-primary">{activeStepMeta.label}</h2>
                                </div>
                            </div>
                            <div className="flex min-w-0 flex-1 items-center gap-2 lg:max-w-md">
                                {aiSetupSteps.map((step) => (
                                    <button
                                        key={step.id}
                                        type="button"
                                        onClick={() => setActiveStep(step.id)}
                                        className={cn(
                                            "group h-2 flex-1 rounded-full transition-colors",
                                            activeStep === step.id
                                                ? "bg-primary"
                                                : activeStep > step.id
                                                    ? "bg-accent"
                                                    : "bg-slate-200 hover:bg-primary/30"
                                        )}
                                        aria-label={`Go to ${step.label}`}
                                    />
                                ))}
                                {sessionBadge && (
                                    <span className="ml-2 shrink-0 rounded-md bg-primary-50 px-2 py-1 text-xs font-semibold text-primary">
                                        {sessionBadge}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        {activeStep === 0 && (
                            <div>
                                <h2 className="text-[15px] font-semibold text-text-primary">Practice depth</h2>
                                <p className="mt-1 text-[13px] text-text-secondary">
                                    Quick to warm up, standard to rehearse, or full simulation for refusal-risk pressure.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-[repeat(3,minmax(0,220px))]">
                                    {interviewModes.map((item) => {
                                        const Icon = item.value === "quick" ? SparklesIcon : item.value === "standard" ? Target01Icon : Shield01Icon;
                                        return (
                                            <button
                                                key={item.value}
                                                type="button"
                                                onClick={() => setMode(item.value)}
                                                className={cn(
                                                    "group relative flex flex-col rounded-lg border p-3 text-left transition-all duration-200",
                                                    item.value === mode
                                                ? "border-primary bg-primary-50 ring-1 ring-primary/20"
                                                : "border-slate-200 bg-white hover:border-primary/30"
                                                )}
                                            >
                                                <div className={cn(
                                                    "mb-2 flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200",
                                                    item.value === mode ? "bg-primary text-white" : "bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary"
                                                )}>
                                                    <Icon size={17} strokeWidth={2} />
                                                </div>
                                                <p className={cn("text-[13px] font-bold transition-colors duration-200", item.value === mode ? "text-primary" : "text-slate-900")}>
                                                    {item.label}
                                                </p>
                                                <p className={cn("mt-1 text-xs leading-relaxed transition-colors duration-200", item.value === mode ? "text-primary/80" : "text-slate-500")}>
                                                    {item.questions} questions, {item.duration}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {activeStep === 1 && (
                            <div>
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
                        )}

                        {activeStep === 2 && (
                            <div>
                                <h2 className="text-[15px] font-semibold text-text-primary">Review and start</h2>
                                <p className="mt-1 text-[13px] text-text-secondary">
                                    Confirm your choices. The mock interviewer will begin with intent, finance, and return-plan style questions suited to your destination.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-text-secondary">
                                        {category.tableLabel}
                                    </span>
                                    <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-text-secondary">
                                        {modeMeta?.label ?? mode}
                                    </span>
                                    <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-text-secondary">
                                        {modeMeta ? `${modeMeta.questions} questions · ${modeMeta.duration}` : ""}
                                    </span>
                                    <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-text-secondary">
                                        {inputMode === "voice" ? "Voice rehearsal" : "Text practice"}
                                    </span>
                                </div>
                                <div className="mt-5 rounded-lg border border-border bg-surface/70 px-3 py-3 text-[13px] leading-relaxed text-text-secondary">
                                    When you start, answer naturally. You can exit anytime from the interview screen.
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                            <Button
                                variant="ghost"
                                size="sm"
                                type="button"
                                onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                                disabled={activeStep === 0}
                            >
                                <ArrowLeft01Icon size={15} />
                                Back
                            </Button>

                            {activeStep < 2 ? (
                                <Button size="sm" type="button" onClick={() => setActiveStep((s) => Math.min(2, s + 1))}>
                                    Next
                                    <ArrowRight01Icon size={15} />
                                </Button>
                            ) : (
                                <Button size="sm" type="button" onClick={() => onStart(mode, inputMode)}>
                                    <PlayIcon size={15} />
                                    Start interview
                                </Button>
                            )}
                        </div>
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
    visaCategoryLabel,
    onFinish,
    onExit,
}: {
    questions: VisaQuestion[];
    inputMode: "voice" | "text";
    country: VisaCountry;
    visaCategoryLabel?: string;
    onFinish: (results: SessionResult[]) => void;
    onExit: () => void;
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [results, setResults] = useState<SessionResult[]>([]);
    const [recordingState, setRecordingState] = useState<"idle" | "recording" | "ready" | "error">("idle");
    const [recordingSeconds, setRecordingSeconds] = useState(0);
    const [recordingError, setRecordingError] = useState("");
    const [voiceNoteUrl, setVoiceNoteUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const recordedChunksRef = useRef<BlobPart[]>([]);

    const currentQuestion = questions[currentIndex];
    const progress = Math.round(((currentIndex + (submitted ? 1 : 0)) / questions.length) * 100);
    const answeredCount = results.length;
    const lastFeedback = results.at(-1)?.feedback ?? null;
    const hasAnswerContent = Boolean(answer.trim()) || Boolean(voiceNoteUrl);

    useEffect(() => {
        if (recordingState !== "recording") return;

        const timer = window.setInterval(() => {
            setRecordingSeconds((current) => current + 1);
        }, 1000);

        return () => window.clearInterval(timer);
    }, [recordingState]);

    useEffect(() => {
        return () => {
            mediaRecorderRef.current?.stream.getTracks().forEach((track) => track.stop());
            mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        };
    }, []);

    async function handleStartRecording() {
        if (submitted || recordingState === "recording") return;

        if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
            setRecordingState("error");
            setRecordingError("Voice recording is not supported in this browser.");
            return;
        }

        try {
            if (voiceNoteUrl) {
                URL.revokeObjectURL(voiceNoteUrl);
                setVoiceNoteUrl(null);
            }

            recordedChunksRef.current = [];
            setRecordingError("");
            setRecordingSeconds(0);

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
            const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";
            const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };

            recorder.onstop = () => {
                stream.getTracks().forEach((track) => track.stop());

                if (recordedChunksRef.current.length === 0) {
                    setRecordingState("idle");
                    return;
                }

                const audioBlob = new Blob(recordedChunksRef.current, { type: recorder.mimeType || "audio/webm" });
                setVoiceNoteUrl(URL.createObjectURL(audioBlob));
                setRecordingState("ready");
            };

            mediaRecorderRef.current = recorder;
            recorder.start();
            setRecordingState("recording");
        } catch {
            setRecordingState("error");
            setRecordingError("Microphone access was blocked. Allow microphone permission and try again.");
        }
    }

    function handleStopRecording() {
        const recorder = mediaRecorderRef.current;
        if (!recorder || recorder.state === "inactive") return;
        recorder.stop();
    }

    function handleSubmit() {
        if (!hasAnswerContent) return;

        const submittedAnswer = answer.trim() || "Voice note recorded for this answer.";
        const nextFeedback = generateDummyFeedback(currentQuestion.id, submittedAnswer);
        const result: SessionResult = {
            question: currentQuestion,
            answer: submittedAnswer,
            voiceNoteUrl: voiceNoteUrl ?? undefined,
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
        setVoiceNoteUrl(null);
        setRecordingState("idle");
        setRecordingSeconds(0);
        setRecordingError("");
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
                            <h2 className="text-[15px] font-semibold text-text-primary">
                                Question {currentIndex + 1} of {questions.length}
                            </h2>
                            <p className="mt-0.5 text-xs text-text-secondary">
                                {visaCategoryLabel && (
                                    <>
                                        <span className="font-medium text-text-primary">{visaCategoryLabel}</span>
                                        <span className="text-text-muted"> · </span>
                                    </>
                                )}
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
                        {inputMode === "voice" && (
                            <div className="mt-3 rounded-lg border border-border bg-surface/60 p-3">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="min-w-0">
                                        <p className="text-[13px] font-medium text-text-primary">Voice note</p>
                                        <p className="mt-0.5 text-xs text-text-secondary">
                                            {recordingState === "recording"
                                                ? `Recording ${formatRecordingTime(recordingSeconds)}`
                                                : voiceNoteUrl
                                                    ? "Recording saved. Replay it before analysis."
                                                    : "Record your spoken answer, then add short notes if needed."}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={recordingState === "recording" ? handleStopRecording : handleStartRecording}
                                        disabled={submitted}
                                        className={cn(
                                            "inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50",
                                            recordingState === "recording"
                                                ? "bg-danger text-white hover:bg-red-600"
                                                : "border border-primary/20 bg-white text-primary hover:bg-primary-50"
                                        )}
                                    >
                                        {recordingState === "recording" ? <StopCircleIcon size={16} /> : <Mic01Icon size={16} />}
                                        {recordingState === "recording" ? "Stop" : voiceNoteUrl ? "Record again" : "Record"}
                                    </button>
                                </div>
                                {voiceNoteUrl && (
                                    <audio
                                        controls
                                        src={voiceNoteUrl}
                                        className="mt-3 h-9 w-full"
                                    >
                                        <track kind="captions" />
                                    </audio>
                                )}
                                {recordingError && (
                                    <p className="mt-2 text-xs text-danger">{recordingError}</p>
                                )}
                            </div>
                        )}
                        {!submitted && (
                            <div className="mt-3 flex justify-end">
                                <Button size="sm" variant="accent" onClick={handleSubmit} disabled={!hasAnswerContent || recordingState === "recording"}>
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
    reportSubtitle,
    onRestart,
}: {
    results: SessionResult[];
    reportSubtitle?: string;
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
                    <h2 className="text-xl font-semibold text-text-primary">Session review</h2>
                    <p className="mt-1 text-sm text-text-secondary">
                        {results.length} questions reviewed across confidence, clarity, and refusal risk
                    </p>
                    {reportSubtitle && (
                        <p className="mt-1 text-[13px] text-text-muted">{reportSubtitle}</p>
                    )}
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
                                <div key={item} className="rounded-lg border border-border/60 bg-white px-3 py-2.5 text-[13px] leading-relaxed text-text-secondary">
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
                                    <span className="shrink-0 rounded-md border border-border/60 bg-white px-2 py-0.5 text-xs font-semibold text-primary">
                                        {item.feedback.overallScore}%
                                    </span>
                                </summary>
                                <div className="border-t border-border px-3 py-3 text-[13px] leading-relaxed text-text-secondary">
                                    <p className="font-medium text-text-primary">Your answer</p>
                                    <p className="mt-1">{item.answer}</p>
                                    {item.voiceNoteUrl && (
                                        <audio
                                            controls
                                            src={item.voiceNoteUrl}
                                            className="mt-3 h-9 w-full"
                                        >
                                            <track kind="captions" />
                                        </audio>
                                    )}
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
    const [screen, setScreen] = useState<"hub" | "setup" | "interview" | "results">("hub");
    const [interviewChannel, setInterviewChannel] = useState<"ai" | "live">("ai");
    const [selectedCategory, setSelectedCategory] = useState<VisaInterviewCategory | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<VisaCountry>("uk");
    const [inputMode, setInputMode] = useState<"voice" | "text">("text");
    const [questions, setQuestions] = useState<VisaQuestion[]>([]);
    const [results, setResults] = useState<SessionResult[]>([]);
    const [reportSubtitle, setReportSubtitle] = useState<string | undefined>(undefined);
    const [previousSessions, setPreviousSessions] = useState<PreviousSessionRow[]>(() => [...demoPreviousSessions]);

    function handleInterviewChannelChange(next: "ai" | "live") {
        setInterviewChannel(next);
        if (next === "ai") {
            setScreen("hub");
            setSelectedCategory(null);
        } else {
            setScreen("hub");
            setResults([]);
            setReportSubtitle(undefined);
            setSelectedCategory(null);
        }
    }

    function handleSelectCategory(category: VisaInterviewCategory) {
        setSelectedCategory(category);
        setScreen("setup");
    }

    function handleBackToHub() {
        setSelectedCategory(null);
        setScreen("hub");
    }

    function handleStart(mode: InterviewMode, nextInputMode: "voice" | "text") {
        if (!selectedCategory) return;
        const count = mode === "quick" ? 5 : mode === "standard" ? 10 : 15;
        const selectedQuestions = [...visaQuestions].sort(() => Math.random() - 0.5).slice(0, count);
        setSelectedCountry(selectedCategory.country);
        setInputMode(nextInputMode);
        setQuestions(selectedQuestions);
        setResults([]);
        setReportSubtitle(undefined);
        setScreen("interview");
    }

    function handleFinish(nextResults: SessionResult[]) {
        setResults(nextResults);
        if (selectedCategory) {
            const avg = Math.round(
                nextResults.reduce((sum, r) => sum + r.feedback.overallScore, 0) / Math.max(1, nextResults.length)
            );
            const dateLabel = new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
            setPreviousSessions((prev) => [
                {
                    id: `session-${Date.now()}`,
                    categoryId: selectedCategory.id,
                    dateLabel,
                    score: avg,
                },
                ...prev,
            ]);
            setReportSubtitle(`${selectedCategory.tableLabel} · ${dateLabel}`);
        }
        setScreen("results");
    }

    function handleViewReport(row: PreviousSessionRow) {
        const cat = getVisaInterviewCategoryById(row.categoryId);
        setResults(buildPreviewSessionResults(row.score));
        setReportSubtitle(cat ? `${cat.tableLabel} · ${row.dateLabel}` : `Session · ${row.dateLabel}`);
        setScreen("results");
    }

    function handleRestart() {
        setQuestions([]);
        setResults([]);
        setReportSubtitle(undefined);
        setSelectedCategory(null);
        setScreen("hub");
    }

    const showChannelTabs =
        interviewChannel === "live" ||
        (interviewChannel === "ai" && (screen === "hub" || screen === "setup"));

    const needsSrOnlyPageH1 =
        !showChannelTabs && interviewChannel === "ai" && (screen === "interview" || screen === "results");

    return (
        <div className="pb-10">
            {needsSrOnlyPageH1 && <h1 className="sr-only">Visa interview — AI mock interview</h1>}
            {showChannelTabs && (
                <InterviewModeTabs value={interviewChannel} onChange={handleInterviewChannelChange} />
            )}

            {interviewChannel === "ai" && screen === "hub" && (
                <MockInterviewCenter
                    onSelectCategory={handleSelectCategory}
                    previousSessions={previousSessions}
                    onViewReport={handleViewReport}
                />
            )}

            {interviewChannel === "ai" && screen === "setup" && selectedCategory && (
                <SetupScreen
                    category={selectedCategory}
                    onBackToHub={handleBackToHub}
                    onStart={handleStart}
                />
            )}

            {interviewChannel === "ai" && screen === "interview" && selectedCategory && (
                <InterviewScreen
                    questions={questions}
                    country={selectedCountry}
                    inputMode={inputMode}
                    visaCategoryLabel={selectedCategory.cardTitle}
                    onFinish={handleFinish}
                    onExit={handleRestart}
                />
            )}

            {interviewChannel === "ai" && screen === "results" && (
                <ResultsScreen results={results} reportSubtitle={reportSubtitle} onRestart={handleRestart} />
            )}

            {interviewChannel === "live" && screen !== "interview" && screen !== "results" && (
                <LiveVideoSetup />
            )}
        </div>
    );
}
