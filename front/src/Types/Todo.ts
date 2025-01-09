export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate?: string;
  completed: boolean;
  status: "tarefas" | "a_ser_feita" | "em_progresso" | "feita";
}
