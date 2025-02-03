import React, { useRef } from "react";
import { AlignJustify, LogOut, Plus } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  DrawerFooter
} from "../ui/drawer"
import { getAuth, } from "firebase/auth";

import { Title, Label, Button, Column, Row, Main, Container } from "../ui";

import AddTask from '../components/tasks/add';
import ListTasks from "../components/tasks/list";
import { logout } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const navigate = useNavigate();
  const listTasksRef = useRef<{ refetchTasks: () => void } | null>(null);
  const handleRefetch = () => {
    listTasksRef.current?.refetchTasks();
  };
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <Main>
      <div className="bg-blue-500 ">
        <header className="bg-blue-500 text-white p-4 justify-between flex-row flex items-center container mx-auto">
          <h1 className="text-xl  font-semibold">Minhas Tarefas</h1>
          <Drawer>
            <DrawerTrigger>
              <div className="w-[48px] h-[48px] cursor-pointer bg-white/10 rounded-full flex-col flex items-center justify-center">
                <AlignJustify size={24} />
              </div>
            </DrawerTrigger>
            <DrawerContent className="bg-white text-black">
              <Container>
                <Row className="justify-between items-center px-6">
                    <Row>
                      <div className="uppercase w-[52px] h-[52px] bg-blue-500/10 text-blue-500 bg-secondary rounded-full items-center justify-center flex flex-col font-bold">{user?.displayName?.slice(0, 2)}</div>
                      <div className="flex flex-col pl-3 justify-center items-start">
                        <span className="font-semibold text-[18px] ">{user?.displayName} </span>
                        <span className="font-regular text-[14px] opacity-70 mt-1"> {user?.email}</span>
                      </div>
                    </Row>
                  <div className="w-[42px] h-[42px] bg-gray-100 rounded-full cursor-pointer flex flex-col justify-center items-center" onClick={handleLogout} >
                    <LogOut size={18} color='#00000090' />
                  </div>
                </Row>
                <DrawerFooter className="px-6 pt-4 mt-4">
                  <DrawerClose>
                    <Button variant="ghost" className="w-full">Fechar</Button>
                  </DrawerClose>
                </DrawerFooter>
              </Container>
            </DrawerContent>
          </Drawer>
        </header>
      </div>



      <Container className="p-4">
        <Row className="justify-between items-center mb-4">
          <Column>
            <Title>Tarefas de Hoje</Title>
            <Label>Filtre por status</Label>
          </Column>
          <Drawer>
            <DrawerTrigger >
              <Button variant="ghost">
                <Plus size={16} />
                <span>Nova Tarefa</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className='bg-white border-none pb-6'>
              <AddTask refresh={handleRefetch} />
              <Container className="w-full px-4 container ">
                <DrawerClose className='w-full cursor-pointer bg-gray-200 p-4 h-13 text-black  rounded-xl border-t-none'>
                  Fechar
                </DrawerClose>
              </Container>
            </DrawerContent>
          </Drawer>
        </Row>
        <ListTasks ref={listTasksRef} />
      </Container>
    </Main>
  );
};
