type PageHeroProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageHero({ children, className = "" }: PageHeroProps) {
  return (
    <section className={`blog-hero ${className}`.trim()} data-back-to-top-hero>
      <div className="blog-hero-content">{children}</div>
    </section>
  );
}
