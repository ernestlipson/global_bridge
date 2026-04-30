"use client";

import { cn } from "@/lib/utils";
import { AppLogo } from "@/components/brand/AppLogo";
import {
    DashboardCircleIcon,
    CameraMicrophone01Icon,
    GraduationScrollIcon,
    Wallet01Icon,
    DocumentAttachmentIcon,
    FileEditIcon,
    CheckListIcon,
    ClipboardIcon,
    DollarCircleIcon,
    Airplane01Icon,
    UserSearch01Icon,
    AiUserIcon,
    ArrowLeft01Icon,
    Home01Icon,
    Logout01Icon,
    TeacherIcon,
} from "hugeicons-react";
import { isDashboardNavActive } from "@/lib/dashboard-nav-active";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: DashboardCircleIcon },
    { label: "Visa Interview", href: "/visa", icon: CameraMicrophone01Icon },
    { label: "University Matcher", href: "/university-matcher", icon: GraduationScrollIcon },
    { label: "Professors", href: "/professors", icon: TeacherIcon },
    { label: "Scholarships", href: "/scholarships", icon: Wallet01Icon },
    { label: "Consultation", href: "/consultation", icon: DollarCircleIcon },
    { label: "Documents", href: "/documents", icon: DocumentAttachmentIcon },
    { label: "SOP & CV Builder", href: "/documents/sop-cv-builder", icon: FileEditIcon },
    { label: "Transcript", href: "/transcript", icon: CheckListIcon },
    { label: "Applications", href: "/applications", icon: ClipboardIcon },
    { label: "Pre-departure", href: "/predeparture", icon: Airplane01Icon },
    { label: "Community", href: "/community", icon: UserSearch01Icon },
    { label: "Profile", href: "/profile", icon: AiUserIcon },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "hidden lg:flex flex-col border-r border-border bg-white transition-all duration-200",
                collapsed ? "w-[72px]" : "w-64"
            )}
        >
            {/* Logo */}
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
                {!collapsed && (
                    <Link href="/dashboard" className="flex min-w-0 items-center">
                        <AppLogo heightClass="h-8" maxWidthClass="max-w-[160px]" />
                    </Link>
                )}
                {collapsed && (
                    <Link
                        href="/dashboard"
                        className="mx-auto flex items-center justify-center"
                        aria-label="GlobalBridge dashboard"
                    >
                        <AppLogo square squarePx={44} />
                    </Link>
                )}
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Dashboard">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = isDashboardNavActive(pathname, item.href);

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-text-secondary hover:bg-surface hover:text-text-primary",
                                        collapsed && "justify-center px-0"
                                    )}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <item.icon size={19} className="shrink-0" />
                                    {!collapsed && item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom actions */}
            <div className="border-t border-border p-3 space-y-1">
                <Link
                    href="/"
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary",
                        collapsed && "justify-center px-0"
                    )}
                    title={collapsed ? "Back home" : undefined}
                >
                    <Home01Icon size={19} className="shrink-0" />
                    {!collapsed && "Back home"}
                </Link>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-surface hover:text-text-primary cursor-pointer"
                >
                    <ArrowLeft01Icon
                        size={19}
                        className={cn(
                            "shrink-0 transition-transform duration-200",
                            collapsed && "rotate-180"
                        )}
                    />
                    {!collapsed && "Collapse"}
                </button>
                <Link
                    href="/login"
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-red-50 hover:text-danger",
                        collapsed && "justify-center px-0"
                    )}
                >
                    <Logout01Icon size={19} className="shrink-0" />
                    {!collapsed && "Sign Out"}
                </Link>
            </div>
        </aside>
    );
}
