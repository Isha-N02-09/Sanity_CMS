import {defineArrayMember, defineField, defineType} from 'sanity'

export const industriesSection = defineType({
  name: 'industriesSection',
  title: 'Industries Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Industries we serve',
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
      initialValue: '#contact',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'industry',
          title: 'Industry',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Landmark', value: 'Landmark'},
                  {title: 'Briefcase', value: 'BriefcaseBusiness'},
                  {title: 'Smartphone', value: 'Smartphone'},
                  {title: 'Utensils', value: 'UtensilsCrossed'},
                  {title: 'Building', value: 'Building2'},
                  {title: 'Shopping bag', value: 'ShoppingBag'},
                  {title: 'Graduation cap', value: 'GraduationCap'},
                ],
                layout: 'dropdown',
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'icon',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
})