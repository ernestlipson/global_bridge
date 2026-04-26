const universities = [
    { name: "Harvard", sub: "Medical School", color: "#A51C30" },
    { name: "Stanford", sub: "University", color: "#8C1515" },
    { name: "Berkeley", sub: "University of California", color: "#003262" },
    { name: "Oxford", sub: "University", color: "#002147" },
    { name: "Cambridge", sub: "University", color: "#A3C1AD" },
    { name: "MIT", sub: "Massachusetts", color: "#750014" },
    { name: "Cornell", sub: "University", color: "#B31B1B" },
    { name: "Toronto", sub: "University", color: "#002A5C" },
    { name: "Melbourne", sub: "University", color: "#094183" },
    { name: "Bond", sub: "University", color: "#00537E" },
    { name: "Edinburgh", sub: "University", color: "#990033" },
    { name: "UCL", sub: "London", color: "#500778" },
];

function LogoCard({
    name,
    sub,
    color,
}: {
    name: string;
    sub: string;
    color: string;
}) {
    return (
        <div className="flex h-16 min-w-[160px] items-center gap-3 rounded-xl bg-white px-5 shadow-sm border border-border/40">
            {/* Faux crest/icon */}
            <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white text-xs font-bold"
                style={{ backgroundColor: color }}
                aria-hidden="true"
            >
                {name.slice(0, 2).toUpperCase()}
            </div>
            <div className="leading-tight">
                <span className="text-sm font-semibold text-text-primary">{name}</span>
                <span className="block text-[11px] text-text-muted">{sub}</span>
            </div>
        </div>
    );
}

export function UniversityMarquee() {
    // Duplicate the list so the scroll loops seamlessly
    const items = [...universities, ...universities];

    return (
        <section className="overflow-hidden bg-surface py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-text-muted">
                    Trusted by students admitted to 500+ universities worldwide
                </p>
            </div>

            {/* Marquee track */}
            <div className="relative">
                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />

                <div className="flex animate-marquee w-max gap-5">
                    {items.map((uni, i) => (
                        <LogoCard key={`${uni.name}-${i}`} {...uni} />
                    ))}
                </div>
            </div>
        </section>
    );
}
