const destinations = [
    { country: "United Kingdom", flag: "🇬🇧", universities: "120+ Universities", popular: "London, Manchester, Edinburgh" },
    { country: "United States", flag: "🇺🇸", universities: "150+ Universities", popular: "New York, Boston, California" },
    { country: "Canada", flag: "🇨🇦", universities: "80+ Universities", popular: "Toronto, Vancouver, Montreal" },
    { country: "Australia", flag: "🇦🇺", universities: "60+ Universities", popular: "Sydney, Melbourne, Brisbane" },
    { country: "Germany", flag: "🇩🇪", universities: "50+ Universities", popular: "Berlin, Munich, Hamburg" },
    { country: "Dubai (UAE)", flag: "🇦🇪", universities: "30+ Universities", popular: "Dubai, Abu Dhabi, Sharjah" },
];

export function Destinations() {
    return (
        <section id="destinations" className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                        Study Destinations
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                        Where do you want to study?
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                        Explore top study destinations across the globe. We support students
                        heading to 50+ countries.
                    </p>
                </div>

                {/* Destination grid */}
                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {destinations.map((dest) => (
                        <div
                            key={dest.country}
                            className="group flex items-start gap-4 rounded-xl border border-border/60 bg-white p-5 transition-all duration-200 hover:border-primary/20 hover:shadow-md"
                        >
                            <span className="text-3xl leading-none" role="img" aria-label={dest.country}>
                                {dest.flag}
                            </span>
                            <div>
                                <h3 className="font-semibold text-text-primary">
                                    {dest.country}
                                </h3>
                                <p className="mt-0.5 text-sm font-medium text-primary">
                                    {dest.universities}
                                </p>
                                <p className="mt-1 text-sm text-text-muted">
                                    {dest.popular}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
