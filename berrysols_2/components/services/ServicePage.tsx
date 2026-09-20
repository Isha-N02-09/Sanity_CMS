import ServiceHero from "./ServiceHero";
import ServiceApproach from "./ServiceApproach";
import ServiceCapabilities from "./ServiceCapabilities";
import ServiceBottlenecks from "./ServiceBottlenecks";
import ServiceChallenges from "./ServiceChallenges";
import ServiceTechStack from "./ServiceTechStack";
import ServiceCaseStudies from "./ServiceCaseStudies";
import ServiceCTA from "./ServiceCTA";
import type { Service } from "@/data/services";

// One system, fed by data/services.ts. Every /services/[slug] route
// renders this same component tree — only the data changes per service.
export default function ServicePage({ service }: { service: Service }) {
  return (
    <main>
      <ServiceHero service={service} />
      <ServiceBottlenecks service={service} />
      <ServiceApproach service={service} />
      <ServiceChallenges service={service} />
      <ServiceCapabilities service={service} />
      <ServiceTechStack service={service} />
      <ServiceCaseStudies service={service} />
      <ServiceCTA service={service} />
    </main>
  );
}
