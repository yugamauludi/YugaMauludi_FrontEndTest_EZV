'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import TodoForm from './TodoForm';

export default function AddTodoButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    setIsModalOpen(false);
    router.refresh();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
      >
        <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add New Todo
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title="Create New Todo"
      >
        <TodoForm
          onSuccess={handleSuccess}
          onCancel={handleCancel}
          isModal={true}
        />
      </Modal>
    </>
  );
}