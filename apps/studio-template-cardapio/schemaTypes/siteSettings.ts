import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Configurações do Site',
    type: 'document',
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
            name: 'primaryColor',
            title: 'Cor Principal',
            type: 'string',
            description: 'Cor principal do tema (ex: #FF5733)',
        }),
        // defineField({
        //     name: 'contactInfo',
        //     title: 'Informações de Contato',
        //     type: 'object',
        //     fields: [
        //         {
        //             name: 'phone',
        //             title: 'Telefone',
        //             type: 'string',
        //         },
        //         {
        //             name: 'email',
        //             title: 'Email',
        //             type: 'string',
        //         },
        //         {
        //             name: 'address',
        //             title: 'Endereço',
        //             type: 'text',
        //             rows: 2,
        //         },
        //     ],
        // }),
        // defineField({
        //     name: 'socialMedia',
        //     title: 'Redes Sociais',
        //     type: 'object',
        //     fields: [
        //         {
        //             name: 'instagram',
        //             title: 'Instagram',
        //             type: 'url',
        //         },
        //         {
        //             name: 'facebook',
        //             title: 'Facebook',
        //             type: 'url',
        //         },
        //         {
        //             name: 'whatsapp',
        //             title: 'WhatsApp',
        //             type: 'string',
        //         },
        //     ],
        // }),
    ],
})
