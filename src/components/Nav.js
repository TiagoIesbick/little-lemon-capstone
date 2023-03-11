import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState } from 'react';

export default function Nav() {
    const [ icon, setIcon ] = useState(solid('bars'));

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
        <nav>
            <a href="/" className='icon' role="button" onClick={clickHandler}><FontAwesomeIcon icon={icon} /></a>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">About</a></li>
                <li><a href="/">Menu</a></li>
                <li><a href="/">Reservations</a></li>
                <li><a href="/">Order Online</a></li>
                <li><a href="/">Login</a></li>
            </ul>
        </nav>
    );
};