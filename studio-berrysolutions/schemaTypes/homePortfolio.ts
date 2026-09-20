import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePortfolio = defineType({
  name: 'homePortfolio',
  title: 'Home Portfolio Showcase',
  type: 'document',
  fields: [
    defineField({
      name: 'headingPrefix',
      title: 'Heading prefix',
      type: 'string',
      initialValue: 'Our',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Portfolio',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button text',
      type: 'string',
      initialValue: 'View Portfolio',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button link',
      type: 'string',
      initialValue: '/portfolio',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Portfolio cards',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'feature',
          title: 'Portfolio card',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Project title',
              type: 'string',
            }),
            defineField({
              name: 'eyebrow',
              title: 'Eyebrow',
              type: 'string',
              description: 'For example: PROJECTS · PRODUCT DESIGN',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'visual',
              title: 'Card image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'visualUrl',
              title: 'Existing asset path',
              type: 'string',
              description: 'Preserves an existing local /assets/... image without uploading a duplicate.',
            }),
            defineField({
              name: 'detail',
              title: 'Detail label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Timer', value: 'Timer'},
                  {title: 'Truck', value: 'Truck'},
                  {title: 'Stethoscope', value: 'Stethoscope'},
                  {title: 'Network', value: 'Network'},
                  {title: 'Heart pulse', value: 'HeartPulse'},
                ],
                layout: 'dropdown',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Project link',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'eyebrow',
              media: 'visual',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'projectRefs',
      title: 'Portfolio project references',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'portfolioProject'}]}],
    }),
  ],
})