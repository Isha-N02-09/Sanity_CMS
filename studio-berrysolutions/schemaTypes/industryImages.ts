import {defineArrayMember, defineField, defineType} from 'sanity'

export const industryImages = defineType({
  name: 'industryImages',
  title: 'Industry Image Panels',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Right-side images',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'imagePanel',
          title: 'Image panel',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              initialValue: 'Modern architecture panel',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'imageUrl',
              title: 'Existing asset path',
              type: 'string',
              description: 'Preserves an existing local /assets/... image without uploading a duplicate.',
            }),
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'image',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
})