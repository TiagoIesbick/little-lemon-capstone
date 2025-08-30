import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function Nav() {
    const [ icon, setIcon ] = useState(faBars);
    let location = useLocation();

    useEffect(() => {
        sidebarHandler();
    }, [location]);

    const sidebarHandler = () => {
        let x = document.getElementsByTagName('nav')[0];
        if (x.classList.length > 0) {
            x.removeAttribute("class");
            setIcon(faBars);
        };
    };

    const clickHandler = (e) => {
        e.preventDefault();
        let x = document.getElementsByTagName('nav')[0];
        if (x.classList.length === 0) {
            x.className = "responsive";
        } else {
            x.removeAttribute("class");
        };
        if (icon === faBars) {
            setIcon(faXmark);
        } else {
            setIcon(faBars);
        };
    };

    return (
        <>
            <nav>
                <a href="*" className='icon' aria-label="sidebar" role="button" onClick={clickHandler}>
                    <FontAwesomeIcon icon={icon} />
                </a>
                <ul>
                    <li><Link to="/" className='underline'>Home</Link></li>
                    <li><Link to="/about" className='underline'>About</Link></li>
                    <li><Link to="/menu" className='underline'>Menu</Link></li>
                    <li><Link to="/reservations" className='underline'>Reservations</Link></li>
                    <li><Link to="/order-online" className='underline'>Order Online</Link></li>
                    <li><Link to="/login" className='underline'>Login</Link></li>
                </ul>
            </nav>
        </>
    );
};