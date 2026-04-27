"use client";

import { consultationHref } from "@/lib/contact";
import { cn } from "@/lib/utils";
import {
    Menu01Icon,
    ChatNotification01Icon,
    AiSearchIcon,
    Calendar01Icon,
    GraduationScrollIcon,
    DashboardCircleIcon,
    CameraMicrophone01Icon,
    Wallet01Icon,
    DocumentAttachmentIcon,
    CheckListIcon,
    ClipboardIcon,
    Airplane01Icon,
    UserSearch01Icon,
    AiUserIcon,
    ArrowLeft01Icon,
    Logout01Icon,
} from "hugeicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const mobileNavItems = [
    { label: "Dashboard", href: "/dashboard", icon: DashboardCircleIcon },
    { label: "Visa Interview", href: "/visa", icon: CameraMicrophone01Icon },
    { label: "Universities", href: "/universities", icon: GraduationScrollIcon },
    { label: "Scholarships", href: "/scholarships", icon: Wallet01Icon },
    { label: "Documents", href: "/documents", icon: DocumentAttachmentIcon },
    { label: "Transcript", href: "/transcript", icon: CheckListIcon },
    { label: "Applications", href: "/applications", icon: ClipboardIcon },
    { label: "Pre-departure", href: "/predeparture", icon: Airplane01Icon },
    { label: "Community", href: "/community", icon: UserSearch01Icon },
    { label: "Profile", href: "/profile", icon: AiUserIcon },
];

export function DashboardHeader() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Derive page title from pathname
    const pageTitle =
        mobileNavItems.find(
            (item) =>
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
        )?.label || "Dashboard";

    return (
        <>
            <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-white/80 backdrop-blur-lg px-4 sm:px-6">
                {/* Left: mobile menu + title */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:bg-surface lg:hidden"
                        aria-label="Open menu"
                    >
                        <Menu01Icon size={20} />
                    </button>
                    <h1 className="text-lg font-semibold text-text-primary">
                        {pageTitle}
                    </h1>
                </div>

                {/* Right: search + notifications + avatar */}
                <div className="flex items-center gap-2">
                    <Link
                        href={consultationHref}
                        className="hidden h-9 items-center gap-2 rounded-lg bg-primary px-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow md:inline-flex"
                    >
                        <Calendar01Icon size={16} />
                        Book Consultation
                    </Link>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted hover:bg-surface hover:text-text-secondary transition-colors">
                        <AiSearchIcon size={18} />
                    </button>
                    <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-text-muted hover:bg-surface hover:text-text-secondary transition-colors">
                        <ChatNotification01Icon size={18} />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger" />
                    </button>
                    <Link
                        href="/profile"
                        className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white transition-transform hover:scale-105"
                        aria-label="Open profile"
                    >
                        ED
                    </Link>
                </div>
            </header>

            {/* Mobile sidebar overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setMobileOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl flex flex-col">
                        {/* Header */}
                        <div className="flex h-16 items-center justify-between border-b border-border px-4">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2"
                                onClick={() => setMobileOpen(false)}
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                    <GraduationScrollIcon size={17} className="text-white" />
                                </div>
                                <span className="text-sm font-bold text-text-primary tracking-tight">
                                    GlobalBridge
                                </span>
                            </Link>
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-surface"
                                aria-label="Close menu"
                            >
                                <ArrowLeft01Icon size={18} />
                            </button>
                        </div>

                        {/* Nav */}
                        <nav className="flex-1 overflow-y-auto px-3 py-4">
                            <ul className="space-y-1">
                                {mobileNavItems.map((item) => {
                                    const isActive =
                                        pathname === item.href ||
                                        (item.href !== "/dashboard" &&
                                            pathname.startsWith(item.href));

                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setMobileOpen(false)}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                                    isActive
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-text-secondary hover:bg-surface hover:text-text-primary"
                                                )}
                                            >
                                                <item.icon size={19} className="shrink-0" />
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Sign out */}
                        <div className="border-t border-border p-3 space-y-2">
                            <Link
                                href={consultationHref}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-dark"
                            >
                                <Calendar01Icon size={16} />
                                Book Consultation
                            </Link>
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-red-50 hover:text-danger"
                            >
                                <Logout01Icon size={19} />
                                Sign Out
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
