import {createClient} from '@sanity/client'

type SanityObject = Record<string, unknown>
type ArrayReport = {
  path: string
  itemCount: number
  objectItemCount: number
  missingBefore: number
  duplicateBefore: number
  repaired: number
  primitiveItems: number
}

type DocumentReport = {
  id: string
  type: string
  arrays: ArrayReport[]
  changedTopLevelFields: string[]
}

const client = createClient({
  projectId: 'ns96vt4n',
  dataset: 'production',
  apiVersion: '2026-09-12',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const documentTypes = [
  'homeHero', 'homeServices', 'berryConcept', 'industriesSection', 'industryImages',
  'homePortfolio', 'featuredInsights', 'clientTestimonials', 'projectStrip',
  'trustedPartners', 'homeAbout', 'homeStats', 'homeContact', 'footerSettings',
  'portfolioProject', 'service',
]

function keyPart(value: unknown): string {
  return String(value ?? 'item')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48) || 'item'
}

function identity(item: SanityObject, index: number): string {
  return keyPart(
    item._ref ?? item.slug ?? item.title ?? item.name ?? item.step ?? item.label ?? index + 1,
  )
}

function repairArrays(value: unknown, path: string, report: ArrayReport[], changed: {value: boolean}): unknown {
  if (Array.isArray(value)) {
    const items = value.map((item, index) => ({item, index}))
    const objectItems = items.filter(({item}) => item !== null && typeof item === 'object' && !Array.isArray(item))
    const seen = new Set<string>()
    let missingBefore = 0
    let duplicateBefore = 0
    let repaired = 0

    const repairedItems = items.map(({item, index}) => {
      if (item === null || typeof item !== 'object' || Array.isArray(item)) return item
      const objectItem = item as SanityObject
      const existingKey = typeof objectItem._key === 'string' && objectItem._key.length > 0 ? objectItem._key : null
      if (!existingKey) missingBefore += 1
      if (existingKey && seen.has(existingKey)) duplicateBefore += 1

      let nextKey = existingKey && !seen.has(existingKey) ? existingKey : `${keyPart(path.split('.').pop())}-${identity(objectItem, index)}-${index + 1}`
      while (seen.has(nextKey)) nextKey = `${nextKey}-${index + 1}`
      seen.add(nextKey)
      if (nextKey !== existingKey) {
        repaired += 1
        changed.value = true
      }

      const nextItem: SanityObject = {...objectItem, _key: nextKey}
      for (const [field, fieldValue] of Object.entries(nextItem)) {
        if (field === '_key') continue
        nextItem[field] = repairArrays(fieldValue, `${path}[${index}].${field}`, report, changed)
      }
      return nextItem
    })

    report.push({
      path,
      itemCount: value.length,
      objectItemCount: objectItems.length,
      missingBefore,
      duplicateBefore,
      repaired,
      primitiveItems: value.length - objectItems.length,
    })
    return repairedItems
  }

  if (value !== null && typeof value === 'object') {
    const nextObject: SanityObject = {...value as SanityObject}
    for (const [field, fieldValue] of Object.entries(nextObject)) {
      nextObject[field] = repairArrays(fieldValue, `${path}.${field}`, report, changed)
    }
    return nextObject
  }

  return value
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) throw new Error('Set SANITY_API_TOKEN before repairing array keys.')
  const verifyOnly = process.env.VERIFY_ONLY === '1'

  const documents = await client.fetch<Array<SanityObject>>(
    '*[_type in $types]{...} | order(_type asc, _id asc)',
    {types: documentTypes},
  )
  const reports: DocumentReport[] = []

  for (const document of documents) {
    const report: DocumentReport = {id: String(document._id), type: String(document._type), arrays: [], changedTopLevelFields: []}
    const repaired = {...document}

    for (const [field, value] of Object.entries(document)) {
      if (field.startsWith('_')) continue
      const changed = {value: false}
      repaired[field] = repairArrays(value, field, report.arrays, changed)
      if (changed.value) report.changedTopLevelFields.push(field)
    }

    if (!verifyOnly && report.changedTopLevelFields.length > 0) {
      const fields = Object.fromEntries(report.changedTopLevelFields.map((field) => [field, repaired[field]]))
      await client.patch(String(document._id)).set(fields).commit()
    }
    reports.push(report)
  }

  console.log(JSON.stringify({mode: verifyOnly ? 'read-only verification' : 'repair', documentCount: documents.length, reports}, null, 2))
}

main().catch((error) => {console.error(error); process.exitCode = 1})
