import { defineType, defineField } from 'sanity'

const menuItem = {
    type: 'object',
    fields: [
        defineField({
            name: 'name',
            title: 'Nome do Item',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Descrição',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'price',
            title: 'Preço',
            type: 'number',
        }),
        defineField({
            name: 'image',
            title: 'Imagem',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
}

export default defineType({
    name: 'menuSection',
    title: 'Seção do Cardápio',
    type: 'document',
    groups: [
        { name: 'omnivore', title: 'Onívoros' },
        { name: 'vegetarian', title: 'Vegetarianos' },
        { name: 'vegan', title: 'Veganos' },
    ],
    fields: [
        defineField({
            name: 'sectionName',
            title: 'Nome da Seção',
            type: 'string',
            description: 'Ex: Pizzas, Bebidas, Sobremesas',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'enableFilter',
            title: 'Habilitar filtro por dieta?',
            description: 'Se ativado, permite separar itens em abas (Onívoro, Vegetariano, Vegano). Se desativado, usa uma lista única.',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'items',
            title: 'Itens do Cardápio',
            type: 'array',
            of: [menuItem],
            hidden: ({ document }) => !!document?.enableFilter,
        }),
        defineField({
            name: 'itemsOmnivore',
            title: 'Itens Onívoros',
            type: 'array',
            group: 'omnivore',
            of: [menuItem],
            hidden: ({ document }) => !document?.enableFilter,
        }),
        defineField({
            name: 'itemsVegetarian',
            title: 'Itens Vegetarianos',
            type: 'array',
            group: 'vegetarian',
            of: [menuItem],
            hidden: ({ document }) => !document?.enableFilter,
        }),
        defineField({
            name: 'itemsVegan',
            title: 'Itens Veganos',
            type: 'array',
            group: 'vegan',
            of: [menuItem],
            hidden: ({ document }) => !document?.enableFilter,
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
    ],
    preview: {
        select: {
            title: 'sectionName',
        },
        prepare({ title }) {
            return {
                title: title || 'Sem nome',
            }
        },
    },
})
