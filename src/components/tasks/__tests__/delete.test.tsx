import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteTask from "../delete";
import { deleteTask } from "../../../api/tasks/index";
import { describe, expect, vi } from "vitest";

import "@testing-library/jest-dom/vitest";

vi.mock("../../../api/tasks", () => ({
  deleteTask: vi.fn(),
}));

describe("DeleteTask Component", () => {
  const mockRefresh = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Renderiza o título e o campo de confirmação", () => {
    render(<DeleteTask id="1" refresh={mockRefresh} />);
    expect(screen.getByText("Excluir Tarefa")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Digite 'excluir'")
    ).toBeInTheDocument();
  });

  test("Exibe mensagem de erro se a confirmação estiver incorreta", async () => {
    render(<DeleteTask id="1" refresh={mockRefresh} />);

    const input = screen.getByPlaceholderText("Digite 'excluir'");
    const button = screen.getByRole("button", { name: "Confirmar Exclusão" });

    fireEvent.change(input, { target: { value: "errado" } });
    fireEvent.click(button);

    expect(
      await screen.findByText(
        "Preencha o campo com 'excluir' para confirmar a exclusão"
      )
    ).toBeInTheDocument();
    expect(deleteTask).not.toHaveBeenCalled();
  });

  test("Chama deleteTask e refresh quando a confirmação for correta", async () => {

    render(<DeleteTask id="1" refresh={mockRefresh} />);
    const input = screen.getByPlaceholderText("Digite 'excluir'");
    const button = screen.getByRole("button", { name: "Confirmar Exclusão" });

    fireEvent.change(input, { target: { value: "excluir" } });
    fireEvent.click(button);

    await waitFor(() => {expect(deleteTask).toHaveBeenCalledWith("1")});
    expect(mockRefresh).toHaveBeenCalled();
  });

  test("Desabilita o botão enquanto está excluindo", async () => {
    render(<DeleteTask id="1" refresh={mockRefresh} />);
    const input = screen.getByTestId("confirmation");
    const button = screen.getByTestId("finish-button");

    fireEvent.change(input, { target: { value: "excluir" } });
    fireEvent.click(button);

    expect(button).toBeDisabled();
  });
});
