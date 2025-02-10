import { useTodo } from '../context/TodoContext';
import type { Todo } from '../context/TodoContext';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { toggleTodo, removeTodo } = useTodo();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    removeTodo(todo.id);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isDeleting ? 0 : 1, 
        y: isDeleting ? 20 : 0,
        scale: isDeleting ? 0.95 : 1,
      }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className={`group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300
                ${todo.completed 
                  ? 'bg-emerald-50/50 border-2 border-emerald-200' 
                  : 'bg-white border-2 border-slate-100 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/20'
                }`}
      >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => toggleTodo(todo.id)}
        className="relative flex items-center justify-center"
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="w-6 h-6 border-2 rounded-lg text-violet-500 
                   focus:ring-2 focus:ring-violet-200 cursor-pointer
                   transition-all duration-200"
        />
        {todo.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </motion.button>

      <span className={`flex-1 text-lg transition-all duration-200
                     ${todo.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
        {todo.text}
      </span>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDelete}
        className="px-4 py-2 text-sm opacity-0 group-hover:opacity-100
                 text-red-500 hover:text-white border-2 border-red-500 
                 hover:bg-red-500 rounded-xl transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-red-200
                 font-medium"
      >
        Delete
      </motion.button>
    </motion.div>
  );
};

export default TodoItem;
