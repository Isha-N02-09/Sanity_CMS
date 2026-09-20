export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  href: string;
  industry?: string;
  date?: string;
  technologies?: string[];
  clientName?: string;
};

export type CaseStudyData = PortfolioProject & {
  mobileImage?: string;
  overviewImage?: string;
  previewImage?: string;
  eyebrow: string;
  lede: string;
  role: string;
  client: string;
  liveSite?: string;
  tools: string[];
  stats: Array<{ value: string; label: string }>;
  overviewTitle: string;
  overview: string[];
  problems: Array<{ title: string; text: string }>;
  solutions: Array<{ title: string; text: string }>;
  standout: Array<{ title: string; text: string }>;
  process: Array<{ title: string; items: string[] }>;
  tech: Array<{ category: string; items: string[] }>;
  sitemap: Array<{ title: string; children: string[] }>;
};

const baseProjects = [
  {
    slug: "clock-log-is-a-tracker-application",
    title: "Clock Log is a tracker application",
    category: "Product design",
    excerpt: "A focused tracker application designed to make everyday logging simple, practical, and easy to trust.",
    image: "/assets/portfolio/clocklog-cover.png",
  },
  {
    slug: "atf-movers",
    title: "ATF Movers",
    category: "Digital experience",
    excerpt: "A digital experience built to help a moving company present services clearly and win more customer trust.",
    image: "/assets/portfolio/atf-movers-site.png",
  },
  {
    slug: "same-day-me",
    title: "Same Day Me",
    category: "Healthcare",
    excerpt: "A healthcare-focused solution built to improve access, communication, and conversion for dental care services.",
    image: "/assets/portfolio/samedaydesk.png",
  },
  {
    slug: "ibuild-co",
    title: "ibuild.co",
    category: "Engineering",
    excerpt: "A polished creative network experience shaped around a clear, modern digital presence and stronger lead flow.",
    image: "/assets/portfolio/ibuild-cover.jpg",
  },
  {
    slug: "telehealth",
    title: "Telehealth",
    category: "Healthcare",
    excerpt: "A responsive, SEO-ready healthcare website that improves patient access, trust, and digital engagement.",
    image: "/assets/portfolio/telehealth-cover.jpg",
  },
  {
    slug: "northline-logistics",
    title: "Northline Logistics",
    category: "Operations platform",
    excerpt: "A logistics brand system and conversion-focused site experience built to strengthen trust and streamline buyer decisions.",
    image: "/assets/vector2.png",
  },
  {
    slug: "summit-dental-care",
    title: "Summit Dental Care",
    category: "Healthcare",
    excerpt: "A patient-first digital experience designed to clarify services, reduce friction, and increase booked appointments.",
    image: "/assets/vector1.png",
  },
  {
    slug: "atlas-living",
    title: "Atlas Living",
    category: "Brand experience",
    excerpt: "A warm, editorial marketing site for a hospitality brand built to elevate story, trust, and direct inquiry flow.",
    image: "/assets/vector2.png",
  },
  {
    slug: "harbor-finance",
    title: "Harbor Finance",
    category: "Fintech",
    excerpt: "A secure, confidence-driven website system that turns complex financial messaging into a clearer customer path.",
    image: "/assets/vector1.png",
  },
  {
    slug: "motive-studio",
    title: "Motive Studio",
    category: "Creative network",
    excerpt: "A modern portfolio and service platform designed to help a creative studio attract the right clients and partnerships.",
    image: "/assets/vector2.png",
  },
  {
    slug: "relic-commerce",
    title: "Relic Commerce",
    category: "E-commerce",
    excerpt: "An online storefront refresh focused on product discovery, brand clarity, and stronger mobile conversion performance.",
    image: "/assets/vector1.png",
  },
  {
    slug: "kite-ops",
    title: "Kite Ops",
    category: "B2B software",
    excerpt: "A cleaner SaaS narrative and landing experience built to make technical value easier to understand and buy.",
    image: "/assets/vector2.png",
  },
  {
    slug: "orchard-lane",
    title: "Orchard Lane",
    category: "Home services",
    excerpt: "A modern service website crafted to strengthen lead quality, trust, and local search visibility for a growing company.",
    image: "/assets/vector1.png",
  },
  {
    slug: "northstar-labs",
    title: "Northstar Labs",
    category: "Research platform",
    excerpt: "A product-focused launch site built to distill a complex service offering into a clear conversion path for buyers.",
    image: "/assets/vector2.png",
  },
  {
    slug: "brightpath-studio",
    title: "Brightpath Studio",
    category: "Brand strategy",
    excerpt: "A presentation-rich identity site designed to help a consulting practice look premium, modern, and easy to trust.",
    image: "/assets/vector1.png",
  },
  {
    slug: "pulse-health",
    title: "Pulse Health",
    category: "Digital health",
    excerpt: "A highly structured health-tech website experience designed to present services clearly and support enrolled leads.",
    image: "/assets/vector2.png",
  },
  {
    slug: "riverstone-advisors",
    title: "Riverstone Advisors",
    category: "Professional services",
    excerpt: "A polished consulting presence built to balance credibility, trust, and conversion with a refined strategic story.",
    image: "/assets/vector1.png",
  },
  {
    slug: "asteri-labs",
    title: "Asteri Labs",
    category: "Product design",
    excerpt: "A premium web presence and service narrative designed to help a product-thinking team stand out in a crowded market.",
    image: "/assets/vector2.png",
  },
] satisfies Omit<PortfolioProject, "href">[];

