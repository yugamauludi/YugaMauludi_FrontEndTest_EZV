'use client';
import { useState } from 'react';
import { useCreateTodoMutation } from '../store/api/todosApi';

interface TodoFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  isModal?: boolean;
}

export default function TodoForm({ onSuccess, onCancel, isModal = false }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(1);
  const [completed, setCompleted] = useState(false);
  
  const [createTodo, { isLoading, error }] = useCreateTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a todo title');
      return;
    }

    try {
      await createTodo({
        title: title.trim(),
        userId,
        completed,
      }).unwrap();
      
      // Reset form
      setTitle('');
      setUserId(1);
      setCompleted(false);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Failed to create todo:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Todo Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Enter your todo..."
          required
        />
      </div>

      {/* User ID Select */}
      <div>
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
          User ID
        </label>
        <select
          id="userId"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((id) => (
            <option key={id} value={id}>
              User {id}
            </option>
          ))}
        </select>
      </div>

      {/* Completed Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="completed" className="ml-2 block text-sm text-gray-700">
          Mark as completed
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          Failed to create todo. Please try again.
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          ) : (
            'Create Todo'
          )}
        </button>
        
        {isModal && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}