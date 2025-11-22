import groq from 'groq'

export const settingsQuery = groq`
    *[_type == "settings"][0] {
        siteName,
        pageTitle,
        description,
        backgroundColor,
    }
`;

export type Settings = {
  siteName?: string
  pageTitle?: string
  description?: string
  backgroundColor?: {hex?: string}
}
