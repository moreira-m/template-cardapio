import { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
    S.list()
        .id('root')
        .title('Conteúdo')
        .items([
            S.divider().title('Cardápio'),
            S.listItem()
                .title('Cardápio')
                .icon(() => '📋')
                .child(
                    S.list()
                        .title('Cardápio')
                        .items([
                            S.listItem()
                                .title('Seções do Menu')
                                .schemaType('menuSection')
                                .child(
                                    S.documentTypeList('menuSection')
                                        .title('Seções do Menu')
                                ),
                        ])
                ),

            S.divider().title('Configurações'),
            S.listItem()
                .title('Configurações')
                .icon(() => '⚙️')
                .child(
                    S.list()
                        .title('Configurações')
                        .items([
                            S.listItem()
                                .title('Configurações do Site')
                                .schemaType('siteSettings')
                                .child(
                                    S.document()
                                        .schemaType('siteSettings')
                                        .documentId('siteSettings')
                                ),
                        ])
                ),
        ])
