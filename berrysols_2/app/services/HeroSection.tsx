import BlogHero from "@/app/blog/BlogHero";

export default function HeroSection() {
  return (
    <BlogHero className="services-page-hero">
      <header className="blog-sheet-header">
        <div className="blog-rule" />
        <div className="blog-masthead">
          <p>Digital services / What we do</p>
          <h1>SERVICES</h1>
          <p>Practical digital services for people building what comes next.</p>
        </div>
      </header>
    </BlogHero>
  );
}

