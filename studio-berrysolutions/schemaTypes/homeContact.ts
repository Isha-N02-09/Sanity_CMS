import {defineArrayMember, defineField, defineType} from 'sanity'

export const homeContact = defineType({
  name: 'homeContact',
  title: 'Home Contact Flow',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Opening heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Opening description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'startLabel', title: 'Start button text', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'serviceOptions', title: 'Additional service option labels', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'otherServiceLabel', title: 'Other service label', type: 'string'}),
    defineField({name: 'emailAddress', title: 'Enquiry email address', type: 'string'}),
    defineField({name: 'whatsappNumber', title: 'WhatsApp number', type: 'string'}),
    defineField({
      name: 'steps',
      title: 'Flow steps',
      type: 'array',
      of: [defineArrayMember({type: 'object', fields: [
        defineField({name: 'step', title: 'Step key', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
        defineField({name: 'placeholder', title: 'Input placeholder', type: 'string'}),
        defineField({name: 'alternateHeading', title: 'Alternate heading', type: 'string'}),
        defineField({name: 'alternatePlaceholder', title: 'Alternate placeholder', type: 'string'}),
        defineField({name: 'buttonLabel', title: 'Button label', type: 'string'}),
        defineField({name: 'errorMessage', title: 'Validation message', type: 'string'}),
        defineField({name: 'completionDescription', title: 'Completion description', type: 'string'}),
        defineField({name: 'whatsappLabel', title: 'WhatsApp button label', type: 'string'}),
        defineField({name: 'emailLabel', title: 'Email button label', type: 'string'}),
      ]})],
    }),
    defineField({
      name: 'summaryLabels',
      title: 'Enquiry summary labels',
      type: 'object',
      fields: [
        defineField({name: 'name', title: 'Name label', type: 'string'}),
        defineField({name: 'email', title: 'Email label', type: 'string'}),
        defineField({name: 'service', title: 'Service label', type: 'string'}),
        defineField({name: 'message', title: 'Message label', type: 'string'}),
        defineField({name: 'defaultRecipient', title: 'Default recipient', type: 'string'}),
        defineField({name: 'notSpecified', title: 'Not specified label', type: 'string'}),
        defineField({name: 'subjectPrefix', title: 'Email subject prefix', type: 'string'}),
      ],
    }),
  ],
})