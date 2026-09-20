import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import BackToTop from "@/components/BackToTop";
import { absoluteUrl, siteUrl } from "@/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Berry Solutions | Digital Products, AI & Technology",
    template: "%s | Berry Solutions",
  },
  description:
    "Berry Solutions designs and builds digital products, websites, AI systems, and technology solutions for growing businesses.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Berry Solutions",
    title: "Berry Solutions | Digital Products, AI & Technology",
    description:
      "Digital products, intelligent systems, and technology solutions from Berry Solutions.",
    url: siteUrl,
    images: [{ url: absoluteUrl("/assets/icon2.png"), alt: "Berry Solutions logo" }],
  },
  twitter: {
    card: "summary",
    title: "Berry Solutions | Digital Products, AI & Technology",
    description:
      "Digital products, intelligent systems, and technology solutions from Berry Solutions.",
    images: [absoluteUrl("/assets/icon2.png")],
  },
  icons: { icon: "/assets/icon2.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} bg-white text-ink`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "Berry Solutions",
                  url: siteUrl,
                  logo: absoluteUrl("/assets/icon2.png"),
                  sameAs: [
                    "https://www.linkedin.com/company/berry-solutions",
                    "https://www.instagram.com/berrysols/",
                    "https://www.facebook.com/people/Berry-Solutions/61559954167096/",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  name: "Berry Solutions",
                  url: siteUrl,
                  publisher: { "@id": `${siteUrl}/#organization` },
                },
              ],
            }),
          }}
        />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
