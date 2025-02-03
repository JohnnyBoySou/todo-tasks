import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ListTasks from "../list";
import { filterTasks } from "../../../api/tasks";
import { Task } from "../../../api/types";
import { describe, expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@testing-library/jest-dom/vitest";

vi.mock("../../../api/tasks", () => ({
  filterTasks: vi.fn(),
}));

describe("ListTasks Component", () => {
  const refetchMock = vi.fn();
  const queryClient = new QueryClient();

  const renderWithClient = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Renderiza tela de Loading", () => {
    renderWithClient(<ListTasks ref={refetchMock} />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("Mostra as tarefas", async () => {
    const tasks: Task[] = [
      {
        id: 1,
        title: "Comprar pão",
        description: "Comprar pão no supermercado",
        status: "TODO",
        createdAt: {
            read: "2025-02-02",
            date: ""
        },
      },
    ];
    (filterTasks as jest.Mock).mockResolvedValue(tasks);

    renderWithClient(<ListTasks ref={refetchMock} />);

    await waitFor(() => expect(screen.getByTestId("title")).toBeInTheDocument());

    expect(screen.getByTestId("title")).toHaveTextContent("Comprar pão");
    expect(screen.getByTestId("description")).toHaveTextContent("Comprar pão no supermercado");
    expect(screen.getByTestId("label")).toHaveTextContent("2025-02-02 - A fazer");

  });

  test("Mostrar Empty Tasks", async () => {
    (filterTasks as jest.Mock).mockResolvedValueOnce([]); 

    renderWithClient(<ListTasks ref={refetchMock} />);

    await waitFor(() => {
        expect(screen.getByText(/Sem tarefas/i)).toBeInTheDocument();
    });
  });

  test("Trocar tabs", async () => {
    renderWithClient(<ListTasks ref={refetchMock} />);
    expect(screen.getByText("Tudo")).toHaveClass("bg-blue-500");
    fireEvent.click(screen.getByText("Pendente"));
    expect(screen.getByText("Pendente")).toHaveClass("bg-blue-500");
    expect(screen.getByText("Tudo")).toHaveClass("bg-gray-200");
  });
 
});
