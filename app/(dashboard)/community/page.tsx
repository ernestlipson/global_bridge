"use client";

import { useMemo, useState } from "react";
import {
    Message01Icon,
    SearchVisualIcon,
    UserSearch01Icon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";

const members = [
    { name: "Sarah Mensah", country: "Ghana", focus: "Canada", status: "Online" as const, programme: "MSc Computer Science" },
    { name: "Daniel Ofori", country: "Ghana", focus: "United Kingdom", status: "Online" as const, programme: "MBA" },
    { name: "Abena Kusi", country: "Nigeria", focus: "Germany", status: "Away" as const, programme: "MEng Mechanical" },
    { name: "Kojo Danso", country: "Ghana", focus: "United States", status: "Online" as const, programme: "MS Analytics" },
];

const statusDot = {
    Online: "bg-accent",
    Away: "bg-amber-400",
};

export default function CommunityPage() {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        return members.filter((item) => {
            const source = `${item.name} ${item.country} ${item.focus} ${item.programme}`.toLowerCase();
            return source.includes(query.toLowerCase());
        });
    }, [query]);

    const onlineCount = members.filter((m) => m.status === "Online").length;

    return (
        <div className="pb-12">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">Community</h1>
                <p className="mt-1 max-w-xl text-sm text-text-secondary">
                    Find students on similar journeys, filtered by destination or programme.
                </p>
            </div>

            {/* Search + stats */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative max-w-sm flex-1">
                    <SearchVisualIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search by name, country, or programme"
                        className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/12"
                    />
                </div>
                <p className="text-xs text-text-muted">
                    {onlineCount} online &middot; {members.length} members
                </p>
            </div>

            {/* Member list */}
            <div className="grid gap-3 md:grid-cols-2">
                {filtered.map((item) => (
                    <article
                        key={item.name}
                        className="flex flex-col gap-4 rounded-xl border border-border bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-white">
                                    {item.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                                </div>
                                <span className={cn("absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white", statusDot[item.status])} />
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-[14px] font-semibold text-text-primary">{item.name}</p>
                                <p className="mt-0.5 text-xs text-text-secondary">
                                    {item.country} &rarr; {item.focus} &middot; {item.programme}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-primary/30 hover:text-primary"
                        >
                            <Message01Icon size={13} />
                            Message
                        </button>
                    </article>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="flex flex-col items-center gap-2 py-16 text-center">
                    <UserSearch01Icon size={28} className="text-text-muted" />
                    <p className="text-sm text-text-secondary">No members match your search.</p>
                </div>
            )}
        </div>
    );
}
