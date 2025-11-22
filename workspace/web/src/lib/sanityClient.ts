import {createClient} from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION

if (!projectId || !dataset || !apiVersion) {
  throw new Error(
    'Sanity client: faltam variáveis VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET ou VITE_SANITY_API_VERSION. Configure-as nas variáveis de ambiente do build (Netlify/Vercel) ou em um .env local.',
  )
}

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn false garante dados recentes (evita cache do CDN ao editar)
  useCdn: false,
})
