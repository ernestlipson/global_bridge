"use client";

import { cn } from "@/lib/utils";
import { GraduationCap, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Destinations", href: "#destinations" },
    { label: "Testimonials", href: "#testimonials" },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/80 backdrop-blur-lg">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                        <GraduationCap size={20} className="text-white" />
                    </div>
                    <div className="leading-tight">
                        <span className="text-base font-bold text-text-primary tracking-tight">
                            GlobalBridge
                        </span>
                        <span className="block text-[10px] font-medium text-text-muted -mt-0.5">
                            Edu Consult
                        </span>
                    </div>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="rounded-lg px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        href="/login"
                        className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary hover:bg-surface md:hidden"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile nav */}
            <div
                className={cn(
                    "overflow-hidden border-t border-border/60 bg-white transition-all duration-200 md:hidden",
                    mobileOpen ? "max-h-80" : "max-h-0 border-t-0"
                )}
            >
                <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobile">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
                        >
                            {link.label}
                        </a>
                    ))}
                    <hr className="my-2 border-border" />
                    <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/register"
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                    >
                        Get Started
                    </Link>
                </nav>
            </div>
        </header>
    );
}
