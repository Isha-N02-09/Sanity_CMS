export type HomeLogo = {name: string; src: string};
export type HomeIndustry = {name: string; icon: string};
export type HomeIndustryImage = {number: number; extension: string};
export type HomeConcept = {title: string; text: string; icon: string; position: string};
export type HomeReview = {quote: string; name: string; title: string; company: string; initials: string};
export type HomeStat = {target: number; suffix: string; label: string};
export type HomeWhyItem = {number: string; title: string; text: string};
export type HomePortfolioFeature = {
  title: string;
  eyebrow: string;
  visual: string;
  detail: string;
  icon: string;
  href: string;
};
export type HomeBlogStripItem = {title: string; description: string; slug: string};
export type HomeInsight = {category: string; title: string; image: string; slug?: string; href?: string};

export const homeLogos: HomeLogo[] = [
  {name: "Army Public School", src: "/assets/clientslogo/aps.svg"},
  {name: "Pakistan Army", src: "/assets/clientslogo/pkarmy.png"},
  {name: "Stingray", src: "https://media.licdn.com/dms/image/v2/D4D0BAQFmnxKtQ3XUlA/company-logo_200_200/B4DZdDvmnyHwAI-/0/1749188242409/stingray_technologies_pvt_ltd_logo?e=2147483647&v=beta&t=GGzWiagBxTUAISHff1easw6vVNFAjeg8iW1mVG-Oy5M"},
  {name: "Telehealth", src: "/assets/clientslogo/telehealth.png"},
  {name: "PCNF", src: "/assets/clientslogo/pcnflogo.png"},
  {name: "MJ", src: "/assets/clientslogo/mj.png"},
  {name: "15 Division", src: "/assets/clientslogo/15div.png"},
];

export const homePortfolioFeatures: HomePortfolioFeature[] = [
  {title: "Clock Log is a tracker application", eyebrow: "PROJECTS · PRODUCT DESIGN", visual: "/assets/portfolio/clocklog-cover.png", detail: "Tracker application · Case study", icon: "Timer", href: "/portfolio/clock-log-is-a-tracker-application"},
  {title: "ATF Movers", eyebrow: "PROJECTS · DIGITAL EXPERIENCE", visual: "/assets/portfolio/atf-movers-site.png", detail: "Moving services · Case study", icon: "Truck", href: "/portfolio/atf-movers"},
  {title: "Same Day Me", eyebrow: "PROJECTS · HEALTHCARE", visual: "/assets/portfolio/samedaydesk.png", detail: "Dental care · Case study", icon: "Stethoscope", href: "/portfolio/same-day-me"},
  {title: "ibuild.co", eyebrow: "PROJECTS · ENGINEERING", visual: "/assets/portfolio/ibuild-cover.jpg", detail: "Creative network · Case study", icon: "Network", href: "/portfolio/ibuild-co"},
  {title: "Telehealth", eyebrow: "PROJECTS · HEALTHCARE", visual: "/assets/portfolio/telehealth-cover.jpg", detail: "Healthcare platform · Case study", icon: "HeartPulse", href: "/portfolio/telehealth"},
];

export const homeIndustries: HomeIndustry[] = [
  {name: "Government Agencies", icon: "Landmark"},
  {name: "Vigilance & Recognition", icon: "BriefcaseBusiness"},
  {name: "Telehealth", icon: "Smartphone"},
  {name: "Maritime & Logistics", icon: "UtensilsCrossed"},
  {name: "Real Estate", icon: "Building2"},
  {name: "Manufacturing", icon: "ShoppingBag"},
  {name: "Travel & Tourism", icon: "GraduationCap"},
  {name: "FinTech", icon: "BriefcaseBusiness"},
  {name: "EdTech", icon: "GraduationCap"},
];

export const homeIndustryImages: HomeIndustryImage[] = [
  {number: 1, extension: "jpg"},
  {number: 2, extension: "jpg"},
  {number: 3, extension: "jpg"},
  {number: 4, extension: "jpg"},
  {number: 5, extension: "png"},
];

export const homeConcepts: HomeConcept[] = [
  {title: "STRATEGY", text: "Turn business goals into a clear digital direction.", icon: "Route", position: "strategy"},
  {title: "PEOPLE", text: "Build technology around the people who use it.", icon: "HeartHandshake", position: "people"},
  {title: "DATA", text: "Turn information into meaningful business insight.", icon: "BarChart3", position: "data"},
  {title: "SYSTEMS", text: "Connect the tools and platforms that keep business moving.", icon: "Cog", position: "systems"},
  {title: "INTELLIGENCE", text: "Make technology smarter, faster, and more useful.", icon: "BrainCircuit", position: "intelligence"},
  {title: "GROWTH", text: "Build digital foundations that evolve with the business.", icon: "ChartNoAxesCombined", position: "growth"},
];

