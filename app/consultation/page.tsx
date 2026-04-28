"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import {
    Calendar01Icon,
    ArrowLeft01Icon,
    ArrowRight01Icon,
    CheckmarkCircle01Icon,
    CreditCardIcon,
    Message01Icon,
    Shield01Icon,
    SparklesIcon,
    CameraVideoIcon,
} from "hugeicons-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type ConsultationType = "visa" | "admissions" | "scholarship" | "documents";
type PricingModel = "single" | "priority" | "bundle";
type FormStep = 1 | 2 | 3 | 4;

const consultationTypes: {
    id: ConsultationType;
    label: string;
    duration: string;
    description: string;
    icon: typeof CameraVideoIcon;
}[] = [
        {
            id: "visa",
            label: "Visa Strategy",
            duration: "45 min",
            description: "Interview prep, refusal review, financial proof guidance.",
            icon: Shield01Icon,
        },
        {
            id: "admissions",
            label: "Admissions Advisory",
            duration: "60 min",
            description: "School shortlist, profile positioning, application roadmap.",
            icon: SparklesIcon,
        },
        {
            id: "scholarship",
            label: "Scholarship Planning",
            duration: "45 min",
            description: "Funding strategy, eligibility matching, timeline planning.",
            icon: CreditCardIcon,
        },
        {
            id: "documents",
            label: "Document Review",
            duration: "30 min",
            description: "SOP, CV, transcript review, and document gap check.",
            icon: Message01Icon,
        },
    ];

const pricingPlans: {
    id: PricingModel;
    name: string;
    price: string;
    highlight?: boolean;
    note: string;
    features: string[];
}[] = [
        {
            id: "single",
            name: "Single Session",
            price: "GHS 150",
            note: "One focused consultation.",
            features: ["1 live session", "Booking confirmation", "Session notes"],
        },
        {
            id: "priority",
            name: "Priority Session",
            price: "GHS 250",
            highlight: true,
            note: "Faster scheduling, deeper support.",
            features: ["Priority slot", "1 live session", "3-day follow-up Q&A"],
        },
        {
            id: "bundle",
            name: "3-Session Bundle",
            price: "GHS 400",
            note: "Admissions + visa prep together.",
            features: ["3 live sessions", "Progress tracking", "Personal action plan"],
        },
    ];

const availableDays = [
    "Mon, Apr 28",
    "Tue, Apr 29",
    "Wed, Apr 30",
    "Thu, May 1",
    "Fri, May 2",
];

const timeSlots = [
    "9:00 AM",
    "10:30 AM",
    "12:00 PM",
    "2:00 PM",
    "4:30 PM",
    "6:00 PM",
];

const formSteps: { id: FormStep; label: string }[] = [
    { id: 1, label: "Type" },
    { id: 2, label: "Schedule" },
    { id: 3, label: "Pricing" },
    { id: 4, label: "Details" },
];

