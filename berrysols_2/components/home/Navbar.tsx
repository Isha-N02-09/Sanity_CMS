"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import {useServices} from "@/lib/sanity/useServices";

type DropdownItem = { label: string; href: string };

export default function Navbar() {
  const [open, setOpen] = useState(false);
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

  const desktopLinks = [
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
  ];

  return (
    <>
      <header className="navbar-font fixed left-0 top-0 z-50 w-full border-b border-black/5 bg-white text-[13px] leading-[1.5]">
        <div className="flex h-[74px] w-full items-center justify-between px-[26px] lg:px-[48px]">
          <Link
            href="/"
            aria-label="Berry Solutions home"
            className="group flex h-11 items-center gap-3 overflow-visible"
          >
            <span className="relative block h-10 w-9 shrink-0 overflow-hidden">
              <img
                src="/assets/icon2.png"
                alt=""
                className="absolute inset-0 h-full w-full object-contain"
              />
            </span>
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-left font-[Poppins,sans-serif] text-[14px] font-extrabold uppercase leading-[1.05] tracking-[0.08em] text-black opacity-0 transition-all duration-300 group-hover:max-w-[92px] group-hover:whitespace-normal group-hover:opacity-100">
              Berry
              <br />
              Solutions
            </span>
          </Link>

          <nav
            className="absolute left-[49%] hidden w-max -translate-x-1/2 items-center justify-center gap-7 lg:flex"
            aria-label="Main navigation"
          >
            {desktopLinks.map((link) => {
              const href = link.label === "Home" ? homeHref : link.href;
              const isActive = isActiveLink(href);
              const isResources = link.label === "Resources";

              return (
                <div key={link.label} className="group relative py-7">
                  {isResources ? (
                    <span
                      className={`flex items-center gap-2 whitespace-nowrap text-[13px] font-medium ${
                        isActive ? "text-[#f45e2b]" : "text-[#111]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
                    </span>
                  ) : (
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-2 whitespace-nowrap text-[13px] font-medium transition-colors ${
                        isActive ? "text-[#f45e2b]" : "text-[#111] hover:text-[#f45e2b]"
                      }`}
                    >
                      {link.label}
                      {link.children && (
                        <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
                      )}
                    </Link>
                  )}

                  {link.children && (
                    <div className="pointer-events-none absolute left-1/2 top-full z-10 w-64 -translate-x-1/2 translate-y-2 rounded-xl border border-black/10 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                      {link.children.map((child) => {
                        const item = typeof child === "string" ? { label: child, href: link.href } : child;
                        const itemIsActive = item.href.startsWith("/services/")
                          ? pathname === item.href
                          : isActiveLink(item.href);

                        return (
                          <Link
                            key={item.href + item.label}
                            href={item.href}
                            aria-current={itemIsActive ? "page" : undefined}
                            className={`block rounded-lg px-3 py-2 text-[13px] transition-colors ${
                              itemIsActive
                                ? "bg-[#fff1eb] text-[#ce4111]"
                                : "text-[#111] hover:bg-[#fff1eb] hover:text-[#ce4111]"
                            }`}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/careers"
              className="btn !hidden text-[13px] font-semibold lg:!inline-flex"
            >
              Explore Careers
            </Link>
            <Link
              href={sectionHref("contact")}
              className="btn ghost !hidden text-[13px] font-semibold lg:!inline-flex"
            >
              Get In Touch
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:text-[#f45e2b] lg:hidden"
              aria-haspopup="true"
              aria-expanded={open}
            >
              <Menu size={18} aria-hidden="true" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      <style jsx>{`
        @media (max-width: 767px) {
          header > div {
            height: 68px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          header > div > a > span:first-child {
            height: 36px !important;
            width: 32px !important;
          }

          header > div > a > span:last-child {
            display: none !important;
          }
        }
      `}</style>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
