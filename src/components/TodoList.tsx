'use client';

import { useGetTodosQuery } from '../store/api/todosApi';
import { Todo } from '../types/todo';
import TodoForm from './TodoForm';

const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 mb-4 overflow-hidden">
      {/* Gradient accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
        todo.completed 
          ? 'bg-gradient-to-b from-green-400 to-green-600' 
          : 'bg-gradient-to-b from-blue-400 to-purple-600'
      }`}></div>
      
      <div className="flex items-center p-6 pl-8">
        <div className="flex items-center mr-6">
          <div className="relative">
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="w-5 h-5 text-blue-600 bg-gray-100 border-2 border-gray-300 rounded-md focus:ring-blue-500 focus:ring-2 transition-all duration-200"
            />
            {todo.completed && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold mb-1 transition-all duration-200 ${
            todo.completed 
              ? 'line-through text-gray-500' 
              : 'text-gray-800 group-hover:text-blue-700'
          }`}>
            {todo.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              User {todo.userId}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
              #{todo.id}
            </span>
          </div>
        </div>
        
        <div className="ml-6">
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            todo.completed 
              ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-sm' 
              : 'bg-gradient-to-r from-amber-100 to-orange-200 text-amber-800 shadow-sm'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              todo.completed ? 'bg-green-500' : 'bg-amber-500'
            }`}></div>
            {todo.completed ? 'Completed' : 'In Progress'}
          </span>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: { title: string; value: number; icon: string; color: string }) => {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading awesome todos...</p>
    </div>
  );
};

export default function TodoList() {
  const { data: todos, error, isLoading, refetch } = useGetTodosQuery();

  const handleFormSuccess = () => {
    // Optionally refetch data or show success message
    refetch();
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">😵</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-600">We couldn&apos;t load your todos. Please try again later.</p>
        </div>
      </div>
    );
  }

  const completedCount = todos?.filter(todo => todo.completed).length || 0;
  const totalCount = todos?.length || 0;
  const pendingCount = totalCount - completedCount;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Todo Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay organized and productive with your personal task management system
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Total Tasks" 
            value={totalCount} 
            icon="📋" 
            color="from-blue-500 to-blue-600" 
          />
          <StatCard 
            title="Completed" 
            value={completedCount} 
            icon="✅" 
            color="from-green-500 to-green-600" 
          />
          <StatCard 
            title="In Progress" 
            value={pendingCount} 
            icon="⏳" 
            color="from-amber-500 to-orange-600" 
          />
          <StatCard 
            title="Completion Rate" 
            value={completionRate} 
            icon="📊" 
            color="from-purple-500 to-purple-600" 
          />
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Overall Progress</h3>
            <span className="text-sm font-medium text-gray-600">{completionRate}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Add Todo Form */}
        <TodoForm onSuccess={handleFormSuccess} />

        {/* Todo List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Live from JSONPlaceholder API</span>
            </div>
          </div>
          
          <div className="space-y-0">
            {todos?.map((todo, index) => (
              <div 
                key={todo.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Built with ❤️ using Next.js, Redux Toolkit & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}