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
      // 1. Deleted items always go to the bottom
      if (a.is_deleted !== b.is_deleted) return a.is_deleted ? 1 : -1;

      // 2. Completed items always go below Active items
      if (a.is_complete !== b.is_complete) return a.is_complete ? 1 : -1;

      // 3. If both are ACTIVE, sort by 'position' (Ascending: 0, 1000, 2000...)
      if (!a.is_complete && !b.is_complete) {
          // If 'position' is null (old data), fallback to 'created_at'
          if (a.position === null || b.position === null) {
                return new Date(b.created_at) - new Date(a.created_at);
          }
          return (a.position || 0) - (b.position || 0);
      }

      // 4. If both are COMPLETED, sort by position if available
      if (a.position !== null && b.position !== null) {
        return a.position - b.position;
      }

      return new Date(b.created_at) - new Date(a.created_at);
    });
  };

  const handleReorder = async (newActiveTodos, newCompletedTodos) => {
    // 1. Deleted todos stay untouched
    const deletedTodos = todos.filter(t => t.is_deleted);

    // 2. Rebuild full list
    const newFullList = [
      ...newActiveTodos,
      ...newCompletedTodos,
      ...deletedTodos,
    ];

    // 3. Update UI instantly
    setTodos(newFullList);

    showToast.info("Order updated");

    // 4. Prepare position updates (both lists)
    const updates = [
      ...newActiveTodos.map((t, i) => ({
        id: t.id,
        position: i * 1000,
      })),
      ...newCompletedTodos.map((t, i) => ({
        id: t.id,
        position: i * 1000,
      })),
    ];

    // 5. Persist to Supabase
    const { error } = await supabase.rpc("update_todo_positions", { updates });

    if (error) {
      console.error(error);
      showToast.error("Failed to save order");
    }
  };


  if (loading) return <TodoSkeleton />;

  return (
    <div className="absolute min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <TodoHeader onLogout={handleLogout} />

      <main className="p-6 text-black dark:text-white pt-20 max-w-3xl mx-auto space-y-6">
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
          setTodos={setTodos}
          onToggle={toggleTodo}
          onReorder={handleReorder}
          onDelete={deleteTodo}
          onEdit={setEditingTodo}
          formatTime={formatTime}
        />
      </main>
    </div>
  );
};

export default TodosPage;
