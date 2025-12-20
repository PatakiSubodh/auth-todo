const STATUSES = ["All", "Pending", "In Progress", "Completed", "Deleted"];

const StatusFilterDropdown = ({ value, onChange }) => {
    return (
        <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm"
        >
        {STATUSES.map(status => (
            <option key={status} value={status}>
            {status}
            </option>
        ))}
        </select>
    );
};

export default StatusFilterDropdown;