const technologyByCategory: Record<string, string[]> = {
  "Product design": ["UX Strategy", "Product Design", "Design Systems"],
  "Digital experience": ["Next.js", "UI Design", "Strategy"],
  Healthcare: ["Healthcare UX", "Web Design", "Patient Journeys"],
  Engineering: ["Brand Design", "Web Experience", "CMS"],
  "Operations platform": ["UX", "Operations", "Web App"],
  "Brand experience": ["Brand Design", "Campaigns", "Web Experience"],
  "Fintech": ["UX", "Finance", "Product Design"],
  "Creative network": ["Branding", "Portfolio", "Web Design"],
  "E-commerce": ["Shopify", "UX", "Conversion Design"],
  "B2B software": ["SaaS", "UX", "Landing Pages"],
  "Home services": ["Local SEO", "UX", "Web Design"],
  "Research platform": ["Product UX", "Research", "Web Experience"],
  "Brand strategy": ["Branding", "Strategy", "Marketing Web"],
  "Digital health": ["Healthcare", "UX", "Patient Flows"],
  "Professional services": ["Branding", "Web Design", "Conversion"],
};

const currentYear = new Date().getFullYear();

export const portfolioProjects: PortfolioProject[] = baseProjects.map((project, index) => ({
  ...project,
  href: `/portfolio/${project.slug}`,
  clientName: project.title,
  industry: project.category,
  date: `${currentYear - (index % 3)}`,
  technologies: technologyByCategory[project.category] ?? ["UX", "Strategy", "Web Design"],
}));

const sharedProblems = [
  { title: "Trust has to be earned fast", text: "Visitors need the right proof, context, and outcomes before they are ready to take the next step." },
  { title: "Complex information needs shape", text: "A broad offer becomes easier to understand when related content is grouped into a clear, predictable structure." },
  { title: "The next step should feel obvious", text: "Every important page should guide people toward one useful action instead of leaving them to figure out what to do next." },
];

const sharedSolutions = [
  { title: "A clearer first impression", text: "Lead with the strongest value signal, supporting proof, and a direct route to the primary action." },
  { title: "A simpler content system", text: "Organize pages around real visitor questions so the experience stays easy to scan as the offer grows." },
  { title: "Persistent conversion paths", text: "Keep contact, enquiry, and booking actions available without making the interface feel pushy." },
  { title: "Proof near decisions", text: "Place outcomes, testimonials, credentials, and useful detail beside the choices they support." },
  { title: "Responsive by default", text: "Design the important flows for smaller screens first, then give larger layouts room to breathe." },
  { title: "A maintainable foundation", text: "Use reusable components and a consistent visual language so future pages remain coherent." },
];

