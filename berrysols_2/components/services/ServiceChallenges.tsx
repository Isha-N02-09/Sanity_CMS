import styles from "@/styles/ServicePage.module.css";
import type { Service } from "@/data/services";

export default function ServiceChallenges({ service }: { service: Service }) {
  const bottlenecks = service.capabilities.slice(0, 4).map((capability, index) => ({
    title: capability.title,
    description: capability.description,
    number: String(index + 1).padStart(2, "0"),
  }));

  return (
    <section className={styles.section}>
      <div className="wrap">
        <div className={styles.sectionHead}>
          <span className="eyebrow">Bottlenecks</span>
          <h2>Challenges that slow {service.eyebrow.toLowerCase()} delivery.</h2>
        </div>

        <div className={styles.bottleneckGrid}>
          {bottlenecks.map((item) => (
            <div key={item.title} className={styles.bottleneckCard}>
              <span className={styles.bottleneckNumber}>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
