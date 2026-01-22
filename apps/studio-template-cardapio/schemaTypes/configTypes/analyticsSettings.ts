import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'analyticsSettings',
    title: 'Configurações de Analytics',
    type: 'document',
    preview: {
        prepare() {
            return {
                title: 'Google Analytics',
            }
        },
    },
    fields: [
        defineField({
            name: 'googleAnalytics',
            title: 'Analytics ID',
            type: 'string',
            description: 'Insira aqui o Analytics ID. Use o padrão G-XXXXXXXXXX ou UA-XXXXXX-X',
        }),
    ],
})
