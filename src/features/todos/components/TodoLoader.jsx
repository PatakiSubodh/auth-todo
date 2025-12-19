import { Progress } from "@/components/ui/progress";

const TodoLoader = ({ progress }) => {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="w-[300px] space-y-3">
            <p className="text-sm text-gray-500 text-center">
            Loading your tasks…
            </p>
            <Progress value={progress} />
        </div>
        </div>
    );
};

export default TodoLoader;
