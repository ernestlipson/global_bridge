import Image from "next/image";

const destinations = [
    {
        country: "United Kingdom",
        tagline: "Tradition meets innovation",
        universities: "120+ Universities",
        image:
            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    },
    {
        country: "United States",
        tagline: "Boundless opportunity",
        universities: "150+ Universities",
        image:
            "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    },
    {
        country: "Canada",
        tagline: "Quality and safety",
        universities: "80+ Universities",
        image:
            "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=80",
    },
    {
        country: "Australia",
        tagline: "Dynamic lifestyle",
        universities: "60+ Universities",
        image:
            "https://images.unsplash.com/photo-1524562865630-b991c6c2f261?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        country: "Germany",
        tagline: "Research and excellence",
        universities: "50+ Universities",
        image:
            "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1200&q=80",
    },
    {
        country: "Dubai (UAE)",
        tagline: "Global business hub",
        universities: "30+ Universities",
        image:
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    },
];

export function Destinations() {
    return (
        <section id="destinations" className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Study Destinations
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-[2.75rem]">
                        Where do you want to study?
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-[1.05rem]">
                        Top study destinations across the globe. We support students
                        heading to 50+ countries.
                    </p>
                </div>

                {/* Destination image cards */}
                <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {destinations.map((dest) => (
                        <div
                            key={dest.country}
                            className="group relative overflow-hidden rounded-2xl focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2"
                        >
                            <div className="relative aspect-[5/6] w-full overflow-hidden">
                                <Image
                                    src={dest.image}
                                    alt={`${dest.country}: ${dest.tagline}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                                    <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                                        {dest.universities}
                                    </span>
                                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
                                        {dest.country}
                                    </h3>
                                    <p className="mt-1 text-[0.925rem] font-medium text-white/70">
                                        {dest.tagline}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
