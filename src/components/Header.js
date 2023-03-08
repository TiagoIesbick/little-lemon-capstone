import logo from '../assets/images/logo.png';
import Nav from './Nav';

export default function Header() {
    return (
        <header>
            <img src={logo} alt="logo" width={200}/>
            <Nav />
        </header>
    );
};