import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTodo } from '../context/TodoContext';
import { motion, AnimatePresence } from 'framer-motion';

const todoSchema = z.object({
  text: z.string()
    .min(3, 'Task must be at least 3 characters long')
    .max(100, 'Task is too long (max 100 characters)')
    .refine((value) => value.trim().length > 0, {
      message: 'Task cannot be empty or just whitespace'
    })
});

type TodoFormData = z.infer<typeof todoSchema>;

const TodoForm = () => {
  const { addTodo } = useTodo();
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting, isValid, isDirty },
    watch 
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    mode: 'onChange'
  });

  const textValue = watch('text', '');
  const characterCount = textValue?.length || 0;

  const onSubmit = async (data: TodoFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulated delay
      addTodo(data.text.trim());
      reset();
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-10 relative">
      <div className="relative group">
        <input
          {...register('text')}
          placeholder="What's on your mind today?"
          className={`w-full px-8 py-5 text-lg bg-slate-50/50 border-2 rounded-2xl
                    transition-all duration-300 placeholder-slate-400
                    ${errors.text 
                      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                      : 'border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 group-hover:border-violet-200'
                    }`}
        />
        
        {/* Character counter */}
        <span className={`absolute right-32 top-1/2 -translate-y-1/2 text-sm
                       ${characterCount > 90 
                         ? 'text-red-500' 
                         : characterCount > 70 
                           ? 'text-amber-500' 
                           : 'text-slate-400'
                       }`}>
          {characterCount}/100
        </span>

        <motion.button
          type="submit"
          disabled={isSubmitting || !isValid || !isDirty}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3
                    text-white font-semibold rounded-xl
                    transition-all duration-300 shadow-lg
                    ${isValid && isDirty
                      ? 'bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 hover:shadow-xl hover:shadow-violet-100'
                      : 'bg-slate-300 cursor-not-allowed'
                    }`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Adding...
            </span>
          ) : 'Add Task'}
        </motion.button>
      </div>

      {/* Error message with animation */}
      <AnimatePresence mode="wait">
        {errors.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 top-full mt-2"
          >
            <p className="text-sm text-red-500 pl-3 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errors.text.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default TodoForm;
