import {defineField, defineType} from 'sanity'

export const homeHero = defineType({
  name: 'homeHero',
  title: 'Home Hero',
  type: 'document',
  fields: [
    defineField({name: 'headingLine', title: 'Heading first line', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'headingAccent', title: 'Heading accent', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({name: 'primaryCtaLabel', title: 'Primary CTA text', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'primaryCtaLink', title: 'Primary CTA link', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'secondaryCtaLabel', title: 'Secondary CTA text', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'secondaryCtaLink', title: 'Secondary CTA link', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'videoUrl', title: 'Hero video URL', type: 'string', description: 'Use the existing site path or a hosted MP4 URL.'}),
    defineField({name: 'posterUrl', title: 'Hero poster URL', type: 'string', description: 'Use the existing site path or a hosted image URL.'}),
  ],
})