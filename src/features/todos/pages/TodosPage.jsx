import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/lib/toast";

import TodoHeader from "../components/TodoHeader";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/todo/TodoList";
import TodoAnalytics from "../components/TodoAnalytics";
import TodoSkeleton from "../components/TodoSkeleton";

const TodosPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState(null);
  const [progress, setProgress] = useState(0);

  const formatTime = (iso) =>
    new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data } = await supabase.from("todos").select("*");
    setTodos(sortTodos(data || []));
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
  };

  const addTodo = async (todo) => {
    const { data, error } = await supabase.from("todos").insert(todo).select();
    if (error) return showToast.error("Failed to add task");

    setTodos((prev) => [data[0], ...prev]);
    showToast.success("Task added successfully");
  };

  const updateTodo = async (id, updates) => {
    const { data, error } = await supabase.from("todos").update(updates).eq("id", id).select();
    if (error) return;

    setTodos((prev) => prev.map((t) => (t.id === id ? data[0] : t)));
  };

  const deleteTodo = async (id, permanent = false) => {
    if (permanent) {
      const { error } = await supabase.from("todos").delete().eq("id", id);
      if (error) return showToast.error("Failed to delete task permanently");

      setTodos((prev) => prev.filter((t) => t.id !== id));
      return showToast.error("Task permanently deleted");
    }

    const { error } = await supabase.from("todos").update({ is_deleted: true }).eq("id", id);
    if (error) return showToast.error("Failed to delete task");

    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, is_deleted: true } : t)));
    showToast.warning("Task moved to Deleted");
  };

  const toggleTodo = async (todo) => {
    let updateData, toastMessage;

    if (!todo.is_complete) {
      updateData = { is_complete: true, status: "Completed", prev_status: todo.status };
      toastMessage = "Task status changed to Completed";
    } else {
      const restoredStatus = todo.prev_status || "Pending";
      updateData = { is_complete: false, status: restoredStatus, prev_status: null };
      toastMessage = `Task status changed to ${restoredStatus}`;
    }

    const { error } = await supabase.from("todos").update(updateData).eq("id", todo.id);
    if (error) return;

    setTodos((prev) =>
      sortTodos(prev.map((t) => (t.id === todo.id ? { ...t, ...updateData } : t)))
    );
    showToast.success(toastMessage);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const sortTodos = (todos) => {
    return [...todos].sort((a, b) => {
      if (a.is_deleted !== b.is_deleted) return a.is_deleted ? 1 : -1;
      if (a.is_complete === b.is_complete) return new Date(b.created_at) - new Date(a.created_at);
      return a.is_complete ? 1 : -1;
    });
  };

  if (loading) return <TodoSkeleton />;

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <TodoHeader onLogout={handleLogout} />

      <main className="p-6 text-black dark:text-white">
        <TodoForm
          editingTodo={editingTodo}
          onCreate={addTodo}
          onUpdate={updateTodo}
          onClose={() => setEditingTodo(null)}
          onOpenNew={() => setEditingTodo({})} // <-- this opens new task
          onDelete={deleteTodo}
          showToast={showToast}
        />


        <TodoAnalytics todos={todos} />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={setEditingTodo}
          formatTime={formatTime}
        />
      </main>
    </div>
  );
};

export default TodosPage;
