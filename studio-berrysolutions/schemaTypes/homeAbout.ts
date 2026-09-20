import {defineArrayMember, defineField, defineType} from 'sanity'

export const homeAbout = defineType({
  name: 'homeAbout',
  title: 'Home About / Why Berry',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'descriptionPrefix', title: 'Description before emphasis', type: 'string'}),
    defineField({name: 'descriptionEmphasis', title: 'Emphasized description text', type: 'string'}),
    defineField({name: 'descriptionSuffix', title: 'Description after emphasis', type: 'string'}),
    defineField({name: 'buttonLabel', title: 'Button text', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'buttonLink', title: 'Button link', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'items',
      title: 'Why Berry items',
      type: 'array',
      of: [defineArrayMember({type: 'object', fields: [
        defineField({name: 'number', title: 'Number', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'text', title: 'Description', type: 'text', validation: (rule) => rule.required()}),
      ]})],
      validation: (rule) => rule.min(1),
    }),
  ],
})