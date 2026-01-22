import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Configurações do Site',
    type: 'document',
    fieldsets: [
        {
            name: 'brandColors',
            title: '🎨 Paleta de Cores do Site',
            description: 'Defina as cores principais da identidade visual',
            options: { collapsible: true, collapsed: false }
        }
    ],
    fields: [
        defineField({
            name: 'siteName',
            title: 'Nome do Site',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'siteDescription',
            title: 'Descrição do Site',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'headerColor',
            title: 'Cor do Header/Footer',
            type: 'color',
            description: 'Cor de fundo do cabeçalho e rodapé (ex: verde escuro)',
            fieldset: 'brandColors',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'accentColor',
            title: 'Cor de Destaque',
            type: 'color',
            description: 'Cor para preços, badges e botões de ação (ex: laranja)',
            fieldset: 'brandColors',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'cardBackground',
            title: 'Cor de Fundo dos Cards',
            type: 'color',
            description: 'Cor de fundo dos cards do cardápio (ex: bege claro)',
            fieldset: 'brandColors',
        }),
        defineField({
            name: 'primaryColor',
            title: 'Cor Principal/Alternativa',
            type: 'color',
            description: 'Cor para cards em destaque ou variações (ex: verde ou coral)',
            fieldset: 'brandColors',
        }),
    ],
})
