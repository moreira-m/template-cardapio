import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'homePage',
    title: 'Página Inicial',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título da Página',
            type: 'string',
            initialValue: 'Cardápio Digital',
            readOnly: true,
        }),
        defineField({
            name: 'sections',
            title: 'Seções da Página',
            description: 'Adicione e ordene as seções que aparecerão na home.',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'menuSection' }],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title,
                subtitle: 'Configuração da Home',
            }
        },
    },
})