export const caseStudies: Record<string, CaseStudyData> = Object.fromEntries(
  portfolioProjects.map((project) => [
    project.slug,
    {
      ...project,
      eyebrow: `${project.category} · Case study`,
      lede: `${project.excerpt} This case study shows how a focused digital experience can turn complexity into a clearer path for the people it serves.`,
      role: "Strategy, UI/UX & Front-end Build",
      client: project.title,
      liveSite: undefined,
      tools: ["Figma", "Next.js", "TypeScript", "Content strategy"],
      stats: [
        { value: "01", label: "focused digital experience" },
        { value: "03", label: "core experience priorities" },
        { value: "100%", label: "responsive system" },
        { value: "1", label: "clear conversion path" },
      ],
      overviewTitle: "A clearer digital experience",
      overview: [project.excerpt, "The work focused on making the offer easier to understand, the interface easier to trust, and the next action easier to take."],
      problems: sharedProblems,
      solutions: sharedSolutions,
      standout: sharedSolutions.slice(0, 6).map((solution) => ({ title: solution.title, text: solution.text })),
      process: [
        { title: "Discover", items: ["Stakeholder interviews", "Patient journey review", "Competitor clinics audit"] },
        { title: "Define", items: ["Patient personas", "Anxiety & trust mapping", "Information architecture"] },
        { title: "Ideate", items: ["Navigation restructure", "Content grouping", "Booking flow sketches"] },
        { title: "Design", items: ["Wireframes -> high fidelity", "Visual & component system", "Responsive prototype"] },
        { title: "Test", items: ["Usability walkthroughs", "Mobile QA", "Iteration on feedback"] },
      ],
      tech: [
        { category: "Design", items: ["Figma", "Illustrator", "Photoshop"] },
        { category: "Build", items: ["HTML5", "CSS3", "JavaScript", "WordPress", "Elementor"] },
        { category: "Grow & Measure", items: ["SEO", "Analytics", "WhatsApp API"] },
      ],
      sitemap: [
        { title: "Home", children: ["Value proposition", "Proof", "Primary action"] },
        { title: "About", children: ["Story", "Team", "Credentials"] },
        { title: "Services", children: ["Overview", "Detail pages", "FAQs"] },
        { title: "Work", children: ["Case studies", "Outcomes"] },
        { title: "Insights", children: ["Articles", "Guides"] },
        { title: "Contact", children: ["Enquiry", "Booking", "Locations"] },
      ],
    },
  ]),
) as Record<string, CaseStudyData>;

