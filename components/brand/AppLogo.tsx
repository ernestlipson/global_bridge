import Image from "next/image";
import { cn } from "@/lib/utils";

export const BRAND_LOGO_PATH = "/images/global_bridge_logo_trimmed.png";

type AppLogoProps = {
    /** Light background (default) vs dark footer — inverts logo for contrast on navy. */
    variant?: "default" | "onDark";
    className?: string;
    /** Tailwind height class, e.g. h-9 */
    heightClass?: string;
    /** Max width cap for wide lockups */
    maxWidthClass?: string;
    priority?: boolean;
    /** Fitted square (e.g. collapsed sidebar icon slot). */
    square?: boolean;
    squarePx?: number;
};

/**
 * GlobalBridge wordmark from `public/images/global_bridge_logo.png`.
 */
export function AppLogo({
    variant = "default",
    className,
    heightClass = "h-11",
    maxWidthClass = "max-w-[280px]",
    priority = false,
    square = false,
    squarePx = 44,
}: AppLogoProps) {
    if (square) {
        const px = `${squarePx}px`;
        return (
            <div
                className={cn("relative shrink-0 overflow-hidden", className)}
                style={{ width: px, height: px }}
            >
                <Image
                    src={BRAND_LOGO_PATH}
                    alt="GlobalBridge"
                    fill
                    priority={priority}
                    sizes={`${squarePx}px`}
                    className={cn(
                        "object-contain",
                        variant === "onDark" && "brightness-0 invert opacity-[0.92]"
                    )}
                />
            </div>
        );
    }

    return (
        <Image
            src={BRAND_LOGO_PATH}
            alt="GlobalBridge Edu Consult"
            width={1832}
            height={407}
            priority={priority}
            className={cn(
                "w-auto object-contain object-left",
                heightClass,
                maxWidthClass,
                variant === "onDark" && "brightness-0 invert opacity-[0.92]",
                className
            )}
        />
    );
}
