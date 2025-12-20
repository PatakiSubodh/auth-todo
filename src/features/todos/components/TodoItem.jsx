import { forwardRef } from "react";

const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

const priorityColors = {
    High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    Medium: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    Low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
};

// Wrap component in forwardRef to accept refs for Drag and Drop
const TodoItem = forwardRef(({ todo, onToggle, onEdit, onDelete, formatTime, style, ...props }, ref) => {
    return (
        <li
            ref={ref}
            style={style}
            {...props} // Spread DnD listeners/attributes here
            onClick={() => onEdit(todo)}
            className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 w-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 flex flex-col justify-between transition-colors duration-300 touch-manipulation"
        >
            <div className="flex justify-between">
                <div className="flex gap-4 items-start">
                    <input
                        type="checkbox"
                        checked={todo.is_complete}
                        onChange={() => onToggle(todo)}
                        onClick={(e) => e.stopPropagation()} 
                        // Added pointer-events-auto to ensure checkbox is always clickable
                        className="w-6 h-6 mt-1 accent-slate-900 dark:accent-white z-10 cursor-pointer pointer-events-auto"
                    />

                    <div>
                        <p className={`font-medium ${todo.is_complete ? "line-through text-gray-400 dark:text-gray-500" : "text-black dark:text-white"}`}>
                            {todo.title}
                        </p>
                        {todo.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                {todo.description}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-1 items-end">
                    <span className={`text-xs px-2 py-0.5 rounded ${statusColors[todo.status]}`}>
                        {todo.status}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[todo.priority]}`}>
                        {todo.priority}
                    </span>
                </div>
            </div>

            <div className="flex justify-end mt-2">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                    Created · {formatTime(todo.created_at)}
                </p>
            </div>
        </li>
    );
});

TodoItem.displayName = "TodoItem";

export default TodoItem;