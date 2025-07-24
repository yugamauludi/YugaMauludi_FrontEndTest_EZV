import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo, CreateTodoRequest, PaginationParams, PaginatedTodosResponse } from '../../types/todo';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<PaginatedTodosResponse, PaginationParams>({
      query: ({ page, limit }) => {
        const start = (page - 1) * limit;
        return `todos?_start=${start}&_limit=${limit}`;
      },
      transformResponse: (response: Todo[], meta, arg) => {
        // JSONPlaceholder memiliki 200 todos total
        const total = 200;
        const totalPages = Math.ceil(total / arg.limit);
        
        return {
          todos: response,
          total,
          page: arg.page,
          limit: arg.limit,
          totalPages,
        };
      },
      providesTags: (result, error, arg) => [
        { type: 'Todo', id: `page-${arg.page}` },
        'Todo',
      ],
    }),
    getAllTodos: builder.query<Todo[], void>({
      query: () => 'todos',
      providesTags: ['Todo'],
    }),
    createTodo: builder.mutation<Todo, CreateTodoRequest>({
      query: (newTodo) => ({
        url: 'todos',
        method: 'POST',
        body: {
          title: newTodo.title,
          userId: newTodo.userId,
          completed: newTodo.completed || false,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const { useGetTodosQuery, useGetAllTodosQuery, useCreateTodoMutation } = todosApi;