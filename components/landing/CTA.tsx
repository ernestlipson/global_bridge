import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[#061E3A] px-8 py-16 text-center sm:px-16 sm:py-20">
                    {/* Background decoration */}
                    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
                        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">
                            Start Your Journey Today
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/70">
                            Join thousands of students who have successfully used GlobalBridge
                            to study abroad. Create your free account and take the first step.
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href="/register"
                                className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-emerald-500 px-8 text-base font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:from-accent-dark hover:to-emerald-600 hover:shadow-xl"
                            >
                                Get Started Free
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                href="/login"
                                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
