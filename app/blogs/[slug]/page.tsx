import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import {
    blogPosts,
    getAllBlogSlugs,
    getBlogPostBySlug,
} from "@/lib/blog-posts";
import { ArrowLeft01Icon } from "hugeicons-react";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getAllBlogSlugs().map((slug) => ({ slug }));
}

function formatDate(iso: string) {
    return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

/** Renders dummy body: **bold** segments become <strong>. */
function PostBody({ paragraphs }: { paragraphs: string[] }) {
    return (
        <div className="space-y-5 text-base leading-relaxed text-text-secondary">
            {paragraphs.map((para, i) => (
                <p key={i}>
                    {para.split(/\*\*(.+?)\*\*/g).map((chunk, j) =>
                        j % 2 === 1 ? (
                            <strong key={j} className="font-semibold text-text-primary">
                                {chunk}
                            </strong>
                        ) : (
                            <span key={j}>{chunk}</span>
                        )
                    )}
                </p>
            ))}
        </div>
    );
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);
    const more =
        related.length > 0
            ? related
            : blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

    return (
        <>
            <Navbar />
            <main className="min-h-[60vh] bg-[radial-gradient(circle_at_top_left,_rgba(12,59,124,0.06),_transparent_35%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_45%,_#f6f8fc_100%)]">
                <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-12">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
                    >
                        <ArrowLeft01Icon size={16} aria-hidden />
                        Back to blog
                    </Link>

                    <header className="mt-8">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-muted">
                            <span className="rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary">
                                {post.category}
                            </span>
                            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                            <span aria-hidden="true">·</span>
                            <span>{post.readingMinutes} min read</span>
                        </div>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-[2rem] sm:leading-tight">
                            {post.title}
                        </h1>
                        <div className="relative mt-6 aspect-[21/10] overflow-hidden rounded-2xl border border-border bg-surface shadow-sm sm:aspect-[2/1]">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 48rem"
                                className="object-cover"
                            />
                        </div>
                        <p className="mt-6 border-b border-border pb-8 text-lg text-text-secondary">
                            {post.excerpt}
                        </p>
                    </header>

                    <div className="pt-8">
                        <PostBody paragraphs={post.paragraphs} />
                    </div>

                    {more.length > 0 && (
                        <aside className="mt-14 rounded-2xl border border-border bg-white/80 p-6">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
                                More to read
                            </h2>
                            <ul className="mt-4 space-y-3">
                                {more.map((p) => (
                                    <li key={p.slug}>
                                        <Link
                                            href={`/blogs/${p.slug}`}
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            {p.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    )}
                </article>
            </main>
            <Footer />
        </>
    );
}
