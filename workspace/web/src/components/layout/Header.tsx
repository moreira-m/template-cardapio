import styles from './Header.module.scss'

type HeaderProps = {
  brand: string
  navLinks?: string[]
}

export function Header({brand, navLinks = []}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>{brand}</div>
      <nav className={styles.nav}>
        <ul>
          {navLinks.map((link) => (
            <li key={link}>
              <a href="#">{link}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
