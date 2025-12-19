import { Skeleton } from "@/components/ui/skeleton";

const TodoSkeleton = () => (
    <div className="min-h-screen p-6 bg-gray-50 space-y-6 animate-pulse">
        
        {/* Header placeholder */}
        <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-1/4 rounded-md bg-gray-200 animate-pulse" />
        <Skeleton className="h-8 w-20 rounded-full bg-gray-200 animate-pulse" />
        </div>

        {/* Analytics / stats placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg bg-gray-200 animate-pulse" />
        ))}
        </div>

        {/* Todo list placeholders */}
        <div className="space-y-3">
            {Array(5).fill(0).map((_, i) => (
                <div 
                key={i} 
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm animate-pulse"
                >
                {/* Left side */}
                <div className="flex flex-col justify-between h-10">
                    <Skeleton className="h-5 w-40 rounded-md bg-gray-200 animate-pulse" />  {/* Large top */}
                    <Skeleton className="h-3 w-28 rounded-md bg-gray-200 animate-pulse" />  {/* Small bottom */}
                </div>

                {/* Right side */}
                <div className="flex flex-col justify-between items-end h-10">
                    <Skeleton className="h-3 w-12 rounded-md bg-gray-200 animate-pulse" />  {/* Small top */}
                    <Skeleton className="h-3 w-16 rounded-md bg-gray-200 animate-pulse" />  {/* Small bottom */}
                </div>
                </div>
            ))}
        </div>

    </div>
);

export default TodoSkeleton;
