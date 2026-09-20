export type Capability = {
  title: string;
  description: string;
};

export type TechGroup = {
  label: string;
  items: string[];
};

export type FlowStep = string;

export type CaseStudy = {
  tag: string;
  client: string;
  summary: string;
};

export type Service = {
  _id?: string;
  slug: string;
  category: "Digital" | "Growth" | "Technology";
  eyebrow: string;
  title: string;
  description: string;
  flow: FlowStep[]; // the small signature "connects the dots" sequence in the hero
  capabilities: Capability[];
  industries: string[];
  tech: TechGroup[];
  caseStudies: CaseStudy[];
  ctaLine: string;
  heroImageUrl?: string;
};

export const services: Service[] = [
  {
    slug: "ai-automation",
    category: "Technology",
    eyebrow: "AI Automation",
    title: "Turn intelligence into something useful.",
    description:
      "We design and ship AI systems that eliminate manual work, reduce operational waste, and give your team smarter workflows at scale.",
    flow: ["Discover", "Automate", "Measure", "Improve"],
    capabilities: [
      { title: "Process Mapping", description: "Document what your team does today and find the bottlenecks costing time and money." },
      { title: "Workflow Automation", description: "Replace repetitive tasks with reliable systems that run without manual follow-up." },
      { title: "Decision Support", description: "Surface the right information when teams need it to act quickly and confidently." },
      { title: "Operational Insights", description: "Track process performance and keep improving the work behind your business." },
      { title: "AI Assistants", description: "Bring AI to the tasks people do every day without adding complexity to your stack." },
      { title: "Integration", description: "Connect the tools, apps, and systems already powering the business into one workflow." },
    ],
    industries: ["Startups", "Healthcare", "Finance", "E-Commerce", "Manufacturing"],
    tech: [
      { label: "AI / ML", items: ["Python", "OpenAI", "Azure AI"] },
      { label: "Backend", items: ["Node.js", "Python", "FastAPI"] },
      { label: "Cloud", items: ["AWS", "Azure", "Docker"] },
    ],
    caseStudies: [
      { tag: "AI", client: "Support automation", summary: "Deployed an agent that resolves first-line support tickets end to end." },
      { tag: "AI", client: "Document intelligence", summary: "Built an NLP pipeline that extracts structured data from unstructured files." },
      { tag: "AI", client: "Forecasting model", summary: "Shipped a demand-forecasting model that cut overstock by double digits." },
    ],
    ctaLine: "Have a process worth automating?",
  },
  {
    slug: "web-development",
    category: "Digital",
    eyebrow: "Web Development",
    title: "We build the web around your business.",
    description:
      "From high-converting websites to complex web applications, Berry builds fast, scalable digital experiences designed around how your business actually works.",
    flow: ["Idea", "Design", "Build", "Ship"],
    capabilities: [
      {
        title: "Custom Websites",
        description:
          "Websites designed around your brand, audience and goals — built to load fast and convert.",
      },
      {
        title: "Web Applications",
        description:
          "Scalable applications that power real business workflows, not just marketing pages.",
      },
      {
        title: "E-Commerce",
        description:
          "Digital storefronts engineered to convert traffic into customers at every step.",
      },
      {
        title: "API & Integrations",
        description:
          "Connect your website with the systems your business already runs on.",
      },
    ],
    industries: ["Startups", "E-Commerce", "Healthcare", "Finance", "Education", "Manufacturing"],
    tech: [
      { label: "Frontend", items: ["Next.js", "React", "TypeScript"] },
      { label: "Backend", items: ["Node.js", "Python", ".NET"] },
      { label: "Database", items: ["PostgreSQL", "MySQL", "MongoDB"] },
    ],
    caseStudies: [
      { tag: "E-Commerce", client: "Retail platform rebuild", summary: "Rebuilt a legacy storefront into a fast, headless commerce experience." },
      { tag: "SaaS", client: "Workflow tooling", summary: "Shipped a custom web application replacing three disconnected internal tools." },
      { tag: "Marketing", client: "High-conversion site", summary: "Redesigned a marketing site around a single, clear conversion path." },
    ],
    ctaLine: "Have a website worth rebuilding?",
  },
  {
    slug: "desktop-app-development",
    category: "Technology",
    eyebrow: "Desktop App Development",
    title: "Ideas that belong in your users' hands.",
    description:
      "Native and cross-platform desktop apps built for speed, reliability, and real business adoption — from first prototype to launch.",
    flow: ["Prototype", "Build", "Test", "Launch"],
    capabilities: [
      { title: "Windows Apps", description: "High-performance desktop software designed around how teams actually work." },
      { title: "Cross-Platform", description: "Flutter and Electron builds that ship faster without sacrificing polish." },
      { title: "Business Tools", description: "Internal applications that replace spreadsheets and disconnected workflows." },
      { title: "UX Design", description: "Interfaces that are powerful enough for work and clean enough for daily use." },
      { title: "Maintenance", description: "Ongoing optimization, updates, and support after launch." },
      { title: "Deployment", description: "Rollout and support that keep your team moving after release." },
    ],
    industries: ["Startups", "E-Commerce", "Healthcare", "Education"],
    tech: [
      { label: "Desktop", items: ["Electron", "WPF", "WinUI"] },
      { label: "Cross-Platform", items: ["Flutter", "React Native"] },
      { label: "Backend", items: ["Node.js", "Firebase"] },
    ],
    caseStudies: [
      { tag: "Desktop", client: "Consumer app launch", summary: "Took a startup from prototype to a polished desktop launch." },
      { tag: "Desktop", client: "Healthcare app", summary: "Built a secure workflow app used daily by clinicians and staff." },
      { tag: "Desktop", client: "Cross-platform rebuild", summary: "Merged separate product codebases into one faster application." },
    ],
    ctaLine: "Got an app idea worth building right?",
  },
  {
    slug: "enterprise-resource-planning-erp",
    category: "Technology",
    eyebrow: "Enterprise Resource Planning (ERP)",
    title: "Software built around the way you work.",
    description:
      "Custom software, SaaS platforms and enterprise systems designed around your actual workflows — not the other way around.",
    flow: ["Discover", "Architect", "Build", "Support"],
    capabilities: [
      { title: "ERP Design", description: "Purpose-built systems designed around your exact operational requirements." },
      { title: "Workflow Automation", description: "Connect planning, purchasing, operations, and reporting into one coherent system." },
      { title: "Finance & Inventory", description: "Business systems tailored to how your teams actually operate." },
      { title: "Integration", description: "Connect the software you already depend on into a single workflow." },
      { title: "Reporting", description: "See the full picture across departments with live operational visibility." },
      { title: "Optimization", description: "Modernize the core systems that keep your company moving." },
    ],
    industries: ["Startups", "Manufacturing", "Finance", "Healthcare"],
    tech: [
      { label: "Backend", items: ["Node.js", "Python", ".NET", "Java"] },
      { label: "Frontend", items: ["React", "Next.js", "TypeScript"] },
      { label: "Database", items: ["PostgreSQL", "MongoDB", "Redis"] },
    ],
    caseStudies: [
      { tag: "Software", client: "SaaS platform build", summary: "Built a multi-tenant SaaS product from zero to first paying customers." },
      { tag: "Software", client: "ERP integration", summary: "Connected five disconnected internal tools into one workflow." },
      { tag: "Software", client: "Enterprise system", summary: "Replaced a decade-old internal tool with a modern, maintainable system." },
    ],
    ctaLine: "Have a workflow that deserves better software?",
  },
  {
    slug: "legacy-software",
    category: "Technology",
    eyebrow: "Legacy Software",
    title: "Keep the business running without being tied to old technology.",
    description:
      "We modernize aging systems, reduce risk, and keep the business running while you transition away from brittle legacy platforms.",
    flow: ["Assess", "Refactor", "Integrate", "Modernize"],
    capabilities: [
      { title: "Assessment", description: "Audit the systems, code, and dependencies that are holding the business back." },
      { title: "Modernization", description: "Rewrite and stabilize the parts of your stack that are too risky to keep untouched." },
      { title: "Integration", description: "Link old systems to modern tools without breaking day-to-day operations." },
      { title: "Support", description: "Keep legacy platforms stable while the business plans its next move." },
      { title: "Migration", description: "Move critical processes to a healthier architecture with a clear cutover plan." },
      { title: "Data Cleanup", description: "Repair the operational data that powers critical decisions and workflows." },
    ],
    industries: ["Finance", "Healthcare", "Manufacturing", "Education"],
    tech: [
      { label: "Modernization", items: [".NET", "Node.js", "React", "PostgreSQL"] },
      { label: "Integration", items: ["APIs", "ETL", "Webhooks"] },
      { label: "Ops", items: ["Docker", "Azure", "AWS"] },
    ],
    caseStudies: [
      { tag: "Legacy", client: "System audit", summary: "Rebuilt a failing internal workflow without disrupting operations." },
      { tag: "Legacy", client: "Database migration", summary: "Moved critical records into a cleaner, scalable system with clear validation." },
      { tag: "Legacy", client: "API layer", summary: "Added a modern interface over unstable infrastructure to support future growth." },
    ],
    ctaLine: "Need to rescue a critical system before it breaks?",
  },
  {
    slug: "startup-support",
    category: "Growth",
    eyebrow: "Startup Support",
    title: "Your startup needs momentum. Not IT headaches.",
    description:
      "One partner for strategy, product, cloud, security and support — so your team can focus on building the business, not managing infrastructure.",
    flow: ["Idea", "Build", "Launch", "Scale"],
    capabilities: [
      { title: "IT Strategy", description: "A technology roadmap that matches where your startup actually is." },
      { title: "Product Development", description: "Ship your first version fast, without cutting corners you'll regret." },
      { title: "Cloud Setup", description: "Infrastructure that's right-sized for today and ready for growth." },
      { title: "Cybersecurity", description: "The essential protections investors and customers expect early." },
      { title: "Software Support", description: "Ongoing help so nothing breaks while your team is heads-down." },
      { title: "AI Enablement", description: "Practical AI wins that save time without adding complexity." },
    ],
    industries: ["Startups", "E-Commerce", "Fintech", "Healthtech"],
    tech: [
      { label: "Cloud", items: ["AWS", "Vercel", "Supabase"] },
      { label: "Product", items: ["Next.js", "React", "Node.js"] },
      { label: "Ops", items: ["Docker", "GitHub Actions"] },
    ],
    caseStudies: [
      { tag: "Startups", client: "MVP to launch", summary: "Took a pre-seed startup from idea to launched product in 10 weeks." },
      { tag: "Startups", client: "Fractional IT", summary: "Became the ongoing technology partner for a Series A team of 15." },
      { tag: "Startups", client: "Security readiness", summary: "Got a startup investor-ready with essential security controls in place." },
    ],
    ctaLine: "Building a startup and need a technology partner?",
  },
  {
    slug: "staff-augmentation",
    category: "Growth",
    eyebrow: "Staff Augmentation",
    title: "Extend your team with specialists that plug in fast.",
    description:
      "Hire the engineers, designers, and product talent you need without the overhead of a large permanent team.",
    flow: ["Assess", "Staff", "Integrate", "Scale"],
    capabilities: [
      { title: "Senior Engineers", description: "Add product and platform specialists who can move work forward quickly." },
      { title: "UI/UX Talent", description: "Designers who understand product thinking and design systems from day one." },
      { title: "QA & Delivery", description: "Keep quality high while delivery teams stay focused on momentum." },
      { title: "Fractional Leadership", description: "Bring strategic technical direction without a full-stack hiring cycle." },
      { title: "On-demand Support", description: "Bring in capacity exactly when the roadmap requires it." },
      { title: "Team Integration", description: "Embed specialists into your workflow without disrupting how your company runs." },
    ],
    industries: ["Startups", "Fintech", "Healthcare", "E-Commerce"],
    tech: [
      { label: "Product", items: ["React", "Node.js", "TypeScript"] },
      { label: "Delivery", items: ["Agile", "Scrum", "CI/CD"] },
      { label: "Quality", items: ["Playwright", "Cypress", "Jest"] },
    ],
    caseStudies: [
      { tag: "Delivery", client: "Platform sprint", summary: "Embedded senior engineers into a product team to accelerate a critical roadmap." },
      { tag: "Delivery", client: "Design support", summary: "Added design capacity during a product relaunch and improved speed to market." },
      { tag: "Delivery", client: "Launch support", summary: "Built a cross-functional augmentation model to accelerate a new product line." },
    ],
    ctaLine: "Need more delivery capacity without hiring a new team?",
  },
  {
    slug: "digital-marketing",
    category: "Digital",
    eyebrow: "Digital Marketing",
    title: "Turn attention into growth.",
    description:
      "Strategy, content and paid media working as one system — built to move people from discovery to customer, and track every step.",
    flow: ["Discover", "Engage", "Convert", "Grow"],
    capabilities: [
      { title: "Social Media", description: "Content and campaigns built for where your audience actually is." },
      { title: "Content Marketing", description: "Editorial that builds authority and compounds over time." },
      { title: "Paid Advertising", description: "Performance campaigns optimized against real business outcomes." },
      { title: "Branding", description: "A visual and verbal identity people actually remember." },
      { title: "Email Marketing", description: "Lifecycle campaigns that turn leads into repeat customers." },
      { title: "Analytics", description: "Clear reporting that shows exactly what's working and what isn't." },
    ],
    industries: ["E-Commerce", "Startups", "Education", "Finance"],
    tech: [
      { label: "Analytics", items: ["GA4", "Meta Ads", "Google Ads"] },
      { label: "Automation", items: ["HubSpot", "Klaviyo", "Mailchimp"] },
      { label: "SEO", items: ["Ahrefs", "Search Console"] },
    ],
    caseStudies: [
      { tag: "Marketing", client: "Paid media overhaul", summary: "Cut customer acquisition cost by rebuilding a paid funnel from scratch." },
      { tag: "Marketing", client: "Brand relaunch", summary: "Repositioned a legacy brand for a younger, digital-first audience." },
      { tag: "Marketing", client: "Lifecycle email", summary: "Built an email program that now drives a third of repeat revenue." },
    ],
    ctaLine: "Ready to turn attention into revenue?",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllSlugs(): string[] {
  return services.map((s) => s.slug);
}
