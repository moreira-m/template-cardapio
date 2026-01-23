import { defineLocations } from 'sanity/presentation'

export const locations = {
    homePage: defineLocations({
        message: 'Essa o documento da Home',
        select: {
            title: 'title',
        },
        resolve: (doc) => ({
            locations: [
                {
                    title: doc?.title || 'Home',
                    href: '/',
                },
            ],
        }),
    }),
    menuSection: defineLocations({
        select: {
            title: 'sectionName',
        },
        resolve: (doc) => ({
            locations: [
                {
                    title: doc?.title || 'Home',
                    href: '/',
                },
            ],
        }),
    }),
}
