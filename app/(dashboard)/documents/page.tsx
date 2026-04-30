import {
    CheckmarkCircle01Icon,
    CloudUploadIcon,
    DocumentAttachmentIcon,
    FileEditIcon,
    NoteIcon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const documents = [
    { name: "CV - Ernest Darko.pdf", type: "CV", status: "Approved" as const, updated: "2 hours ago", pages: 2 },
    { name: "Academic Transcript.pdf", type: "Transcript", status: "Needs review" as const, updated: "Yesterday", pages: 4 },
    { name: "Statement of Purpose.docx", type: "SOP", status: "Draft" as const, updated: "3 days ago", pages: 3 },
    { name: "Passport Bio Page.jpg", type: "ID", status: "Approved" as const, updated: "Last week", pages: 1 },
];

const statusConfig = {
    Approved: { bg: "bg-accent-light", text: "text-accent-dark", icon: "text-accent" },
    "Needs review": { bg: "bg-amber-50", text: "text-amber-700", icon: "text-amber-500" },
    Draft: { bg: "bg-surface", text: "text-text-muted", icon: "text-text-muted" },
};

export default function DocumentsPage() {
    const approved = documents.filter((d) => d.status === "Approved").length;
    const pending = documents.filter((d) => d.status !== "Approved").length;

    return (
        <div className="pb-12">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">Documents</h1>
                <p className="mt-1 max-w-xl text-sm text-text-secondary">
                    Track review status and keep application files ready for submission. Need a fresh SOP or CV?{" "}
                    <Link href="/documents/sop-cv-builder" className="font-semibold text-primary hover:underline">
                        Open AI SOP &amp; CV Builder
                    </Link>
                    .
                </p>
            </div>

            {/* Stats row */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Total files</p>
                    <p className="mt-1 text-2xl font-semibold text-text-primary">{documents.length}</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Approved</p>
                    <p className="mt-1 text-2xl font-semibold text-accent">{approved}</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Pending</p>
                    <p className="mt-1 text-2xl font-semibold text-amber-600">{pending}</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs text-text-muted">Last upload</p>
                    <p className="mt-1 text-[15px] font-semibold text-text-primary">2 hours ago</p>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
                {/* Document list */}
                <div className="space-y-3">
                    {documents.map((item) => {
                        const status = statusConfig[item.status];
                        return (
                            <article
                                key={item.name}
                                className="flex flex-col gap-4 rounded-xl border border-border bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/6 text-primary">
                                        <DocumentAttachmentIcon size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="truncate text-[14px] font-semibold text-text-primary">{item.name}</h2>
                                        <p className="mt-0.5 text-xs text-text-muted">
                                            {item.type} &middot; {item.pages} {item.pages === 1 ? "page" : "pages"} &middot; Updated {item.updated}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 sm:shrink-0">
                                    <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium", status.bg, status.text)}>
                                        <CheckmarkCircle01Icon size={13} className={status.icon} />
                                        {item.status}
                                    </span>
                                    <button
                                        type="button"
                                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface"
                                    >
                                        Preview
                                    </button>
                                </div>
                            </article>
                        );
                    })}

                    {/* Upload zone */}
                    <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface/50 p-8 text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/6 text-primary">
                            <CloudUploadIcon size={18} />
                        </div>
                        <div>
                            <p className="text-[13px] font-semibold text-text-primary">Drop files here or click to browse</p>
                            <p className="mt-1 text-xs text-text-muted">PDF, DOCX, JPG, PNG up to 10 MB</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
                    <div className="rounded-xl border border-border bg-white p-5">
                        <div className="flex items-center gap-2">
                            <FileEditIcon size={15} className="text-primary" />
                            <p className="text-[13px] font-semibold text-text-primary">Review checklist</p>
                        </div>
                        <ul className="mt-3 space-y-2.5">
                            {documents.map((item) => (
                                <li key={item.name} className="flex items-center gap-2 text-xs">
                                    <CheckmarkCircle01Icon
                                        size={14}
                                        className={item.status === "Approved" ? "text-accent" : "text-text-muted"}
                                    />
                                    <span className={cn(
                                        "text-text-secondary",
                                        item.status === "Approved" && "line-through text-text-muted"
                                    )}>
                                        {item.type}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-xl border border-border bg-white p-5">
                        <div className="flex items-center gap-2">
                            <NoteIcon size={15} className="text-primary" />
                            <p className="text-[13px] font-semibold text-text-primary">Tips</p>
                        </div>
                        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-secondary">
                            <li>A polished SOP improves both school matching and visa interviews.</li>
                            <li>Make sure your transcript scan is legible at 100% zoom.</li>
                            <li>Upload the passport bio page as a clear colour scan, not a photo.</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
