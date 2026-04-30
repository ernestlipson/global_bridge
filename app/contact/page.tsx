import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import {
    contactAddress,
    contactEmail,
    contactEmailHref,
    consultationHref,
    contactPhoneDisplay,
    contactPhoneTelHref,
} from "@/lib/contact";
import { Call02Icon, Location01Icon, MailboxIcon, Time04Icon } from "hugeicons-react";

export const metadata = {
    title: "Contact us | GlobalBridge Edu Consult",
    description:
        "Reach GlobalBridge for study abroad planning, visa support, and consultations. Phone, email, and contact form.",
};

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-[60vh] bg-[radial-gradient(circle_at_top_left,_rgba(12,59,124,0.06),_transparent_35%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_40%,_#f6f8fc_100%)]">
                <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
                    <nav className="text-sm text-text-muted" aria-label="Breadcrumb">
                        <Link href="/" className="transition-colors hover:text-primary">
                            Home
                        </Link>
                        <span className="mx-2 opacity-60">/</span>
                        <span className="text-text-secondary">Contact</span>
                    </nav>

                    <header className="mt-10 max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                            Get in touch
                        </p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                            Contact us
                        </h1>
                        <p className="mt-4 text-base leading-relaxed text-text-secondary">
                            Ask about programmes, visa timelines, or funding—or book a consultation for a
                            structured plan. We typically reply within one to two business days.
                        </p>
                    </header>

                    <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
                        <div className="space-y-6">
                            <div className="rounded-2xl border border-border bg-white/90 p-6 shadow-sm sm:p-7">
                                <h2 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
                                    Direct details
                                </h2>
                                <ul className="mt-5 space-y-4">
                                    <li>
                                        <a
                                            href={contactPhoneTelHref}
                                            className="flex gap-4 rounded-xl p-3 transition-colors hover:bg-surface"
                                        >
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                                                <Call02Icon size={20} aria-hidden />
                                            </span>
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                                                    Phone
                                                </p>
                                                <p className="mt-0.5 font-semibold text-text-primary">{contactPhoneDisplay}</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={contactEmailHref}
                                            className="flex gap-4 rounded-xl p-3 transition-colors hover:bg-surface"
                                        >
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                                                <MailboxIcon size={20} aria-hidden />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                                                    Email
                                                </p>
                                                <p className="mt-0.5 break-all font-semibold text-text-primary">{contactEmail}</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="flex gap-4 rounded-xl p-3">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                                            <Location01Icon size={20} aria-hidden />
                                        </span>
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                                                Office
                                            </p>
                                            <p className="mt-0.5 font-semibold text-text-primary">{contactAddress}</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4 rounded-xl p-3">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                                            <Time04Icon size={20} aria-hidden />
                                        </span>
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                                                Hours
                                            </p>
                                            <p className="mt-0.5 text-sm font-medium leading-relaxed text-text-primary">
                                                Monday–Friday, 9:00–17:00 GMT
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] px-6 py-5">
                                <p className="text-sm font-semibold text-text-primary">Prefer a guided session?</p>
                                <p className="mt-1 text-sm text-text-secondary">
                                    Book time with our team for visas, university shortlisting, or funding.
                                </p>
                                <Link
                                    href={consultationHref}
                                    className="mt-4 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                                >
                                    Book a consultation
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
                            <h2 className="text-lg font-semibold text-text-primary">Send a message</h2>
                            <p className="mt-1 text-sm text-text-secondary">
                                Fill in the form and we&apos;ll route it from your email app—no login required.
                            </p>
                            <div className="mt-6">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
