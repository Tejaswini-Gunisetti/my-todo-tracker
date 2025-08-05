const TaskItem = ({ task, onDelete, onToggleComplete }) => {
  return (
    <div className="flex items-start justify-between px-4 py-3 hover:bg-purple-50 group transition-all duration-150">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="mt-1 accent-purple-500 cursor-pointer"
        />
        <div>
          <h3 className={`font-medium text-gray-800 ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm ${task.completed ? 'text-gray-300 line-through' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-400 hover:text-red-600 font-bold text-xl transform hover:scale-110 transition-all duration-150 opacity-0 group-hover:opacity-100"
        title="Delete"
      >
        ×
      </button>
    </div>
  );
};

export default TaskItem;
