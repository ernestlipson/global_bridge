"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    Menu01Icon,
    Search01Icon,
    Compass01Icon,
    Settings01Icon,
    HelpCircleIcon,
    MoreHorizontalIcon,
    SparklesIcon,
    Mic01Icon,
    ArrowUp01Icon,
    Wrench01Icon,
    Globe02Icon,
    AiBrain01Icon,
    Edit01Icon,
    ArrowDown01Icon,
    File01Icon,
    ArrowLeft01Icon,
} from "hugeicons-react";

export default function AIChatPage() {
    const [inputQuery, setInputQuery] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white text-text-primary">
            {/* Sidebar */}
            <aside
                className={cn(
                    "flex h-full flex-col border-r border-border bg-surface transition-all duration-300",
                    sidebarOpen ? "w-[280px]" : "w-0 opacity-0 overflow-hidden border-r-0"
                )}
            >
                {/* Sidebar Header */}
                <div className="flex h-16 items-center justify-between px-4 shrink-0">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-white">
                            <AiBrain01Icon size={16} />
                        </div>
                        <span className="font-bold">GlobalBridge AI</span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="rounded p-1 text-text-muted hover:bg-black/5 hover:text-text-primary transition-colors"
                    >
                        <Menu01Icon size={18} />
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-hide">
                    <div className="flex items-center justify-between px-2 mb-2">
                        <span className="text-xs font-semibold text-text-primary">Chats</span>
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 rounded">14</span>
                    </div>

                    <button className="flex w-full items-center justify-between rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 transition-colors mb-1">
                        <div className="flex items-center gap-2">
                            <Edit01Icon size={16} />
                            New chat
                        </div>
                        <div className="flex gap-1">
                            <span className="flex h-5 items-center justify-center rounded bg-white/20 px-1.5 text-[10px] font-bold">⌘</span>
                            <span className="flex h-5 w-5 items-center justify-center rounded bg-white/20 text-[10px] font-bold">T</span>
                        </div>
                    </button>

                    <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-black/5 transition-colors mb-1">
                        <div className="flex items-center gap-2">
                            <Search01Icon size={16} />
                            Search in chats
                        </div>
                        <div className="flex gap-1">
                            <span className="flex h-5 items-center justify-center rounded border border-border bg-white px-1.5 text-[10px] font-bold text-text-muted shadow-sm">⌘</span>
                            <span className="flex h-5 w-5 items-center justify-center rounded border border-border bg-white text-[10px] font-bold text-text-muted shadow-sm">K</span>
                        </div>
                    </button>

                    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-black/5 transition-colors mb-6">
                        <Compass01Icon size={16} />
                        Discover
                    </button>

                    {/* Chat History Group */}
                    <div className="mb-4">
                        <button className="flex w-full items-center gap-1.5 px-2 py-1 text-xs font-semibold text-text-primary hover:text-text-secondary">
                            <ArrowDown01Icon size={12} />
                            Today
                        </button>
                        <div className="mt-1 space-y-0.5">
                            {[
                                "Canadian Universities List",
                                "Refine my SOP for Masters",
                                "Visa interview prep questions",
                                "Scholarship deadlines 2026",
                                "Calculate GPA equivalent",
                                "Cost of living in Toronto",
                                "Review application essay"
                            ].map((chat, i) => (
                                <button key={i} className="w-full truncate rounded-lg px-6 py-1.5 text-left text-[13px] text-text-secondary hover:bg-black/5 hover:text-text-primary transition-colors">
                                    {chat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <button className="flex w-full items-center gap-1.5 px-2 py-1 text-xs font-semibold text-text-primary hover:text-text-secondary">
                            <ArrowDown01Icon size={12} />
                            Yesterday
                        </button>
                    </div>

                    <div className="mb-4">
                        <button className="flex w-full items-center gap-1.5 px-2 py-1 text-xs font-semibold text-text-primary hover:text-text-secondary">
                            <ArrowDown01Icon size={12} />
                            Earlier
                        </button>
                    </div>
                </div>

                {/* Sidebar Footer */}
                <div className="border-t border-border p-3 space-y-1 shrink-0">
                    <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-text-secondary hover:bg-black/5 transition-colors">
                        <Settings01Icon size={16} />
                        Settings
                    </button>
                    <button className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-medium text-text-secondary hover:bg-black/5 transition-colors">
                        <div className="flex items-center gap-2">
                            <HelpCircleIcon size={16} />
                            Help center
                        </div>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">3</span>
                    </button>

                    <div className="mt-2 flex items-center justify-between rounded-lg p-2 hover:bg-black/5 transition-colors cursor-pointer">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                                ED
                            </div>
                            <div className="overflow-hidden">
                                <p className="truncate text-sm font-semibold text-text-primary flex items-center gap-1">
                                    Ernest Darko
                                    <SparklesIcon size={12} className="text-primary fill-primary" />
                                </p>
                                <p className="truncate text-xs text-text-muted">edarko@example.com</p>
                            </div>
                        </div>
                        <button className="text-text-muted hover:text-text-primary">
                            <MoreHorizontalIcon size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="relative flex h-full flex-1 flex-col bg-white">
                {/* Top bar */}
                <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
                    <div className="flex items-center gap-3">
                        {!sidebarOpen && (
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-surface hover:text-text-primary transition-colors"
                            >
                                <Menu01Icon size={16} />
                            </button>
                        )}
                        <span className="text-sm font-semibold text-text-primary">New conversation</span>
                    </div>
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
                    >
                        <ArrowLeft01Icon size={14} />
                        Dashboard
                    </Link>
                </div>

                {/* Empty State */}
                <div className="flex flex-1 flex-col items-center justify-center px-4">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <AiBrain01Icon size={24} />
                    </div>

                    <h1 className="text-lg font-semibold text-text-primary">
                        How can I help you today?
                    </h1>
                    <p className="mt-1 text-sm text-text-secondary">
                        Ask about universities, visas, scholarships, or your application.
                    </p>

                    {/* Suggestions */}
                    <div className="mt-8 grid w-full max-w-lg grid-cols-2 gap-2">
                        {[
                            { text: "Find scholarships in Canada", icon: Globe02Icon, color: "text-primary" },
                            { text: "Review my SOP", icon: File01Icon, color: "text-blue-500" },
                            { text: "Visa interview prep", icon: Settings01Icon, color: "text-indigo-500" },
                            { text: "Compare universities", icon: Compass01Icon, color: "text-amber-500" },
                        ].map((item) => (
                            <button
                                key={item.text}
                                onClick={() => setInputQuery(item.text)}
                                className="flex items-center gap-2.5 rounded-lg border border-border bg-white p-3 text-left text-[13px] font-medium text-text-secondary hover:border-primary/30 hover:text-text-primary transition-colors cursor-pointer"
                            >
                                <item.icon size={15} className={cn("shrink-0", item.color)} />
                                {item.text}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input Area */}
                <div className="mx-auto w-full max-w-3xl px-4 pb-5">
                    <div className="relative flex flex-col rounded-xl border border-border bg-white focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                        <div className="flex items-end px-4 py-2.5">
                            <textarea
                                value={inputQuery}
                                onChange={(e) => setInputQuery(e.target.value)}
                                placeholder="Ask anything about studying abroad..."
                                className="max-h-[180px] min-h-[40px] w-full resize-none bg-transparent py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                                rows={1}
                            />

                            <div className="flex items-center gap-1.5 pb-1.5 pl-2 shrink-0">
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-surface hover:text-text-primary transition-colors">
                                    <Mic01Icon size={17} />
                                </button>
                                <button
                                    className={cn(
                                        "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                                        inputQuery.trim()
                                            ? "bg-primary text-white hover:bg-primary-dark"
                                            : "bg-surface text-text-muted"
                                    )}
                                >
                                    <ArrowUp01Icon size={17} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>

                        {/* Input Actions */}
                        <div className="flex items-center gap-3 border-t border-border/50 px-4 py-2">
                            <button className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text-primary transition-colors">
                                <Wrench01Icon size={13} />
                                Tools
                            </button>
                            <button className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text-primary transition-colors">
                                <Globe02Icon size={13} />
                                Search
                            </button>
                        </div>
                    </div>

                    <p className="mt-3 text-center text-[11px] text-text-muted">
                        GlobalBridge AI may produce inaccurate information. Verify important details.
                    </p>
                </div>
            </main>
        </div>
    );
}
