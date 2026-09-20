import {defineArrayMember, defineField, defineType} from 'sanity'

export const clientTestimonials = defineType({
  name: 'clientTestimonials',
  title: 'What Clients Say',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'What clients say',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Real feedback from the people, companies and industries running Berry Solutions in production.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviews',
      title: 'Client reviews',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'review',
          title: 'Client review',
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Client name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Client role',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'initials',
              title: 'Avatar initials',
              type: 'string',
              description: 'Short fallback avatar text, for example CP.',
              validation: (rule) => rule.required().max(3),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'company',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
})