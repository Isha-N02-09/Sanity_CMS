import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import SimpleFooter from "@/components/home/Footer";
import { blogPosts } from "@/lib/blog";
import BlogArchive from "./BlogArchive";
import BlogHero from "./BlogHero";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical perspectives on digital products, growth, and technology from Berry Solutions.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Berry Solutions Blog",
    description: "Practical perspectives on digital products, growth, and technology from Berry Solutions.",
    url: "/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="blog-page min-h-screen bg-white text-[#111]">
      <Navbar />
      <BlogHero>
        <header className="blog-sheet-header">
          <div className="blog-rule" />
          <div className="blog-masthead">
            <p>Digital journal / Issue 01</p>
            <h1>BLOG</h1>
            <p>Ideas, insight, and practical thinking for people building what comes next.</p>
          </div>
        </header>
      </BlogHero>

      <BlogArchive posts={blogPosts} />
      <SimpleFooter />
    </main>
  );
}