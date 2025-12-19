import { ChevronRight, ChevronDown } from "lucide-react";

const CompletedToggle = ({ open, count, onToggle }) => {
    if (count === 0) return null;

    return (
        <button
        onClick={onToggle}
        className="mt-6 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span>Completed {count}</span>
        </button>
    );
};

export default CompletedToggle;
