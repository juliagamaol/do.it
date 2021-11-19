import styled from "styled-components";

export const Container = styled.div`
    background: var(--white);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    height: 250px;
    padding: 16px;
    border: 1px solid var(--black);
    color: var(--black);

    hr{
        width: 80%;
        margin-top: 16px;
        margin-bottom: 16px;
    }


    button{
        margin-top: 80px;
        align-self: flex-end;
    }
    svg{
        font-size: 1.1rem;
        color: var(--orange);
        margin-right: 4px;
        transform: translateY(3px);
    }

`