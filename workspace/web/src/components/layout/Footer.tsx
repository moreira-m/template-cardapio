import {PropsWithChildren} from 'react'
import {Container} from './Container'
import styles from './Footer.module.scss'

export function Footer({children}: PropsWithChildren) {
  return (
    <footer className={styles.footer}>
      <Container className={styles.content}>{children}</Container>
    </footer>
  )
}
