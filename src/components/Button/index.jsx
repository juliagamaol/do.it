import React from 'react'
import { Container } from './styles'

export default function Button({children, whiteSchema=false, ...rest}) {
    return (
        <Container whiteSchema={whiteSchema} type="button" {...rest}>
            {children}
        </Container>
    )
}
