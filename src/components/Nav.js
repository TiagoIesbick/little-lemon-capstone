import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function Nav() {
    const [ icon, setIcon ] = useState(solid('bars'));
    let location = useLocation();

    useEffect(() => {
        sidebarHandler();
    }, [location]);

    const sidebarHandler = () => {
        let x = document.getElementsByTagName('nav')[0];
        if (x.classList.length > 0) {
            x.removeAttribute("class");
            setIcon(solid('bars'));
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
        if (icon === solid('bars')) {
            setIcon(solid('xmark'));
        } else {
            setIcon(solid('bars'));
        };
    };

    return (
        <>
            <nav>
                <a href="*" className='icon' role="button" onClick={clickHandler}>
                    <FontAwesomeIcon icon={icon} />
                </a>
                <ul>
                    <li><Link to="/" className='underline'>Home</Link></li>
                    <li><Link to="/about" className='underline'>About</Link></li>
                    <li><Link to="/menu" className='underline'>Menu</Link></li>
                    <li><Link to="/reservations" className='underline'>Reservations</Link></li>
                    <li><a href="*" className='underline'>Order Online</a></li>
                    <li><a href="*" className='underline'>Login</a></li>
                </ul>
            </nav>
        </>
    );
};