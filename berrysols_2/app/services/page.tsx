import type { Metadata } from "next";
import styles from "@/styles/overview.module.css";
import HeroSection from "./HeroSection";
import ServicesOverview from "./ServicesOverview";
import {getServices} from "@/lib/sanity/queries";
import {services as legacyServices} from "@/data/services";

export const metadata: Metadata = {
  title: "Digital, AI & Technology Services",
  description:
    "Explore Berry Solutions services for web development, AI automation, software, startup support, and digital marketing.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Digital, AI & Technology Services",
    description:
      "Web development, AI automation, software, startup support, and digital marketing from Berry Solutions.",
    url: "/services",
  },
};

export default async function ServicesOverviewPage() {
  const services = (await getServices()) ?? legacyServices;

  return (
    <main className={styles.page}>
      <HeroSection />
      <ServicesOverview services={services} />
    </main>
  );
}
