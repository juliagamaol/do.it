import React from 'react'
import { Container, InputContainer } from './styles'

export default function Input({label,icon:Icon, name,error="",register,...rest}) {
    return (
        <Container>
            <div>{label}{!!error && <span> - {error}</span>}</div>

            <InputContainer isErrored={!!error}>
                {Icon && <Icon size={20}/>}
                <input {...register(name)} {...rest}/>
            </InputContainer>
        </Container>
    )
}
