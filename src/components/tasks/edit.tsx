import React from "react";
import { ChevronDown } from 'lucide-react';
import { useForm } from "react-hook-form";
import { Input, Column, Row, Button, Container, Title, Label } from "../../ui";

//API
import { updateTask, } from "../../api/tasks";
import { CreateTask } from "../../api/types";

export default function EditTask({ refresh, defaultValues }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
    });

    const onSubmit = async (data: CreateTask) => {
        try {
            const res = await updateTask(defaultValues.id, {
                title: data.title,
                description: data.description,
                status: data.status,
            });
            refresh();
            reset({
                title: res.title,
                description: res.description,
                status: res.status,
            });
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Container className="mb-4 gap-4 flex-col flex container px-4 ">
            <Column>
                <Title>Editar Tarefa</Title>
                <Label>Preencha os dados abaixo e clique em salvar.</Label>
            </Column>
            <form data-testid='form-edit' onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Column className="gap-2">
                    <Input
                        type="text"
                        label="Título"
                        data-testid="title-input"
                        placeholder="Ex: Comprar pão"
                        {...register("title", { required: "O título é obrigatório" })}
                    />
                    {errors.title && (
                        <span className="text-red-500 text-sm">{errors?.title.message?.toString()}</span>
                    )}
                </Column>
                <Column className="gap-2">
                    <Input
                        label="Descrição"
                        placeholder="Descrição da tarefa"
                        data-testid="description-input"
                        {...register("description")}
                    />
                    {errors.description && (
                        <span className="text-red-500 text-sm">{errors?.description.message?.toString()}</span>
                    )}
                </Column>
                <div className="flex flex-col gap-4">
                    <span className="block text-sm font-medium text-black opacity-70 -mb-2">Status</span>
                    <Row className="relative ">
                        <select
                            className="p-4 w-full rounded-md bg-[#f1f1f1] text-black/90 appearance-none cursor-pointer focus - visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
                            defaultValue="TODO"
                            data-testid="status-select"
                            {...register("status")}
                        >
                            <option value="TODO">A fazer</option>
                            <option value="DOING">Fazendo</option>
                            <option value="DONE">Feito</option>
                        </select>
                        <Column className="w-[40px] text-blue-500 pointer-events-none h-[40px] rounded-lg absolute right-1 top-1 bg-blue-500/10 items-center justify-center">
                            <ChevronDown />
                        </Column>
                    </Row>
                </div>
                <Button data-testid="finish-button" type="submit" disabled={isSubmitting} loading={isSubmitting} >
                    Salvar modificações
                </Button>
            </form>
        </Container>
    )
}