export const sameDayCaseStudy: CaseStudyData = {
  ...caseStudies["same-day-me"],
  image: "/assets/portfolio/samedaydesk.png",
  mobileImage: "/assets/portfolio/samedaymob.png",
  overviewImage: "/assets/portfolio/sameday.png",
  previewImage: "/assets/portfolio/samedaydesk.png",
  eyebrow: "Web design & development · Case study",
  lede: "Rebuilding the digital front door for Dubai's only certified ZAGA Center, turning a 25-plus page medical service catalogue into a calm, trustworthy booking experience.",
  role: "UI/UX & Front-end Build",
  client: "SameDay Dental Clinic, Dubai",
  liveSite: "https://www.samedayme.com/",
  tools: ["Figma", "Illustrator", "WordPress", "Elementor"],
  stats: [
    { value: "30+", label: "years of dental excellence" },
    { value: "35K+", label: "implant patients treated" },
    { value: "13", label: "specialist doctors profiled" },
    { value: "1", label: "certified ZAGA center in the UAE" },
  ],
  overviewTitle: "A calmer, clearer path to treatment",
  overview: [
    "SameDay Dental Clinic brings together a broad range of advanced dental care under one roof, from same-day implants to zygomatic procedures and smile rehabilitation. That level of expertise is a major strength, but for many patients it can also feel overwhelming when the decision is already stressful.",
    "The website needed to feel reassuring and easy to navigate, not crowded or clinical. By organizing the offer around trust, clarity, and action, the clinic can present its specialism without making patients feel lost or pressured.",
  ],
  problems: [
    { title: "Trust has to be earned fast", text: "Implant surgery is a high-stakes decision. Visitors need credentials, certifications, and real outcomes early in the journey." },
    { title: "25-plus treatments, one navigation", text: "Implants, orthodontics, sedation, pediatric, and general dentistry all live under one roof. A flat menu made discovery difficult." },
    { title: "Booking felt like a form", text: "The path from a question to an appointment had too many steps for a nervous, often international, patient to follow through on." },
  ],
  solutions: [
    { title: "Credentials up front", text: "ZAGA, Brånemark, and Autism Center accreditations move into the hero and proof sections instead of being buried in About." },
    { title: "Grouped mega-navigation", text: "Implants, Services, and Orthodontics are structured into tiered groups so the treatment list stays browsable." },
    { title: "One persistent booking path", text: "A single appointment form and click-to-WhatsApp action follow visitors across pages and devices." },
    { title: "Social proof near decisions", text: "Reviews and doctor profiles sit alongside treatment descriptions, where they can support the decision." },
    { title: "Mobile-first booking flow", text: "Tap-to-call, tap-to-WhatsApp, and a condensed appointment form support visitors arriving from mobile search." },
    { title: "Clear service architecture", text: "Implants, Services, Doctors, Testimonials, Blog, and Contact remain distinct, predictable sections." },
  ],
  standout: [
    { title: "Unified patient journey", text: "Booking, credentials and treatment info live in one connected flow instead of scattered pages." },
    { title: "Intuitive by design", text: "Clear hierarchy and tiered navigation mean a 25-plus treatment catalogue never feels like a wall of links." },
    { title: "Scales with the clinic", text: "The component system supports new doctors, treatments and locations without a rebuild each time the practice grows." },
    { title: "Built for conversion", text: "A single persistent booking path and click-to-WhatsApp CTA keep the cost-per-lead low without extra ad spend." },
    { title: "Trust before the ask", text: "ZAGA, Brånemark and Autism Center credentials plus review snippets sit near the decision, reducing pre-visit anxiety." },
    { title: "Mobile-first performance", text: "Lightweight components and a condensed booking form keep load times fast for visitors on mobile." },
  ],
  tech: [
    { category: "Design", items: ["Figma", "Illustrator", "Photoshop"] },
    { category: "Build", items: ["HTML5", "CSS3", "JavaScript", "WordPress", "Elementor"] },
    { category: "Grow & Measure", items: ["SEO", "Analytics", "WhatsApp API"] },
  ],
  sitemap: [
    { title: "About Us", children: ["Brånemark Centre", "ZAGA Center", "Autism Center"] },
    { title: "Implants", children: ["All-on-4 / 6 / X", "Zygomatic", "Single Tooth", "Guarantee"] },
    { title: "Services", children: ["Orthodontics", "Sedation", "Pediatric", "General"] },
    { title: "Doctors", children: ["13 profiles"] },
    { title: "Testimonials · Blog", children: ["Reviews", "Articles"] },
    { title: "Contact Us", children: ["Financing", "Book / WhatsApp"] },
  ],
};

