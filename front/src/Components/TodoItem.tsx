import React from "react";
import { Todo } from "../Types/Todo.ts";

interface TodoItemProps {
  todo: Todo;
  removeTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
  toggleTodoCompletion: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  removeTodo,
  editTodo,
  toggleTodoCompletion,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.title}>{todo.text}</span>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodoCompletion(todo.id)}
          style={styles.checkbox}
        />
      </div>
      <div style={styles.description}>
        {todo.completed ? (
          <span style={{ ...styles.status, textDecoration: "line-through" }}>
            Completed
          </span>
        ) : (
          <span style={styles.status}>Not completed</span>
        )}
      </div>
      <button onClick={() => removeTodo(todo.id)} style={styles.removeButton}>
        Remove
      </button>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "black", // Letras pretas
  },
  checkbox: {
    marginLeft: "10px",
  },
  description: {
    marginTop: "5px",
    fontStyle: "italic",
  },
  status: {
    color: "black", // Letras pretas para o status
  },
  removeButton: {
    marginTop: "10px",
    padding: "5px 10px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default TodoItem;
