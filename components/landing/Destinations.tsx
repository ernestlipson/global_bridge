import Image from "next/image";
import Link from "next/link";

const destinations = [
    {
        country: "United Kingdom",
        tagline: "Tradition meets innovation",
        universities: "120+ Univs",
        image:
            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
        type: "tall",
        theme: "dark"
    },
    {
        country: "United States",
        tagline: "Boundless opportunity",
        universities: "150+ Univs",
        image:
            "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
        type: "medium",
        theme: "blue"
    },
    {
        country: "Canada",
        tagline: "Quality and safety",
        universities: "80+ Univs",
        image:
            "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=80",
        type: "short",
        theme: "light"
    },
    {
        country: "Australia",
        tagline: "Dynamic lifestyle",
        universities: "60+ Univs",
        image:
            "https://images.unsplash.com/photo-1524562865630-b991c6c2f261?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "short",
        theme: "light"
    },
    {
        country: "Germany",
        tagline: "Research excellence",
        universities: "50+ Univs",
        image:
            "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1200&q=80",
        type: "medium",
        theme: "brand-green"
    },
    {
        country: "Dubai (UAE)",
        tagline: "Global business hub",
        universities: "30+ Univs",
        image:
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
        type: "tall",
        theme: "dark"
    },
];

const apiCountryByDestination: Record<string, string> = {
    "United States": "USA",
    Canada: "Canada",
};

function DestinationCard({ dest }: { dest: typeof destinations[0] }) {
    const heightClass = 
        dest.type === "tall" ? "lg:h-[480px]" :
        dest.type === "medium" ? "lg:h-[380px]" : "lg:h-[300px]";
    const universityHref = `/universities?country=${encodeURIComponent(apiCountryByDestination[dest.country] || dest.country)}`;

    return (
        <Link
            href={universityHref}
            className={`w-full lg:flex-1 h-[350px] ${heightClass} rounded-[2rem] relative overflow-hidden group shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4`}
            aria-label={`View universities in ${dest.country}`}
        >
            <Image
                src={dest.image}
                alt={dest.country}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#132c27]/60 to-[#132c27] z-10" />
            <div className="absolute inset-0 z-20 p-4 sm:p-5 flex flex-col justify-end text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white">{dest.country}</h3>
                <p className="text-white/80 mt-1 text-xs sm:text-sm leading-snug">{dest.tagline}</p>
                <div className="mt-3 sm:mt-4 flex gap-2">
                    <span className="bg-white/20 border border-white/10 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium text-white backdrop-blur-md">
                        {dest.universities}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export function Destinations() {
    return (
        <section id="destinations" className="py-24 sm:py-32 relative overflow-hidden bg-slate-50/50">
            <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
                    {/* Trending Badge */}
                    <div className="mb-6 inline-flex items-center justify-center space-x-2 rounded border border-[#2d8a4e]/20 bg-[#2d8a4e]/5 px-4 py-1.5 text-[13px] font-medium text-[#2d8a4e]">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2d8a4e] opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2d8a4e]"></span>
                        </span>
                        <span>Trending for schools: UK, USA, Canada, Australia & more</span>
                    </div>

                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[4rem] leading-[1.1]">
                        Where do you want to study?
                    </h2>
                    <p className="mt-6 text-lg sm:text-[1.1rem] leading-relaxed text-slate-500 max-w-2xl mx-auto">
                        Top study destinations across the globe. We support students heading to 50+ countries with comprehensive, fast and reliable guidance.
                    </p>
                </div>

                {/* Destination image cards - Staggered Bento Layout */}
                <div className="mt-16 sm:mt-20 flex flex-col lg:flex-row items-center justify-center gap-5 w-full">
                    {destinations.map((dest) => (
                        <DestinationCard key={dest.country} dest={dest} />
                    ))}
                </div>
            </div>
        </section>
    );
}