export const atfMoversCaseStudy: CaseStudyData = {
  ...caseStudies["atf-movers"],
  image: "/assets/portfolio/atf-movers-site.png",
  overviewImage: "/assets/portfolio/atf-movers-packers.jpg",
  previewImage: "/assets/portfolio/atf-movers-site.png",
  eyebrow: "Web design, SEO & growth · Case study",
  lede: "A complete digital presence for one of Dubai's fastest-growing moving and packing companies, built to earn trust, improve local visibility, and generate more qualified enquiries.",
  role: "Strategy, Web Development, SEO & Digital Marketing",
  client: "ATF Movers, Dubai UAE",
  liveSite: "https://atfmovers.ae/",
  tools: ["WordPress", "Elementor", "SEO", "Google Business Profile"],
  stats: [
    { value: "01", label: "complete digital presence" },
    { value: "04", label: "high-intent keyword groups" },
    { value: "24/7", label: "mobile-ready enquiry path" },
    { value: "UAE", label: "local search focus" },
  ],
  overviewTitle: "Moving a local service business forward",
  overview: [
    "ATF Movers is a Dubai-based moving and packing company serving residential, commercial, and international relocation needs across the UAE. They needed a professional online presence that could make a broad service offer easier to understand and attract more local customers.",
    "Berry Solutions designed and developed a modern, responsive website, then supported it with a complete SEO and digital marketing strategy. The result connects clear service information with the visibility and trust signals people need before requesting a move.",
  ],
  problems: [
    { title: "Moving decisions are trust-heavy", text: "Customers are handing over their homes, offices, and belongings. The website needed to communicate professionalism before the first call." },
    { title: "Many services, one clear journey", text: "Residential, commercial, international moving, packing, and storage all needed to be discoverable without making the experience feel crowded." },
    { title: "Local visibility drives demand", text: "The business needed to compete for high-intent searches in Dubai and the wider UAE, not simply launch another brochure website." },
  ],
  solutions: [
    { title: "Service-led information architecture", text: "Clear service categories help visitors quickly find the moving, packing, relocation, or storage help that matches their situation." },
    { title: "Professional, mobile-first interface", text: "A responsive visual system and quick contact options make it easier to enquire from phones, where local service searches often begin." },
    { title: "On-page SEO foundation", text: "Keyword placement, metadata, and content restructuring give important pages a stronger foundation for organic discovery." },
    { title: "Local search optimization", text: "Google Business Profile optimization, local citations, and location-aware content reinforce ATF Movers' presence in Dubai searches." },
    { title: "Authority and content growth", text: "Off-page SEO, blog optimization, and backlink acquisition help build the domain authority needed in a competitive market." },
    { title: "Connected marketing activity", text: "Content marketing and social media campaigns extend the website's reach and keep the brand visible beyond search results." },
  ],
  standout: [
    { title: "Built around real enquiries", text: "Quick contact paths and focused service pages turn information into a practical next step for people planning a move." },
    { title: "Local by design", text: "The experience speaks directly to Dubai and UAE customers instead of relying on a generic moving-company message." },
    { title: "SEO from the start", text: "Search visibility is treated as part of the product, with content structure and technical foundations working together." },
    { title: "Broad offer, simple path", text: "Multiple relocation services stay easy to scan, compare, and act on across desktop and mobile." },
    { title: "Growth beyond launch", text: "The website provides a durable base for content, social campaigns, and ongoing local search improvements." },
    { title: "Professional first impression", text: "A modern, user-focused interface gives a high-stakes service business the confidence signal its customers expect." },
  ],
  process: [
    { title: "Discover", items: ["Business and audience review", "Dubai market research", "Competitor search audit"] },
    { title: "Structure", items: ["Service grouping", "Local search mapping", "Information architecture"] },
    { title: "Design", items: ["Responsive wireframes", "Trust-led visual direction", "Conversion-focused content"] },
    { title: "Build", items: ["WordPress implementation", "Mobile optimization", "Contact flow integration"] },
    { title: "Grow", items: ["On-page and off-page SEO", "GMB optimization", "Content and social campaigns"] },
  ],
  tech: [
    { category: "Design & Build", items: ["WordPress", "Elementor", "HTML5", "CSS3", "JavaScript"] },
    { category: "SEO & Local", items: ["On-page SEO", "Off-page SEO", "Google Business Profile", "Local citations", "Backlinks"] },
    { category: "Marketing", items: ["Content marketing", "Blog optimization", "Social campaigns", "Analytics"] },
  ],
  sitemap: [
    { title: "Home", children: ["Value proposition", "Trust signals", "Enquiry CTA"] },
    { title: "Moving Services", children: ["Residential", "Commercial", "International"] },
    { title: "Packing", children: ["Packing services", "Materials", "Moving preparation"] },
    { title: "Storage", children: ["Storage solutions", "Short-term needs", "Long-term needs"] },
    { title: "About", children: ["Company story", "Why ATF Movers", "Service areas"] },
    { title: "Contact", children: ["Phone", "Email", "Quote request"] },
  ],
};

