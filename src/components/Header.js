import logo from '../assets/images/logo.png';
import Nav from './Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Header() {
    return (
        <header>
            <img src={logo} alt="logo" className='logo'/>
            <Nav />
            <a href="/" role="button" onClick={(e) => e.preventDefault()}><FontAwesomeIcon icon={solid('cart-plus')} /></a>
        </header>
    );
};