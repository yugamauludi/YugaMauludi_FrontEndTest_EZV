import { Todo } from '../types/todo';

export interface PaginatedTodosResponse {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function fetchTodos(page: number = 1, limit: number = 10): Promise<PaginatedTodosResponse> {
  const start = (page - 1) * limit;
  
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${limit}`,
      {
        next: { revalidate: 60 },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    
    const todos: Todo[] = await response.json();
    const total = 200;
    const totalPages = Math.ceil(total / limit);
    
    return {
      todos,
      total,
      page,
      limit,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}