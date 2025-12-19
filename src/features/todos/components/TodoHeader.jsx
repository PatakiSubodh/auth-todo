import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const TodoHeader = ({ onLogout }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const stored = localStorage.getItem("darkMode");
        return stored === "true";
    });

    useEffect(() => {
        if (darkMode) {
        document.documentElement.classList.add("dark");
        } else {
        document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    return (
        <div className="flex justify-between items-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 text-black dark:text-white shadow-md transition-colors duration-300">
        <h1 className="text-xl font-bold">Task Master</h1>
        <div className="flex items-center gap-4">
            {/* Dark Mode Toggle Button */}
            <Button
            variant="outline"
            size="sm"
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center p-2 rounded-full transition-colors duration-300"
            >
            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            {/* Logout */}
            <Button variant="destructive" size="sm" onClick={onLogout} className="bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600 text-white transition-colors duration-300">
            Logout
            </Button>
        </div>
        </div>
    );
};

export default TodoHeader;
