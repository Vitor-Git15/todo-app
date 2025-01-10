import React, { useState, useEffect } from "react";
import AddTaskModal from "../Components/AddTaskModal.tsx";
import EditTaskModal from "../Components/EditTaskModal.tsx";
import Column from "../Components/Column.tsx";
import { Todo } from "../Types/Todo.ts";

const HomePage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // Carregar estado salvo ao montar o componente
  useEffect(() => {
    const savedTodos = localStorage.getItem("homepageTodos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Salvar estado atual sempre que mudar
  useEffect(() => {
    localStorage.setItem("homepageTodos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, { ...newTodo, status: "tarefas" }]);
  };

  const handleMoveTodo = (todoId: number, newStatus: Todo["status"]) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? { ...todo, status: newStatus, completed: newStatus === "feita" }
          : todo
      )
    );
  };

  const handleEditTodo = (editedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo
      )
    );
    setEditingTodo(null);
  };

  const handleDeleteTodo = (todoId: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const getTodosByStatus = (status: Todo["status"]) =>
    todos.filter((todo) => todo.status === status);

  const calculateTaskColor = (dueDate: string, status: Todo["status"]) => {
    if (status === "feita") return "green";

    const today = new Date();
    const due = new Date(dueDate);
    const diffInDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays <= 2) return "red";
    if (diffInDays <= 7) return "#FFA500";
    if (diffInDays > 7) return "#87CEFA"; // Azul claro (para prazo longo)
    return "green";
  };

  return (
    <div style={styles.pageContainer}>
      <button onClick={() => setIsAddModalOpen(true)} style={styles.addButton}>
        +
      </button>
      <AddTaskModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        addTodo={addTodo}
      />
      {editingTodo && (
        <EditTaskModal
          isOpen={!!editingTodo}
          onRequestClose={() => setEditingTodo(null)}
          todo={editingTodo}
          onSave={handleEditTodo}
        />
      )}
      <div style={styles.columnsContainer}>
        {["tarefas", "em_progresso", "feita"].map((status, index) => (
          <Column
            key={index}
            title={status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
            todos={getTodosByStatus(status as Todo["status"])}
            onDrop={(todoId) => handleMoveTodo(todoId, status as Todo["status"])}
            onEdit={setEditingTodo}
            onDelete={handleDeleteTodo}
            calculateTaskColor={calculateTaskColor}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    marginTop: "64px",
    position: "relative",
    height: "calc(100vh - 64px)",
    backgroundColor: "#f0f2f5",
  },
  addButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    fontSize: "30px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    textAlign: "center",
    cursor: "pointer",
  },
  columnsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly", // Colunas com larguras iguais
    alignItems: "flex-start",
    padding: "20px",
    gap: "20px",
    height: "100%",
    overflow: "auto",
  },
};

export default HomePage;
