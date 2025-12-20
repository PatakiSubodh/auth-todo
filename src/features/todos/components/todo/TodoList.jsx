import { useState, useEffect } from "react";
import StatusFilter from "./StatusFilter";
import FilterBar from "./FilterBar";
import TodoSection from "./TodoSection";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

const STATUSES = ["All", "Pending", "In Progress", "Completed", "Deleted"];

const TodoList = ({ todos, onToggle, onDelete, onEdit, formatTime }) => {
    const [showCompleted, setShowCompleted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("date");
    const [statusFilter, setStatusFilter] = useState("All");
    const [view, setView] = useState(() => {
        return localStorage.getItem("todo-view") || "list";
    });

    useEffect(() => {
        localStorage.setItem("todo-view", view);
    }, [view]);

    const filteredTodos = todos
        .filter((t) => {
            if (statusFilter === "Deleted") return t.is_deleted;
            if (statusFilter === "All") return !t.is_deleted;
            return !t.is_deleted && t.status === statusFilter;
        })
        .filter((t) =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(
            (t) => priorityFilter === "All" || t.priority === priorityFilter
        )
        .sort((a, b) => {
            if (sortOrder === "alpha") {
                return a.title.localeCompare(b.title);
            }
            return new Date(a.created_at) - new Date(b.created_at);
        });

    const activeTodos = filteredTodos.filter((t) => !t.is_complete);
    const completedTodos = filteredTodos.filter((t) => t.is_complete);

    if (todos.length === 0) {
        return (
            <div className="text-center text-gray-400 mt-10">
                No tasks yet.
            </div>
        );
    }

    return (
        <div className="w-[95vw] mx-auto mt-6 mb-6">
            {/* Mobile / Tablet */}
            <div className="grid gap-3 mb-4 grid-cols-1 sm:grid-cols-[180px_1fr] lg:hidden">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {STATUSES.map((status) => (
                            <SelectItem key={status} value={status}>
                                {status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <FilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    priorityFilter={priorityFilter}
                    setPriorityFilter={setPriorityFilter}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    view={view}
                    setView={setView}
                />
            </div>

            {/* Desktop */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-[240px_1fr]">
                <div className="hidden lg:block">
                    <StatusFilter
                        value={statusFilter}
                        onChange={setStatusFilter}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="hidden lg:block">
                        <FilterBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            priorityFilter={priorityFilter}
                            setPriorityFilter={setPriorityFilter}
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                            view={view}
                            setView={setView}
                        />
                    </div>

                    <TodoSection
                        view={view}
                        activeTodos={activeTodos}
                        completedTodos={completedTodos}
                        showCompleted={showCompleted}
                        setShowCompleted={setShowCompleted}
                        handlers={{
                            onToggle,
                            onDelete,
                            onEdit,
                            formatTime,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TodoList;
