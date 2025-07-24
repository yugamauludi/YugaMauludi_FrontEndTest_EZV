export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodosResponse {
  todos: Todo[];
}

export interface CreateTodoRequest {
  title: string;
  userId: number;
  completed?: boolean;
}