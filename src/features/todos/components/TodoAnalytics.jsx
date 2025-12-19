const StatCard = ({ label, value, dotColor }) => (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm transition-colors duration-300">
        <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${dotColor}`} />
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        </div>

        <p className="text-3xl font-semibold text-black dark:text-white mt-1">
        {value}
        </p>
    </div>
);

const TodoAnalytics = ({ todos }) => {
    const total = todos.length;
    const completed = todos.filter(t => t.is_complete).length;
    const pending = todos.filter(t => !t.is_complete && t.status === "Pending").length;
    const inProgress = todos.filter(t => t.status === "In Progress").length;

    return (
        <div className="w-[95vw] mx-auto mt-8 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Analytics</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
            label="Total Tasks"
            value={total}
            dotColor="bg-gray-400 dark:bg-gray-600"
            />
            <StatCard
            label="Pending"
            value={pending}
            dotColor="bg-yellow-400 dark:bg-yellow-600"
            />
            <StatCard
            label="In Progress"
            value={inProgress}
            dotColor="bg-blue-400 dark:bg-blue-600"
            />
            <StatCard
            label="Completed"
            value={completed}
            dotColor="bg-green-400 dark:bg-green-600"
            />
        </div>
        </div>
    );
};

export default TodoAnalytics;
