import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'socialSettings',
    title: 'Redes Sociais',
    type: 'document',
    preview: {
        prepare() {
            return {
                title: 'Redes Sociais',
            }
        },
    },
    fields: [
        defineField({
            name: 'socialNetworks',
            title: 'Redes Sociais',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Plataforma',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'Facebook', value: 'facebook' },
                                    { title: 'WhatsApp', value: 'whatsapp' },
                                    { title: 'X (Twitter)', value: 'x' },
                                    { title: 'YouTube', value: 'youtube' },
                                    { title: 'LinkedIn', value: 'linkedin' },
                                    { title: 'TikTok', value: 'tiktok' },
                                ]
                            }
                        }),
                        defineField({
                            name: 'url',
                            title: 'Link do Perfil',
                            type: 'url',
                            validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] })
                        }),
                        defineField({
                            name: 'icon',
                            title: 'Ícone Personalizado (Opcional)',
                            description: 'Se não enviado, usaremos o ícone padrão da plataforma',
                            type: 'image'
                        })
                    ],
                    preview: {
                        select: {
                            title: 'platform',
                            subtitle: 'url',
                            media: 'icon'
                        }
                    }
                }
            ]
        }),
    ],
})
