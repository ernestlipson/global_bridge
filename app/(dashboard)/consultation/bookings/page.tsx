import Link from "next/link";

export default function ConsultationBookingsPage() {
    return (
        <div className="mx-auto max-w-lg pb-10 text-center">
            <h1 className="text-xl font-semibold text-text-primary">My bookings</h1>
            <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
                Confirmed sessions will appear here once scheduling is connected to your account.
            </p>
            <Link
                href="/consultation"
                className="mt-6 inline-flex text-[13px] font-medium text-primary hover:text-primary-dark"
            >
                ← Back to experts
            </Link>
        </div>
    );
}
