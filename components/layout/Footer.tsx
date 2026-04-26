import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

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
        { label: "How It Works", href: "#how-it-works" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "Pricing", href: "#" },
        { label: "Contact", href: "#contact" },
    ],
    destinations: [
        { label: "United Kingdom", href: "#" },
        { label: "United States", href: "#" },
        { label: "Canada", href: "#" },
        { label: "Australia", href: "#" },
        { label: "Europe", href: "#" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t border-border bg-[#0A1628] text-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                                <GraduationCap size={20} className="text-white" />
                            </div>
                            <div className="leading-tight">
                                <span className="text-base font-bold tracking-tight">
                                    GlobalBridge
                                </span>
                                <span className="block text-[10px] font-medium text-white/50 -mt-0.5">
                                    Edu Consult
                                </span>
                            </div>
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                            Bridging Education Beyond Borders. Your trusted pathway to global
                            education opportunities with AI-powered tools and expert guidance.
                        </p>

                        {/* Contact info */}
                        <div className="mt-6 space-y-3">
                            <a
                                href="tel:+233240067412"
                                className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
                            >
                                <Phone size={15} />
                                0240067412
                            </a>
                            <a
                                href="mailto:darkoernest507@gmail.com"
                                className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
                            >
                                <Mail size={15} />
                                darkoernest507@gmail.com
                            </a>
                            <p className="flex items-center gap-2.5 text-sm text-white/60">
                                <MapPin size={15} />
                                Accra, Ghana
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
