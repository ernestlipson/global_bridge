"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        // TODO: Implement actual auth
        setTimeout(() => setIsLoading(false), 1500);
    }

    return (
        <div className="flex flex-col items-center">
            {/* Mobile logo */}
            <Link href="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                    <GraduationCap size={20} className="text-white" />
                </div>
                <span className="text-lg font-bold text-text-primary tracking-tight">
                    GlobalBridge
                </span>
            </Link>

            {/* Card */}
            <div className="w-full rounded-2xl bg-white p-8 shadow-sm border border-border/50">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-text-primary">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-text-secondary">
                        Sign in to continue your journey
                    </p>
                </div>

                {/* Google button */}
                <Button
                    type="button"
                    variant="outline"
                    fullWidth
                    size="lg"
                    className="mb-6"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Continue with Google
                </Button>

                {/* Divider */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-white px-3 text-text-muted">
                            or sign in with email
                        </span>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Email address"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />

                    <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
                            />
                            Remember me
                        </label>
                        <Link
                            href="/login"
                            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        variant="accent"
                        fullWidth
                        size="lg"
                        disabled={isLoading}
                        className="mt-2"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                                Signing in...
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>
            </div>

            {/* Footer link */}
            <p className="mt-6 text-center text-sm text-text-secondary">
                Don&apos;t have an account?{" "}
                <Link
                    href="/register"
                    className="font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                    Create one free
                </Link>
            </p>
        </div>
    );
}
