"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import {
    Calendar01Icon,
    ArrowLeft01Icon,
    ArrowRight01Icon,
    CheckmarkCircle01Icon,
    Clock01Icon,
    CreditCardIcon,
    Message01Icon,
    Shield01Icon,
    SparklesIcon,
    AiUserIcon,
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
            label: "Visa Strategy Session",
            duration: "45 min",
            description: "Interview prep, refusal review, financial proof guidance, and embassy readiness.",
            icon: Shield01Icon,
        },
        {
            id: "admissions",
            label: "Admissions Advisory",
            duration: "60 min",
            description: "School shortlist review, profile positioning, and application roadmap planning.",
            icon: SparklesIcon,
        },
        {
            id: "scholarship",
            label: "Scholarship Planning",
            duration: "45 min",
            description: "Funding strategy, eligibility matching, and timeline planning for scholarship cycles.",
            icon: CreditCardIcon,
        },
        {
            id: "documents",
            label: "Document Review",
            duration: "30 min",
            description: "SOP, CV, transcript positioning, and document gap review before submission.",
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
            note: "Best for one focused consultation.",
            features: ["1 live session", "Booking confirmation", "Session notes summary"],
        },
        {
            id: "priority",
            name: "Priority Session",
            price: "GHS 250",
            highlight: true,
            note: "Faster scheduling with deeper advisory support.",
            features: ["Priority slot", "1 live session", "Follow-up Q&A for 3 days"],
        },
        {
            id: "bundle",
            name: "3-Session Bundle",
            price: "GHS 400",
            note: "For students managing admissions and visa preparation together.",
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

const formSteps: { id: FormStep; label: string; description: string }[] = [
    { id: 1, label: "Consultation", description: "Choose the support you need" },
    { id: 2, label: "Schedule", description: "Select a day and time" },
    { id: 3, label: "Pricing", description: "Pick your package" },
    { id: 4, label: "Details", description: "Add your contact info" },
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
    const progress = (currentStep / formSteps.length) * 100;
    const currentStepMeta = formSteps[currentStep - 1];

    function canAdvance(step: FormStep) {
        if (step === 1) return !!selectedType;
        if (step === 2) return !!selectedDay && !!selectedTime;
        if (step === 3) return !!selectedPlan;
        return !!fullName.trim() && !!email.trim() && !!phone.trim();
    }

    function goToNextStep() {
        if (!canAdvance(currentStep) || currentStep === 4) {
            return;
        }

        setCurrentStep((prev) => (prev + 1) as FormStep);
    }

    function goToPreviousStep() {
        if (currentStep === 1) {
            return;
        }

        setCurrentStep((prev) => (prev - 1) as FormStep);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!canAdvance(4)) {
            return;
        }
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
            <main className="flex-1 bg-[radial-gradient(circle_at_top_left,_rgba(12,59,124,0.08),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_45%,_#f8fafc_100%)]">
                <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] xl:gap-12">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                                <Calendar01Icon size={14} />
                                Book Your Consultation
                            </div>
                            <h1 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                                Schedule a guided session with a GlobalBridge advisor.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
                                Pick the kind of support you need, choose a time that works for you,
                                and lock in the pricing model that matches your journey.
                            </p>

                            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-border bg-white/90 p-4 shadow-sm">
                                    <Clock01Icon size={18} className="text-primary" />
                                    <p className="mt-3 text-sm font-semibold text-text-primary">Flexible Slots</p>
                                    <p className="mt-1 text-sm text-text-muted">Morning and evening sessions for student schedules.</p>
                                </div>
                                <div className="rounded-2xl border border-border bg-white/90 p-4 shadow-sm">
                                    <CameraVideoIcon size={18} className="text-accent" />
                                    <p className="mt-3 text-sm font-semibold text-text-primary">Live Advisory</p>
                                    <p className="mt-1 text-sm text-text-muted">One-on-one consultation tailored to your study abroad goals.</p>
                                </div>
                                <div className="rounded-2xl border border-border bg-white/90 p-4 shadow-sm">
                                    <CreditCardIcon size={18} className="text-warning" />
                                    <p className="mt-3 text-sm font-semibold text-text-primary">Clear Pricing</p>
                                    <p className="mt-1 text-sm text-text-muted">Choose a single session, priority slot, or bundle.</p>
                                </div>
                            </div>

                            <div className="mt-8 rounded-3xl border border-primary/10 bg-white/90 p-5 shadow-sm sm:p-6">
                                <h2 className="text-lg font-semibold text-text-primary">Consultation Details</h2>
                                <p className="mt-2 text-sm leading-6 text-text-secondary">
                                    Your selected session is <span className="font-semibold text-text-primary">{activeType.label}</span>,
                                    scheduled for <span className="font-semibold text-text-primary">{selectedDay}</span> at <span className="font-semibold text-text-primary">{selectedTime}</span>.
                                    You are booking the <span className="font-semibold text-text-primary">{activePlan.name}</span> package at <span className="font-semibold text-primary">{activePlan.price}</span>.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-border bg-white/95 p-5 shadow-[0_22px_70px_-24px_rgba(12,59,124,0.35)] backdrop-blur sm:p-6 lg:sticky lg:top-24 lg:h-fit">
                            {!submitted ? (
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <h2 className="text-xl font-semibold text-text-primary">Reserve your slot</h2>
                                        <p className="mt-1 text-sm text-text-secondary">
                                            Complete the form in steps. This is a booking UI with dummy data for now.
                                        </p>
                                    </div>

                                    <div className="space-y-4 rounded-2xl border border-border bg-surface/80 p-4">
                                        <div className="flex items-center justify-between text-xs font-medium text-text-muted">
                                            <span>
                                                Step {currentStep} of {formSteps.length}
                                            </span>
                                            <span>{Math.round(progress)}% complete</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-border">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <div className="rounded-xl border border-primary/20 bg-white p-3.5 sm:p-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-start gap-3">
                                                    <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                                                        {currentStepMeta.id}
                                                    </span>
                                                    <div>
                                                        <p className="text-sm font-semibold text-text-primary">
                                                            {currentStepMeta.label}
                                                        </p>
                                                        <p className="mt-0.5 text-xs leading-5 text-text-secondary">
                                                            {currentStepMeta.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                                                    Current
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {currentStep === 1 && (
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-text-primary">Consultation type</label>
                                                <p className="mt-1 text-sm text-text-secondary">
                                                    Start with the service that best matches the decision you need help making.
                                                </p>
                                            </div>
                                            <div className="grid gap-3">
                                                {consultationTypes.map((type) => {
                                                    const Icon = type.icon;
                                                    const isActive = selectedType === type.id;
                                                    return (
                                                        <button
                                                            key={type.id}
                                                            type="button"
                                                            onClick={() => setSelectedType(type.id)}
                                                            className={cn(
                                                                "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all",
                                                                isActive
                                                                    ? "border-primary bg-primary/5 shadow-sm"
                                                                    : "border-border bg-surface hover:border-primary/25 hover:bg-white"
                                                            )}
                                                        >
                                                            <div className={cn(
                                                                "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                                                                isActive ? "bg-primary text-white" : "bg-white text-primary"
                                                            )}>
                                                                <Icon size={18} />
                                                            </div>
                                                            <div>
                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    <span className="text-sm font-semibold text-text-primary">{type.label}</span>
                                                                    <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-text-muted">{type.duration}</span>
                                                                </div>
                                                                <p className="mt-1 text-sm leading-6 text-text-secondary">{type.description}</p>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 2 && (
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-text-primary">Preferred day</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {availableDays.map((day) => (
                                                        <button
                                                            key={day}
                                                            type="button"
                                                            onClick={() => setSelectedDay(day)}
                                                            className={cn(
                                                                "rounded-xl border px-3 py-2.5 text-sm transition-colors",
                                                                selectedDay === day
                                                                    ? "border-primary bg-primary text-white"
                                                                    : "border-border bg-surface text-text-secondary hover:border-primary/25 hover:bg-white"
                                                            )}
                                                        >
                                                            {day}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-text-primary">Preferred time</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {timeSlots.map((slot) => (
                                                        <button
                                                            key={slot}
                                                            type="button"
                                                            onClick={() => setSelectedTime(slot)}
                                                            className={cn(
                                                                "rounded-xl border px-3 py-2.5 text-sm transition-colors",
                                                                selectedTime === slot
                                                                    ? "border-accent bg-accent text-white"
                                                                    : "border-border bg-surface text-text-secondary hover:border-accent/25 hover:bg-white"
                                                            )}
                                                        >
                                                            {slot}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 3 && (
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-text-primary">Pricing model</label>
                                                <p className="mt-1 text-sm text-text-secondary">
                                                    Choose the level of support and speed that fits your current stage.
                                                </p>
                                            </div>
                                            <div className="grid gap-3">
                                                {pricingPlans.map((plan) => {
                                                    const isActive = selectedPlan === plan.id;
                                                    return (
                                                        <button
                                                            key={plan.id}
                                                            type="button"
                                                            onClick={() => setSelectedPlan(plan.id)}
                                                            className={cn(
                                                                "rounded-2xl border p-4 text-left transition-all",
                                                                isActive
                                                                    ? "border-accent bg-accent/5 shadow-sm"
                                                                    : "border-border bg-surface hover:border-accent/25 hover:bg-white",
                                                                plan.highlight && !isActive && "border-primary/20"
                                                            )}
                                                        >
                                                            <div className="flex items-start justify-between gap-3">
                                                                <div>
                                                                    <p className="text-sm font-semibold text-text-primary">{plan.name}</p>
                                                                    <p className="mt-1 text-sm text-text-secondary">{plan.note}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-base font-bold text-primary">{plan.price}</p>
                                                                    {plan.highlight && (
                                                                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                                                                            Popular
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="mt-3 flex flex-wrap gap-2">
                                                                {plan.features.map((feature) => (
                                                                    <span
                                                                        key={feature}
                                                                        className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-text-muted"
                                                                    >
                                                                        {feature}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 4 && (
                                        <div className="space-y-4">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <Input
                                                    label="Full name"
                                                    value={fullName}
                                                    onChange={(event) => setFullName(event.target.value)}
                                                    placeholder="Ernest Owusu Darko"
                                                    required
                                                />
                                                <Input
                                                    label="Email address"
                                                    type="email"
                                                    value={email}
                                                    onChange={(event) => setEmail(event.target.value)}
                                                    placeholder="you@example.com"
                                                    required
                                                />
                                            </div>
                                            <Input
                                                label="Phone number"
                                                type="tel"
                                                value={phone}
                                                onChange={(event) => setPhone(event.target.value)}
                                                placeholder="0240 067 412"
                                                required
                                            />

                                            <div>
                                                <label htmlFor="consultation-notes" className="mb-1.5 block text-sm font-medium text-text-primary">
                                                    What would you like help with?
                                                </label>
                                                <textarea
                                                    id="consultation-notes"
                                                    rows={4}
                                                    value={notes}
                                                    onChange={(event) => setNotes(event.target.value)}
                                                    placeholder="Briefly describe your current stage, target country, and what you want covered during the consultation."
                                                    className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="lg"
                                            onClick={goToPreviousStep}
                                            disabled={currentStep === 1}
                                        >
                                            <ArrowLeft01Icon size={18} />
                                            Back
                                        </Button>

                                        {currentStep < 4 ? (
                                            <Button
                                                type="button"
                                                variant="accent"
                                                size="lg"
                                                onClick={goToNextStep}
                                                disabled={!canAdvance(currentStep)}
                                            >
                                                Next Step
                                                <ArrowRight01Icon size={18} />
                                            </Button>
                                        ) : (
                                            <Button type="submit" variant="accent" size="lg">
                                                <Calendar01Icon size={18} />
                                                Confirm Booking
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-5 py-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-light text-accent">
                                        <CheckmarkCircle01Icon size={28} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold text-text-primary">Consultation booked</h2>
                                        <p className="mt-2 text-sm leading-6 text-text-secondary">
                                            Your dummy booking has been recorded for <span className="font-semibold text-text-primary">{selectedDay}</span> at <span className="font-semibold text-text-primary">{selectedTime}</span>.
                                            We&apos;ve reserved a <span className="font-semibold text-text-primary">{activeType.label}</span> under the <span className="font-semibold text-text-primary">{activePlan.name}</span> plan.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-border bg-surface p-4">
                                        <div className="flex items-start gap-3">
                                            <AiUserIcon size={18} className="mt-0.5 text-primary" />
                                            <div className="space-y-1 text-sm text-text-secondary">
                                                <p><span className="font-semibold text-text-primary">Name:</span> {fullName}</p>
                                                <p><span className="font-semibold text-text-primary">Email:</span> {email}</p>
                                                <p><span className="font-semibold text-text-primary">Phone:</span> {phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-border bg-white p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Consultation</p>
                                            <p className="mt-2 text-sm font-semibold text-text-primary">{activeType.label}</p>
                                            <p className="mt-1 text-sm text-text-secondary">{activeType.duration}</p>
                                        </div>
                                        <div className="rounded-2xl border border-border bg-white p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Pricing model</p>
                                            <p className="mt-2 text-sm font-semibold text-text-primary">{activePlan.name}</p>
                                            <p className="mt-1 text-sm text-primary">{activePlan.price}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 sm:flex-row">
                                        <Button variant="accent" size="lg" onClick={resetForm}>
                                            Book Another Consultation
                                        </Button>
                                        <Link href="/dashboard">
                                            <Button variant="outline" size="lg">
                                                Return to Dashboard
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}