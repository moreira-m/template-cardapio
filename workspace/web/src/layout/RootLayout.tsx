import {PropsWithChildren, useEffect, useState} from 'react'
import {sanity} from '@/lib/sanityClient'
import {settingsQuery, type Settings} from '@/queries/settings'

const FONT_CSS_MAP: Record<string, string> = {
  Inter: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  Sora: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap',
  'Space Grotesk':
    'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
  'Playfair Display':
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap',
}

export function RootLayout({children}: PropsWithChildren) {
  const [bg, setBg] = useState<string | undefined>()

  useEffect(() => {
    const run = async () => {
      try {
        const data = await sanity.fetch<Settings | null>(settingsQuery)
        if (!data) return
        applyHead(data)
        const color = applyBackground(data)
        applyFonts(data)
        if (color) setBg(color)
      } catch (err) {
        console.error('Erro ao buscar settings no Sanity', err)
      }
    }

    run()
  }, [])

  return <div style={bg ? {background: bg} : undefined}>{children}</div>
}

function applyHead(settings: Settings) {
  if (settings.pageTitle) {
    document.title = settings.pageTitle
    setMeta('og:title', settings.pageTitle, true)
  }

  if (settings.description) {
    setMeta('description', settings.description)
    setMeta('og:description', settings.description, true)
  }
}

function applyBackground(settings: Settings) {
  const bg = settings.backgroundColor?.hex
  if (!bg) return null
  document.documentElement.style.setProperty('--page-bg', bg)
  document.documentElement.style.backgroundColor = bg
  document.body.style.backgroundColor = bg
  return bg
}

function applyFonts(settings: Settings) {
  const primary = settings.fontPrimary
  const secondary = settings.fontSecondary

  if (primary) {
    ensureFontLink(primary)
    document.documentElement.style.setProperty('--font-primary', primary)
  }
  if (secondary) {
    ensureFontLink(secondary)
    document.documentElement.style.setProperty('--font-secondary', secondary)
  }
}

function setMeta(name: string, value: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
  const meta =
    document.querySelector<HTMLMetaElement>(selector) ||
    createMeta(property ? 'property' : 'name', name)
  meta.setAttribute('content', value)
}

function createMeta(attr: 'name' | 'property', value: string) {
  const meta = document.createElement('meta')
  meta.setAttribute(attr, value)
  document.head.appendChild(meta)
  return meta
}

function ensureFontLink(fontName: string) {
  const href = FONT_CSS_MAP[fontName]
  if (!href) return
  const id = `font-${fontName.replace(/\s+/g, '-').toLowerCase()}`
  const exists = document.querySelector(`link[data-font-id="${id}"]`)
  if (exists) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.setAttribute('data-font-id', id)
  document.head.appendChild(link)
}
