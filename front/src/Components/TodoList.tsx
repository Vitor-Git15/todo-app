import React from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import TodoItem from "./TodoItem.tsx";
import { Todo } from "../Types/Todo.ts";

interface TodoListProps {
    todos: Todo[];
    removeTodo: (id: number) => void;
    editTodo: (id: number, newText: string) => void;
    toggleTodoCompletion: (id: number) => void;
  }
  
  const TodoList: React.FC<TodoListProps> = ({
    todos,
    removeTodo,
    editTodo,
    toggleTodoCompletion,
  }) => {
    return (
      <div style={styles.todoListContainer}>
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={styles.todoItemContainer}
            className="todo-item"
          >
            <div style={styles.todoContent}>
              <div
                style={styles.todoTitle}
                onClick={() => toggleTodoCompletion(todo.id)}
              >
                {todo.completed ? <s>{todo.text}</s> : todo.text}
              </div>
              <div
                style={styles.todoExtraInfo}
                className="extra-info"
              >
                {todo.description && (
                  <p style={styles.description}>{todo.description}</p>
                )}
                {todo.dueDate && (
                  <p style={styles.dueDate}>{`Due: ${todo.dueDate}`}</p>
                )}
              </div>
            </div>
            <div style={styles.actions}>
              <FaEdit
                onClick={() => editTodo(todo.id, prompt("New title:", todo.text) || todo.text)}
                style={styles.editIcon}
              />
              <FaTrashAlt
                onClick={() => removeTodo(todo.id)}
                style={styles.deleteIcon}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const styles = {
    todoListContainer: {
      marginTop: "20px",
    },
    todoItemContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    todoContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    todoTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    todoExtraInfo: {
      display: "none",
      transition: "all 0.3s ease",
    },
    description: {
      fontSize: "14px",
      color: "#666",
    },
    dueDate: {
      fontSize: "14px",
      color: "#444",
    },
    actions: {
      display: "flex",
      gap: "10px",
    },
    editIcon: {
      cursor: "pointer",
      color: "#FFA500",
    },
    deleteIcon: {
      cursor: "pointer",
      color: "#FF0000",
    },
  };
  
  export default TodoList;