import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'menuSection',
    title: 'Seção do Cardápio',
    type: 'document',
    fields: [
        defineField({
            name: 'sectionName',
            title: 'Nome da Seção',
            type: 'string',
            description: 'Ex: Pizzas, Bebidas, Sobremesas',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'sectionName',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'order',
            title: 'Ordem',
            type: 'number',
            description: 'Define a ordem de exibição desta seção no cardápio',
            validation: (Rule) => Rule.required().integer().min(0),
        }),
        defineField({
            name: 'items',
            title: 'Itens do Cardápio',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            title: 'Nome do Item',
                            type: 'string',
                        },
                        {
                            name: 'description',
                            title: 'Descrição',
                            type: 'text',
                            rows: 2,
                        },
                        {
                            name: 'price',
                            title: 'Preço',
                            type: 'number',
                        },
                        {
                            name: 'image',
                            title: 'Imagem',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                        },
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'sectionName',
            order: 'order',
        },
        prepare({ title, order }) {
            return {
                title: title || 'Sem nome',
                subtitle: `Ordem: ${order ?? 'Não definida'}`,
            }
        },
    },
})