export default function ConsultationPage() {
    const [currentStep, setCurrentStep] = useState<FormStep>(1);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedType, setSelectedType] = useState<ConsultationType>("visa");
    const [selectedPlan, setSelectedPlan] = useState<PricingModel>("priority");
    const [selectedDay, setSelectedDay] = useState(availableDays[1]);
    const [selectedTime, setSelectedTime] = useState(timeSlots[3]);
    const [notes, setNotes] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const activeType = useMemo(
        () => consultationTypes.find((item) => item.id === selectedType) ?? consultationTypes[0],
        [selectedType]
    );
    const activePlan = useMemo(
        () => pricingPlans.find((item) => item.id === selectedPlan) ?? pricingPlans[0],
        [selectedPlan]
    );

    function canAdvance(step: FormStep) {
        if (step === 1) return !!selectedType;
        if (step === 2) return !!selectedDay && !!selectedTime;
        if (step === 3) return !!selectedPlan;
        return !!fullName.trim() && !!email.trim() && !!phone.trim();
    }

    function goToNextStep() {
        if (!canAdvance(currentStep) || currentStep === 4) return;
        setCurrentStep((prev) => (prev + 1) as FormStep);
    }

    function goToPreviousStep() {
        if (currentStep === 1) return;
        setCurrentStep((prev) => (prev - 1) as FormStep);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!canAdvance(4)) return;
        setSubmitted(true);
    }

    function resetForm() {
        setSubmitted(false);
        setFullName("");
        setEmail("");
        setPhone("");
        setSelectedType("visa");
        setSelectedPlan("priority");
        setSelectedDay(availableDays[1]);
        setSelectedTime(timeSlots[3]);
        setNotes("");
        setCurrentStep(1);
    }

    return (
        <>
            <Navbar />
            <main className="flex-1 bg-surface pb-16 pt-8">
                <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    {!submitted && (
                        <div className="mb-6">
                            <h1 className="text-xl font-semibold text-text-primary">Book a consultation</h1>
                            <p className="mt-1 text-sm text-text-secondary">
                                Pick a session type, choose a time, and confirm your booking.
                            </p>
                        </div>
                    )}

                    {!submitted ? (
                        <div className="grid gap-6 lg:grid-cols-12 items-start">
                            {/* Form column */}
                            <div className="lg:col-span-8 rounded-xl border border-border bg-white overflow-hidden">
                                {/* Step indicator */}
                                <div className="bg-surface/50 border-b border-border p-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        {formSteps.map((step, i) => {
                                            const isCompleted = currentStep > step.id;
                                            const isCurrent = currentStep === step.id;
                                            return (
                                                <div key={step.id} className="flex flex-col items-center relative z-10 w-full">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (isCompleted) setCurrentStep(step.id);
                                                        }}
                                                        className={cn(
                                                            "flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 relative",
                                                            isCurrent && "bg-primary text-white",
                                                            isCompleted && "bg-primary/10 text-primary cursor-pointer",
                                                            !isCurrent && !isCompleted && "border-2 border-border text-text-muted bg-white"
                                                        )}
                                                    >
                                                        {step.id}
                                                    </button>
                                                    <span className={cn(
                                                        "mt-2 text-[10px] font-bold uppercase tracking-wider hidden sm:block transition-colors",
                                                        isCurrent ? "text-primary" : isCompleted ? "text-text-primary" : "text-text-muted"
                                                    )}>
                                                        {step.label}
                                                    </span>

                                                    {/* Connecting Line */}
                                                    {i < formSteps.length - 1 && (
                                                        <div className="absolute top-4 left-[50%] right-[-50%] h-[2px] -z-10 bg-border">
                                                            <div className={cn(
                                                                "h-full bg-primary transition-all duration-500",
                                                                isCompleted ? "w-full" : "w-0"
                                                            )} />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="p-5 sm:p-6">
                                    {/* Step 1: Consultation type */}
                                    {currentStep === 1 && (
                                        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div>
                                                <h2 className="text-lg font-bold text-text-primary">What do you need help with?</h2>
                                                <p className="mt-1 text-xs text-text-secondary">Select the primary focus of your session.</p>
                                            </div>

                                            <div className="space-y-2">
                                                {consultationTypes.map((type) => {
                                                    const Icon = type.icon;
                                                    const isActive = selectedType === type.id;
                                                    return (
                                                        <button
                                                            key={type.id}
                                                            type="button"
                                                            onClick={() => setSelectedType(type.id)}
                                                            className={cn(
                                                                "group w-full flex items-start gap-3.5 rounded-xl border-2 p-4 text-left transition-all duration-200 cursor-pointer",
                                                                isActive
                                                                    ? "border-primary bg-primary/5"
                                                                    : "border-border hover:border-primary/30"
                                                            )}
                                                        >
                                                            {/* Radio */}
                                                            <div className={cn(
                                                                "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                                                                isActive ? "border-primary bg-primary" : "border-border group-hover:border-primary/40"
                                                            )}>
                                                                {isActive && <div className="h-2 w-2 rounded-full bg-white" />}
                                                            </div>

                                                            {/* Icon */}
                                                            <div className={cn(
                                                                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                                                                isActive ? "bg-primary text-white" : "bg-surface text-text-secondary group-hover:text-primary"
                                                            )}>
                                                                <Icon size={18} />
                                                            </div>

                                                            {/* Content */}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center justify-between gap-2">
                                                                    <span className="text-sm font-semibold text-text-primary">{type.label}</span>
                                                                    <span className={cn(
                                                                        "shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold",
                                                                        isActive ? "bg-primary/10 text-primary" : "bg-surface text-text-muted"
                                                                    )}>
                                                                        {type.duration}
                                                                    </span>
                                                                </div>
                                                                <p className="mt-0.5 text-xs text-text-secondary leading-relaxed">
                                                                    {type.description}
                                                                </p>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Schedule */}
                                    {currentStep === 2 && (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div>
                                                <h2 className="text-lg font-bold text-text-primary">When should we meet?</h2>
                                                <p className="mt-1 text-xs text-text-secondary">All times are in your local timezone.</p>
                                            </div>

                                            {/* Date selector — calendar strip */}
                                            <div>
                                                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">Pick a day</p>
                                                <div className="flex gap-2">
                                                    {availableDays.map((day) => {
                                                        const [dayName, dateStr] = day.split(", ");
                                                        const parts = dateStr.trim().split(" ");
                                                        const month = parts[0];
                                                        const num = parts[1];
                                                        const isActive = selectedDay === day;
                                                        return (
                                                            <button
                                                                key={day}
                                                                type="button"
                                                                onClick={() => setSelectedDay(day)}
                                                                className={cn(
                                                                    "flex-1 flex flex-col items-center gap-0.5 py-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer",
                                                                    isActive
                                                                        ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                                                                        : "border-border bg-white text-text-secondary hover:border-primary/40"
                                                                )}
                                                            >
                                                                <span className={cn("text-[10px] font-semibold uppercase tracking-wide", isActive ? "text-white/70" : "text-text-muted")}>{dayName}</span>
                                                                <span className={cn("text-xl font-black", isActive ? "text-white" : "text-text-primary")}>{num}</span>
                                                                <span className={cn("text-[10px] font-medium", isActive ? "text-white/70" : "text-text-muted")}>{month}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Time selector — grouped by period */}
                                            <div>
                                                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">Pick a time</p>
                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-text-muted">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                                                            Morning
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {timeSlots.filter(s => s.includes("AM")).map((slot) => (
                                                                <button
                                                                    key={slot}
                                                                    type="button"
                                                                    onClick={() => setSelectedTime(slot)}
                                                                    className={cn(
                                                                        "rounded-lg border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer",
                                                                        selectedTime === slot
                                                                            ? "border-primary bg-primary/10 text-primary"
                                                                            : "border-border text-text-secondary hover:border-primary/30"
                                                                    )}
                                                                >
                                                                    {slot}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-text-muted">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                                            Afternoon
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {timeSlots.filter(s => s.includes("PM")).map((slot) => (
                                                                <button
                                                                    key={slot}
                                                                    type="button"
                                                                    onClick={() => setSelectedTime(slot)}
                                                                    className={cn(
                                                                        "rounded-lg border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer",
                                                                        selectedTime === slot
                                                                            ? "border-primary bg-primary/10 text-primary"
                                                                            : "border-border text-text-secondary hover:border-primary/30"
                                                                    )}
                                                                >
                                                                    {slot}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Pricing */}
                                    {currentStep === 3 && (
                                        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div>
                                                <h2 className="text-lg font-bold text-text-primary">Choose your package</h2>
                                                <p className="mt-1 text-xs text-text-secondary">All plans include a confirmation email and session notes.</p>
                                            </div>

                                            <div className="space-y-3">
                                                {pricingPlans.map((plan) => {
                                                    const isActive = selectedPlan === plan.id;
                                                    return (
                                                        <button
                                                            key={plan.id}
                                                            type="button"
                                                            onClick={() => setSelectedPlan(plan.id)}
                                                            className={cn(
                                                                "relative w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200 cursor-pointer group",
                                                                isActive
                                                                    ? "border-primary bg-primary/5 shadow-md"
                                                                    : "border-border bg-white hover:border-primary/30",
                                                                plan.highlight && !isActive && "border-accent/40"
                                                            )}
                                                        >
                                                            {/* Radio indicator */}
                                                            <div className={cn(
                                                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                                                                isActive ? "border-primary bg-primary" : "border-border group-hover:border-primary/40"
                                                            )}>
                                                                {isActive && <div className="h-2 w-2 rounded-full bg-white" />}
                                                            </div>

                                                            {/* Plan info */}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2">
                                                                    <h3 className="text-sm font-bold text-text-primary">{plan.name}</h3>
                                                                    {plan.highlight && (
                                                                        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">Popular</span>
                                                                    )}
                                                                </div>
                                                                <p className="mt-0.5 text-xs text-text-secondary">{plan.note}</p>
                                                                <div className="mt-2 flex flex-wrap gap-1.5">
                                                                    {plan.features.map((f) => (
                                                                        <span key={f} className="inline-flex items-center gap-1 rounded-md bg-surface px-2 py-0.5 text-[10px] font-medium text-text-secondary border border-border/50">
                                                                            <CheckmarkCircle01Icon size={10} className="text-accent" />
                                                                            {f}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Price */}
                                                            <div className="shrink-0 text-right">
                                                                <span className={cn("text-xl font-black", isActive ? "text-primary" : "text-text-primary")}>
                                                                    {plan.price.split(" ")[1]}
                                                                </span>
                                                                <span className="block text-[10px] font-medium text-text-muted">{plan.price.split(" ")[0]}</span>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 4: Contact details */}
                                    {currentStep === 4 && (
                                        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div>
                                                <h2 className="text-lg font-bold text-text-primary">Final details</h2>
                                                <p className="mt-1 text-xs text-text-secondary">Tell us a bit about yourself to finalize the booking.</p>
                                            </div>

                                            <div className="grid gap-4 sm:grid-cols-2 bg-surface p-5 rounded-2xl border border-border">
                                                <Input
                                                    label="Full name"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    placeholder="Ernest Owusu Darko"
                                                    required
                                                />
                                                <Input
                                                    label="Email address"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="you@example.com"
                                                    required
                                                />
                                                <div className="sm:col-span-2">
                                                    <Input
                                                        label="Phone number"
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder="0240 067 412"
                                                        required
                                                    />
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="consultation-notes" className="mb-1 block text-sm font-bold text-text-primary">
                                                        Additional notes (Optional)
                                                    </label>
                                                    <textarea
                                                        id="consultation-notes"
                                                        rows={3}
                                                        value={notes}
                                                        onChange={(e) => setNotes(e.target.value)}
                                                        placeholder="Share your current stage, target country, or specific questions..."
                                                        className="w-full rounded-xl border border-border bg-white p-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Navigation */}
                                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                                        <button
                                            type="button"
                                            onClick={goToPreviousStep}
                                            disabled={currentStep === 1}
                                            className="inline-flex h-10 items-center gap-1.5 rounded-lg px-4 text-sm font-bold text-text-secondary transition-all hover:bg-surface disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
                                        >
                                            <ArrowLeft01Icon size={16} />
                                            Back
                                        </button>

                                        {currentStep < 4 ? (
                                            <button
                                                type="button"
                                                onClick={goToNextStep}
                                                disabled={!canAdvance(currentStep)}
                                                className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-dark hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                                            >
                                                Continue
                                                <ArrowRight01Icon size={16} />
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={!canAdvance(4)}
                                                className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-accent px-6 text-sm font-bold text-white shadow-md shadow-accent/20 transition-all hover:bg-accent-dark hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                                            >
                                                <CheckmarkCircle01Icon size={16} />
                                                Confirm Booking
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* Sidebar summary */}
                            <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
                                <div className="rounded-xl border border-border bg-white overflow-hidden">
                                    <div className="border-b border-border px-4 py-3">
                                        <h3 className="text-[13px] font-semibold text-text-primary">Booking summary</h3>
                                    </div>

                                    <div className="divide-y divide-border">
                                        <div className="flex items-center justify-between px-4 py-3">
                                            <div>
                                                <p className="text-[11px] text-text-muted">Session</p>
                                                <p className="text-sm font-medium text-text-primary">{activeType.label}</p>
                                            </div>
                                            <span className="rounded-md bg-primary/8 px-2 py-0.5 text-[11px] font-semibold text-primary">{activeType.duration}</span>
                                        </div>

                                        <div className="px-4 py-3">
                                            <p className="text-[11px] text-text-muted">Date & time</p>
                                            <p className="text-sm font-medium text-text-primary">{selectedDay}, {selectedTime}</p>
                                        </div>

                                        <div className="flex items-center justify-between px-4 py-3">
                                            <div>
                                                <p className="text-[11px] text-text-muted">Package</p>
                                                <p className="text-sm font-medium text-text-primary">{activePlan.name}</p>
                                            </div>
                                            <span className="text-sm font-semibold text-text-primary">{activePlan.price}</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-border bg-surface px-4 py-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-text-secondary">Total</span>
                                            <span className="text-base font-semibold text-text-primary">{activePlan.price}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-border bg-white px-4 py-4">
                                    <p className="text-[13px] font-semibold text-text-primary mb-3">What to expect</p>
                                    <ul className="space-y-2 text-xs text-text-secondary">
                                        <li className="flex gap-2">
                                            <CheckmarkCircle01Icon size={14} className="text-accent shrink-0 mt-px" />
                                            Email confirmation with Google Meet / Zoom link.
                                        </li>
                                        <li className="flex gap-2">
                                            <CheckmarkCircle01Icon size={14} className="text-accent shrink-0 mt-px" />
                                            Free rescheduling up to 24 hours prior.
                                        </li>
                                        <li className="flex gap-2">
                                            <CheckmarkCircle01Icon size={14} className="text-accent shrink-0 mt-px" />
                                            Actionable session notes sent afterwards.
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    ) : (
                        /* Confirmation Screen */
                        <div className="mx-auto max-w-2xl text-center mt-6 animate-in zoom-in-95 duration-500">
                            <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                                <div className="absolute inset-0 animate-ping rounded-full bg-accent/20" />
                                <CheckmarkCircle01Icon size={32} className="text-accent" />
                            </div>

                            <h2 className="text-2xl font-black text-text-primary md:text-3xl">
                                Booking Confirmed!
                            </h2>
                            <p className="mt-3 text-sm text-text-secondary">
                                Awesome, <span className="font-bold text-text-primary">{fullName.split(' ')[0]}</span>. Your <span className="font-bold text-primary">{activeType.label}</span> session is securely booked.
                            </p>

                            <div className="mx-auto mt-8 max-w-md rounded-xl border border-border bg-white p-6 text-left">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-5">Booking Details</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <Calendar01Icon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-semibold text-text-muted">Date & Time</p>
                                            <p className="text-sm font-bold text-text-primary">{selectedDay} <span className="text-text-muted mx-1">•</span> {selectedTime}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                            <CreditCardIcon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-semibold text-text-muted">Package Total</p>
                                            <p className="text-sm font-bold text-text-primary">{activePlan.name} <span className="text-text-muted mx-1">•</span> <span className="text-accent">{activePlan.price}</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-xl bg-surface p-3 text-center">
                                    <p className="text-xs text-text-secondary">
                                        We&apos;ve sent a calendar invitation to <strong className="text-text-primary">{email}</strong>.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Link
                                    href="/dashboard"
                                    className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-dark hover:scale-105"
                                >
                                    Go to Dashboard
                                </Link>
                                <button
                                    onClick={resetForm}
                                    className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-lg border-2 border-border bg-white px-6 text-sm font-bold text-text-secondary transition-all hover:border-primary/30 hover:text-primary"
                                >
                                    Book Another
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}