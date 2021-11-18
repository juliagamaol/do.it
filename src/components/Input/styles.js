import styled, { css } from "styled-components";

export const Container = styled.div`
    text-align: left;
   span{
    color:var(--red);
   }

`
export const InputContainer = styled.div`
    background: var(--white);
    border-radius: 10px;
    border: 2px solid var(--gray);
    color: var(--gray);
    padding: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: 0.4s;

    ${props=>props.isErrored && css`
        border-color: var(--red);
        svg{
            color: var(--red);
        }

    `}

    input{
        background: transparent;
        border: none;
        align-items: center;
        flex: 1;
        color: var(--black);
        &::placeholder{
            color: var(--gray);
        }
    }

`