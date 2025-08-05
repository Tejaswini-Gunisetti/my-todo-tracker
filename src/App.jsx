//todo list
import { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';
import './index.css'; // or wherever your Tailwind CSS file is
function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [filter, setFilter] = useState('all');
  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const handleAddTask = () => {
    if (taskInput.trim() === '') return;

    const newTask = {
      id: Date.now(),
      title: taskInput.trim(),
      description: descriptionInput.trim(),
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');
    setDescriptionInput('');
  };

  // Delete task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id
      ? { ...task, completed: !task.completed }
      : task
    ));
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Handle Enter key press in input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  // Calculate task counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-300 to-rose-400 py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            ✨ Todo Master
          </h1>
          <p className="text-gray-600">Organize your tasks beautifully</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">

          {/* Add Task Section */}
          <div className="mb-6">
            <div className="space-y-3">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What needs to be done?"
                className="w-full p-4 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70 backdrop-blur-sm text-gray-800 placeholder-gray-500 font-medium" />
              <textarea
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
                placeholder="Add a description (optional)"
                rows="2"
                className="w-full p-4 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70 backdrop-blur-sm text-gray-600 placeholder-gray-400 resize-none" />
              <button
                onClick={handleAddTask}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Add Task
              </button>
            </div>
          </div>

          {/* Task Stats */}
          {totalTasks > 0 && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{totalTasks}</div>
                  <div className="text-xs text-purple-500 font-medium">Total</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{activeTasks}</div>
                  <div className="text-xs text-blue-500 font-medium">Active</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                  <div className="text-xs text-green-500 font-medium">Done</div>
                </div>
              </div>
            </div>
          )}

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6">
            {['all', 'active', 'completed'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => handleFilterChange(filterType)}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${filter === filterType
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-102'}`}
              >
                {filterType === 'all' && '📋'}
                {filterType === 'active' && '⏳'}
                {filterType === 'completed' && '✅'}
                {' '}
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>

          {/* Task List */}
          <div className="space-y-2">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">
                  {tasks.length === 0 ? '🎯' : filter === 'active' ? '🎉' : '📝'}
                </div>
                <p className="text-gray-500 font-medium text-lg">
                  {tasks.length === 0
                    ? "Ready to be productive?"
                    : filter === 'active'
                      ? "All caught up! Great job! 🎉"
                      : `No ${filter} tasks found.`}
                </p>
                {tasks.length === 0 && (
                  <p className="text-gray-400 text-sm mt-2">Add your first task above to get started!</p>
                )}
              </div>
            ) : (
              <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-purple-100 divide-y divide-purple-100">
                {filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={handleDeleteTask}
                    onToggleComplete={toggleComplete} />
                ))}
              </div>
            )}
          </div>

          {/* Clear Completed Button */}
          {completedTasks > 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setTasks(tasks.filter(task => !task.completed))}
                className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full"
              >
                🗑️ Clear {completedTasks} completed task{completedTasks !== 1 ? 's' : ''}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">Stay organized, stay productive! 💪</p>
        </div>
      </div>
    </div>
  );
}

export default App;


