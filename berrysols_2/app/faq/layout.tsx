import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs About Berry Solutions Services",
  description:
    "Answers about Berry Solutions services, web development, SEO, digital marketing, cloud technology, and startup support.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQs About Berry Solutions Services",
    description:
      "Answers about Berry Solutions services, web development, SEO, digital marketing, cloud technology, and startup support.",
    url: "/faq",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}