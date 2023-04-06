import React from 'react'
import { ButtonStyled } from './styles'
export default function Button({click, color, children}) {
  return (
    <ButtonStyled color={color} onClick={()=> click()}>{children}</ButtonStyled>
  )
}
