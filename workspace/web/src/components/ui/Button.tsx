import clsx from 'clsx'
import {ButtonHTMLAttributes, PropsWithChildren} from 'react'
import styles from './Button.module.scss'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'md' | 'sm'

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    size?: ButtonSize
  }
>

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(styles.button, styles[variant], styles[size], className)}
      type="button"
      {...rest}
    >
      {children}
    </button>
  )
}
