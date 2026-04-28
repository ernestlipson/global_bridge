"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft01Icon,
    Calendar01Icon,
    Location01Icon,
    CheckmarkCircle01Icon,
} from "hugeicons-react";
import { events } from "@/data/events";
import { Input } from "@/components/ui/Input";
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
                <div className="flex min-h-[60vh] flex-col items-center justify-center bg-surface p-4">
                    <h1 className="text-lg font-semibold text-text-primary">Event not found</h1>
                    <Link href="/" className="mt-3 text-sm text-primary hover:underline">
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
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <>
                <Navbar />
                <div className="flex min-h-[70vh] items-center justify-center bg-surface px-4">
                    <div className="w-full max-w-sm rounded-xl border border-border bg-white p-8 text-center">
                        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                            <CheckmarkCircle01Icon size={24} />
                        </div>
                        <h2 className="text-lg font-semibold text-text-primary">You&apos;re registered</h2>
                        <p className="mt-2 text-sm text-text-secondary">
                            A confirmation for <span className="font-medium text-text-primary">{event.title}</span> has been sent to your email.
                        </p>
                        <div className="mt-6 flex flex-col gap-2">
                            <button
                                onClick={() => router.push("/")}
                                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                            >
                                Back to home
                            </button>
                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                }}
                                className="rounded-lg px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
                            >
                                Edit registration
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="flex-1 bg-surface pb-16 pt-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Back link */}
                    <Link
                        href="/#events"
                        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                    >
                        <ArrowLeft01Icon size={15} />
                        Back to events
                    </Link>

                    <div className="grid gap-6 lg:grid-cols-[1fr_340px] items-start">
                        {/* Form column */}
                        <div className="rounded-xl border border-border bg-white overflow-hidden">
                            {/* Event banner */}
                            <div className="relative h-48 w-full bg-surface">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 640px"
                                    priority
                                />
                            </div>

                            <div className="p-5 sm:p-6">
                                <h1 className="text-lg font-semibold text-text-primary">{event.title}</h1>
                                <p className="mt-1 text-sm text-text-secondary">{event.summary}</p>

                                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-text-secondary">
                                    <span className="inline-flex items-center gap-1.5">
                                        <Calendar01Icon size={14} className="text-primary" />
                                        {event.dateLabel}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <Location01Icon size={14} className="text-primary" />
                                        {event.location}
                                    </span>
                                </div>

                                {/* Divider */}
                                <div className="my-6 border-t border-border" />

                                {/* Registration form */}
                                <div className="mb-1">
                                    <h2 className="text-[15px] font-semibold text-text-primary">Your details</h2>
                                    <p className="mt-0.5 text-xs text-text-muted">Fill in the form to secure your spot.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <Input
                                            label="Full name"
                                            placeholder="Ernest Owusu Darko"
                                            required
                                            name="name"
                                        />
                                        <Input
                                            label="Email address"
                                            type="email"
                                            placeholder="you@example.com"
                                            required
                                            name="email"
                                        />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <Input
                                            label="Phone number"
                                            type="tel"
                                            placeholder="+233 24 006 7412"
                                            required
                                            name="phone"
                                        />
                                        <Input
                                            label="Institution"
                                            placeholder="University of Ghana"
                                            required
                                            name="institution"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="reason" className="mb-1 block text-sm font-medium text-text-primary">
                                            Why are you attending? <span className="text-text-muted font-normal">(optional)</span>
                                        </label>
                                        <textarea
                                            id="reason"
                                            rows={3}
                                            className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                            placeholder="What you hope to learn or achieve..."
                                            name="reason"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <span className="inline-flex items-center gap-2">
                                                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                Registering...
                                            </span>
                                        ) : (
                                            "Complete registration"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-4 lg:sticky lg:top-24">
                            <div className="rounded-xl border border-border bg-white overflow-hidden">
                                <div className="border-b border-border px-4 py-3">
                                    <h3 className="text-[13px] font-semibold text-text-primary">Event details</h3>
                                </div>
                                <div className="divide-y divide-border">
                                    <div className="px-4 py-3">
                                        <p className="text-[11px] text-text-muted">Event</p>
                                        <p className="mt-0.5 text-sm font-medium text-text-primary">{event.title}</p>
                                    </div>
                                    <div className="px-4 py-3">
                                        <p className="text-[11px] text-text-muted">Date</p>
                                        <p className="mt-0.5 text-sm font-medium text-text-primary">{event.dateLabel}</p>
                                    </div>
                                    <div className="px-4 py-3">
                                        <p className="text-[11px] text-text-muted">Location</p>
                                        <p className="mt-0.5 text-sm font-medium text-text-primary">{event.location}</p>
                                    </div>
                                    <div className="px-4 py-3">
                                        <p className="text-[11px] text-text-muted">Price</p>
                                        <p className="mt-0.5 text-sm font-medium text-accent">Free</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-border bg-white px-4 py-4">
                                <p className="text-[13px] font-semibold text-text-primary mb-2.5">Good to know</p>
                                <ul className="space-y-2 text-xs text-text-secondary">
                                    <li className="flex gap-2">
                                        <CheckmarkCircle01Icon size={14} className="text-accent shrink-0 mt-px" />
                                        Confirmation email with joining details sent after registration.
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckmarkCircle01Icon size={14} className="text-accent shrink-0 mt-px" />
                                        Spots are limited; register early to guarantee attendance.
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckmarkCircle01Icon size={14} className="text-accent shrink-0 mt-px" />
                                        Recording shared with registered attendees who can&apos;t join live.
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
