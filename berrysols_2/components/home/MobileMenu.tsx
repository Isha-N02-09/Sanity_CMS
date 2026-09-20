"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { services } from "@/data/services";
import {useServices} from "@/lib/sanity/useServices";

type DropdownItem = { label: string; href: string };

type LinkItem = {
  label: string;
  href: string;
  children?: Array<DropdownItem | string>;
};

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname() ?? "/";
  const services = useServices();
  const homeHref = "/";
  const sectionHref = (section: string) => (pathname === "/" ? `#${section}` : `/#${section}`);
  const servicesHref = "/services";
  const portfolioHref = "/portfolio";

  const isActiveLink = (href: string) => {
    if (!href || href === "#top") return pathname === "/";
    if (href === "#resources") return pathname.startsWith("/blog") || pathname === "/faq";
    if (href.startsWith("/services")) return pathname === "/services" || pathname.startsWith("/services/");
    if (href.startsWith("/portfolio")) return pathname === "/portfolio" || pathname.startsWith("/portfolio/");
    if (href.startsWith("/blog")) return pathname === "/blog" || pathname.startsWith("/blog/");
    if (href.startsWith("/resources")) return pathname.startsWith("/blog") || pathname === "/faq";
    if (href.startsWith("/about")) {
      return pathname === "/about";
    }
    if (href.startsWith("/careers")) return pathname === "/careers";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  const serviceDropdownItems: DropdownItem[] = services.map((service) => ({
    label: service.eyebrow,
    href: `/services/${service.slug}`,
  }));

  const insightDropdownItems: DropdownItem[] = [
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ];

  const links: LinkItem[] = [
    { label: "Home", href: homeHref },
    {
      label: "Services",
      href: servicesHref,
      children: serviceDropdownItems,
    },
    { label: "Portfolio", href: portfolioHref },
    {
      label: "Resources",
      href: "#resources",
      children: insightDropdownItems,
    },
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
  ];
  const handleClose = () => {
    setExpanded(null);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[60] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* backdrop */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* panel — one side, white bg */}
      <div
        className={`navbar-font absolute right-0 top-0 h-full w-full overflow-y-auto bg-white leading-[1.5] shadow-2xl transition-transform duration-500 ease-out sm:w-[440px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* top bar inside panel */}
        <div className="flex h-[72px] items-center justify-between px-6 md:px-10">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:text-orange-500"
          >
            Close
            <span className="text-lg leading-none">×</span>
          </button>

          <a
            href={sectionHref("contact")}
            onClick={handleClose}
            className="rounded-full border border-[#f45e2b] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#ce4111] transition-colors hover:bg-[#f45e2b] hover:text-white"
          >
            Get In Touch
          </a>
        </div>

        {/* nav links */}
        <nav className="flex flex-col gap-5 px-6 pb-16 pt-5 md:px-10">
          {links.map((link) => {
            const href = link.label === "Home" ? homeHref : link.href;
            const isActive = isActiveLink(href);
            const isResources = link.label === "Resources";

            return (
              <div key={link.label}>
                <div className="group flex items-center justify-between">
                  {isResources ? (
                    <span
                      className={`text-3xl font-extrabold uppercase leading-tight sm:text-4xl ${
                        isActive ? "text-orange-500" : "text-black"
                      }`}
                    >
                      {link.label}
                    </span>
                  ) : (
                    <a
                      href={href}
                      onClick={handleClose}
                      aria-current={isActive ? "page" : undefined}
                      className={`text-3xl font-extrabold uppercase leading-tight transition-colors duration-200 sm:text-4xl ${
                        isActive ? "text-orange-500" : "text-black group-hover:text-orange-500"
                      }`}
                    >
                      {link.label}
                    </a>
                  )}
                  {link.children && (
                    <button
                      type="button"
                      aria-label={`Expand ${link.label} submenu`}
                      aria-expanded={expanded === link.label}
                      onClick={() => setExpanded((current) => current === link.label ? null : link.label)}
                      className={`p-2 text-black/40 transition-transform duration-300 group-hover:text-orange-500 ${
                        expanded === link.label ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown size={22} strokeWidth={2} aria-hidden="true" />
                    </button>
                  )}
                </div>

                {link.children && (
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      expanded === link.label ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <ul className="flex flex-col gap-3 overflow-hidden pl-1">
                      {link.children.map((child) => {
                        const item = typeof child === "string" ? { label: child, href: link.href } : child;
                        const itemIsActive = item.href.startsWith("/services/")
                          ? pathname === item.href
                          : isActiveLink(item.href);

                        return (
                          <li key={item.href + item.label}>
                            <a
                              href={item.href}
                              onClick={handleClose}
                              aria-current={itemIsActive ? "page" : undefined}
                              className={`text-base font-medium transition-colors ${
                                itemIsActive ? "text-orange-500" : "text-black/60 hover:text-orange-500"
                              }`}
                            >
                              {item.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
