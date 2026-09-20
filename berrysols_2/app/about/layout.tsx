import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Berry Solutions",
  description:
    "Meet the thinkers and builders behind Berry Solutions and learn how we approach useful digital products and technology.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Berry Solutions",
    description:
      "Meet the thinkers and builders behind Berry Solutions and learn how we approach useful digital products and technology.",
    url: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}