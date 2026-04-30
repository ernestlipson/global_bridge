import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { teamMembers } from "@/lib/team-members";
import { UserGroupIcon } from "hugeicons-react";

export const metadata = {
    title: "Meet the team | GlobalBridge Edu Consult",
    description:
        "The consultants and advisors behind GlobalBridge—study abroad planning, visas, scholarships, and student success.",
};

export default function MeetTheTeamPage() {
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
                        <span className="text-text-secondary">Team</span>
                    </nav>

                    <header className="mt-10 max-w-3xl">
                        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                            <UserGroupIcon size={16} />
                            People behind GlobalBridge
                        </p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                            Meet the team
                        </h1>
                        <p className="mt-4 text-base leading-relaxed text-text-secondary">
                            We combine lived experience navigating embassies and lecture halls with structured
                            process—so you always know the next step, whether you&apos;re choosing a programme,
                            locking in funding, or preparing for the visa desk.
                        </p>
                    </header>

                    <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map((member) => (
                            <article
                                key={member.name}
                                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white/90 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-surface sm:aspect-square">
                                    <Image
                                        src={member.imageSrc}
                                        alt={member.name}
                                        fill
                                        className="object-cover object-top"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col p-5 sm:p-6">
                                    <h2 className="text-lg font-semibold tracking-tight text-text-primary">
                                        {member.name}
                                    </h2>
                                    <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
                                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{member.bio}</p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-16 rounded-2xl border border-border bg-primary/[0.04] px-6 py-8 text-center sm:px-10">
                        <p className="text-sm font-semibold text-text-primary">Want to work with us?</p>
                        <p className="mt-2 text-sm text-text-secondary">
                            Start with a consultation or reach out through the contact details in the footer.
                        </p>
                        <Link
                            href="/consultation"
                            className="mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                        >
                            Book a consultation
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
