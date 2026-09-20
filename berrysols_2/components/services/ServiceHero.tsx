import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/ServicePage.module.css";
import type { Service } from "@/data/services";

const IMAGE_BY_SERVICE: Record<string, string> = {
  "web-development": "/assets/services/webdevbg.png",
  "ai-automation": "/assets/services/aiautomationbg.png",
  "digital-marketing": "/assets/services/digitalmarketingbg.png",
  "enterprise-resource-planning-erp": "/assets/services/erpbg.png",
  "legacy-software": "/assets/services/legacysoftwarebg.png",
  "startup-support": "/assets/services/startupbg.png",
  "desktop-app-development": "/assets/services/webdevbg.png",
  "staff-augmentation": "/assets/services/webdevbg.png",
};

export default function ServiceHero({ service }: { service: Service }) {
  const imageSrc = service.heroImageUrl ?? IMAGE_BY_SERVICE[service.slug] ?? "/assets/services/webdevbg.png";

  return (
    <section className={`${styles.hero} ${styles.webDevHero} ${service.slug === "ai-automation" ? styles.aiAutomationHero : ""}`} data-back-to-top-hero>
      <div className={`${styles.heroGrid} ${styles.webDevGrid}`}>
        <div className={`${styles.heroIntro} ${styles.webDevIntro}`}>
          <span className={styles.heroEyebrow}>{service.eyebrow}</span>
          <h1 className={styles.heroTitle}>{service.title}</h1>
          <p className={styles.heroDesc}>{service.description}</p>

          <div className={styles.heroActions}>
            <Link href="/#contact" className="btn">
              Let&rsquo;s talk <span className={styles.talkIcon} aria-hidden="true">↗</span>
            </Link>
            <Link href="/services" className="btn ghost">
              All services
            </Link>
          </div>
        </div>

        <div className={styles.heroVisualWrap}>
          <div className={styles.heroVisualFrame}>
            <Image
              src={imageSrc}
              alt={`${service.eyebrow} illustration`}
              width={920}
              height={620}
              priority
              className={styles.heroVisual}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
