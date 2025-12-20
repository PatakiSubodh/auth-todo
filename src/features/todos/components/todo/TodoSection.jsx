import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    TouchSensor
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    rectSortingStrategy,
} from "@dnd-kit/sortable";

import CompletedToggle from "./CompletedToggle";
import TodoItem from "../../components/TodoItem";
import { SortableTodoItem } from "./SortableTodoItem";

const TodoSection = ({
    view,
    activeTodos,
    completedTodos,
    showCompleted,
    setShowCompleted,
    handlers,
    onReorder, // <--- 1. Destructure it here (It comes from TodoList)
}) => {
    const isGrid = view === "grid";

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, 
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = activeTodos.findIndex((t) => t.id === active.id);
            const newIndex = activeTodos.findIndex((t) => t.id === over.id);

            const newActiveOrder = arrayMove(activeTodos, oldIndex, newIndex);

            // 2. Use it directly here (NOT handlers.onReorder)
            onReorder(newActiveOrder); 
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={activeTodos.map(t => t.id)}
                strategy={isGrid ? rectSortingStrategy : verticalListSortingStrategy}
            >
                <ul
                    className={
                        isGrid
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                            : "flex flex-col gap-4"
                    }
                >
                    {activeTodos.map((todo) => (
                        <SortableTodoItem 
                            key={todo.id} 
                            todo={todo} 
                            {...handlers} 
                        />
                    ))}
                </ul>
            </SortableContext>

            <CompletedToggle
                open={showCompleted}
                count={completedTodos.length}
                onToggle={() => setShowCompleted((p) => !p)}
            />

            {showCompleted && (
                <ul className="mt-4 flex flex-col gap-4 opacity-80">
                    {completedTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} {...handlers} />
                    ))}
                </ul>
            )}
        </DndContext>
    );
};

export default TodoSection;