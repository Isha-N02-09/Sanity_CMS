"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { BlogPost } from "@/lib/blog";

type BlogArchiveProps = {
  posts: BlogPost[];
};

const categories = ["All", "Digital", "News", "Standard", "Stories"] as const;
type Category = (typeof categories)[number];

const postsPerPage = 9;

export default function BlogArchive({ posts }: BlogArchiveProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const visiblePosts = useMemo(
    () => activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory),
    [activeCategory, posts],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const latestPost = visiblePosts[0];
  const totalPages = Math.max(1, Math.ceil(visiblePosts.length / postsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedPosts = visiblePosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  return (
    <>
      <nav className="blog-category-bar" aria-label="Post categories">
        <span className="blog-category-label">Categories</span>
        <div className="blog-filters">
          {categories.map((category) => {
            const count = category === "All"
              ? posts.length
              : posts.filter((post) => post.category === category).length;

            return (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "is-active" : ""}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category} <span>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {currentPage === 1 && latestPost && (
        <section className="blog-feature blog-feature--recent" aria-label="Latest blog post">
          <div className="blog-feature-image-wrap">
            <Image src={latestPost.image} alt={latestPost.title} width={1200} height={720} className="blog-feature-image" />
            <span className="blog-feature-badge">Read<br />the<br />latest</span>
          </div>
          <div className="blog-feature-card">
            <p className="blog-feature-kicker">Featured / {latestPost.category}</p>
            <h2>{latestPost.title}</h2>
            <p className="blog-feature-excerpt">{latestPost.excerpt}</p>
            <Link href={`/blog/${latestPost.slug}`} className="blog-feature-link">Read post</Link>
          </div>
        </section>
      )}

      <section className="blog-sheet-posts" aria-label="Blog posts">
        <div className="blog-section-heading"><span>All stories</span></div>

        {paginatedPosts.length > 0 ? (
          <>
            <div className="blog-post-grid">
              {paginatedPosts.map((post, index) => (
                <article key={post.slug} className="blog-post-card group">
                  <Link href={`/blog/${post.slug}`} className="blog-post-image-wrap">
                    <Image src={post.image} alt={post.title} width={720} height={480} className="blog-post-image" />
                  </Link>
                  <div className="blog-post-copy">
                    <div className="blog-post-meta"><span>{post.date}</span><span>{post.category}</span></div>
                    <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                    <p>{post.excerpt}</p>
                    <div className="blog-post-footer"><span>Read story</span><span>{String((currentPage - 1) * postsPerPage + index + 1).padStart(2, "0")}</span></div>
                  </div>
                </article>
              ))}
            </div>

            <div className="blog-pagination" aria-label="Blog pagination">
              <button type="button" onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} disabled={currentPage === 1}>
                Prev
              </button>

              <div className="blog-pagination-pages">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={currentPage === page ? "is-active" : ""}
                    aria-current={currentPage === page ? "page" : undefined}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button type="button" onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="blog-empty-state">No stories in this category yet.</p>
        )}
      </section>
    </>
  );
}
