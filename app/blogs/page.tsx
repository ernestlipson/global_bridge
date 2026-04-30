import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { blogPosts } from "@/lib/blog-posts";
import { ArrowRight01Icon, Book01Icon } from "hugeicons-react";

function formatDate(iso: string) {
    return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export default function BlogsPage() {
    const sorted = [...blogPosts].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return (
        <>
            <Navbar />
            <main className="min-h-[60vh] bg-[radial-gradient(circle_at_top_left,_rgba(12,59,124,0.06),_transparent_35%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_40%,_#f6f8fc_100%)]">
                <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
                    <nav className="text-sm text-text-muted">
                        <Link href="/" className="transition-colors hover:text-primary">
                            Home
                        </Link>
                        <span className="mx-2 opacity-60">/</span>
                        <span className="text-text-secondary">Blog</span>
                    </nav>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                                <Book01Icon size={16} />
                                GlobalBridge insights
                            </p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                                Blog &amp; guides
                            </h1>
                            <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
                                Practical reads on studying abroad, visa processing, scholarships, and getting
                                settled in a new country—written for students and families planning the move.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                        {sorted.map((post) => (
                            <article
                                key={post.slug}
                                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white/90 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <Link
                                    href={`/blogs/${post.slug}`}
                                    className="relative aspect-[2/1] shrink-0 overflow-hidden bg-surface"
                                    aria-label={`Cover: ${post.title}`}
                                >
                                    <Image
                                        src={post.coverImage}
                                        alt=""
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </Link>
                                <div className="flex min-h-0 flex-1 flex-col p-2.5 sm:p-3">
                                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] text-text-muted">
                                        <span className="rounded-full bg-primary/8 px-1.5 py-0.5 font-medium text-primary">
                                            {post.category}
                                        </span>
                                        <span>{formatDate(post.publishedAt)}</span>
                                        <span aria-hidden="true">·</span>
                                        <span>{post.readingMinutes} min</span>
                                    </div>
                                    <h2 className="mt-2 text-sm font-semibold leading-snug tracking-tight text-text-primary transition-colors group-hover:text-primary">
                                        <Link
                                            href={`/blogs/${post.slug}`}
                                            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-text-secondary">
                                        {post.excerpt}
                                    </p>
                                    <Link
                                        href={`/blogs/${post.slug}`}
                                        className="mt-2 inline-flex items-center gap-0.5 text-xs font-semibold text-primary transition-all hover:gap-1"
                                    >
                                        Read
                                        <ArrowRight01Icon size={12} aria-hidden />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
