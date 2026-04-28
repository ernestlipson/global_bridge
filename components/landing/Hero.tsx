import {
    GraduationScrollIcon,
    GlobeIcon,
    Shield01Icon,
    ArrowRight01Icon,
    SparklesIcon,
    CheckmarkCircle01Icon,
} from "hugeicons-react";
import Image from "next/image";
import Link from "next/link";

const destinationFlags = [
    {
        country: "United Kingdom",
        code: "UK",
        src: "https://cdn.countryflags.com/thumbs/united-kingdom/flag-square-500.png",
    },
    {
        country: "United States",
        code: "USA",
        src: "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-500.png",
    },
    {
        country: "Canada",
        code: "CAN",
        src: "https://cdn.countryflags.com/thumbs/canada/flag-square-500.png",
    },
    {
        country: "Australia",
        code: "AUS",
        src: "https://cdn.countryflags.com/thumbs/australia/flag-square-500.png",
    },
    {
        country: "Germany",
        code: "DEU",
        src: "https://cdn.countryflags.com/thumbs/germany/flag-square-500.png",
    },
    {
        country: "United Arab Emirates",
        code: "UAE",
        src: "https://cdn.countryflags.com/thumbs/united-arab-emirates/flag-square-500.png",
    },
];

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
                            <SparklesIcon size={15} />
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
                                    <CheckmarkCircle01Icon
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
                                href="/dashboard"
                                className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-emerald-500 px-7 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:from-accent-dark hover:to-emerald-600 hover:shadow-xl hover:shadow-accent/30"
                            >
                                Get Started Free
                                <ArrowRight01Icon size={18} />
                            </Link>
                            <a
                                href="#how-it-works"
                                className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-white px-7 text-base font-medium text-text-primary transition-colors hover:bg-surface"
                            >
                                See How It Works
                            </a>
                        </div>

                        {/* Destination flags */}
                        <div className="mt-8">
                            <span className="text-sm text-text-muted">Destinations:</span>
                            <div className="mt-3 flex flex-wrap items-start gap-x-4 gap-y-3">
                                {destinationFlags.map((item) => (
                                    <div
                                        key={item.code}
                                        className="flex min-w-[56px] flex-col items-center"
                                        aria-label={`${item.country} (${item.code})`}
                                        title={item.country}
                                    >
                                        <Image
                                            src={item.src}
                                            alt={`${item.country} flag`}
                                            width={28}
                                            height={28}
                                            className="h-7 w-7 rounded-full object-cover"
                                        />
                                        <span className="mt-1 text-[11px] font-semibold tracking-wide text-text-secondary">
                                            {item.code}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right — Image panel (Orbiting Flags) */}
                    <div className="relative hidden lg:flex items-center justify-center min-h-[600px] w-full">
                        {/* Outer Ring */}
                        <div className="absolute w-[540px] h-[540px] rounded-full border border-slate-200/80" />
                        
                        {/* Outer Ring Flags */}
                        <div className="absolute w-[540px] h-[540px] pointer-events-none">
                            {/* USA - Top Left */}
                            <div className="absolute w-14 h-14 bg-white rounded-full shadow-lg p-1.5 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform hover:scale-110" style={{ top: '14.64%', left: '14.64%' }}>
                                <Image src={destinationFlags.find(f => f.code === 'USA')?.src || ''} alt="USA" width={42} height={42} className="rounded-full object-cover" />
                            </div>
                            {/* UK - Top Right */}
                            <div className="absolute w-16 h-16 bg-white rounded-full shadow-xl p-2 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform hover:scale-110" style={{ top: '14.64%', left: '85.35%' }}>
                                <Image src={destinationFlags.find(f => f.code === 'UK')?.src || ''} alt="UK" width={48} height={48} className="rounded-full object-cover" />
                            </div>
                            {/* Australia - Bottom Left */}
                            <div className="absolute w-12 h-12 bg-white rounded-full shadow-md p-1 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform hover:scale-110" style={{ top: '85.35%', left: '14.64%' }}>
                                <Image src={destinationFlags.find(f => f.code === 'AUS')?.src || ''} alt="Australia" width={36} height={36} className="rounded-full object-cover" />
                            </div>
                            {/* Canada - Bottom Right */}
                            <div className="absolute w-14 h-14 bg-white rounded-full shadow-lg p-1.5 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform hover:scale-110" style={{ top: '85.35%', left: '85.35%' }}>
                                <Image src={destinationFlags.find(f => f.code === 'CAN')?.src || ''} alt="Canada" width={42} height={42} className="rounded-full object-cover" />
                            </div>
                        </div>

                        {/* Inner Ring */}
                        <div className="absolute w-[400px] h-[400px] rounded-full border border-slate-200/80" />

                        {/* Inner Ring Flags */}
                        <div className="absolute w-[400px] h-[400px] pointer-events-none">
                            {/* Germany - Top */}
                            <div className="absolute w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center -translate-x-1/2 -translate-y-1/2 p-1.5 pointer-events-auto transition-transform hover:scale-110" style={{ top: '0%', left: '50%' }}>
                                <Image src={destinationFlags.find(f => f.code === 'DEU')?.src || ''} alt="Germany" width={36} height={36} className="rounded-full object-cover" />
                            </div>
                            {/* UAE - Bottom */}
                            <div className="absolute w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center -translate-x-1/2 -translate-y-1/2 p-1.5 pointer-events-auto transition-transform hover:scale-110" style={{ top: '100%', left: '50%' }}>
                                <Image src={destinationFlags.find(f => f.code === 'UAE')?.src || ''} alt="UAE" width={36} height={36} className="rounded-full object-cover" />
                            </div>
                        </div>

                        {/* Center Student Image */}
                        <div className="relative z-10 w-[280px] h-[280px] rounded-full overflow-hidden border-[6px] border-white shadow-2xl shadow-[#1f639b]/20 bg-slate-100">
                            <Image
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=500&fit=crop&crop=faces"
                                alt="Student studying abroad"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        
                        {/* Decorative floating dots */}
                        <div className="absolute w-3 h-3 bg-red-400 rounded-full shadow-lg shadow-red-400/50" style={{ top: '30%', right: '22%' }} />
                        <div className="absolute w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" style={{ bottom: '28%', left: '22%' }} />
                        <div className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full" style={{ top: '25%', left: '32%' }} />
                    </div>
                </div>

                {/* Stats row — mobile only (visible below hero on smaller screens) */}
                <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border/60 pt-8 lg:hidden">
                    <div className="flex flex-col items-center gap-1">
                        <GraduationScrollIcon
                            size={20}
                            className="mb-1 text-primary"
                            aria-hidden="true"
                        />
                        <span className="text-xl font-bold text-text-primary">500+</span>
                        <span className="text-xs text-text-muted">Universities</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <GlobeIcon
                            size={20}
                            className="mb-1 text-primary"
                            aria-hidden="true"
                        />
                        <span className="text-xl font-bold text-text-primary">50+</span>
                        <span className="text-xs text-text-muted">Countries</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Shield01Icon
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
