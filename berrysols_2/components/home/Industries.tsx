import {
  Building2,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  ShoppingBag,
  Smartphone,
  UtensilsCrossed,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import styles from "@/styles/Industries.module.css";
import {homeIndustries as industries, homeIndustryImages as industryImages} from "@/data/homeContent";

const industryIcons = {Landmark, BriefcaseBusiness, Smartphone, UtensilsCrossed, Building2, ShoppingBag, GraduationCap};

const rollingIndustries = [...industries, ...industries];

export default function Industries() {
  return (
    <section id="industries" className={styles.section} aria-labelledby="industries-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="industries-title" className={styles.title}>Industries we serve</h2>
          <p className={styles.description}>
            Different industries. Different challenges. One intelligent approach. We build scalable digital solutions that adapt to your industry, streamline operations, and create measurable impact.

          </p>
          <div className={styles.industryDisplay}>
            <div className={styles.industryWindow} aria-label="Industries we serve">
              <div className={styles.industryTrack}>
                {rollingIndustries.map((industry, index) => {
                  const Icon = industryIcons[industry.icon as keyof typeof industryIcons];

                  return (
                    <span
                      className={styles.industryName}
                      key={`${industry.name}-${index}`}
                    >
                      <span className={styles.industryIcon} aria-hidden="true">
                        <Icon size={16} strokeWidth={2} />
                      </span>
                      {industry.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <Link href="#contact" className={`${styles.learnMore} btn ghost`}>
            Learn more <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.imageFrame}>
          {industryImages.map(({ number, extension }) => (
            <img
              className={styles.image}
              key={number}
              src={`/assets/industry/${number}.${extension}`}
              alt={`Modern architecture panel ${number}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
