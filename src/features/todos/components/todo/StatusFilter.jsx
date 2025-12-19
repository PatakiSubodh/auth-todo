const STATUSES = ["All", "Pending", "In Progress", "Completed", "Deleted"];

const StatusFilter = ({ value, onChange }) => {
    return (
        <div className="grid grid-cols-2 gap-2 text-sm lg:grid-cols-1">
        {STATUSES.map((status) => {
            const isDeleted = status === "Deleted";
            const isActive = value === status;

            const baseClasses =
            "px-3 py-2 transition-colors duration-200 text-left border-b border-gray-300 dark:border-gray-700";

            const activeClasses = isActive
            ? isDeleted
                ? "bg-red-400 font-semibold border border-red-500 text-white dark:text-black"
                : "bg-blue-600/20 font-semibold border border-blue-600/70 text-black dark:text-white"
            : isDeleted
            ? "text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
            : "text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20";

            return (
            <button
                key={status}
                onClick={() => onChange(status)}
                className={`${baseClasses} ${activeClasses} rounded-b-sm`}
            >
                {status}
            </button>
            );
        })}
        </div>
    );
};

export default StatusFilter;
