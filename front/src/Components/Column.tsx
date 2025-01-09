import React from "react";
import TodoList from "./TodoList.tsx";
import { Todo } from "../Types/Todo.ts";

interface ColumnProps {
    title: string;
    todos: Todo[];
    onDrop: (todoId: number) => void;
    onEdit: (todo: Todo) => void;
    onDelete: (todoId: number) => void;
    calculateTaskColor: (dueDate: string, status: Todo["status"]) => string;
  }
  
  const Column: React.FC<ColumnProps> = ({
    title,
    todos,
    onDrop,
    onEdit,
    onDelete,
    calculateTaskColor,
  }) => {
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };
  
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const todoId = Number(e.dataTransfer.getData("todoId"));
      onDrop(todoId);
    };
  
    return (
      <div
        style={styles.column}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h2>{title}</h2>
        {todos.map((todo) => (
          <div
            key={todo.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("todoId", todo.id.toString());
            }}
            style={{
              ...styles.task,
              backgroundColor: calculateTaskColor(todo.dueDate, todo.status),
            }}
          >
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>{todo.dueDate}</p>
            <div style={styles.taskActions}>
              <button onClick={() => onEdit(todo)} style={styles.editButton}>
                Edit
              </button>
              <button onClick={() => onDelete(todo.id)} style={styles.deleteButton}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
const styles = {
  column: {
    flex: 1,
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#fff",
    minWidth: "200px",
  },
  task: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    color: "#fff",
  },
};

export default Column;