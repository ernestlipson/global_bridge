import {
    contactAddress,
    contactEmail,
    contactEmailHref,
    contactPageHref,
    contactPhoneDisplay,
    contactPhoneTelHref,
} from "@/lib/contact";
import { AppLogo } from "@/components/brand/AppLogo";
import { MailboxIcon, AiPhone01Icon, Location01Icon } from "hugeicons-react";
import Link from "next/link";

function footerCompanyHref(href: string) {
    const h = href.trim();
    if (h.startsWith("#")) {
        return `/${h}`;
    }
    return h;
}

const footerLinks = {
    services: [
        { label: "Visa Interview Prep", href: "#" },
        { label: "University Matching", href: "#" },
        { label: "Scholarship Finder", href: "#" },
        { label: "SOP & CV Builder", href: "#" },
        { label: "Application Tracking", href: "#" },
    ],
    company: [
        { label: "About Us", href: "#" },
        { label: "Meet the team", href: "/team" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "Pricing", href: "#" },
        { label: "Contact", href: contactPageHref },
    ],
    destinations: [
        { label: "United Kingdom", href: "#" },
        { label: "United States", href: "#" },
        { label: "Canada", href: "#" },
        { label: "Australia", href: "#" },
        { label: "Europe", href: "#" },
    ],
    blog: [{ label: "All articles", href: "/blogs" }],
};

export function Footer() {
    return (
        <footer className="relative z-10 border-t border-border bg-[#0A1628] text-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block">
                            <AppLogo variant="onDark" heightClass="h-12 sm:h-14" maxWidthClass="max-w-[min(340px,90vw)]" />
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                            Bridging Education Beyond Borders. Your trusted pathway to global
                            education opportunities with AI-powered tools and expert guidance.
                        </p>

                        {/* Contact info */}
                        <div className="mt-6 space-y-3">
                            <a
                                href={contactPhoneTelHref}
                                className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
                            >
                                <AiPhone01Icon size={15} />
                                {contactPhoneDisplay}
                            </a>
                            <a
                                href={contactEmailHref}
                                className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
                            >
                                <MailboxIcon size={15} />
                                {contactEmail}
                            </a>
                            <p className="flex items-center gap-2.5 text-sm text-white/60">
                                <Location01Icon size={15} />
                                {contactAddress}
                            </p>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                            Services
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-white/50 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                            Company
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    {/* Native <a> so internal routes always resolve (works from any marketing page). */}
                                    <a
                                        href={footerCompanyHref(link.href)}
                                        className="text-sm text-white/50 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                            Destinations
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                            {footerLinks.destinations.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-white/50 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Blog */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                            Blog
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                            {footerLinks.blog.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/50 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
                    <p className="text-sm text-white/40">
                        &copy; {new Date().getFullYear()} GlobalBridge Edu Consult. All
                        rights reserved.
                    </p>
                    <p className="text-sm text-white/40">
                        Founded by Ernest Owusu Darko
                    </p>
                </div>
            </div>
        </footer>
    );
}
