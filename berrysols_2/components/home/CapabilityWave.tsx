import styles from "@/styles/CapabilityWave.module.css";

const wavePaths = [
  "M0,120 C170,120 250,120 390,120 C540,120 590,92 720,96 S900,132 1030,150 S1250,154 1440,118",
  "M0,132 C180,132 260,132 400,132 C550,132 610,104 735,108 S920,144 1050,162 S1260,166 1440,135",
  "M0,146 C190,146 275,146 415,146 C560,146 630,116 750,120 S940,156 1070,174 S1270,178 1440,142",
  "M0,160 C180,160 285,160 430,160 C575,160 645,128 770,132 S955,168 1090,186 S1280,188 1440,150",
  "M0,174 C175,174 295,174 445,174 C590,174 660,140 790,144 S970,180 1110,198 S1290,198 1440,168",
];

export default function CapabilityWave() {
  return (
    <section className={styles.capabilitySection} aria-label="Capabilities section">
      <div className={styles.lineWrap}>
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {wavePaths.map((d, index) => (
            <path
              key={d}
              d={d}
              className={styles.wavePath}
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </svg>
      </div>
    </section>
  );
}
