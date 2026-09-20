import styles from "@/styles/ServicePage.module.css";
import type { Service } from "@/data/services";

export default function ServiceCaseStudies({ service }: { service: Service }) {
  const featuredCaseStudies = service.caseStudies.slice(0, 1);

  return (
    <section className={styles.section}>
      <div className="wrap">
        <div className={styles.sectionHead}>
          <span className="eyebrow">Case Studies</span>
          <h2>Built. Deployed. Proven.</h2>
        </div>
        <div className={styles.caseGrid}>
          {featuredCaseStudies.map((cs) => (
            <div key={cs.client} className={styles.caseCard}>
              <div className={styles.caseTab} />
              <span className={styles.caseTag}>{cs.tag}</span>
              <h3>{cs.client}</h3>
              <p>{cs.summary}</p>
              <span className={styles.caseLink}>Explore case study →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
