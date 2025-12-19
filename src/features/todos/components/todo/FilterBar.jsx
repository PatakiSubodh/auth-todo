import {
    Search,
    SlidersHorizontal,
    Check,
    X,
    Sparkles,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const priorityStyles = {
    High: "border-red-300 text-red-700",
    Medium: "border-yellow-300 text-yellow-700",
    Low: "border-green-300 text-green-700",
};

const FilterBar = ({
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder,
    priorityFilter,
    setPriorityFilter,
    }) => {
    const hasActiveFilters =
        sortOrder !== "date" || priorityFilter !== "All";

    const clearFilters = () => {
        setSortOrder("date");
        setPriorityFilter("All");
    };

    return (
        <div className="ml-auto mb-4 flex items-center gap-3 max-w-xl w-full justify-end">
        
        {/* Search */}
        <div className="relative w-64">
            <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded pl-9 pr-3 py-2 text-sm
                        focus:outline-none focus:ring focus:ring-blue-200 dark:text-black"
            />
        </div>

        {/* Settings */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <button className="border rounded p-2 dark:text-white hover:dark:bg-white hover:dark:text-black">
                <SlidersHorizontal size={18} />
            </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">

            {/* Sort */}
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>

            {[
                { label: "Alphabetical", value: "alpha" },
                { label: "Creation date", value: "date" },
            ].map(opt => (
                <DropdownMenuItem
                key={opt.value}
                onClick={() => setSortOrder(opt.value)}
                >
                <div className="flex justify-between w-full">
                    <span>{opt.label}</span>
                    {sortOrder === opt.value && <Check size={14} />}
                </div>
                </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            {/* Theme */}
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <div className="mx-2 mb-2 rounded-md bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-2 text-xs text-purple-700 flex items-center gap-2">
                <Sparkles size={14} />
                Coming soon
            </div>

            <DropdownMenuSeparator />

            {/* Priority */}
            <DropdownMenuLabel>Priority</DropdownMenuLabel>
            <div className="flex gap-2 px-2 pb-2">
                {["High", "Medium", "Low"].map(level => {
                const isActive = priorityFilter === level;
                return (
                    <button
                    key={level}
                    onClick={() => setPriorityFilter(level)}
                    className={`flex items-center gap-1 rounded border px-2 py-1 text-xs
                        ${priorityStyles[level]}
                        ${isActive ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`}
                    >
                    {level}
                    {isActive && <Check size={12} />}
                    </button>
                );
                })}
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
                <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={clearFilters}
                    className="text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                    <X size={14} />
                    Clear filters
                </DropdownMenuItem>
                </>
            )}
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
    );
};

export default FilterBar;
