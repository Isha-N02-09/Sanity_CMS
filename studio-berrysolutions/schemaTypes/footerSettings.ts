import {defineArrayMember, defineField, defineType} from 'sanity'

export const footerSettings = defineType({
  name: 'footerSettings',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'brandTagline',
      title: 'Brand tagline',
      type: 'string',
      initialValue: 'Technology that connects the dots.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'connectHeading',
      title: 'Connect heading',
      type: 'string',
      initialValue: 'Connect with us',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'iconText',
              title: 'Icon text',
              type: 'string',
              description: 'Short label used in the badge, for example: f, in, ◎',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'navigationLinks',
      title: 'Navigation links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright text',
      type: 'string',
      initialValue: '© 2026 Berry Solutions. All rights reserved.',
      validation: (rule) => rule.required(),
    }),
  ],
})
