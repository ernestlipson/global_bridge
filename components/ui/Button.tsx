import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "accent" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", fullWidth, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                    {
                        "bg-primary text-white hover:bg-primary-dark focus:ring-primary/50":
                            variant === "primary",
                        "bg-gradient-to-r from-accent to-emerald-500 text-white hover:from-accent-dark hover:to-emerald-600 focus:ring-accent/50 shadow-md hover:shadow-lg":
                            variant === "accent",
                        "border border-border bg-white text-text-primary hover:bg-surface focus:ring-primary/30":
                            variant === "outline",
                        "text-text-secondary hover:bg-surface hover:text-text-primary focus:ring-primary/30":
                            variant === "ghost",
                    },
                    {
                        "h-9 px-3 text-sm": size === "sm",
                        "h-11 px-5 text-sm": size === "md",
                        "h-12 px-6 text-base": size === "lg",
                    },
                    fullWidth && "w-full",
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
