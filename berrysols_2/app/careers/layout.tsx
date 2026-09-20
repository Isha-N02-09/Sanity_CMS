import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Berry Solutions",
  description:
    "Explore open roles at Berry Solutions for people who want to build digital products, intelligent systems, and thoughtful client work.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers at Berry Solutions",
    description:
      "Explore open roles at Berry Solutions for people who want to build digital products and technology.",
    url: "/careers",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}