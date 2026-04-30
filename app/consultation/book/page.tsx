"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ConsultationBookingWizard } from "@/components/consultation/ConsultationBookingWizard";
import { getExpertById } from "@/lib/expert-consultants";

function ConsultationBookContent() {
    const searchParams = useSearchParams();
    const expertId = searchParams.get("expert");
    const expert = useMemo(() => getExpertById(expertId), [expertId]);

    return (
        <>
            <Navbar />
            <main className="flex-1 bg-surface pb-16 pt-8">
                <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <ConsultationBookingWizard expert={expert} />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default function ConsultationBookPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-[40vh] items-center justify-center bg-surface text-sm text-text-muted">
                    Loading booking…
                </div>
            }
        >
            <ConsultationBookContent />
        </Suspense>
    );
}
