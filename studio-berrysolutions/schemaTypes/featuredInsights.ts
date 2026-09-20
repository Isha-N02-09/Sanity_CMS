import {defineArrayMember, defineField, defineType} from 'sanity'

const insightCard = defineArrayMember({
  name: 'insightCard',
  title: 'Insight card',
  type: 'object',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imageUrl',
      title: 'Existing asset path',
      type: 'string',
      description: 'Preserves an existing local /assets/... image without uploading a duplicate.',
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'Optional internal or external destination for the card.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})

export const featuredInsights = defineType({
  name: 'featuredInsights',
  title: 'Featured Insights',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'FEATURED INSIGHTS',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headingLineOne',
      title: 'Heading line one',
      type: 'string',
      initialValue: 'Stories of our transformations across',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headingLineTwo',
      title: 'Heading line two',
      type: 'string',
      initialValue: 'Services and Industries',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      initialValue: 'From Concept to Completion',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button text',
      type: 'string',
      initialValue: 'Learn more',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button link',
      type: 'string',
      initialValue: '/blog',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'columns',
      title: 'Insight columns',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'column',
          title: 'Column',
          type: 'object',
          fields: [
            defineField({
              name: 'cards',
              title: 'Cards',
              type: 'array',
              of: [insightCard],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: {
            select: {
              cards: 'cards',
            },
            prepare: ({cards = []}) => ({
              title: `Column (${cards.length} cards)`,
            }),
          },
        }),
      ],
      validation: (rule) => rule.length(3),
    }),
  ],
})