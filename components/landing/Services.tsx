import {
    Mic,
    GraduationCap,
    Search,
    FileText,
    Wallet,
    ShieldCheck,
} from "lucide-react";

const services = [
    {
        icon: Mic,
        title: "AI Visa Interview Prep",
        description:
            "Practice with realistic mock interviews powered by AI. Get confidence scores, red flag detection, and improvement tips.",
        color: "bg-primary/10 text-primary",
    },
    {
        icon: GraduationCap,
        title: "University Matching",
        description:
            "Get matched with universities that fit your profile, budget, and goals. Compare tuition, acceptance rates, and more.",
        color: "bg-blue-50 text-blue-600",
    },
    {
        icon: Search,
        title: "Scholarship Finder",
        description:
            "Discover scholarships you qualify for. Filter by country, field, and amount — plus AI affordability checks.",
        color: "bg-accent/10 text-accent-dark",
    },
    {
        icon: FileText,
        title: "SOP & CV Builder",
        description:
            "Generate tailored Statements of Purpose and CVs using AI. Download-ready documents for your applications.",
        color: "bg-indigo-50 text-indigo-600",
    },
    {
        icon: Wallet,
        title: "Financial Guidance",
        description:
            "Budget calculators, currency conversion, and loan matching to help you plan your study abroad finances.",
        color: "bg-amber-50 text-amber-600",
    },
    {
        icon: ShieldCheck,
        title: "Visa Success System",
        description:
            "Document checklists, financial proof calculators, and visa success probability scores to maximize approval.",
        color: "bg-emerald-50 text-emerald-600",
    },
];

export function Services() {
    return (
        <section id="services" className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                        Our Services
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                        Everything you need to study abroad
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                        From your first profile to boarding your flight — we&apos;ve got
                        every step covered with expert tools and AI guidance.
                    </p>
                </div>

                {/* Services grid */}
                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="group rounded-2xl border border-border/60 bg-white p-7 transition-all duration-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.04]"
                        >
                            <div
                                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${service.color}`}
                            >
                                <service.icon size={22} />
                            </div>
                            <h3 className="text-lg font-semibold text-text-primary">
                                {service.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
