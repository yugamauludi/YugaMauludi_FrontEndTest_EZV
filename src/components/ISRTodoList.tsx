import { fetchTodos } from '../lib/todoService';
import { Todo } from '../types/todo';
import AddTodoButton from './AddTodoButton';

interface ISRTodoListProps {
  page?: number;
  limit?: number;
}

export default async function ISRTodoList({ page = 1, limit = 10 }: ISRTodoListProps) {
  try {
    const data = await fetchTodos(page, limit);
    const buildTime = new Date().toISOString();
    
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            ✨ Todo List App (ISR)
          </h1>
          <p className="text-center text-gray-600 mb-2">
            Pre-rendered with Incremental Static Regeneration
          </p>
          <p className="text-center text-sm text-gray-500">
            Built at: {new Date(buildTime).toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Todos" 
            value={data.todos.length} 
            icon="📝" 
            color="from-green-500 to-green-600" 
          />
          <StatCard 
            title="Completed" 
            value={data.todos.filter(todo => todo.completed).length} 
            icon="✅" 
            color="from-blue-500 to-blue-600" 
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

        <div className="mb-6">
          <AddTodoButton />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-3xl">📋</span>
              Todo Items (Page {data.page} of {data.totalPages})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Pre-rendered (ISR)</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {data.todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
            <span className="text-xl">⚡</span>
            ISR Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
            <div>
              <strong>Revalidation:</strong> Every 60 seconds
            </div>
            <div>
              <strong>Build Time:</strong> {new Date(buildTime).toLocaleString()}
            </div>
            <div>
              <strong>Strategy:</strong> Incremental Static Regeneration
            </div>
            <div>
              <strong>Client Updates:</strong> RTK Query
            </div>
          </div>
        </div>
      </div>
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">😵</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">ISR Build Error</h2>
          <p className="text-red-600">Failed to pre-render todos. Please try again later.</p>
        </div>
      </div>
    );
  }
}

const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300 transform hover:-translate-y-1 mb-4 overflow-hidden">
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
              className="w-5 h-5 text-green-600 bg-gray-100 border-2 border-gray-300 rounded-md focus:ring-green-500 focus:ring-2 transition-all duration-200"
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
              : 'text-gray-800 group-hover:text-green-700'
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