export const telehealthCaseStudy: CaseStudyData = {
  ...caseStudies["telehealth"],
  image: "/assets/portfolio/telehealthdesk.png",
  mobileImage: "/assets/portfolio/telehealthmob.png",
  overviewImage: "/assets/portfolio/telehealthoverview.png",
  previewImage: "/assets/portfolio/telehealthdesk.png",
  eyebrow: "Healthcare platform · Case study",
  lede: "A responsive, SEO-optimized digital platform for Telehealth NP, designed to make virtual care easier to discover, understand, and access.",
  role: "Web Design, Development, IT Operations & Digital Marketing",
  client: "Telehealth NP",
  liveSite: "https://www.telehealthnp.com/",
  tools: ["WordPress", "E-commerce", "SEO", "Content strategy"],
  stats: [
    { value: "5+", label: "verified practitioners" },
    { value: "4k+", label: "happy patients" },
    { value: "5+", label: "years of service" },
    { value: "01", label: "connected care platform" },
  ],
  overviewTitle: "Making virtual care easier to reach",
  overview: [
    "Telehealth NP is a trusted virtual healthcare provider that needed a reliable digital partner to support both patient access and the operational complexity behind its online presence.",
    "Berry Solutions designed and developed a responsive, user-friendly website that presents healthcare services clearly, supports e-commerce, and gives patients a smoother path to the care and resources they need. The engagement also extended into IT operations, content, social media, video, SEO, and local search.",
  ],
  problems: [
    { title: "Healthcare needs clarity and confidence", text: "Patients need to understand services quickly and feel reassured that the platform is professional, reliable, and designed around their needs." },
    { title: "One platform, many moving parts", text: "Website maintenance, e-commerce, medical content, marketing, and technical operations all needed to work together rather than compete for attention." },
    { title: "Visibility supports access", text: "A strong patient experience only helps when people can discover Telehealth NP through search, local listings, social channels, and useful content." },
  ],
  solutions: [
    { title: "Patient-first website redesign", text: "A modern interface and improved navigation make virtual healthcare services easier to browse and understand." },
    { title: "Responsive access across devices", text: "The experience is structured for patients arriving from phones, tablets, and desktop search alike." },
    { title: "Streamlined e-commerce", text: "A smoother purchasing journey supports patients looking for telehealth services and related offerings." },
    { title: "Medical content that educates", text: "Clear website copy and useful blog content help patients understand their options before they take action." },
    { title: "Social and video engagement", text: "Content campaigns and video production build awareness, explain the service, and keep the brand present across platforms." },
    { title: "Search and local growth", text: "SEO optimization and Google Business Profile management improve visibility for people looking for accessible healthcare." },
  ],
  standout: [
    { title: "Designed for patient needs", text: "The interface prioritizes plain-language service discovery and a calmer path through healthcare information." },
    { title: "Digital care, fully supported", text: "The engagement covers the platform and the ongoing digital operations needed to keep it useful." },
    { title: "Content with a purpose", text: "Medical content and resources answer patient questions while supporting organic discovery." },
    { title: "Commerce without friction", text: "The purchasing flow is treated as part of the care experience, not a disconnected add-on." },
    { title: "Visibility meets usability", text: "SEO and local search work reinforce a website built to convert attention into meaningful access." },
    { title: "Built to grow", text: "A flexible content and component foundation supports new resources, campaigns, and healthcare services." },
  ],
  process: [
    { title: "Understand", items: ["Patient journey review", "Service and content audit", "Technical ecosystem review"] },
    { title: "Structure", items: ["Navigation redesign", "Resource grouping", "E-commerce journey mapping"] },
    { title: "Design", items: ["Responsive wireframes", "Healthcare visual system", "Accessible content hierarchy"] },
    { title: "Build", items: ["Custom website development", "E-commerce implementation", "Performance optimization"] },
    { title: "Grow", items: ["Medical content", "SEO and GBP management", "Social and video campaigns"] },
  ],
  tech: [
    { category: "Design & Build", items: ["WordPress", "Elementor", "HTML5", "CSS3", "JavaScript"] },
    { category: "Content & Commerce", items: ["E-commerce", "Medical content", "Blog strategy", "Video production"] },
    { category: "Growth & Operations", items: ["SEO", "Google Business Profile", "Social media", "IT operations"] },
  ],
  sitemap: [
    { title: "Home", children: ["Care proposition", "Services", "Primary action"] },
    { title: "Services", children: ["Virtual care", "Provider information", "Patient support"] },
    { title: "Resources", children: ["Medical guides", "Blog", "Patient education"] },
    { title: "Shop", children: ["Products", "Service purchase", "Customer journey"] },
    { title: "About", children: ["Telehealth NP", "Care approach", "Contact details"] },
    { title: "Contact", children: ["Enquiry", "Support", "Locations"] },
  ],
};

