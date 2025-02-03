import React from "react";

import { useForm } from "react-hook-form";
import { deleteTask, } from "../../api/tasks";
import { Input, Column, Button, Container, Title, Label } from "../../ui";

export default function DeleteTask({ id, refresh } : { id: string, refresh: () => void }) {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<{ confirmation: string }>();
    const onSubmit = async (data: { confirmation: string }) => {
        if (data.confirmation !== 'excluir') {
            setError("confirmation", {
                type: "manual",
                message: "Preencha o campo com 'excluir' para confirmar a exclusão",
              });
              return; 
        }
        try {
           await deleteTask(id.toString());
            refresh();
            reset(); 
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Container className="mb-4 gap-4 flex-col flex container px-4 ">
            <Column>
                <Title>Excluir Tarefa</Title>
                <Label>Preencha o campo com "excluir" para confirmar a exclusão</Label>
            </Column>
            <form onSubmit={handleSubmit(onSubmit)} data-testid="form-delete" className="flex flex-col gap-4">
                <Column className="gap-2">
                    <Input
                        label="Confirmação"
                        placeholder="Digite 'excluir'"
                        data-testid="confirmation"
                        {...register("confirmation")}
                    />
                    {errors.confirmation && (
                        <span className="text-red-500 text-sm">{errors?.confirmation.message?.toString()}</span>
                    )}
                </Column>
                <Button type="submit" data-testid="finish-button" loading={isSubmitting} disabled={isSubmitting}>
                    Confirmar Exclusão
                </Button>
            </form>
        </Container>
    )
}

/*
FINISH DATE

 <Column>
                    <Input
                        type="date"
                        label="Data de Conclusão"
                        className="appearance-none"
                        {...register("finishDate")}
                    />
                    {errors.finishDate && (
                        <span className="text-red-500 text-sm">{errors?.finishDate.message?.toString()}</span>
                    )}
                </Column>

*/