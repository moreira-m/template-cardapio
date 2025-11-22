import {PropsWithChildren} from 'react'
import styles from './Card.module.scss'

type CardProps = PropsWithChildren<{
  title: string
  description?: string
}>

export function Card({title, description, children}: CardProps) {
  return (
    <article className={styles.card}>
      <header>
        <p className={styles.eyebrow}>Destaque</p>
        <h3>{title}</h3>
        {description ? <p className={styles.description}>{description}</p> : null}
      </header>
      {children ? <div className={styles.actions}>{children}</div> : null}
    </article>
  )
}
