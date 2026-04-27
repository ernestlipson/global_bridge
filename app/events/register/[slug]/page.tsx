"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
    ArrowLeft01Icon, 
    Calendar01Icon, 
    Location01Icon, 
    Tick01Icon,
    InformationCircleIcon
} from "hugeicons-react";
import { events } from "@/data/events";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RegisterEventPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const event = useMemo(() => {
        return events.find((e) => e.slug === slug);
    }, [slug]);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!event) {
        return (
            <>
                <Navbar />
                <div className="flex min-h-[60vh] flex-col items-center justify-center bg-surface/30 p-4">
                    <h1 className="text-2xl font-bold text-text-primary">Event not found</h1>
                    <Link href="/" className="mt-4 text-primary hover:underline">
                        Return to home
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <>
                <Navbar />
                <div className="flex min-h-[80vh] items-center justify-center bg-surface/30 p-4">
                    <div className="w-full max-w-md scale-in-center rounded-3xl bg-white p-8 text-center shadow-2xl shadow-primary/5">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success">
                            <Tick01Icon size={40} />
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-text-primary">Registration Successful!</h2>
                        <p className="mb-8 text-text-secondary">
                            Thank you for registering for <span className="font-semibold text-primary">{event.title}</span>. 
                            We've sent a confirmation email with all the details.
                        </p>
                        <Button fullWidth onClick={() => router.push("/")} size="lg">
                            Back to Home
                        </Button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-surface/30 selection:bg-primary/10">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Link 
                        href="/#events" 
                        className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-primary"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white transition-all group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-primary">
                            <ArrowLeft01Icon size={18} />
                        </div>
                        Back to Events
                    </Link>

                    <div className="grid gap-8 lg:grid-cols-12">
                        {/* Left Column: Event Info */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-24 space-y-6">
                                <div className="overflow-hidden rounded-3xl border border-border/50 bg-white shadow-xl shadow-primary/5">
                                    <div className="relative aspect-[16/10] w-full">
                                        <Image 
                                            src={event.image} 
                                            alt={event.title} 
                                            fill 
                                            className="object-cover"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute left-6 top-6 rounded-2xl bg-white/95 px-4 py-2 text-center shadow-2xl backdrop-blur-md">
                                            <span className="block text-xs font-bold uppercase tracking-widest text-primary">
                                                {event.monthLabel}
                                            </span>
                                            <span className="text-2xl font-black text-text-primary">
                                                {event.dateLabel.split(" ")[0]}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <h1 className="mb-4 text-2xl font-bold leading-tight text-text-primary">
                                            {event.title}
                                        </h1>
                                        <p className="mb-8 text-text-secondary leading-relaxed">
                                            {event.summary}
                                        </p>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 rounded-2xl bg-surface/50 p-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                                                    <Calendar01Icon size={20} />
                                                </div>
                                                <div>
                                                    <span className="block text-[10px] font-bold uppercase tracking-wider text-text-muted">Date & Time</span>
                                                    <span className="text-sm font-bold text-text-primary">{event.dateLabel}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 rounded-2xl bg-surface/50 p-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                                                    <Location01Icon size={20} />
                                                </div>
                                                <div>
                                                    <span className="block text-[10px] font-bold uppercase tracking-wider text-text-muted">Location</span>
                                                    <span className="text-sm font-bold text-text-primary">{event.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Registration Form */}
                        <div className="lg:col-span-7">
                            <div className="rounded-3xl border border-border/50 bg-white p-8 shadow-xl shadow-primary/5 sm:p-10">
                                <div className="mb-10">
                                    <h2 className="text-2xl font-bold text-text-primary">Register for this Event</h2>
                                    <p className="mt-2 text-text-secondary">
                                        Please fill out the form below to secure your spot.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Input 
                                            label="Full Name" 
                                            placeholder="John Doe" 
                                            required 
                                            name="name"
                                        />
                                        <Input 
                                            label="Email Address" 
                                            type="email" 
                                            placeholder="john@example.com" 
                                            required 
                                            name="email"
                                        />
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Input 
                                            label="Phone Number" 
                                            type="tel" 
                                            placeholder="+233 XX XXX XXXX" 
                                            required 
                                            name="phone"
                                        />
                                        <Input 
                                            label="Institution/School" 
                                            placeholder="University of Ghana" 
                                            required 
                                            name="institution"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <label className="mb-1.5 block text-sm font-medium text-text-primary">
                                            Why are you attending?
                                        </label>
                                        <textarea 
                                            className="min-h-[120px] w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="Tell us what you hope to learn or achieve..."
                                            name="reason"
                                        ></textarea>
                                    </div>

                                    <div className="rounded-2xl bg-primary/5 p-4 text-[13px] leading-relaxed text-text-secondary">
                                        <div className="mb-1 flex items-center gap-2 font-bold text-primary">
                                            <InformationCircleIcon size={16} />
                                            Note:
                                        </div>
                                        A confirmation email will be sent to your provided email address. Please make sure to check your inbox (and spam folder) for further instructions.
                                    </div>

                                    <Button 
                                        type="submit" 
                                        fullWidth 
                                        size="lg" 
                                        disabled={isLoading}
                                        className="relative h-14 overflow-hidden"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                Processing...
                                            </span>
                                        ) : (
                                            "Complete Registration"
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes scaleIn {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    .scale-in-center {
                        animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                `}</style>
            </main>
            <Footer />
        </>
    );
}