export const homeReviews: HomeReview[] = [
  {quote: "With successful integration of Berry Solutions with our core systems like inventory, reservation and ticketing, passengers get a completely rich experience.", name: "Chamara Perera", title: "Group Head of IT", company: "Skyway", initials: "CP"},
  {quote: "Since partnering with Berry Solutions, we have seen an increase in direct bookings, add-ons and overall guest engagement through our website.", name: "Suresh Abbas", title: "General Manager", company: "Horizon", initials: "SA"},
  {quote: "The team worked closely with us, taking on every challenge to personalize the solution to our needs. One of the first initiatives of its kind for us.", name: "Suneth Jayamanne", title: "Chief Information Officer", company: "Meridian", initials: "SJ"},
  {quote: "Berry Solutions connected booking and service into one effortless customer experience. Our team now has more time for the moments that matter.", name: "Amina Rahman", title: "Director of Digital", company: "Alto", initials: "AR"},
  {quote: "From first enquiry to confirmation, the agent feels like an extension of our staff. Response times dropped and satisfaction went up.", name: "Marcus Chen", title: "VP Customer Experience", company: "Northstar", initials: "MC"},
];

export const homeStats: HomeStat[] = [
  {target: 90, suffix: "+", label: "Projects"},
  {target: 65, suffix: "", label: "People"},
  {target: 10, suffix: "+", label: "Services"},
  {target: 15, suffix: "", label: "Offices"},
];

export const homeWhyItems: HomeWhyItem[] = [
  {number: "01", title: "Quality", text: "Every deliverable is reviewed and tested before it reaches you."},
  {number: "02", title: "Strategy", text: "Smart solutions aligned with your business goals, not just your feature list."},
  {number: "03", title: "Support", text: "We stay with you, today and tomorrow — support doesn't end at handover."},
  {number: "04", title: "Innovate", text: "An AI-first mindset to build smarter, more capable digital products."},
  {number: "05", title: "Speed", text: "Fast execution without compromising quality or cutting corners."},
];

export const homeStripWords = ["PROJECTS DELIVERED", "INNOVATIVE", "VISIONARY", "DIGITAL"];

export const homeBlogStrip: HomeBlogStripItem[] = [
  {title: "AI Agents: The Future of Automation", description: "Explore how AI agents are shaping the future of intelligent automation.", slug: "ai-agent-future-automation"},
  {title: "SEO for Startups: Organic Growth", description: "Learn how startups can use SEO to build sustainable organic growth.", slug: "seo-for-startups-organic-growth"},
  {title: "Cybersecurity for Startups in 2025", description: "Essential cybersecurity practices and considerations for modern startups.", slug: "cybersecurity-for-startups-in-2025"},
  {title: "How to Start an Ecommerce Business in 2025", description: "A guide to starting and growing an ecommerce business.", slug: "how-to-start-an-ecommerce-business-in-2025"},
  {title: "What Is Cybersecurity?", description: "Understand the basics of cybersecurity and why it matters.", slug: "what-is-cybersecurity"},
  {title: "Adaptive Software Development", description: "Discover a flexible approach to building software in changing environments.", slug: "adaptive-software-development"},
  {title: "How to Use ChatGPT to Write SEO Content", description: "Learn how AI can help create content for your SEO strategy.", slug: "use-chatgpt-to-write-seo-content"},
  {title: "ChatGPT for Technical SEO with AI", description: "Discover how ChatGPT and AI can assist with technical SEO tasks.", slug: "chatgpt-for-technical-seo-with-ai"},
];

export const homeInsights: HomeInsight[] = [
  {category: "Case Study", title: "Relic Commerce", image: "/assets/inslights/1.jpg", slug: "relic-commerce", href: "/portfolio/relic-commerce"},
  {category: "Blog", title: "AI Agent: The Future of Intelligent Automation for Modern Businesses", image: "/assets/inslights/2.jpg", slug: "ai-agent-future-automation", href: "/blog/ai-agent-future-automation"},
  {category: "Blog", title: "SEO for Startups: A Complete 10-Step Guide to Organic Growth", image: "/assets/inslights/3.jpg", slug: "seo-for-startups-organic-growth", href: "/blog/seo-for-startups-organic-growth"},
  {category: "Blog", title: "Cybersecurity for Startups: A Complete Guide in 2025", image: "/assets/inslights/4.jpg", slug: "cybersecurity-for-startups-in-2025", href: "/blog/cybersecurity-for-startups-in-2025"},
  {category: "Blog", title: "How to Start an E-Commerce Business in 2025 and Actually Make It Profitable", image: "/assets/inslights/5.jpg", slug: "how-to-start-an-ecommerce-business-in-2025", href: "/blog/how-to-start-an-ecommerce-business-in-2025"},
  {category: "Case Study", title: "Telehealth", image: "/assets/inslights/6.jpg", slug: "telehealth", href: "/portfolio/telehealth"},
  {category: "Blog", title: "What Is Cybersecurity? Online Safety and Data Protection in 2025", image: "/assets/inslights/7.jpg", slug: "what-is-cybersecurity", href: "/blog/what-is-cybersecurity"},
  {category: "Case Study", title: "Harbor Finance", image: "/assets/inslights/8.jpg", slug: "harbor-finance", href: "/portfolio/harbor-finance"},
];
