/**
 * Active nav item: exact match, or sub-routes for most items.
 * `/documents` is exact-only so `/documents/sop-cv-builder` does not highlight "Documents".
 */
export function isDashboardNavActive(pathname: string, href: string): boolean {
    if (href === "/dashboard") {
        return pathname === "/dashboard";
    }
    if (href === "/documents") {
        return pathname === "/documents";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
}
