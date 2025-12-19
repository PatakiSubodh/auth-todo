import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
};

const priorityColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-orange-100 text-orange-800",
  Low: "bg-gray-100 text-gray-800",
};

const TodoForm = ({ editingTodo, onCreate, onUpdate, onClose, onDelete, showToast, onOpenNew }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title || "");
      setDescription(editingTodo.description || "");
      setStatus(editingTodo.status || "Pending");
      setPriority(editingTodo.priority || "Medium");
    } else {
      setTitle("");
      setDescription("");
      setStatus("Pending");
      setPriority("Medium");
    }
  }, [editingTodo]);

  const resetAndClose = () => {
    setTitle("");
    setDescription("");
    setStatus("Pending");
    setPriority("Medium");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, description, status, priority };

    if (editingTodo?.id) await onUpdate(editingTodo.id, payload);
    else await onCreate(payload);

    resetAndClose();
  };

  const handleDelete = async () => {
    if (!editingTodo?.id) return;
    await onDelete(editingTodo.id);
    resetAndClose();
  };

  const handleRestore = async () => {
    if (!editingTodo?.id) return;
    await onUpdate(editingTodo.id, { is_deleted: false });
    showToast.info("Task restored successfully");
    resetAndClose();
  };

  const handlePermanentDelete = async () => {
    if (!editingTodo?.id) return;
    const confirmDelete = confirm("This will permanently delete the task. Proceed?");
    if (!confirmDelete) return;

    await onDelete(editingTodo.id, true);
    resetAndClose();
  };

  return (
    <>
      {/* Floating Add Button */}
      {!editingTodo?.id && (
        <div className="fixed bottom-6 right-6 z-50">
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="rounded-full h-14 w-14 shadow-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-gray-200 transition-all duration-300 hover:scale-110 hover:shadow-3xl flex items-center justify-center"
                  onClick={onOpenNew} // open new task
                >
                  <Plus className="h-8 w-8 text-white dark:text-black" />
                  <span className="sr-only">Add Task</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-slate-800 dark:bg-white text-white border-slate-700 dark:border-gray-600 dark:text-black">
                <p>Add Task</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* Task Sheet */}
      <Sheet open={!!editingTodo} onOpenChange={(open) => { if (!open) onClose(); }}>
        <SheetContent side="right" className="w-[380px] bg-white dark:bg-black text-black dark:text-white">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-black dark:text-white">
              {editingTodo?.is_deleted ? "Deleted Task" : editingTodo?.id ? "Edit Task" : "Create Task"}
            </SheetTitle>
          </SheetHeader>

          {!editingTodo?.is_deleted && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-medium mb-1 block">Title</label>
                <Input
                  className="bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Description (optional)</label>
                <Textarea
                  className="bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300"
                  placeholder="Add any details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300">
                      <SelectValue>
                        {status && <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>{status}</span>}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300">
                      {["Pending", "In Progress", "Completed"].map((s) => (
                        <SelectItem key={s} value={s}>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[s]}`}>{s}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Priority</label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className="bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300">
                      <SelectValue>
                        {priority && <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[priority]}`}>{priority}</span>}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300">
                      {["High", "Medium", "Low"].map((p) => (
                        <SelectItem key={p} value={p}>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[p]}`}>{p}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <Button type="submit" className="flex-1 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white transition-colors duration-300">
                  {editingTodo?.id ? "Save Changes" : "Create Task"}
                </Button>

                {editingTodo?.id && (
                  <Button type="button" variant="destructive" onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600 text-white transition-colors duration-300">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                )}
              </div>
            </form>
          )}

          {editingTodo?.is_deleted && (
            <div className="mt-6 flex gap-3">
              <Button type="button" className="flex-1 bg-green-600 hover:bg-green-500 text-white" onClick={handleRestore}>
                Restore
              </Button>
              <Button type="button" variant="destructive" className="flex-1 bg-red-700 hover:bg-red-600 text-white" onClick={handlePermanentDelete}>
                Delete Permanently
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TodoForm;
