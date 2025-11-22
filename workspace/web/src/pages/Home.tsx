import {useEffect, useState} from 'react'
import {Container, Header, Footer} from '@components/layout'
import {Button, Card} from '@components/ui'
import {sanity} from '@/lib/sanityClient'
import {settingsQuery, type Settings} from '@/queries/settings'

export function Home() {
  const [settings, setSettings] = useState<Settings |
null>(null)

  useEffect(() => {
    sanity.fetch<Settings>(settingsQuery).then((data) => {
      setSettings(data)
      if (data?.pageTitle) document.title = data.pageTitle
      if (data?.description) {
        const meta =
document.querySelector('meta[name="description"]')
        if (meta) meta.setAttribute('content',
data.description)
      }
    })
  }, [])

  const bg = settings?.backgroundColor?.hex || '#0f111a'

  return (
    <div className="page" style={{background: bg}}>
      <Header brand={settings?.siteName || 'Template Cardápio'} navLinks={['Início', 'Menu', 'Contato']} />
      <main>
        {/* resto do conteúdo */}
      </main>
      <Footer>
        <span>© {new Date().getFullYear()} Template
Cardápio</span>
        <span>Construído com React + Vite + SCSS</span>
      </Footer>
    </div>
  )
}