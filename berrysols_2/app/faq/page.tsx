"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/home/Navbar";
import SimpleFooter from "@/components/home/Footer";
import BlogHero from "@/app/blog/BlogHero";
import CategoryBar from "@/components/CategoryBar";

const faqs = [
  {
    category: "General",
    question: "What does an IT services company do?",
    answer:
      "An IT services company helps businesses improve how they work, communicate, and grow through technology. That can include custom web and app development, SEO, branding, cloud support, automation, cybersecurity, and long-term digital strategy. At Berry Solutions, we combine product thinking with technical delivery so you can launch faster and operate more confidently.",
  },
  {
    category: "Services",
    question: "What services are included in IT support?",
    answer:
      "Typical IT support covers infrastructure monitoring, system maintenance, cybersecurity checks, cloud management, troubleshooting, and technical guidance. For growing businesses, this often extends into website maintenance, analytics, app support, and performance optimization so the digital layer keeps working reliably as the company scales.",
  },
  {
    category: "General",
    question: "How do I choose the right IT service provider?",
    answer:
      "Look for a provider that understands both technology and business outcomes. The right partner should be able to explain what they build, show relevant case studies, support the full product lifecycle, and work with your team in a clear, collaborative way. A strong provider will focus on risk reduction, measurable results, and growth—not just task completion.",
  },
  {
    category: "Services",
    question: "What are the benefits of managed IT services?",
    answer:
      "Managed IT services reduce downtime, improve response times, and give you a predictable support model. They also help you stay secure, keep systems updated, and free up internal teams to focus on strategy rather than daily tech issues. For startups and scaling businesses, that means more consistency and less operational friction.",
  },
  {
    category: "Company",
    question: "Do you provide IT services in the USA and UAE?",
    answer:
      "Yes. We work with businesses across regions, including clients operating in the United States and the UAE. Our model is built for remote collaboration, clear communication, and delivery that fits business objectives regardless of location.",
  },
  {
    category: "Services",
    question: "What is a web development service?",
    answer:
      "A web development service includes planning, design, frontend and backend development, testing, deployment, and ongoing support for a website or web application. This can range from a corporate website and e-commerce platform to a custom portal or SaaS product if the business needs a more tailored digital experience.",
  },
  {
    category: "Services",
    question: "What is digital marketing and why does it matter?",
    answer:
      "Digital marketing is the use of online channels to attract, engage, and convert customers. This includes SEO, paid advertising, content strategy, social media, funnel optimization, and analytics. It matters because most buyers discover and evaluate businesses online before they ever speak to a sales team.",
  },
  {
    category: "Services",
    question: "What is an SEO audit and why is it important?",
    answer:
      "An SEO audit reviews the technical, content, and authority factors affecting your website’s rankings and visibility. It helps identify issues like slow pages, poor keyword alignment, weak internal linking, or limited conversion paths. The goal is to improve organic performance without relying on guesswork.",
  },
  {
    category: "Services",
    question: "What services are included in professional SEO?",
    answer:
      "Professional SEO usually includes keyword research, technical optimization, on-page improvements, content strategy, local SEO, backlink analysis, analytics tracking, and performance reporting. A strong SEO program is not just about rankings—it also improves search visibility, user experience, and lead quality.",
  },
  {
    category: "Services",
    question: "What are cloud IT services?",
    answer:
      "Cloud IT services are tools and infrastructure delivered over the internet instead of a local server setup. This can include hosting, storage, backups, collaboration platforms, application deployment, and automated scaling. The benefit is flexibility, cost efficiency, and easier access across distributed teams.",
  },
  {
    category: "Startups",
    question: "How can startups benefit from IT services?",
    answer:
      "Startups often need to move fast without wasting budget. The right IT partner can help them build quickly, improve usability, reduce technical debt, and stay focused on product-market fit. That means better execution, stronger trust with users, and a more scalable foundation as the business grows.",
  },
  {
    category: "Startups",
    question: "Does Berry Solutions offer startup support for web or app development?",
    answer:
      "Yes. We work with founders and startup teams on digital products that need to go from concept to launch quickly, while staying practical and scalable. From early strategy to design and delivery, we help simplify the complexity of building a strong digital foundation.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(faqs.map((item) => item.category)))];
  const visibleFaqs = activeCategory === "All" ? faqs : faqs.filter((item) => item.category === activeCategory);

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setOpenIndex(0);
  };

  return (
    <main className="faq-shell min-h-screen bg-white text-[#171410]">
      <Navbar />

      <BlogHero>
        <header className="blog-sheet-header">
          <div className="blog-rule" />
          <div className="blog-masthead">
            <p>Getting answers / FAQs</p>
            <h1>FAQs</h1>
            <p>Answers, insight, and practical guidance for building what comes next.</p>
          </div>
        </header>
      </BlogHero>

      <CategoryBar
        label="Categories"
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={selectCategory}
        items={faqs}
      />

      <section className="faq-container pb-16 lg:pb-24">
          <div className="w-full">
          {visibleFaqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="faq-button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">{item.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="faq-container pb-20">
        <div className="faq-banner flex items-end">
          <div className="w-full p-8 md:p-12 lg:p-14">
            <div className="max-w-xl text-white">
              <h2 className="text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
                Still need help? Send us a note!
              </h2>
              <p className="mt-4 text-base leading-7 text-white/85 md:text-lg">
                For any other questions, please contact us at
                <span className="block mt-2">info@berrysols.com</span>
                <span className="block mt-1">or call us on +92 339 456 789</span>
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-white/90">
                <Link href="mailto:info@berrysols.com" className="transition-colors hover:text-white">
                  Email
                </Link>
                <a href="tel:+92339456789" className="transition-colors hover:text-white">
                  +92 339 456 789
                </a>
                <Link href="https://www.linkedin.com/company/berry-solutions" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </main>
  );
}
