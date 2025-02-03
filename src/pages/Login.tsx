import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Container, Button, Title, Main, Column, Label } from '../ui'

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/tasks");
    } catch (error: unknown) {
      setError("Erro ao fazer login com o Google.");
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Main className="bg-white">
      <h1 className="text-4xl font-bold text-center">Login no Todo Task</h1>
      <Container className="flex items-center justify-center h-screen">
        <Column className="max-w-[400px] bg-white p-4 mx-auto rounded-lg">
          <Title className="text-2xl text-center">Faça Login</Title>
          <Label className="text-center">Crie tarefas e acompanhe seu progresso.</Label>

          <Button className="mt-4 w-full" onClick={handleLogin}>
        Login com Google
          </Button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </Column>
      </Container>
    </Main>
  );
};

export default Login;