export const ibuildCaseStudy: CaseStudyData = {
  ...caseStudies["ibuild-co"],
  image: "/assets/portfolio/ibuild-cover.jpg",
  overviewImage: "/assets/portfolio/ibuild-cover.jpg",
  previewImage: "/assets/portfolio/ibuild-cover.jpg",
  eyebrow: "Engineering · Case study",
  lede: "A polished digital presence for ibuild.co, shaped around a creative network and a clearer way to present its engineering-led work.",
  role: "Digital Strategy, UI/UX & Front-end Build",
  client: "ibuild.co",
  tools: ["Figma", "WordPress", "Elementor", "Content strategy"],
  stats: [
    { value: "2024", label: "project year" },
    { value: "01", label: "creative network experience" },
    { value: "03", label: "core experience priorities" },
    { value: "100%", label: "responsive foundation" },
  ],
  overviewTitle: "A sharper home for an engineering network",
  overview: [
    "ibuild.co is a creative network in the Engineering category, presented as a focused digital experience for a modern, project-led organization.",
    "The work gives that network a more considered presence: clearer positioning, a stronger visual rhythm, and a more direct path through its capabilities and work. The foundation is designed to make future stories and project detail easier to add without losing coherence.",
  ],
  problems: [
    { title: "A network needs a clear point of view", text: "Multiple capabilities and collaborators need to feel like one coherent offer rather than a collection of disconnected services." },
    { title: "Engineering can feel abstract", text: "The experience needs to make technical work tangible through stronger hierarchy, context, and a confident visual presentation." },
    { title: "Good work needs room to speak", text: "Project stories should be easy to find and scan, with a flexible structure that can grow as the network grows." },
  ],
  solutions: [
    { title: "A confident first impression", text: "The opening experience establishes a sharper point of view and gives the network a more memorable digital front door." },
    { title: "Clear capability pathways", text: "Content is grouped into understandable routes so visitors can move from the broad offer into the detail that matters to them." },
    { title: "Work-led storytelling", text: "The layout gives projects and outcomes enough space to communicate value without burying the visitor in dense copy." },
    { title: "A flexible content system", text: "Reusable page patterns make it easier to introduce new collaborators, services, and project stories over time." },
    { title: "Responsive by default", text: "The visual system keeps hierarchy and navigation intact across smaller screens and larger canvases." },
    { title: "A stronger lead path", text: "Clear calls to action help interested visitors move from understanding the network to starting a conversation." },
  ],
  standout: [
    { title: "Technical, but human", text: "The experience balances engineering credibility with a warmer, more approachable presentation." },
    { title: "Network over noise", text: "The structure makes a broad creative network feel focused and intentional." },
    { title: "Built for the portfolio", text: "Project content becomes a primary part of the story rather than a hidden secondary page." },
    { title: "Designed to extend", text: "A repeatable content foundation makes future growth feel like an addition, not a redesign." },
    { title: "Clearer decisions", text: "Visitors can understand the offer, find relevant work, and identify their next step more quickly." },
    { title: "Modern presence", text: "The final direction gives ibuild.co a digital identity that feels current, capable, and considered." },
  ],
  process: [
    { title: "Discover", items: ["Network and audience review", "Positioning audit", "Reference and competitor review"] },
    { title: "Define", items: ["Capability hierarchy", "Content priorities", "Project story structure"] },
    { title: "Ideate", items: ["Navigation concepts", "Page flow sketches", "Visual direction"] },
    { title: "Design", items: ["Responsive wireframes", "Component system", "High-fidelity layouts"] },
    { title: "Refine", items: ["Content walkthroughs", "Responsive QA", "Launch-ready iteration"] },
  ],
  tech: [
    { category: "Design", items: ["Figma", "Illustrator", "Photoshop"] },
    { category: "Build", items: ["WordPress", "Elementor", "HTML5", "CSS3", "JavaScript"] },
    { category: "Content & Growth", items: ["Content strategy", "SEO foundation", "Analytics"] },
  ],
  sitemap: [
    { title: "Home", children: ["Positioning", "Capabilities", "Primary action"] },
    { title: "About", children: ["Network story", "Approach", "People"] },
    { title: "Capabilities", children: ["Engineering", "Design", "Delivery"] },
    { title: "Work", children: ["Selected projects", "Case studies", "Outcomes"] },
    { title: "Insights", children: ["Stories", "Perspectives", "Updates"] },
    { title: "Contact", children: ["Start a conversation", "Enquiry", "Details"] },
  ],
};

