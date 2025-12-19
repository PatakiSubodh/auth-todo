import { useState } from "react";
import StatusFilter from "./StatusFilter";
import FilterBar from "./FilterBar";
import TodoSection from "./TodoSection";

const TodoList = ({ todos, onToggle, onDelete, onEdit, formatTime }) => {
    const [showCompleted, setShowCompleted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("asc");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredTodos = todos
        .filter(t => {
            if (statusFilter === "Deleted") return t.is_deleted;
            if (statusFilter === "All") return !t.is_deleted;
            return !t.is_deleted && t.status === statusFilter;
        })
        .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(t => priorityFilter === "All" || t.priority === priorityFilter)
        .sort((a, b) => {
        if (sortOrder === "alpha") {
            return a.title.localeCompare(b.title);
        }
        return new Date(a.created_at) - new Date(b.created_at);
        });

    const activeTodos = filteredTodos.filter(t => !t.is_complete);
    const completedTodos = filteredTodos.filter(t => t.is_complete);

    if (todos.length === 0) {
        return (
        <div className="text-center text-gray-400 mt-10">
            No tasks yet.
        </div>
        );
    }

    return (
        <div
        className="
            w-[95vw] mx-auto mt-8 mb-6
            grid grid-cols-1
            lg:grid-cols-[240px_1fr]
            gap-6
        "
        >
        {/* Left Sidebar */}
        <div>
            <StatusFilter
            value={statusFilter}
            onChange={setStatusFilter}
            />
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-4">
            <FilterBar
            {...{
                searchQuery,
                setSearchQuery,
                priorityFilter,
                setPriorityFilter,
                sortOrder,
                setSortOrder,
            }}
            />

            <TodoSection
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            showCompleted={showCompleted}
            setShowCompleted={setShowCompleted}
            handlers={{ onToggle, onDelete, onEdit, formatTime }}
            />
        </div>
        </div>
    );
};

export default TodoList;
