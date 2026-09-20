import Link from "next/link";
import Image from "next/image";
import { getFooterContent, type FooterContent } from "@/lib/sanity/queries";

const fallbackFooter: Required<FooterContent> = {
  brandTagline: "Technology that connects the dots.",
  connectHeading: "Connect with us",
  socialLinks: [
    {
      _key: "email",
      label: "Email",
      url: "mailto:hello@berrysols.com",
      iconText: "✉",
    },
    {
      _key: "facebook",
      label: "Facebook",
      url: "https://www.facebook.com/people/Berry-Solutions/61559954167096/?locale=ur_PK#",
      iconText: "f",
    },
    {
      _key: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/berrysols/",
      iconText: "◎",
    },
    {
      _key: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/berry-solutions",
      iconText: "in",
    },
  ],
  navigationLinks: [
    { _key: "services", label: "Services", url: "/services" },
    { _key: "about", label: "About", url: "/about" },
    { _key: "contact", label: "Contact", url: "/#contact" },
  ],
  copyrightText: "© 2026 Berry Solutions. All rights reserved.",
};

export default async function SimpleFooter({ content }: { content?: FooterContent | null }) {
  const footerContent = content ?? (await getFooterContent());
  const footer = {
    ...fallbackFooter,
    ...footerContent,
    socialLinks: footerContent?.socialLinks?.length ? footerContent.socialLinks : fallbackFooter.socialLinks,
    navigationLinks: footerContent?.navigationLinks?.length ? footerContent.navigationLinks : fallbackFooter.navigationLinks,
  };

  return (
    <footer className="simple-footer">
      <div className="simple-footer-inner">
        <div className="simple-footer-watermark" aria-hidden="true">BERRY</div>

        <div className="simple-footer-brand">
          <Link className="footer-logo" href="/" aria-label="Berry Solutions home">
            <Image src="/assets/icon2.png" alt="Berry Solutions logo" width={64} height={64} className="footer-logo-image" />
          </Link>
          <p>{footer.brandTagline}</p>
        </div>

        <div className="simple-footer-connect">
          <h2>{footer.connectHeading}</h2>
          <div className="simple-footer-socials" aria-label="Social links">
            {footer.socialLinks.map((link) => (
              <a
                key={link._key || link.label}
                href={link.url || "#"}
                aria-label={link.label}
                title={link.label}
                target={link.url?.startsWith("http") ? "_blank" : undefined}
                rel={link.url?.startsWith("http") ? "noreferrer" : undefined}
              >
                <span>{link.label}</span>
                <b>{link.iconText || (link.label?.slice(0, 1).toUpperCase() || "•")}</b>
              </a>
            ))}
          </div>
        </div>

        <div className="simple-footer-bottom">
          <nav aria-label="Footer navigation">
            {footer.navigationLinks.map((link) => (
              <Link key={link._key || link.label} href={link.url || "/"}>
                {link.label}
              </Link>
            ))}
          </nav>
          <span>{footer.copyrightText}</span>
        </div>
      </div>
    </footer>
  );
}
