import { Suspense } from 'react';
import { Metadata } from 'next';
import TodoList from '../components/TodoList';

interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
  };
}

export const metadata: Metadata = {
  title: 'Todo List App - ISR',
  description: 'Todo list with Incremental Static Regeneration and Server-Side Rendering',
};

// ISR Configuration - Revalidate every 60 seconds
export const revalidate = 60;

// Generate static params for common pages
export async function generateStaticParams() {
  // Pre-generate first 5 pages
  return Array.from({ length: 5 }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

function LoadingFallback() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col justify-center items-center min-h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading todos...</p>
      </div>
    </div>
  );
}

export default function Home({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const limit = parseInt(searchParams.limit || '10', 10);

  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingFallback />}>
        <TodoList page={page} limit={limit} />
      </Suspense>
    </main>
  );
}