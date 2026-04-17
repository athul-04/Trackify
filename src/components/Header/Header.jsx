import { ClipboardList } from 'lucide-react';
import "./Header.css"
import ThemeToggle from './ThemeToogle';
const Header = () => {
    return (
        <div>
            <header className='header'>
                <ClipboardList size={32} />
                <span className='header-title'>Trackify</span>
            </header>
            <ThemeToggle />
        </div>
    )
}

export default Header;