import  { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger, } from "../../ui/drawer"
import { Title, Label, Description, Button, Column, Row, Container } from "../../ui";
import EditTask from "./edit";
import DeleteTask from "./delete";
//API
import { Task } from "../../api/types";
import { filterTasks } from '../../api/tasks';

//REALTIME
import io from "socket.io-client";
const socket = io(import.meta.env.VITE_SERVER_URL);

const ListTasks = forwardRef((props, ref) => {
    const [tab, settab] = useState('ALL');

    const { data: tasks, error, isLoading, refetch } = useQuery({
        queryKey: [`tasks list ${tab}`],
        queryFn: async () => { const res = await filterTasks(tab); return res },
    });

    useImperativeHandle(ref, () => ({
        refetchTasks: refetch,
    }));

    useEffect(() => {
        socket.on("taskUpdated", () => {
            refetch();
        });
        socket.on("taskDeleted", () => {
            refetch();
        });
        socket.on("taskCreated", () => {
            refetch();
        });
        return () => {
            socket.off("taskUpdated");
            socket.off("taskDeleted");
            socket.off("taskCreated");
        };
    }, [refetch]);

    console.log(tasks)

    return (
        <Container>
            <Column>
                <Selections settab={settab} tab={tab} />
                {isLoading && <div data-testid="loading" className="text-black text-center my-5 text-2xl">Carregando tarefas...</div>}
                {error && <div data-testid="error" className="text-red-500 text-center my-5 text-2xl">Erro ao carregar tarefas {error?.message}</div>}
                {tasks?.length === 0 && <EmptyTasks />}
                {tasks?.length > 0 && <>
                    {tasks?.map((task: Task) => <ItemTask key={task.id} task={task} refetch={refetch} />)}
                </>}
            </Column>
        </Container>
    )
});

const Selections = ({ settab, tab, }) => {
    const status = [{ name: 'Tudo', id: 'ALL' }, { name: 'Pendente', id: 'TODO' }, { name: 'Fazendo', id: 'DOING' }, { name: 'Feito', id: 'DONE' }];
    return (
        <Row className="gap-3 mb-2">
            {status?.map((s) => (
                <Button
                    key={s.id}
                    className={`${tab === s.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'} px-4 py-2 h-10 rounded-full  cursor-pointer transition duration-300 hover:text-blue-500 hover:bg-blue-500/20`}
                    onClick={() => settab(s.id)}>{s.name}</Button>
            ))}
        </Row>
    )
}

const ItemTask = ({ task, refetch }) => {
    const { id, title, description, status, createdAt } = task;
    const sts = status === 'TODO' ? 'A fazer' : status === 'DOING' ? 'Fazendo' : 'Feito';
    return (
        <Column className="p-4 my-2 rounded-xl bg-gray-100 transition fadein" >
            <Row className="justify-between">
                <Column>
                    <Title  className={`text-lg font-semibold }`}>{title}</Title>
                    <Description  className="text-sm text-gray-500">{description}</Description>
                    <Label  className="text-xs text-gray-400">{createdAt?.read} - {sts}</Label>
                </Column>
                <Row className="gap-2">
                    <Drawer>
                        <DrawerTrigger >
                            <div data-testid='edit' className="w-12 cursor-pointer h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                <Pencil size={18} />
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className='bg-white border-none pb-6'>
                            <EditTask refresh={refetch} defaultValues={task} />
                            <Container className="w-full px-4 container ">
                                <DrawerClose className='w-full cursor-pointer bg-gray-300 p-4 h-13 text-black  rounded-xl border-t-none'>
                                    Fechar
                                </DrawerClose>
                            </Container>
                        </DrawerContent>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger >
                            <div data-testid='exclude' className="w-12 cursor-pointer  h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-500/20 hover:text-red-500">
                                <Trash size={18} />
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className='bg-white border-none pb-6'>
                            <DeleteTask refresh={refetch} id={id} />
                            <Container className="w-full px-4 container ">
                                <DrawerClose className='w-full cursor-pointer bg-gray-300 p-4 h-13 text-black  rounded-xl border-t-none'>
                                    Fechar
                                </DrawerClose>
                            </Container>
                        </DrawerContent>
                    </Drawer>
                </Row>
            </Row>
        </Column>
    )
}

const EmptyTasks = () => {
    return (
        <Column className="p-4 my-2 rounded-xl bg-gray-100" >
            <Row className="justify-between">
                <Column>
                    <Title className={`text-lg font-semibold }`}>Sem tarefas</Title>
                    <Description className="text-sm text-gray-500">Clique em Nova Tarefa para adicionar uma nova tarefa</Description>
                </Column>
            </Row>
        </Column>
    )
}
export default ListTasks