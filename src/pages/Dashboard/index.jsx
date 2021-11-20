import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import Input from "../../components/Input"
import Button from "../../components/Button"
import { Container, InputContainer, TasksContainer } from './styles';
import {FiEdit2} from "react-icons/fi"
import Card from '../../components/Card';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function Dashboard({authenticated}) {
    const{register,handleSubmit} = useForm()
    const [tasks, setTasks] = useState([])
    const[token] = useState(JSON.parse(localStorage.getItem("@Doit:token")) || "")

    const loadTasks = () =>{
        api.get("/task",{
            headers:{
                Authorization: `Bearer ${token}`
            },
            params:{
                completed:false
            }
        })
            .then((res)=>{
                const apiTasks = res.data.data.map((task)=>({
                    ...task,
                    createdAt:new Date(task.createdAt).toLocaleDateString("pt-BR",{
                        day:"2-digit",
                        month:"long",
                        year:"numeric"
                    })
                }))
               setTasks(apiTasks) 
            })
            .catch((err)=>console.log(err))
    }

    useEffect(()=>{
        loadTasks()
    },[])

    const onSubmit = ({task}) =>{
        if(!task){
            return toast.error("Complete o campo para enviar uma tarefa")
        }

        api.post("/task",{
            description:task
        },
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        )
        .then((res)=>loadTasks())
    }

    const handleCompleted = id =>{
        const newTasks = tasks.filter((task)=>task._id !== id)

        api.put(`/task/${id}`,
        {completed:true},
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((res)=>setTasks(newTasks))
    }

    if (!authenticated) {
        return <Redirect to="/login" />;
    }
    return (
        <Container>
            <InputContainer onSubmit={handleSubmit(onSubmit)}>
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
                {tasks.map(task=> <Card key={task._id} title={task.description} date={task.createdAt} onClick={()=>handleCompleted(task._id)}/>)}
            </TasksContainer>
        </Container>
    )
}
