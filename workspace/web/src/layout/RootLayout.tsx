import {PropsWithChildren, useEffect, useState} from 'react'
import {sanity} from '@/lib/sanityClient'
import {settingsQuery, type Settings} from '@/queries/settings'

export function RootLayout({children}: PropsWithChildren) {
  const [bg, setBg] = useState<string | undefined>()

  useEffect(() => {
    const run = async () => {
      try {
        const data = await sanity.fetch<Settings | null>(settingsQuery)
        if (!data) return
        applyHead(data)
        const color = applyBackground(data)
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
