"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PaginatedTodosResponse } from "../lib/todoService";
import Pagination from "./Pagination";
import AddTodoButton from "./AddTodoButton";

interface TodoListProps {
  initialData: PaginatedTodosResponse;
}

export default function TodoList({ initialData }: TodoListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <div>
      <div className="mb-8">
        <AddTodoButton />
      </div>

      <Pagination
        currentPage={initialData.page}
        totalPages={initialData.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
