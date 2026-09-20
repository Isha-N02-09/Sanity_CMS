"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import CategoryBar from "@/components/CategoryBar";
import styles from "@/styles/overview.module.css";

const serviceCategories = ["Digital", "Growth", "Technology"] as const;
type ServiceCategory = (typeof serviceCategories)[number];

export default function ServicesOverview({ services }: { services: Service[] }) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "All">("All");
  const visibleServices = activeCategory === "All"
    ? services
    : services.filter((service) => service.category === activeCategory);

  const selectCategory = (category: string) => {
    setActiveCategory(category as ServiceCategory | "All");
  };

  return (
    <>
      <CategoryBar
        label="Categories"
        categories={["All", ...serviceCategories]}
        activeCategory={activeCategory}
        onSelectCategory={selectCategory}
        items={services}
      />

      <div className="wrap" id="all-services">
        {activeCategory !== "All" && <div className={styles.categoryHeading}>{activeCategory}</div>}
        <div className={styles.list}>
          {visibleServices.map((service, index) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className={styles.listItem}>
              <div className={styles.row}>
                <div className={styles.rowLeft}>
                  <span className={styles.rowNum}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.rowTitle}>{service.eyebrow}</span>
                </div>
                <span className={styles.rowArrow}>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}