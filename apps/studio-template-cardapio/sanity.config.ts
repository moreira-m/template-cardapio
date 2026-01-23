import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { locations } from './presentation/locations'

export default defineConfig({
  name: 'default',
  title: 'template-cardapio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || '',

  plugins: [
    structureTool({ structure }),
    visionTool(),
    colorInput(),
    presentationTool({
      resolve: {
        locations,
      },
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft',
          disable: '/api/disable-draft',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
