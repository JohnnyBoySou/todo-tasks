import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditTask from "../edit";
import { updateTask } from "../../../api/tasks";
import { describe, expect, vi } from "vitest";

import "@testing-library/jest-dom/vitest";

vi.mock("../../../api/tasks", () => ({
  updateTask: vi.fn(),
}));

describe("EditTask Component", () => {
  const defaultValues = {
    id: "1",
    title: "Test Task",
    description: "Test Description",
    status: "TODO",
  };

  const refreshMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Renderiza os componentes do Form", () => {
    render(<EditTask refresh={refreshMock} defaultValues={defaultValues} />);
    expect(screen.getByTestId("title-input")).toBeInTheDocument();
    expect(screen.getByTestId("description-input")).toBeInTheDocument();
    expect(screen.getByTestId("status-select")).toBeInTheDocument();
    expect(screen.getByTestId("finish-button")).toBeInTheDocument();
  });

  test("Mostra o erro caso o titulo não seja inserido", async () => {
    render(<EditTask refresh={refreshMock} defaultValues={defaultValues} />);
    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "" } });
    fireEvent.submit(screen.getByTestId("form-edit"));
    expect(await screen.findByText(/O título é obrigatório/i)).toBeInTheDocument();
  });

  test("Atualiza tarefa com os dados válidos", async () => {
    render(<EditTask refresh={refreshMock} defaultValues={defaultValues} />);
   
    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "New Title" } });
    fireEvent.change(screen.getByTestId("description-input"), { target: { value: "New Description" } });
    fireEvent.change(screen.getByTestId("status-select"), { target: { value: "TODO" } });
    
    fireEvent.click(screen.getByTestId("finish-button"));

    await waitFor(() => expect(updateTask).toHaveBeenCalledWith("1", {
        title: "New Title",
        description: "New Description",
        status: "TODO",
    }), { timeout: 3000 });
    expect(refreshMock).toHaveBeenCalled();
  });

  test("Desabilita botão após enviar dados para a edição da task", async () => {
    render(<EditTask refresh={refreshMock} defaultValues={defaultValues} />);
    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "Comprar pão" } });
    fireEvent.change(screen.getByTestId("description-input"), { target: { value: "Comprar pão no supermercado" } });
    fireEvent.change(screen.getByTestId("status-select"), { target: { value: "TODO" } });
  
    fireEvent.click(screen.getByTestId("finish-button"));

    expect(screen.getByTestId("finish-button")).toBeDisabled();

    await waitFor(() => expect(updateTask).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByTestId("finish-button")).not.toBeDisabled(), { timeout: 5000 });
  });
});
