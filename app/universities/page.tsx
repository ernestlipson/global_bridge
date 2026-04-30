import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UniversitySearchClient } from "@/features/universities/UniversitySearchClient";

export default function UniversitiesBrowsePage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-50/70">
                <section className="border-b border-border bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                        <div className="max-w-3xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent-dark">
                                University browser
                            </p>
                            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
                                Explore schools before you build your shortlist
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
                                Browse USA and Canada universities, check locations, compare available profile details, and open official websites when you are ready to research deeper.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                    <Suspense
                        fallback={
                            <div className="h-72 animate-pulse rounded-xl border border-border bg-white" />
                        }
                    >
                        <UniversitySearchClient />
                    </Suspense>
                </section>
            </main>
            <Footer />
        </>
    );
}
