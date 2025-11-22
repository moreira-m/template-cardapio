import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // prevent creation/deletion to keep it singleton
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      description: 'Nome da marca ou restaurante mostrado no topo e em listagens.',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'brandColors',
      title: 'Color palette',
      type: 'array',
      description: 'Paleta de cores para usar no site (primárias, secundárias, acentos).',
      of: [
        {
          type: 'object',
          name: 'color',
          title: 'Color',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Ex.: Primária, Secundária, Fundo, Texto.',
              validation: (Rule) => Rule.required().min(2).max(40),
            }),
            defineField({
              name: 'value',
              title: 'Color',
              type: 'color',
              description: 'Escolha a cor no seletor.',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              color: 'value.hex',
            },
            prepare({title, color}) {
              return {
                title: title || 'Color',
                subtitle: color,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page title',
      type: 'string',
      description: 'Título da página para SEO e compartilhamento.',
      validation: (Rule) => Rule.required().min(2).max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Descrição curta usada em meta description e cards sociais.',
      validation: (Rule) => Rule.required().min(10).max(300),
    }),
    defineField({
      name: 'fontPrimary',
      title: 'Font (primary)',
      type: 'string',
      description: 'Nome da fonte principal (ex.: Inter, Sora, Lato).',
      options: {
        list: [
          {title: 'Inter', value: 'Inter'},
          {title: 'Sora', value: 'Sora'},
          {title: 'Space Grotesk', value: 'Space Grotesk'},
          {title: 'Playfair Display', value: 'Playfair Display'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fontSecondary',
      title: 'Font (secondary)',
      type: 'string',
      description: 'Nome da fonte de destaque (ex.: Playfair, DM Serif, Space Grotesk).',
      options: {
        list: [
          {title: 'Inter', value: 'Inter'},
          {title: 'Sora', value: 'Sora'},
          {title: 'Space Grotesk', value: 'Space Grotesk'},
          {title: 'Playfair Display', value: 'Playfair Display'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background color',
      type: 'color',
      description: 'Cor de fundo escolhida pelo seletor.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'pageTitle',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Settings',
        subtitle: subtitle || 'Configurações essenciais do site',
      }
    },
  },
})
