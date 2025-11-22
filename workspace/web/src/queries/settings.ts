import groq from 'groq'

export const settingsQuery = groq`
    *[_type == "settings"][0] {
        siteName,
        pageTitle,
        description,
        fontPrimary,
        fontSecondary,
        backgroundColor,
    }
`;

export type Settings = {
  siteName?: string
  pageTitle?: string
  description?: string
  fontPrimary?: string
  fontSecondary?: string
  backgroundColor?: {hex?: string}
}
