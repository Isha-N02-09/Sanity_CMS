import {defineArrayMember, defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Digital', 'Growth', 'Technology'] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImageUrl',
      title: 'Hero image URL',
      type: 'string',
      description: 'Use the existing local asset path or an absolute image URL.',
    }),
    defineField({
      name: 'flow',
      title: 'Flow steps',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'capabilities',
      title: 'Capabilities',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', type: 'text', validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'tech',
      title: 'Tech stack groups',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'items', type: 'array', of: [{ type: 'string' }] }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'caseStudies',
      title: 'Case studies references',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'tag', type: 'string' }),
            defineField({ name: 'client', type: 'string' }),
            defineField({ name: 'summary', type: 'text' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'ctaLine',
      title: 'CTA line',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
    },
  },
})
