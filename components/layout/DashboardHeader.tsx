"use client";

import { AppLogo } from "@/components/brand/AppLogo";
import { cn } from "@/lib/utils";
import { isDashboardNavActive } from "@/lib/dashboard-nav-active";
import {
    Menu01Icon,
    ChatNotification01Icon,
    AiSearchIcon,
    DollarCircleIcon,
    GraduationScrollIcon,
    DashboardCircleIcon,
    CameraMicrophone01Icon,
    Wallet01Icon,
    DocumentAttachmentIcon,
    CheckListIcon,
    ClipboardIcon,
    FileEditIcon,
    Airplane01Icon,
    UserSearch01Icon,
    AiUserIcon,
    ArrowLeft01Icon,
    Home01Icon,
    Logout01Icon,
} from "hugeicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


const mobileNavItems = [
    { label: "Dashboard", href: "/dashboard", icon: DashboardCircleIcon },
    { label: "Visa Interview", href: "/visa", icon: CameraMicrophone01Icon },
    { label: "University Matcher", href: "/university-matcher", icon: GraduationScrollIcon },
    { label: "Scholarships", href: "/scholarships", icon: Wallet01Icon },
    { label: "Consultation", href: "/consultation", icon: DollarCircleIcon },
    { label: "Pricing", href: "/pricing", icon: DollarCircleIcon },
    { label: "Documents", href: "/documents", icon: DocumentAttachmentIcon },
    { label: "SOP & CV Builder", href: "/documents/sop-cv-builder", icon: FileEditIcon },
    { label: "Transcript", href: "/transcript", icon: CheckListIcon },
    { label: "Applications", href: "/applications", icon: ClipboardIcon },
    { label: "Pre-departure", href: "/predeparture", icon: Airplane01Icon },
    { label: "Community", href: "/community", icon: UserSearch01Icon },
    { label: "Profile", href: "/profile", icon: AiUserIcon },
];

const appbarMenuItems = [
    { label: "Pricing", href: "/pricing", icon: DollarCircleIcon },
] as const;

export function DashboardHeader() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const pageTitle = (() => {
        const item = [...mobileNavItems].find((nav) =>
            isDashboardNavActive(pathname, nav.href)
        );
        return item?.label ?? "Dashboard";
    })();

    return (
        <>
            <header className="sticky top-0 z-40 flex h-16 items-center border-b border-border bg-white/80 backdrop-blur-lg px-4 sm:px-6">
                {/* Left: mobile menu + title + appbar menus */}
                <div className="flex items-center gap-3 flex-1">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:bg-surface lg:hidden"
                        aria-label="Open menu"
                    >
                        <Menu01Icon size={20} />
                    </button>
                    <Link
                        href="/"
                        aria-label="Back home"
                        title="Back home"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary lg:hidden"
                    >
                        <Home01Icon size={17} className="text-text-muted" aria-hidden />
                        <span className="hidden sm:inline">Back home</span>
                    </Link>
                    <h1 className="min-w-0 truncate text-lg font-semibold text-text-primary mr-2">
                        {pageTitle}
                    </h1>
                    <nav className="hidden items-center gap-1 border-r border-border pr-3 lg:flex" aria-label="Header menu">
                        {appbarMenuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary-50 text-primary"
                                            : "text-text-secondary hover:bg-surface hover:text-text-primary"
                                    )}
                                >
                                    <item.icon size={16} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: actions */}
                <div className="flex items-center gap-2">
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
                                className="flex min-w-0 items-center gap-2"
                                onClick={() => setMobileOpen(false)}
                            >
                                <AppLogo heightClass="h-9" maxWidthClass="max-w-[180px]" />
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
                                    const isActive = isDashboardNavActive(pathname, item.href);

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
                                href="/"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
                            >
                                <Home01Icon size={19} />
                                Back home
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
