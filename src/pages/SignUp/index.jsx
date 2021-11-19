import React from 'react'
import { AnimationContainer, Background, Container, Content } from './styles'
import Button from "../../components/Button"
import { Link,Redirect } from 'react-router-dom'
import Input from '../../components/Input'
import {FiUser,FiMail,FiLock} from "react-icons/fi"
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import api from "../../services/api"
import toast from 'react-hot-toast'
import {useHistory} from "react-router-dom"

export default function SignUp({authenticated}) {
    const schema = yup.object().shape({
        name: yup.string().required("Campo obrigatório"),
        email: yup.string().required("Campo obrigatório"),
        password: yup.string().required("Campo obrigatório"),
        confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")],"Senhas diferentes")
        .required("Campo obrigatório"),
    })

    const{
        register,
        handleSubmit,
        formState:{errors},
    } = useForm({
        resolver:yupResolver(schema)
    })

    const history = useHistory()

    const onSubmitFunction = ({name,email,password}) =>{
        const newUser = {
            name:name,
            email:email,
            password:password
        }
        api.post("/user/register",newUser)
        .then((_)=>{
            toast.success("Sucesso ao criar a conta")
            history.push("/login")
        })
        .catch((err)=>{
            toast.error("Erro ao criar a conta")
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
                        <h1>Cadastro</h1>
                        <Input 
                        icon={FiUser} label="Nome" 
                        placeholder="Seu nome completo"
                        register={register}
                        name="name"
                        error={errors.name?.message}/>

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

                        <Input 
                        icon={FiLock} 
                        type="password" label="Confirmação da senha" placeholder="Confirmação da senha"
                        register={register}
                        name="confirmPassword"
                        error={errors.confirmPassword?.message}/>

                        <Button type="submit" whiteSchema={false}>Enviar</Button>
                        <p>Já tem uma conta? Faça seu <Link to="/login">Login</Link></p>
                    </form>
                    
                </AnimationContainer>
            </Content>
        </Container>
    )
}
