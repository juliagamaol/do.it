import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import Input from "../../components/Input"
import Button from "../../components/Button"
import { Container, InputContainer, TasksContainer } from './styles';
import {FiEdit2} from "react-icons/fi"
import Card from '../../components/Card';
import api from '../../services/api';

export default function Dashboard({authenticated}) {
    const [tasks, seTasks] = useState([])
    const[token] = JSON.parse(localStorage.getItem("@Doit:token")) || ""
    const{register,handleSubmit} = useForm()

    const loadTasks = () =>{
        api.get("/task",{
            headers:{
                Authorization: `Bearer${token}`
            }
        })
    }

    if (!authenticated) {
        return <Redirect to="/login" />;
    }
    return (
        <Container>
            <InputContainer>
                <time>19 de novembro de 2021</time>
                <section>
                    <Input 
                    icon={FiEdit2} 
                    placeholder="Nova tarefa"
                    register={register}
                    name="task"
                    />
                    <Button type="submit">Adicionar</Button>
                </section>
            </InputContainer>
            <TasksContainer>
                {[1,2,3].map(_=> <Card title="Ola" date="19 de novembro de 2021" onClick={()=>{}}/>)}
            </TasksContainer>
        </Container>
    )
}
