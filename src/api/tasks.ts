/// <reference types="vite/client" />
import { CreateTask } from "./types";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL+"/api", 
});

//CREATE
export const createTask = async (task: CreateTask) => {
    const response = await api.post("/tasks", task);
    return response.data.data;
};
//READ
export const fetchTasks = async () => {
    const response = await api.get("/tasks");
    return response.data;
};
//UPDATE
export const updateTask = async (id: string, task: Partial<CreateTask>) => {
    console.log(task)
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
};
//DELETE
export const deleteTask = async ( id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
};

// Filtrar tarefas por status
export const filterTasks = async ( status: string ) => {
    const response = await api.get("/tasks/filter", { params: { status: status } });
    return response.data || [];
};
// Buscar tarefa por título
export const searchTasks = async ( title: string ) => {
    const response = await api.get("/tasks/search", { params: { title: title } });
    return response.data;
};