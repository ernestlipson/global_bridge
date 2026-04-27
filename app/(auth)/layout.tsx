import { GraduationScrollIcon } from "hugeicons-react";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-dvh">
            {/* Left panel — branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-[#061E3A] relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/[0.03] blur-2xl" />
                </div>

                <div className="relative z-10 flex flex-col justify-between p-12 text-white">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                            <GraduationScrollIcon size={22} className="text-white" />
                        </div>
                        <div>
                            <span className="text-lg font-bold tracking-tight">
                                GlobalBridge
                            </span>
                            <span className="block text-xs text-white/60 -mt-0.5">
                                Edu Consult
                            </span>
                        </div>
                    </Link>

                    {/* Main message */}
                    <div className="max-w-md">
                        <h1 className="text-4xl font-bold leading-tight tracking-tight">
                            Bridging Education
                            <br />
                            <span className="text-accent-light">Beyond Borders</span>
                        </h1>
                        <p className="mt-4 text-lg leading-relaxed text-white/70">
                            Your trusted pathway to global education opportunities.
                            AI-powered tools to help you study abroad with confidence.
                        </p>

                        {/* Stats */}
                        <div className="mt-10 grid grid-cols-3 gap-6">
                            <div>
                                <div className="text-2xl font-bold">500+</div>
                                <div className="text-sm text-white/50">Universities</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">50+</div>
                                <div className="text-sm text-white/50">Countries</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">95%</div>
                                <div className="text-sm text-white/50">Visa Success</div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-sm text-white/40">
                        &copy; {new Date().getFullYear()} GlobalBridge Edu Consult. All
                        rights reserved.
                    </p>
                </div>
            </div>

            {/* Right panel — auth form */}
            <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2 bg-surface">
                <div className="w-full max-w-md">{children}</div>
            </div>
        </div>
    );
}
