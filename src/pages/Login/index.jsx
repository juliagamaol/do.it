import React from 'react'
import { AnimationContainer, Background, Container, Content } from './styles'
import Button from "../../components/Button"
import { Link } from 'react-router-dom'
import Input from '../../components/Input'
import {FiMail,FiLock} from "react-icons/fi"
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import api from "../../services/api"
import toast from 'react-hot-toast'

export default function SignUp() {
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

    const onSubmitFunction = ({email,password}) =>{
        const user = {
            email:email,
            password:password
        }
        api.post("/user/login",user)
        .then((res)=>toast.success(`Bem vindo de volta ${res.data.user.name}`))
        .catch((err)=>{
            toast.error("Erro ao criar a conta")
            console.log(err)
        })
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
