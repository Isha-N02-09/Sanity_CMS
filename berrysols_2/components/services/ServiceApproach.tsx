import styles from "@/styles/ServicePage.module.css";
import type { Service } from "@/data/services";

const approachCopy = [
  "Direction & discovery",
  "Design & planning",
  "Build & validation",
  "Launch & optimization",
];

export default function ServiceApproach({ service }: { service: Service }) {
  const flowSteps = service.flow.map((step, index) => ({
    number: String(index + 1).padStart(2, "0"),
    name: step,
    description: approachCopy[index] ?? "Delivery & support",
  }));

  return (
    <section className={`${styles.section} ${styles.approach}`}>
      <div className="wrap">
        <div className={styles.sectionHead}>
          <span className="eyebrow">The Berry Approach</span>
          <h2>How we make {service.eyebrow.toLowerCase()} work.</h2>
        </div>

        <div className={styles.flowBoard}>
          {flowSteps.map((step) => (
            <div key={step.name} className={styles.flowCard}>
              <div className={styles.cardPin} aria-hidden="true" />
              <div className={styles.flowCardTop}>
                <span className={styles.flowNumber}>{step.number}</span>
                <span className={styles.flowCardTag}>{step.name}</span>
              </div>
              <div className={styles.flowCardBody}>
                <span className={styles.flowLabel}>{step.name}</span>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
