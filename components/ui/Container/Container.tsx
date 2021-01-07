import cn from 'classnames'
import React, { FC } from 'react'

interface Props {
  className?: string
  children?: any
  el?: HTMLElement
  clean?: boolean
}

const Container: FC<Props> = ({ children, className, el = 'div', clean }) => {
  const rootClassName = cn(className, {
    'mono-modal-container': true,
  })

  let Component: React.ComponentType<React.HTMLAttributes<
    HTMLDivElement
  >> = el as any

  return <Component className={rootClassName}>{children}</Component>
}

export default Container
