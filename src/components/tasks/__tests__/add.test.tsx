import React from "react";
import { render, screen, fireEvent, waitFor, } from "@testing-library/react";
import AddTask from "../add";
import { createTask } from "../../../api/tasks";
import { describe, expect, vi,  } from "vitest";

import "@testing-library/jest-dom/vitest";

vi.mock("../../../api/tasks", () => ({
  createTask: vi.fn(),
}));

describe("AddTask Component", () => {
  const refreshMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Renderiza os componentes do Form", () => {
    render(<AddTask refresh={refreshMock} />);
    expect(screen.getByTestId("title-input")).toBeInTheDocument();
    expect(screen.getByTestId("description-input")).toBeInTheDocument();
    expect(screen.getByTestId("status-select")).toBeInTheDocument();
    expect(screen.getByTestId("finish-button")).toBeInTheDocument();
  });
  test("Mostra o erro caso o titulo não seja inserido", async () => {
    render(<AddTask refresh={refreshMock} />);
    fireEvent.submit(screen.getByTestId("form-add"));
    expect(await screen.findByText(/O título é obrigatório/i)).toBeInTheDocument();
  });
  test("Adiciona nova tarefa com os dados validos", async () => {
    render(<AddTask refresh={refreshMock} />);
    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "Comprar pão" } });
    fireEvent.change(screen.getByTestId("description-input"), { target: { value: "Comprar pão no supermercado" } });
    fireEvent.change(screen.getByTestId("status-select"), { target: { value: "TODO" } });
   
    fireEvent.click(screen.getByTestId("finish-button"));

    await waitFor(() => expect(createTask).toHaveBeenCalledTimes(1));
    
    expect(refreshMock).toHaveBeenCalled();
  });

  test("Desabilida botão apos enviar dados para a nova task", async () => {
    render(<AddTask refresh={refreshMock} />);

    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "Comprar pão" } });
    fireEvent.change(screen.getByTestId("description-input"), { target: { value: "Comprar pão no supermercado" } });
    fireEvent.change(screen.getByTestId("status-select"), { target: { value: "TODO" } });

    fireEvent.click(screen.getByTestId("finish-button"));

    expect(screen.getByTestId("finish-button")).toBeDisabled();

    await waitFor(() => expect(createTask).toHaveBeenCalledTimes(1));

    await waitFor(() => expect(screen.getByTestId("finish-button")).not.toBeDisabled(), { timeout: 5000 });
  });
 
  });
