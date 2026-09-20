import {defineArrayMember, defineField, defineType} from 'sanity'

export const berryConcept = defineType({
  name: 'berryConcept',
  title: 'Berry Concept',
  type: 'document',
  fields: [
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      initialValue: 'BERRY Solutions',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Technology that connects the dots.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'centerLabel',
      title: 'Center label',
      type: 'string',
      initialValue: 'BERRY',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'concepts',
      title: 'Concept cards',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'concept',
          title: 'Concept card',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Route', value: 'Route'},
                  {title: 'Heart handshake', value: 'HeartHandshake'},
                  {title: 'Bar chart', value: 'BarChart3'},
                  {title: 'Cog', value: 'Cog'},
                  {title: 'Brain circuit', value: 'BrainCircuit'},
                  {title: 'Growth chart', value: 'ChartNoAxesCombined'},
                ],
                layout: 'dropdown',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'position',
              title: 'Layout position',
              type: 'string',
              options: {
                list: [
                  {title: 'Strategy', value: 'strategy'},
                  {title: 'People', value: 'people'},
                  {title: 'Data', value: 'data'},
                  {title: 'Systems', value: 'systems'},
                  {title: 'Intelligence', value: 'intelligence'},
                  {title: 'Growth', value: 'growth'},
                ],
                layout: 'dropdown',
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'text',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
})