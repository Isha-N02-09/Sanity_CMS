import styles from "@/styles/ServicePage.module.css";

interface WorkflowStep {
  label: string;
  description?: string;
}

interface WorkflowTimelineProps {
  steps: string[];
}

// Map service flow steps to descriptions
const stepDescriptions: Record<string, string> = {
  "UI/UX Design": "Figma / Design",
  "Design": "Strategy & Design",
  "Code": "Frontend & Backend",
  "Build": "Development",
  "Backend": "API & Database",
  "Deploy": "Server / Cloud",
  "Test & Monitor": "Testing & Monitoring",
  "Discover": "Discovery & Planning",
  "Automate": "Process Automation",
  "Measure": "Measurement & Analysis",
  "Improve": "Continuous Improvement",
  "Prototype": "Initial Development",
  "Launch": "Go Live",
  "Support": "Ongoing Support",
  "Ship": "Ship to Production",
  "Architect": "System Architecture",
  "Assess": "Assessment",
  "Refactor": "Modernization",
  "Integrate": "Integration",
  "Staff": "Team Assembly",
  "Scale": "Growth & Scaling",
  "Engage": "Engagement Strategy",
  "Convert": "Conversion Optimization",
  "Grow": "Growth Marketing",
  "Answer": "Resolution",
  "Hand off": "Handoff",
};

export default function WorkflowTimeline({ steps }: WorkflowTimelineProps) {
  return (
    <div className={styles.workflowTimeline}>
      <div className={styles.timelineContainer}>
        {steps.map((step, index) => (
          <div key={index} className={styles.timelineItem}>
            <div className={styles.stepIcon}>
              <span className={styles.stepNumber}>{index + 1}</span>
            </div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepLabel}>{step}</h3>
              {stepDescriptions[step] && (
                <p className={styles.stepDescription}>{stepDescriptions[step]}</p>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={styles.stepArrow}>→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
