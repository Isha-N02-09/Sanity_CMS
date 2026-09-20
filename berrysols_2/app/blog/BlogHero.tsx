import PageHero from "@/components/PageHero";

type BlogHeroProps = {
  children: React.ReactNode;
  className?: string;
};

export default function BlogHero({ children, className }: BlogHeroProps) {
  return <PageHero className={className}>{children}</PageHero>;
}
