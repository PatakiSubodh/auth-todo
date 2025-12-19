
import CompletedToggle from "./CompletedToggle";
import TodoItem from "../../components/TodoItem";

const TodoSection = ({
    activeTodos,
    completedTodos,
    showCompleted,
    setShowCompleted,
    handlers,
    }) => {
    return (
        <>
        <ul className="flex flex-col gap-4">
            {activeTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} {...handlers} />
            ))}
        </ul>

        <CompletedToggle
            open={showCompleted}
            count={completedTodos.length}
            onToggle={() => setShowCompleted(p => !p)}
        />

        {showCompleted && (
            <ul className="mt-4 flex flex-col gap-4 opacity-80">
            {completedTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} {...handlers} />
            ))}
            </ul>
        )}
        </>
    );
};

export default TodoSection;
