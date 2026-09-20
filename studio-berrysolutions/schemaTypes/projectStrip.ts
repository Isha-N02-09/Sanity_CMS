import {defineArrayMember, defineField, defineType} from 'sanity'

export const projectStrip = defineType({
  name: 'projectStrip',
  title: 'Project Strip',
  type: 'document',
  fields: [
    defineField({
      name: 'words',
      title: 'Strip words',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'word',
          title: 'Word',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      initialValue: ['PROJECTS DELIVERED', 'INNOVATIVE', 'VISIONARY', 'DIGITAL'],
      validation: (rule) => rule.min(1),
    }),
  ],
})