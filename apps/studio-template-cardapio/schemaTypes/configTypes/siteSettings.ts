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
            title: 'Cor do Header',
            type: 'color',
            fieldset: 'brandColors',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'footerColor',
            title: 'Cor do Footer',
            type: 'color',
            fieldset: 'brandColors',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'carouselColor1',
            title: 'Cor da Seção 1 (Entradas/Beige)',
            description: 'Cor de fundo para a primeira seção do carrossel (padrão: bege claro)',
            type: 'color',
            fieldset: 'brandColors',
        }),
        defineField({
            name: 'carouselColor2',
            title: 'Cor da Seção 2 (Prato Principal/Verde)',
            description: 'Cor de fundo para a segunda seção do carrossel (padrão: verde escuro)',
            type: 'color',
            fieldset: 'brandColors',
        }),
        defineField({
            name: 'carouselColor3',
            title: 'Cor da Seção 3 (Sobremesas/Cinza)',
            description: 'Cor de fundo para a terceira seção do carrossel (padrão: cinza/preto)',
            type: 'color',
            fieldset: 'brandColors',
        }),
        defineField({
            name: 'buttonPrimaryColor',
            title: 'Cor do Botão Primário (+)',
            type: 'color',
            fieldset: 'brandColors',
        }),
        defineField({
            name: 'buttonSecondaryColor',
            title: 'Cor do Botão Secundário (Lupa)',
            type: 'color',
            fieldset: 'brandColors',
        }),

    ],
})