export const clockLogCaseStudy: CaseStudyData = {
  ...caseStudies["clock-log-is-a-tracker-application"],
  image: "/assets/portfolio/clocklog-cover.png",
  mobileImage: "/assets/portfolio/clocklogmob.png",
  overviewImage: "/assets/portfolio/clocklogoverview.png",
  previewImage: "/assets/portfolio/clockviewdesk.png",
  eyebrow: "Product design & development · Case study",
  lede: "A powerful employee monitoring and time tracking application that helps businesses understand productivity, manage work logs, and scale operations with confidence.",
  role: "Product Strategy, UI/UX & Full-stack Development",
  client: "Clocklog",
  liveSite: "https://clocklog-git-dev-abdulrehman-ceativecou.vercel.app/",
  tools: ["React", "Next.js", "TypeScript", "Ant Design", "Redux Thunk"],
  stats: [
    { value: "2020", label: "project year" },
    { value: "03", label: "productivity capabilities" },
    { value: "01", label: "scalable tracking platform" },
    { value: "100%", label: "responsive interface" },
  ],
  overviewTitle: "Making work time visible",
  overview: [
    "Clocklog is an advanced employee monitoring and time tracking application built to help businesses track productivity with precision. It brings time tracking, work logs, keystroke logging, screen casting, and detailed reporting into one focused product experience.",
    "Berry Solutions designed and developed the platform with a clean, intuitive interface and a scalable technical foundation. The result gives teams a clearer view of work patterns while keeping the everyday tracking experience practical for employees and managers alike.",
  ],
  problems: [
    { title: "Productivity needs useful context", text: "Raw time data is not enough. Teams need a clear way to understand work patterns and turn activity into actionable insight." },
    { title: "Monitoring tools can overwhelm", text: "Time tracking, keystrokes, screen casting, and reports must feel connected and understandable instead of becoming a wall of controls." },
    { title: "Enterprise products must keep growing", text: "The platform needed a flexible architecture and responsive interface that could support more teams, data, and workflows over time." },
  ],
  solutions: [
    { title: "Focused tracking experience", text: "Core time and work-log flows are organized around the everyday needs of employees and managers." },
    { title: "Actionable productivity signals", text: "Detailed reports and activity views help businesses move from monitoring data to practical operational decisions." },
    { title: "Integrated monitoring tools", text: "Keystroke logging and screen casting sit alongside tracking features in one connected product experience." },
    { title: "Modern interface system", text: "Ant Design, Material UI, and Sass support a clean, consistent interface across complex application views." },
    { title: "Responsive product foundation", text: "The experience is built to remain usable across devices, giving distributed teams flexibility in how they work." },
    { title: "Scalable application architecture", text: "React, Next.js, TypeScript, and Redux Thunk create a maintainable foundation for enterprise-level workloads." },
  ],
  standout: [
    { title: "Data with direction", text: "Clocklog turns activity capture into information teams can actually use to improve operations." },
    { title: "One connected workspace", text: "Tracking, monitoring, and reporting are brought together instead of scattered across separate tools." },
    { title: "Clear for every role", text: "The interface balances manager visibility with practical day-to-day use for employees." },
    { title: "Built for scale", text: "The technical foundation is ready for more users, richer reporting, and enterprise-level demands." },
    { title: "Modern by default", text: "A considered component system keeps a complex product feeling calm, legible, and consistent." },
    { title: "Responsive from the start", text: "Important product flows remain available wherever distributed teams need to work." },
  ],
  process: [
    { title: "Discover", items: ["Workflow review", "Productivity use cases", "Competitive product audit"] },
    { title: "Define", items: ["Role-based requirements", "Tracking model", "Reporting priorities"] },
    { title: "Design", items: ["Dashboard wireframes", "Component system", "Responsive interface"] },
    { title: "Build", items: ["React and Next.js", "State management", "Monitoring integrations"] },
    { title: "Refine", items: ["Product walkthroughs", "Responsive QA", "Scalability review"] },
  ],
  tech: [
    { category: "Product & Front-end", items: ["React", "Next.js", "TypeScript", "Ant Design", "Material UI"] },
    { category: "Interface & State", items: ["Sass", "Redux Thunk", "Responsive UI", "Dashboard design"] },
    { category: "Delivery", items: ["AWS CodeCommit", "Scalable architecture", "Time tracking", "Reporting"] },
  ],
  sitemap: [
    { title: "Dashboard", children: ["Productivity overview", "Activity", "Insights"] },
    { title: "Time Tracking", children: ["Work logs", "Timesheets", "Schedules"] },
    { title: "Monitoring", children: ["Keystrokes", "Screen casting", "Activity records"] },
    { title: "Reports", children: ["Detailed reports", "Team performance", "Exportable data"] },
    { title: "Team", children: ["Employees", "Roles", "Permissions"] },
    { title: "Account", children: ["Settings", "Integrations", "Support"] },
  ],
};
