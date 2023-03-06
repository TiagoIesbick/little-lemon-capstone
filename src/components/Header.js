import logo from '../assets/images/logo.png';

export default function Header() {
    return (
        <header>
            <img src={logo} alt="logo" width={200}/>
        </header>
    );
};