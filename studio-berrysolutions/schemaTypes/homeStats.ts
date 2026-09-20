import {defineArrayMember, defineField, defineType} from 'sanity'

export const homeStats = defineType({
  name: 'homeStats',
  title: 'Home Statistics',
  type: 'document',
  fields: [
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [defineArrayMember({type: 'object', fields: [
        defineField({name: 'target', title: 'Number', type: 'number', validation: (rule) => rule.required()}),
        defineField({name: 'suffix', title: 'Suffix', type: 'string'}),
        defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
      ]})],
      validation: (rule) => rule.min(1),
    }),
  ],
})