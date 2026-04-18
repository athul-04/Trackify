import { ClipboardList, LogOut } from 'lucide-react';
import "./Header.css"
import ThemeToggle from './ThemeToogle';
import { auth } from "../../config/firebase"
import { signOut,onAuthStateChanged } from 'firebase/auth';
import {useEffect} from "react";
import { useNavigate } from 'react-router';
const Header = () => {
    const navigate = useNavigate();

    useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user === null) {
                    navigate(`/`);
                }
            });
            return () => unsubscribe();
        }, []);
    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <div>
            <header className='header'>
                <ClipboardList size={32} />
                <span className='header-title'>Trackify</span>
                
            </header>
            <LogOut className="logout" size={23} onClick={handleLogout} />
            <ThemeToggle />
        </div>
    )
}

export default Header;