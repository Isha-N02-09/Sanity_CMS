import {createClient} from '@sanity/client'
import {services} from '../../berrysols_2/data/services'
import {portfolioProjects, caseStudies} from '../../berrysols_2/data/portfolio'
import {
  homeBlogStrip,
  homeConcepts,
  homeIndustries,
  homeIndustryImages,
  homeInsights,
  homeLogos,
  homePortfolioFeatures,
  homeReviews,
  homeStats,
  homeStripWords,
  homeWhyItems,
} from '../../berrysols_2/data/homeContent'

const client = createClient({
  projectId: 'ns96vt4n',
  dataset: 'production',
  apiVersion: '2026-09-12',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const singleton = (id: string, _type: string, fields: Record<string, unknown>) => ({
  _id: id,
  _type,
  ...fields,
})

async function createMissingBySlug(
  type: string,
  documents: Array<Record<string, unknown> & {_type: string; slug: {current: string}}>,
) {
  const existing = await client.fetch<Array<{_id: string; slug?: {current?: string}}>>(
    `*[_type == $type]{_id, slug}`,
    {type},
  )
  const existingSlugs = new Set(existing.map((document) => document.slug?.current))
  const transaction = client.transaction()

  for (const document of documents) {
    if (!existingSlugs.has(document.slug.current)) transaction.create(document)
  }

  if (documents.some((document) => !existingSlugs.has(document.slug.current))) {
    await transaction.commit()
  }
}

async function createMissingSingletons(documents: Array<Record<string, unknown> & {_id: string; _type: string}>) {
  const existing = await client.fetch<string[]>(`*[_id in $ids]._id`, {ids: documents.map((document) => document._id)})
  const transaction = client.transaction()

  for (const document of documents) {
    if (!existing.includes(document._id)) transaction.createIfNotExists(document)
  }

  if (documents.some((document) => !existing.includes(document._id))) await transaction.commit()
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) throw new Error('Set SANITY_API_TOKEN before running this migration.')

  const portfolioDocuments = portfolioProjects.map((project) => ({
    _type: 'portfolioProject',
    title: project.title,
    slug: {current: project.slug},
    category: project.category,
    excerpt: project.excerpt,
    image: project.image,
    industry: project.industry,
    date: project.date,
    clientName: project.clientName,
    technologies: project.technologies,
    ...(caseStudies[project.slug] ? {
      lede: caseStudies[project.slug].lede,
      role: caseStudies[project.slug].role,
      liveSite: caseStudies[project.slug].liveSite,
      stats: caseStudies[project.slug].stats.map(({value, label}) => ({value, label})),
      overview: caseStudies[project.slug].overview,
      problems: caseStudies[project.slug].problems,
      solutions: caseStudies[project.slug].solutions,
      process: caseStudies[project.slug].process,
    } : {}),
  }))
  await createMissingBySlug('portfolioProject', portfolioDocuments)

  const serviceReferences = await client.fetch<Array<{_id: string; slug: {current: string}}>>(
    `*[_type == "service"]{_id, "slug": slug.current}`,
  )
  if (serviceReferences.length !== services.length) {
    throw new Error(`Expected ${services.length} existing Service documents; found ${serviceReferences.length}. No Home documents were written.`)
  }

  const projectReferences = await client.fetch<Array<{_id: string; slug: {current: string}}>>(
    `*[_type == "portfolioProject"]{_id, "slug": slug.current}`,
  )
  const projectRefBySlug = new Map(projectReferences.map((project) => [project.slug.current, project._id]))
  const featuredProjectRefs = homePortfolioFeatures
    .map((feature) => feature.href.split('/').pop() ?? '')
    .map((slug) => projectRefBySlug.get(slug))
    .filter((id): id is string => Boolean(id))

  await createMissingSingletons([
    singleton('homeHero', 'homeHero', {
      headingLine: 'From Chaos  To', headingAccent: 'Clarity',
      description: 'Complex problems. Smarter solutions. We engineer digital experiences, intelligent systems, and automation that bring clarity to your business and turn complexity into growth.',
      primaryCtaLabel: 'Our Services', primaryCtaLink: '#portfolio',
      secondaryCtaLabel: 'Get in touch', secondaryCtaLink: '#contact',
      videoUrl: '/assets/hero-bg.mp4', posterUrl: '/assets/poster.jpg',
    }),
    singleton('homeServices', 'homeServices', {
      heading: 'Our services',
      serviceRefs: serviceReferences.sort((a, b) => services.findIndex((service) => service.slug === a.slug.current) - services.findIndex((service) => service.slug === b.slug.current)).map((service) => ({_type: 'reference', _ref: service._id})),
    }),
    singleton('berryConcept', 'berryConcept', {kicker: 'BERRY Solutions', heading: 'Technology that connects the dots.', centerLabel: 'BERRY', concepts: homeConcepts}),
    singleton('industriesSection', 'industriesSection', {
      heading: 'Industries we serve',
      description: 'Different industries. Different challenges. One intelligent approach. We build scalable digital solutions that adapt to your industry, streamline operations, and create measurable impact.\n',
      buttonLabel: 'Learn more', buttonLink: '#contact', industries: homeIndustries,
    }),
    singleton('industryImages', 'industryImages', {images: homeIndustryImages.map((image) => ({imageUrl: `/assets/industry/${image.number}.${image.extension}`, alt: `Modern architecture panel ${image.number}`}))}),
    singleton('homePortfolio', 'homePortfolio', {
      headingPrefix: 'Our', heading: 'Portfolio', buttonLabel: 'View Portfolio', buttonLink: '/portfolio',
      projectRefs: featuredProjectRefs.map((_ref) => ({_type: 'reference', _ref})),
      features: homePortfolioFeatures.map((feature) => ({...feature, visualUrl: feature.visual})),
    }),
    singleton('featuredInsights', 'featuredInsights', {
      eyebrow: 'FEATURED INSIGHTS', headingLineOne: 'Stories of our transformations across', headingLineTwo: 'Services and Industries',
      subheading: 'From Concept to Completion', buttonLabel: 'Learn more', buttonLink: '/blog',
      columns: [0, 1, 2].map((index) => ({cards: homeInsights.slice(index === 0 ? 0 : index === 1 ? 2 : 5, index === 0 ? 2 : index === 1 ? 5 : 8).map((insight) => ({...insight, imageUrl: insight.image}))})),
    }),
    singleton('clientTestimonials', 'clientTestimonials', {heading: 'What clients say', description: 'Real feedback from the people, companies and industries running Berry Solutions in production.', reviews: homeReviews}),
    singleton('projectStrip', 'projectStrip', {words: homeStripWords}),
    singleton('trustedPartners', 'trustedPartners', {partners: homeLogos.map((logo) => ({name: logo.name, logoUrl: logo.src}))}),
    singleton('homeAbout', 'homeAbout', {eyebrow: 'Why Berry solutions', heading: 'Technology With Purpose.', description: 'We bring clarity to complex challenges through technology built around your business.', buttonLabel: 'Know more', buttonLink: '/about', items: homeWhyItems}),
    singleton('homeStats', 'homeStats', {stats: homeStats}),
    singleton('homeContact', 'homeContact', {eyebrow: "Let's talk", heading: 'Have a project in mind?', description: "Tell us what you're building. We'll reply with next steps, not a sales script.", startLabel: 'Start your project', serviceOptions: services.map((service) => service.eyebrow), whatsappNumber: '92339456789'}),
    singleton('footerSettings', 'footerSettings', {
      brandTagline: 'Technology that connects the dots.', connectHeading: 'Connect with us',
      socialLinks: [{label: 'Email', url: 'mailto:hello@berrysols.com', iconText: '✉'}, {label: 'Facebook', url: 'https://www.facebook.com/people/Berry-Solutions/61559954167096/?locale=ur_PK#', iconText: 'f'}, {label: 'Instagram', url: 'https://www.instagram.com/berrysols/', iconText: '◎'}, {label: 'LinkedIn', url: 'https://www.linkedin.com/company/berry-solutions', iconText: 'in'}],
      navigationLinks: [{label: 'Services', url: '/services'}, {label: 'About', url: '/about'}, {label: 'Contact', url: '/#contact'}], copyrightText: '© 2026 Berry Solutions. All rights reserved.',
    }),
  ])

  console.log(`Created missing Home documents and ${portfolioDocuments.length} missing Portfolio documents. Existing documents were not overwritten.`)
}

main().catch((error) => {console.error(error); process.exitCode = 1})