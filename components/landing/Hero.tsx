import {
    GraduationCap,
    Globe,
    Shield,
    ArrowRight,
    Sparkles,
    CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const badges = ["UK", "USA", "Canada", "Europe", "Australia", "Dubai"];

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-white">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
                <div className="absolute top-60 -left-32 h-[400px] w-[400px] rounded-full bg-accent/[0.04] blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left — Text content */}
                    <div className="max-w-xl">
                        {/* Trust badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-light/50 px-4 py-1.5 text-sm font-medium text-accent-dark">
                            <Sparkles size={15} />
                            AI-Powered Study Abroad Platform
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-[3.5rem]">
                            Study &amp; Succeed{" "}
                            <span className="relative inline-block text-primary">
                                Abroad
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 200 12"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M2 8c40-6 80-6 196-1"
                                        stroke="#16A34A"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                            Your trusted pathway to global education opportunities. We help
                            students secure admissions, scholarships, and visas with expert
                            guidance and AI-powered tools.
                        </p>

                        {/* Quick benefits */}
                        <ul className="mt-6 space-y-2.5">
                            {[
                                "AI-powered visa interview preparation",
                                "Smart university & scholarship matching",
                                "SOP, CV & document building tools",
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-2.5 text-sm text-text-secondary"
                                >
                                    <CheckCircle
                                        size={17}
                                        className="shrink-0 text-accent"
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* CTAs */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/register"
                                className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-emerald-500 px-7 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:from-accent-dark hover:to-emerald-600 hover:shadow-xl hover:shadow-accent/30"
                            >
                                Get Started Free
                                <ArrowRight size={18} />
                            </Link>
                            <a
                                href="#how-it-works"
                                className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-white px-7 text-base font-medium text-text-primary transition-colors hover:bg-surface"
                            >
                                See How It Works
                            </a>
                        </div>

                        {/* Destination badges */}
                        <div className="mt-8 flex flex-wrap items-center gap-2">
                            <span className="text-sm text-text-muted">Destinations:</span>
                            {badges.map((badge) => (
                                <span
                                    key={badge}
                                    className="rounded-full border border-border bg-white px-3 py-0.5 text-xs font-medium text-text-secondary shadow-sm"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right — Image panel */}
                    <div className="relative hidden lg:block">
                        {/* Main image */}
                        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-primary/10">
                            <Image
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=1000&fit=crop&crop=faces"
                                alt="Happy students studying abroad together"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 0vw, 50vw"
                                priority
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent" />

                            {/* Floating stat card */}
                            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 backdrop-blur-sm p-4 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-text-muted">
                                            Visa Success Rate
                                        </p>
                                        <p className="text-2xl font-bold text-primary">95%</p>
                                    </div>
                                    <div className="h-10 w-px bg-border" />
                                    <div>
                                        <p className="text-xs font-medium text-text-muted">
                                            Universities
                                        </p>
                                        <p className="text-2xl font-bold text-primary">500+</p>
                                    </div>
                                    <div className="h-10 w-px bg-border" />
                                    <div>
                                        <p className="text-xs font-medium text-text-muted">
                                            Countries
                                        </p>
                                        <p className="text-2xl font-bold text-primary">50+</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Small floating card — top right */}
                        <div className="absolute -top-4 -right-4 z-10 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lg border border-border/40">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                                <Shield size={20} className="text-accent" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-text-primary">
                                    Visa Approved
                                </p>
                                <p className="text-xs text-text-muted">Just now · UK</p>
                            </div>
                        </div>

                        {/* Small floating card — left */}
                        <div className="absolute top-1/3 -left-8 z-10 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lg border border-border/40">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <GraduationCap size={20} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-text-primary">
                                    Admitted!
                                </p>
                                <p className="text-xs text-text-muted">Oxford · UK</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats row — mobile only (visible below hero on smaller screens) */}
                <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border/60 pt-8 lg:hidden">
                    <div className="flex flex-col items-center gap-1">
                        <GraduationCap
                            size={20}
                            className="mb-1 text-primary"
                            aria-hidden="true"
                        />
                        <span className="text-xl font-bold text-text-primary">500+</span>
                        <span className="text-xs text-text-muted">Universities</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Globe
                            size={20}
                            className="mb-1 text-primary"
                            aria-hidden="true"
                        />
                        <span className="text-xl font-bold text-text-primary">50+</span>
                        <span className="text-xs text-text-muted">Countries</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Shield
                            size={20}
                            className="mb-1 text-primary"
                            aria-hidden="true"
                        />
                        <span className="text-xl font-bold text-text-primary">95%</span>
                        <span className="text-xs text-text-muted">Visa Success</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
