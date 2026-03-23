import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'weight',
      title: 'Weight/Material info',
      type: 'string',
      description: 'Example: 0.13g — 99% Ag',
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Layout Type',
      type: 'string',
      options: {
        list: [
          { title: 'Large', value: 'large' },
          { title: 'Medium Offset-Up', value: 'medium offset-up' },
          { title: 'Small', value: 'small' },
        ],
      },
      initialValue: 'large',
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    }),
  ],
})
