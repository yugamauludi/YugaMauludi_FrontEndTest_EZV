import { fetchTodos } from '../lib/todoService';
import { Todo } from '../types/todo';
import AddTodoButton from './AddTodoButton';
import Pagination from './Pagination';

interface TodoListProps {
  page?: number;
  limit?: number;
}

function StatCard({ title, value, icon, color }: { title: string; value: number; icon: string; color: string }) {
  return (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );
}

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`font-semibold text-lg mb-2 ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
            {todo.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              User {todo.userId}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              ID: {todo.id}
            </span>
          </div>
        </div>
        <div className="ml-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            todo.completed 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {todo.completed ? '✅ Completed' : '⏳ Pending'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default async function TodoList({ page = 1, limit = 10 }: TodoListProps) {
  try {
    const data = await fetchTodos(page, limit);
    
    return (
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ✨ Todo List App
          </h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Todos" 
            value={data.todos.length} 
            icon="📝" 
            color="from-blue-500 to-blue-600" 
          />
          <StatCard 
            title="Completed" 
            value={data.todos.filter(todo => todo.completed).length} 
            icon="✅" 
            color="from-green-500 to-green-600" 
          />
          <StatCard 
            title="In Progress" 
            value={data.todos.filter(todo => !todo.completed).length} 
            icon="⏳" 
            color="from-amber-500 to-orange-600" 
          />
          <StatCard 
            title="Page" 
            value={data.page} 
            icon="📄" 
            color="from-purple-500 to-purple-600" 
          />
        </div>

        {/* Add Todo Button */}
        <div className="mb-6">
          <AddTodoButton />
        </div>

        {/* Todo Items */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">📋</span>
            Todo Items (Page {data.page} of {data.totalPages})
          </h2>
          
          <div className="space-y-4">
            {data.todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={data.page}
          totalPages={data.totalPages}
        />
      </div>
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error Loading Todos</h2>
          <p className="text-red-600 mb-4">Failed to fetch todos from the server.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
}