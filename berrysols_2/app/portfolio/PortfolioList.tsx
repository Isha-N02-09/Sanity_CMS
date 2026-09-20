"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { PortfolioProject } from "@/data/portfolio";

type PortfolioListProps = {
  projects: PortfolioProject[];
};

const projectsPerPage = 9;

export default function PortfolioList({ projects }: PortfolioListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const visibleProjects = useMemo(
    () => projects.filter((project) => !project.image.includes("vector")),
    [projects],
  );

  const totalPages = Math.max(1, Math.ceil(visibleProjects.length / projectsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedProjects = useMemo(
    () => visibleProjects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage),
    [visibleProjects, currentPage],
  );

  const featuredProject = paginatedProjects[0];
  const supportingProjects = paginatedProjects.slice(1);

  return (
    <section className="blog-sheet-posts" aria-label="Portfolio case studies">
      <div className="blog-portfolio-divider" aria-hidden="true" />
      <div className="blog-section-heading">
        <span>Selected work</span>
      </div>

      {featuredProject && (
        <div className="blog-feature" aria-label="Featured portfolio project">
          <div className="blog-feature-image-wrap">
            <Image src={featuredProject.image} alt={`${featuredProject.title} case study`} width={1200} height={720} className="blog-feature-image" />
            <span className="blog-feature-badge">Case<br />study</span>
          </div>

          <div className="blog-feature-card">
            <p className="blog-feature-kicker">{featuredProject.category}</p>
            <h2>{featuredProject.title}</h2>
            <p className="blog-feature-excerpt">{featuredProject.excerpt}</p>
            <Link href={featuredProject.href} className="blog-feature-link">
              View case study
            </Link>
          </div>
        </div>
      )}

      <div className="blog-post-grid">
        {supportingProjects.map((project) => (
          <article key={project.title} className="blog-post-card portfolio-cover-card group">
            <div className="portfolio-cover-header">
              <span className="portfolio-cover-label">{project.category}</span>
            </div>

            <Link href={project.href} className="portfolio-cover-visual">
              <Image src={project.image} alt={`${project.title} case study`} width={720} height={480} className="blog-post-image" />
            </Link>

            <div className="blog-post-copy">
              <div className="blog-post-meta">
                <span>{project.category}</span>
                <span>Case study</span>
              </div>
              <h2>
                <Link href={project.href}>{project.title}</Link>
              </h2>
              <div className="portfolio-card-date">{project.date ?? "2025"}</div>

              <p>{project.excerpt}</p>

              <div className="portfolio-card-stack" aria-label="Main technologies used">
                {(project.technologies ?? [project.category]).slice(0, 3).map((tech) => (
                  <span key={`${project.title}-${tech}`}>{tech}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {visibleProjects.length > 0 && (
        <div className="blog-pagination" aria-label="Portfolio pagination">
          <button type="button" disabled>
            Prev
          </button>

          <div className="blog-pagination-pages">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={currentPage === page ? "is-active" : ""}
                aria-current={currentPage === page ? "page" : undefined}
                disabled
              >
                {page}
              </button>
            ))}
          </div>

          <button type="button" disabled>
            Next
          </button>
        </div>
      )}
    </section>
  );
}
