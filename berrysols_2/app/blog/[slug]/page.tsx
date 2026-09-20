import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/home/Navbar";
import SimpleFooter from "@/components/home/Footer";
import BlogEngagement from "@/components/BlogEngagement";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug);
  return post ? {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/blog/${post.slug}`),
      images: [{ url: absoluteUrl(post.image), alt: post.title }],
      publishedTime: post.date,
      section: post.category,
    },
    twitter: { card: "summary_large_image" },
  } : {};
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#fffaf5] text-[#171410]">
      <Navbar />
      <article className="blog-article container pb-24 pt-36 lg:pt-48">
        <Link href="/blog" className="blog-back-link">Back to journal</Link>
        <div className="blog-article-heading" data-back-to-top-hero>
          <p className="blog-article-meta">{post.category} / {post.date} / 0 Comments</p>
          <h1>{post.title}</h1>
          <p className="blog-author">By Ahsan Mehmood</p>
        </div>
        <Image src={post.image} alt={post.title} width={1200} height={600} className="blog-article-image" priority />
        <div className="blog-article-layout">
          <div className="blog-article-body">
            <p className="blog-article-lede">{post.excerpt}</p>
            {post.stats && <div className="blog-stat-grid" aria-label="Article statistics">{post.stats.map((stat) => <div className="blog-stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span><small>{stat.detail}</small></div>)}</div>}
            {post.graph && <div className="blog-graph" aria-label="Article graph"><div className="blog-graph-heading"><span>Signal at a glance</span><small>Relative index</small></div>{post.graph.map((item) => <div className="blog-graph-row" key={item.label}><span>{item.label}</span><div><i style={{ width: `${item.value}%` }} /></div><strong>{item.value}</strong></div>)}</div>}
            <div className="blog-article-sections">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.image && <Image src={section.image} alt={section.heading} width={980} height={430} className="blog-inline-image" />}
                  <div>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                </section>
              ))}
              {post.table && (
                <div className="blog-table-wrap">
                  <table>
                    <thead><tr>{post.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                    <tbody>{post.table.rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              )}
              {post.relatedImages && <div className="blog-related-images">{post.relatedImages.map((image) => <figure key={image.src}><img src={image.src} alt={image.alt} /><figcaption>{image.caption}</figcaption></figure>)}</div>}
              {post.faqs && <section><h2>FAQs</h2><div className="blog-faqs">{post.faqs.map((faq) => <div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}</div></section>}
            </div>
          </div>
          <aside className="blog-article-sidebar">
            <BlogEngagement />
            <p>About Author</p>
            <h2>Ahsan Mehmood</h2>
            <p>Welcome to Berry Solutions! I&apos;m Ahsan, the CEO and Founder. I&apos;m a passionate tech enthusiast and digital solutions architect with over 10 years of experience in the IT industry.</p>
            <Link href="/blog">More stories</Link>
          </aside>
        </div>
      </article>
      <SimpleFooter />
    </main>
  );
}