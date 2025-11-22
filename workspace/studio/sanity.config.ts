import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'
import {deskStructure} from './deskStructure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

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
