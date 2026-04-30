"use client";

import { contactEmail, contactEmailHref } from "@/lib/contact";
import { useState } from "react";

const TOPICS = [
    { value: "Consultation", label: "Book / consultation" },
    { value: "Visa guidance", label: "Visa guidance" },
    { value: "University applications", label: "University applications" },
    { value: "Scholarships", label: "Scholarships & funding" },
    { value: "Partnership", label: "Partnership or media" },
    { value: "Other", label: "Other" },
];

export function ContactForm() {
    const [notice, setNotice] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const name = String(data.get("name") ?? "").trim();
        const email = String(data.get("email") ?? "").trim();
        const phone = String(data.get("phone") ?? "").trim();
        const topic = String(data.get("topic") ?? "").trim();
        const message = String(data.get("message") ?? "").trim();

        if (!email || !message) {
            setNotice("Please add your email and a message.");
            return;
        }

        const subject = encodeURIComponent(
            topic ? `GlobalBridge enquiry: ${topic}` : "GlobalBridge contact form"
        );
        const bodyLines = [
            name && `Name: ${name}`,
            `Email: ${email}`,
            phone && `Phone: ${phone}`,
            topic && `Topic: ${topic}`,
            "",
            message,
        ].filter(Boolean);
        const body = encodeURIComponent(bodyLines.join("\n"));

        setNotice("Opening your email app…");
        window.location.href = `${contactEmailHref}?subject=${subject}&body=${body}`;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-text-primary">
                    Name
                </label>
                <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-text-primary shadow-sm outline-none transition-shadow placeholder:text-text-muted focus:border-primary/30 focus:ring-2 focus:ring-primary/15"
                    placeholder="Your name"
                />
            </div>
            <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-text-primary">
                    Email <span className="text-danger">*</span>
                </label>
                <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-text-primary shadow-sm outline-none transition-shadow placeholder:text-text-muted focus:border-primary/30 focus:ring-2 focus:ring-primary/15"
                    placeholder="you@example.com"
                />
            </div>
            <div>
                <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-text-primary">
                    Phone <span className="text-text-muted">(optional)</span>
                </label>
                <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-text-primary shadow-sm outline-none transition-shadow placeholder:text-text-muted focus:border-primary/30 focus:ring-2 focus:ring-primary/15"
                    placeholder="+233 …"
                />
            </div>
            <div>
                <label htmlFor="contact-topic" className="mb-1.5 block text-sm font-medium text-text-primary">
                    Topic
                </label>
                <select
                    id="contact-topic"
                    name="topic"
                    defaultValue=""
                    className="w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-text-primary shadow-sm outline-none transition-shadow focus:border-primary/30 focus:ring-2 focus:ring-primary/15"
                >
                    <option value="" disabled>
                        Select a topic
                    </option>
                    {TOPICS.map((t) => (
                        <option key={t.value} value={t.value}>
                            {t.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-text-primary">
                    Message <span className="text-danger">*</span>
                </label>
                <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    className="w-full resize-y rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-text-primary shadow-sm outline-none transition-shadow placeholder:text-text-muted focus:border-primary/30 focus:ring-2 focus:ring-primary/15"
                    placeholder="How can we help?"
                />
            </div>
            {notice && (
                <p className="text-xs text-text-secondary" role="status">
                    {notice}
                </p>
            )}
            <p className="text-xs text-text-muted">
                Submissions open your mail app addressed to{" "}
                <span className="font-medium text-text-secondary">{contactEmail}</span>. You can also email us
                directly.
            </p>
            <button
                type="submit"
                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark sm:w-auto sm:px-8"
            >
                Send message
            </button>
        </form>
    );
}
