import {defineArrayMember, defineField, defineType} from 'sanity'

export const homeServices = defineType({
  name: 'homeServices',
  title: 'Home Services Showcase',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section heading',
      type: 'string',
      initialValue: 'Our services',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'serviceRefs',
      title: 'Existing services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
      description: 'References to the existing Service documents. This avoids duplicating service content.',
    }),
  ],
})