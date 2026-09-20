import styles from "@/styles/ServicePage.module.css";
import type { Service } from "@/data/services";

export default function ServiceIndustries({ service }: { service: Service }) {
  return (
    <section className={styles.section}>
      <div className="wrap">
        <div className={styles.sectionHead}>
          <span className="eyebrow">Built For Your Industry</span>
          <h2>Technology that adapts to your world.</h2>
        </div>
        <div className={styles.industryRow}>
          {service.industries.map((industry) => (
            <span key={industry} className={styles.industryPill}>
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
