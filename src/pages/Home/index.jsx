import React from 'react'
import {useHistory} from "react-router-dom"
import Button from '../../components/Button'
import { Container, Content } from './styles'
import {Redirect} from "react-router-dom"

export default function Home({authenticated}) {
    const history = useHistory()
    const handleNavigation = path =>{
        history.push(path)
    }

    if(authenticated){
        return <Redirect to="/dashboard"/>
    }
    return (
        <Container>
            <Content>
                <h1>do<span>.</span>it</h1>
                <span>Organize-se de forma fácil e efetiva</span>
                <div>
                    <Button whiteSchema onClick={()=>handleNavigation("/signUp")}>Cadastre-se</Button>
                    <Button onClick={()=>handleNavigation("/login")}>Login</Button>
                </div>
            </Content>
        </Container>
    )
}
