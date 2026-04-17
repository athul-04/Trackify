import { Copyright } from 'lucide-react';
import "./Footer.css"

const Footer = () => {
    return (
        <div>
            <footer className='footer'>
                <Copyright size={32} />
                <span className='footer-text'>2026 Trackify. All rights reserved.</span>
            </footer>
        </div>
    )
}

export default Footer;