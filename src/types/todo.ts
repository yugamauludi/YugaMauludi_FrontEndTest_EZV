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

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedTodosResponse {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}