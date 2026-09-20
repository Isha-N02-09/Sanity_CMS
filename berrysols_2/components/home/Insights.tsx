import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "@/styles/Insights.module.css";
import {homeInsights as insights} from "@/data/homeContent";

const insightColumns = [insights.slice(0, 2), insights.slice(2, 5), insights.slice(5, 8)];

export default function Insight() {
  return (
    <section className={styles.insightSection}>
      <div className={styles.inner}>
        <div className={styles.leftContent}>
          <span className={styles.eyebrow}>
            FEATURED INSIGHTS
          </span>

          <h2>
            Stories of our transformations across
            <br />
            Services and Industries
          </h2>

          <p>From Concept to Completion</p>

          <Link href="/blog" className={styles.exploreLink}>
            Learn more <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.insightsArea}>
          <div className={styles.columns}>
            {insightColumns.map((column, columnIndex) => (
              <div
                className={`${styles.column} ${
                  styles[`column${columnIndex + 1}`]
                }`}
                key={columnIndex}
              >
                {column.map((insight, index) => (
                  <article
                    className={styles.insightCard}
                    key={index}
                  >
                    {insight.href ? (
                      <Link href={insight.href} className={styles.cardLink}>
                        <Image
                          src={insight.image}
                          alt={insight.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 260px"
                          className={styles.image}
                        />
                        <div className={styles.overlay} />
                        <div className={styles.cardContent}>
                          <span>{insight.category}</span>
                          <h3>{insight.title}</h3>
                        </div>
                      </Link>
                    ) : (
                      <>
                        <Image
                          src={insight.image}
                          alt={insight.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 260px"
                          className={styles.image}
                        />
                        <div className={styles.overlay} />
                        <div className={styles.cardContent}>
                          <span>{insight.category}</span>
                          <h3>{insight.title}</h3>
                        </div>
                      </>
                    )}
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}