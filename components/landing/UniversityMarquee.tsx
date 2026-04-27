import Image from "next/image";

const universities = [
    { name: "Harvard", sub: "University", logo: "/universities/harvard.png" },
    { name: "Stanford", sub: "University", logo: "/universities/stanford.png" },
    { name: "Berkeley", sub: "UC Berkeley", logo: "/universities/berkeley.png" },
    { name: "Oxford", sub: "University", logo: "/universities/oxford.png" },
    { name: "Cambridge", sub: "University", logo: "/universities/cambridge.png" },
    { name: "MIT", sub: "Massachusetts", logo: "/universities/mit.png" },
    { name: "Cornell", sub: "University", logo: "/universities/cornell.png" },
    { name: "Toronto", sub: "University", logo: "/universities/toronto.png" },
    { name: "Yale", sub: "University", logo: "/universities/yale.png" },
    { name: "Penn", sub: "University", logo: "/universities/penn.png" },
    { name: "NYU", sub: "New York", logo: "/universities/nyu.png" },
    { name: "Georgetown", sub: "University", logo: "/universities/georgetown.png" },
];

function LogoCard({
    name,
    sub,
    logo,
}: {
    name: string;
    sub: string;
    logo: string;
}) {
    return (
        <div className="flex h-16 min-w-[170px] items-center gap-3 rounded-xl bg-white px-5 shadow-sm border border-border/40">
            <div className="relative h-9 w-9 shrink-0">
                <Image
                    src={logo}
                    alt={`${name} logo`}
                    fill
                    className="object-contain"
                    sizes="36px"
                />
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
                        <LogoCard key={`${uni.name}-${i}`} name={uni.name} sub={uni.sub} logo={uni.logo} />
                    ))}
                </div>
            </div>
        </section>
    );
}
