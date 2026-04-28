import { ArrowRight01Icon, GlobeIcon, Airplane01Icon, CloudIcon } from "hugeicons-react";
import Link from "next/link";

export function CTA() {
    return (
        <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 border-t border-slate-200">
            {/* Background Pattern - Full Width */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04] text-slate-900">
                {/* Globe positioned at bottom center */}
                <div className="absolute -bottom-48 left-1/2 -translate-x-1/2">
                    <GlobeIcon size={800} strokeWidth={0.5} />
                </div>

                {/* Dotted Flight Paths */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <path d="M-100,200 Q500,-100 1200,200" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="16 16" />
                    <path d="M-50,300 Q600,0 1300,400" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" opacity="0.5" />
                </svg>

                {/* Airplanes */}
                <div className="absolute top-[10%] left-[50%] rotate-[15deg]">
                    <Airplane01Icon size={80} strokeWidth={1} fill="currentColor" />
                </div>
                <div className="absolute top-[25%] right-[20%] rotate-[30deg]">
                    <Airplane01Icon size={50} strokeWidth={1} fill="currentColor" />
                </div>
                <div className="absolute top-[35%] left-[20%] -rotate-[10deg]">
                    <Airplane01Icon size={40} strokeWidth={1} fill="currentColor" />
                </div>

                {/* Clouds */}
                <div className="absolute top-[15%] left-[10%]">
                    <CloudIcon size={120} strokeWidth={1} fill="currentColor" opacity={0.5} />
                </div>
                <div className="absolute top-[20%] right-[10%]">
                    <CloudIcon size={150} strokeWidth={1} fill="currentColor" opacity={0.4} />
                </div>
                <div className="absolute top-[40%] left-[30%]">
                    <CloudIcon size={80} strokeWidth={1} fill="currentColor" opacity={0.3} />
                </div>
            </div>

            <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                <span className="inline-flex items-center justify-center rounded-full border border-[#1f639b]/20 bg-[#1f639b]/5 px-4 py-1.5 text-sm font-semibold tracking-wide text-[#1f639b] mb-4">
                    Ready to start?
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    Start Your Journey Today
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-500">
                    Join thousands of students who have successfully used GlobalBridge
                    to study abroad. Create your free account and take the first step.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Link
                        href="/dashboard"
                        className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-[#1f639b] to-[#2d8a4e] px-8 text-sm font-bold text-white shadow-lg shadow-[#1f639b]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#1f639b]/30"
                    >
                        Get Started Free
                        <ArrowRight01Icon size={18} strokeWidth={2.5} />
                    </Link>
                    <Link
                        href="/login"
                        className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </section>
    );
}
