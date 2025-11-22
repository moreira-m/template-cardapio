import {PropsWithChildren} from 'react'
import clsx from 'clsx'
import styles from './Container.module.scss'

type ContainerProps = PropsWithChildren<{
  as?: 'div' | 'section' | 'article'
  className?: string
}>

export function Container({as: Tag = 'div', children, className}: ContainerProps) {
  return <Tag className={clsx(styles.container, className)}>{children}</Tag>
}
