import { useEffect, useState } from "react";
import { LogOut } from 'lucide-react';
import "./Header.css"
const ThemeToggle = () => {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setDark(false);
        }
    }, []);

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle("dark");
        setDark(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    return (
        <>
        <button className="theme-toggle" onClick={toggleTheme}>
            {dark ? "🌙" : "☀️"}
        </button></>
    );
};

export default ThemeToggle;