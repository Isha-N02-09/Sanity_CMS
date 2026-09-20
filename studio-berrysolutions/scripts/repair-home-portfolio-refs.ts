import {createClient} from '@sanity/client'
import {homePortfolioFeatures} from '../../berrysols_2/data/homeContent'

const client = createClient({
  projectId: 'ns96vt4n',
  dataset: 'production',
  apiVersion: '2026-09-12',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function main() {
  if (!process.env.SANITY_API_TOKEN) throw new Error('Set SANITY_API_TOKEN before repairing Home Portfolio references.')

  const homePortfolio = await client.fetch<{projectRefs?: Array<{_ref: string}>} | null>(
    '*[_id == "homePortfolio"][0]{projectRefs}',
  )
  if (!homePortfolio) throw new Error('The published homePortfolio document does not exist.')
  if (homePortfolio.projectRefs?.length) {
    console.log('Home Portfolio references already exist; no changes made.')
    return
  }

  const projects = await client.fetch<Array<{_id: string; slug: string}>>(
    '*[_type == "portfolioProject"]{"_id": _id, "slug": slug.current}',
  )
  const references = homePortfolioFeatures.map((feature) => {
    const slug = feature.href.split('/').pop()
    const project = projects.find((item) => item.slug === slug)
    if (!project) throw new Error(`Missing Portfolio document for ${slug}.`)
    return {_type: 'reference', _ref: project._id}
  })

  await client.patch('homePortfolio').set({projectRefs: references}).commit()
  console.log(`Added ${references.length} missing Home Portfolio references without changing the existing cards.`)
}

main().catch((error) => {console.error(error); process.exitCode = 1})
