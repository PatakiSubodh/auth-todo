import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TodoItem from "../../components/TodoItem";

export function SortableTodoItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: props.todo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1, // Dim item while dragging
        zIndex: isDragging ? 50 : "auto",
        position: 'relative',
    };

    return (
        <TodoItem
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            {...props}
        />
    );
}