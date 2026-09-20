import {defineArrayMember, defineField, defineType} from 'sanity'

export const trustedPartners = defineType({
  name: 'trustedPartners',
  title: 'Trusted Brands & Partners',
  type: 'document',
  fields: [
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'partner',
          title: 'Partner',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Website link',
              type: 'url',
              validation: (rule) =>
                rule.uri({scheme: ['http', 'https']}),
            }),
            defineField({
              name: 'logoUrl',
              title: 'Existing asset path',
              type: 'string',
              description: 'Preserves an existing local /assets/... logo without uploading a duplicate.',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
})