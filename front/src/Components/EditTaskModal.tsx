import React, { useState } from "react";
import { Todo } from "../Types/Todo.ts";

interface EditTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  todo: Todo;
  onSave: (editedTodo: Todo) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onRequestClose,
  todo,
  onSave,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [dueDate, setDueDate] = useState(todo.dueDate);

  const handleSubmit = () => {
    if (title && description && dueDate) {
      onSave({
        ...todo,
        title,
        description,
        dueDate,
      });
      onRequestClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.modalTitle}>Edit Task</h2>
        <label style={styles.label}>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
        </label>
        <label style={styles.label}>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={styles.input}
          />
        </label>
        <div style={styles.buttonContainer}>
          <button onClick={handleSubmit} style={styles.saveButton}>
            Save
          </button>
          <button onClick={onRequestClose} style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: "20px",
    width: "400px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    textAlign: "center" as const,
    color: "#333",
    marginBottom: "20px",
    fontSize: "24px",
  },
  label: {
    display: "block",
    marginBottom: "15px",
    color: "#555",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "8px 12px",
    marginTop: "5px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    boxSizing: "border-box" as const,
  },
  textarea: {
    width: "100%",
    padding: "8px 12px",
    marginTop: "5px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    minHeight: "100px",
    fontSize: "14px",
    resize: "vertical" as const,
    boxSizing: "border-box" as const,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  },
  saveButton: {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
  cancelButton: {
    padding: "8px 16px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#da190b",
    },
  },
};

export default EditTaskModal;
