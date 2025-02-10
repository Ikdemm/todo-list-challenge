import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { motion } from 'framer-motion';

const TodoList = () => {
  const { todos } = useTodo();
  const completedTasks = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-blue-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 mb-8"
        >
          <h1 className="text-6xl font-black text-center bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            ✨ TaskMaster
          </h1>
          <p className="text-center mt-4 text-slate-600 text-lg font-medium">
            Organize your day, achieve your goals
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8"
        >
          <TodoForm />
          
          {/* Task Counter */}
          <div className="flex justify-between items-center mb-8 px-2">
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-indigo-600">{todos.length}</span>
                <span className="text-sm font-medium text-slate-500">Total Tasks</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-emerald-600">{completedTasks}</span>
                <span className="text-sm font-medium text-slate-500">Completed</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-amber-600">{todos.length - completedTasks}</span>
                <span className="text-sm font-medium text-slate-500">Remaining</span>
              </div>
            </div>
            <div className="w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ 
                  width: `${todos.length ? (completedTasks / todos.length) * 100 : 0}%` 
                }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
              />
            </div>
          </div>

          {/* Tasks List */}
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {todos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </motion.div>

          {/* Empty State */}
          {todos.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-7xl mb-6 animate-bounce">📝</div>
              <h3 className="text-2xl font-bold text-slate-700 mb-3">Start Fresh</h3>
              <p className="text-slate-500">Add your first task and begin your productive journey!</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TodoList;
