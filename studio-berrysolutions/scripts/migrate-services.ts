import {createClient} from '@sanity/client'
import {services} from '../../berrysols_2/data/services'

const client = createClient({
  projectId: 'ns96vt4n',
  dataset: 'production',
  apiVersion: '2026-09-12',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const heroImages: Record<string, string> = {
  'web-development': '/assets/services/webdevbg.png',
  'ai-automation': '/assets/services/aiautomationbg.png',
  'digital-marketing': '/assets/services/digitalmarketingbg.png',
  'enterprise-resource-planning-erp': '/assets/services/erpbg.png',
  'legacy-software': '/assets/services/legacysoftwarebg.png',
  'startup-support': '/assets/services/startupbg.png',
  'desktop-app-development': '/assets/services/webdevbg.png',
  'staff-augmentation': '/assets/services/webdevbg.png',
}

const documents = services.map((service) => ({
  _type: 'service',
  title: service.title,
  slug: {current: service.slug},
  category: service.category,
  eyebrow: service.eyebrow,
  description: service.description,
  heroImageUrl: heroImages[service.slug],
  flow: service.flow,
  capabilities: service.capabilities,
  industries: service.industries,
  tech: service.tech,
  caseStudies: service.caseStudies,
  ctaLine: service.ctaLine,
}))

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error('Set SANITY_API_TOKEN before running the service migration.')
  }

  const existing = await client.fetch<Array<{_id: string; slug?: {current?: string}}>>(
    '*[_type == "service"]{_id, slug}'
  )
  const existingBySlug = new Map(existing.map((document) => [document.slug?.current, document._id]))
  const transaction = client.transaction()

  for (const document of documents) {
    const existingId = existingBySlug.get(document.slug.current)
    if (existingId) {
      const {_type, ...fields} = document
      transaction.patch(existingId, (patch) => patch.set(fields))
    } else {
      transaction.create(document)
    }
  }

  await transaction.commit()
  console.log(`Migrated ${documents.length} services without changing their slugs.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})