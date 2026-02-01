import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { locations } from './presentation/locations'

export default defineConfig([
  // Production Workspace
  {
    name: 'production',
    title: 'Production',
    basePath: '/production',

    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: 'production',

    plugins: [
      structureTool({ structure }),
      visionTool(),
      colorInput(),
      presentationTool({
        resolve: {
          locations,
        },
        previewUrl: {
          origin: 'https://template-cardapio.netlify.app',
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
  },

  // Staging Workspace
  {
    name: 'staging',
    title: 'Staging',
    basePath: '/staging',

    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: 'staging',

    plugins: [
      structureTool({ structure }),
      visionTool(),
      colorInput(),
      presentationTool({
        resolve: {
          locations,
        },
        previewUrl: {
          origin: 'https://template-cardapio-staging.netlify.app',
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
  },
])

