import {sanityClient} from "./client";
import type {Service} from "@/data/services";

export type HomeHeroContent = {
  headingLine?: string;
  headingAccent?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaLink?: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  videoUrl?: string;
  posterUrl?: string;
};

export type FooterSocialLink = {
  _key?: string;
  label?: string;
  url?: string;
  iconText?: string;
};

export type FooterNavLink = {
  _key?: string;
  label?: string;
  url?: string;
};

export type FooterContent = {
  brandTagline?: string;
  connectHeading?: string;
  socialLinks?: FooterSocialLink[];
  navigationLinks?: FooterNavLink[];
  copyrightText?: string;
};

const SERVICE_FIELDS = `{
  _id,
  "slug": slug.current,
  category,
  eyebrow,
  title,
  description,
  heroImageUrl,
  flow,
  capabilities[]{title, description},
  industries,
  tech[]{label, items},
  caseStudies[]{tag, client, summary},
  ctaLine
}`;

const SERVICES_QUERY = `*[_type == "service"] | order(_createdAt asc) ${SERVICE_FIELDS}`;
const SERVICE_BY_SLUG_QUERY = `*[_type == "service" && slug.current == $slug][0] ${SERVICE_FIELDS}`;

const HOME_HERO_QUERY = `*[_type == "homeHero"][0]{
  headingLine,
  headingAccent,
  description,
  primaryCtaLabel,
  primaryCtaLink,
  secondaryCtaLabel,
  secondaryCtaLink,
  videoUrl,
  posterUrl
}`;

const FOOTER_QUERY = `*[_type == "footerSettings"][0]{
  brandTagline,
  connectHeading,
  socialLinks[]{
    _key,
    label,
    url,
    iconText
  },
  navigationLinks[]{
    _key,
    label,
    url
  },
  copyrightText
}`;

export async function getHomeHero(): Promise<HomeHeroContent | null> {
  try {
    return await sanityClient.fetch<HomeHeroContent | null>(HOME_HERO_QUERY, {}, {
      next: {revalidate: 60},
    });
  } catch {
    return null;
  }
}

export async function getFooterContent(): Promise<FooterContent | null> {
  try {
    return await sanityClient.fetch<FooterContent | null>(FOOTER_QUERY, {}, {
      next: {revalidate: 60},
    });
  } catch {
    return null;
  }
}

export async function getServices(): Promise<Service[] | null> {
  try {
    return await sanityClient.fetch<Service[]>(SERVICES_QUERY, {}, {cache: "no-store"});
  } catch {
    return null;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    return await sanityClient.fetch<Service | null>(SERVICE_BY_SLUG_QUERY, {slug}, {next: {revalidate: 60}});
  } catch {
    return null;
  }
}