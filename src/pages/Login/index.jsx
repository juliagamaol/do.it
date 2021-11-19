import React from 'react'
import { AnimationContainer, Background, Container, Content } from './styles'
import Button from "../../components/Button"
import { Link,Redirect } from 'react-router-dom'
import Input from '../../components/Input'
import {FiMail,FiLock} from "react-icons/fi"
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import api from "../../services/api"
import toast from 'react-hot-toast'
import {useHistory} from "react-router-dom"

export default function Login({authenticated,setAuthenticated}) {
    const schema = yup.object().shape({
        email: yup.string().required("Campo obrigatório"),
        password: yup.string().required("Campo obrigatório"),
    })

    const{
        register,
        handleSubmit,
        formState:{errors},
    } = useForm({
        resolver:yupResolver(schema)
    })

    const history = useHistory()

    const onSubmitFunction = data =>{
        api.post("/user/login",data)
        .then((res)=>{
            const{token} = res.data
            localStorage.setItem("@Doit:token",JSON.stringify(token))
            setAuthenticated(true)
            history.push("/dashboard")
        })
        .catch((err)=>{
            toast.error("E-mail ou Senha inválidos")
            console.log(err)
        })
    }

    if(authenticated){
        return <Redirect to="/dashboard"/>
    }

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <form onSubmit={handleSubmit(onSubmitFunction)}>
                        <h1>Login</h1>

                        <Input 
                        icon={FiMail} 
                        label="Email" 
                        placeholder="Seu melhor email"
                        register={register}
                        name="email"
                        error={errors.email?.message}/>

                        <Input 
                        icon={FiLock} 
                        type="password" 
                        label="Senha" 
                        placeholder="Uma senha bem segura"
                        register={register}
                        name="password"
                        error={errors.password?.message}/>

                        <Button type="submit" whiteSchema={false}>Enviar</Button>
                        <p>Não tem uma conta? Faça seu <Link to="/signUp">cadastro</Link></p>
                    </form>
                    
                </AnimationContainer>
            </Content>
        </Container>
    )
}
