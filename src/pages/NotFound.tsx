import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Main, Column } from '../ui';

export default function NotFound (){
    return (
        <Main className="flex items-center justify-center min-h-screen">
            <Container className='text-black'>
            <Column className="mx-auto container justify-center items-center gap-4 flex flex-col">
                <h1 className="text-4xl font-bold text-center">404 - Página Não Encontrada</h1>
                <p className="text-center">Desculpe, a página que você está procurando não existe.</p>
                <Link to="/" className="text-white hover:underline bg-blue-500 p-4 rounded-full text-center">
                Voltar para a Home
                </Link>
            </Column>
            </Container>
        </Main>
    );
};
