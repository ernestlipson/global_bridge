import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight01Icon, CheckmarkCircle01Icon } from "hugeicons-react";
import { servicePages } from "@/lib/service-pages";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return servicePages.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const service = servicePages.find((item) => item.slug === slug);

    if (!service) {
        notFound();
    }

    return (
        <main className="min-h-[calc(100vh-64px)] bg-[radial-gradient(circle_at_top_left,_rgba(12,59,124,0.08),_transparent_30%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_55%,_#f8fafc_100%)]">
            <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                <Link
                    href="/#services"
                    className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm"
                >
                    Back to Services
                </Link>

                <div className="mt-6 rounded-3xl border border-border bg-white/90 p-7 shadow-sm sm:p-10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                        Service Overview
                    </p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                        {service.title}
                    </h1>
                    <p className="mt-3 text-base font-medium text-primary">{service.tagline}</p>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-text-secondary">
                        {service.summary}
                    </p>

                    <div className="mt-8 rounded-2xl border border-border bg-surface/70 p-5 sm:p-6">
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-text-primary">
                            What you get
                        </h2>
                        <ul className="mt-4 space-y-3">
                            {service.highlights.map((highlight) => (
                                <li key={highlight} className="flex items-start gap-2.5 text-sm text-text-secondary">
                                    <CheckmarkCircle01Icon size={18} className="mt-0.5 shrink-0 text-accent" />
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/consultation"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:translate-y-[-1px]"
                        >
                            Book Consultation
                            <ArrowRight01Icon size={16} />
                        </Link>
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface"
                        >
                            Create Free Account
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
