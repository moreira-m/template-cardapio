import {defineConfig} from 'sanity'
import {colorInput} from '@sanity/color-input'
import {visionTool} from '@sanity/vision'
import {presentationTool, defineLocations} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {deskStructure} from './deskStructure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

if (!projectId) {
  throw new Error('Missing SANITY_STUDIO_PROJECT_ID environment variable.')
}

if (!dataset) {
  throw new Error('Missing SANITY_STUDIO_DATASET environment variable.')
}

export default defineConfig({
  name: 'default',
  title: 'template-cardapio',

  projectId,
  dataset,

  plugins: [
    presentationTool({
      previewUrl: {
        origin: previewUrl,
        previewMode: {
          enable: '/api/draft',
        },
      },
      allowOrigins: previewUrl,
      resolve: {
        locations: defineLocations({
          settings: {
            select: {
              pageTitle: 'pageTitle',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.pageTitle || 'Home',
                  href: '/',
                },
              ],
            }),
          },
        }),
      },
    }),
    structureTool({
      structure: deskStructure,
    }),
    colorInput(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
