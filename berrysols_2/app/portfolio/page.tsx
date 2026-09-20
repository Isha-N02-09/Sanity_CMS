import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import SimpleFooter from "@/components/home/Footer";
import BlogHero from "@/app/blog/BlogHero";
import PortfolioList from "./PortfolioList";
import { portfolioProjects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A selection of digital products, platforms, and experiences built by Berry Solutions.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Berry Solutions Portfolio",
    description: "Selected digital products, platforms, and experiences built by Berry Solutions.",
    url: "/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <main className="portfolio-page min-h-screen bg-white text-[#111]">
      <Navbar />
      <BlogHero>
        <header className="blog-sheet-header">
          <div className="blog-rule" />
          <div className="blog-masthead">
            <p>Berry Solutions / Selected work</p>
            <h1>PORTFOLIO</h1>
            <p>Digital products, platforms, and experiences made to move businesses forward.</p>
          </div>
        </header>
      </BlogHero>
      <PortfolioList projects={portfolioProjects} />
      <SimpleFooter />
    </main>
  );
}
