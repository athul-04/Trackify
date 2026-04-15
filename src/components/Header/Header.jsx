import { ClipboardList } from 'lucide-react';
import "./Header.css"

const Header = () => {
    return (
        <div>
            <header className='header'>
                <ClipboardList size={32} />
                <span className='header-title'>Trackify</span>
            </header>
        </div>
    )
}

export default Header;