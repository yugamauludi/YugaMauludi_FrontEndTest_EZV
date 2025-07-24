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
  const [isCompleted, setIsCompleted] = useState(false);
  
  const [createTodo, { isLoading, error, isSuccess }] = useCreateTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    try {
      await createTodo({
        title: title.trim(),
        userId,
        completed: isCompleted,
      }).unwrap();
      
      // Reset form
      setTitle('');
      setUserId(1);
      setIsCompleted(false);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Failed to create todo:', err);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setUserId(1);
    setIsCompleted(false);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
          Todo Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your todo task..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
          required
          disabled={isLoading}
          autoFocus={isModal}
        />
      </div>

      <div>
        <label htmlFor="userId" className="block text-sm font-semibold text-gray-700 mb-2">
          User ID
        </label>
        <select
          id="userId"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
          disabled={isLoading}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => (
            <option key={id} value={id}>User {id}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="completed"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mr-3"
          disabled={isLoading}
        />
        <label htmlFor="completed" className="text-sm font-medium text-gray-700">
          Mark as completed
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">Failed to create todo. Please try again.</p>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-green-700">Todo created successfully!</p>
          </div>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
              Creating...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Create Todo
            </div>
          )}
        </button>
        
        <button
          type="button"
          onClick={handleCancel}
          disabled={isLoading}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}