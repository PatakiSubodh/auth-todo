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
    onReorder, 
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
        if (!over || active.id === over.id) return;

        const activeIndex = activeTodos.findIndex(t => t.id === active.id);
        const completedIndex = completedTodos.findIndex(t => t.id === active.id);

        // Dragging inside ACTIVE todos
        if (activeIndex !== -1) {
            const newIndex = activeTodos.findIndex(t => t.id === over.id);
            if (newIndex === -1) return;

            onReorder(
            arrayMove(activeTodos, activeIndex, newIndex),
            completedTodos
            );
        }

        // Dragging inside COMPLETED todos
        if (completedIndex !== -1) {
            const newIndex = completedTodos.findIndex(t => t.id === over.id);
            if (newIndex === -1) return;

            onReorder(
            activeTodos,
            arrayMove(completedTodos, completedIndex, newIndex)
            );
        }
    };


    const layoutClass = isGrid
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    : "flex flex-col gap-4";


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
                <SortableContext
                    items={completedTodos.map(t => t.id)}
                    strategy={isGrid ? rectSortingStrategy : verticalListSortingStrategy}
                >
                    <ul className={`mt-4 opacity-80 ${layoutClass}`}>
                    {completedTodos.map((todo) => (
                        <SortableTodoItem
                        key={todo.id}
                        todo={todo}
                        {...handlers}
                        />
                    ))}
                    </ul>
                </SortableContext>
            )}


        </DndContext>
    );
};

export default TodoSection;