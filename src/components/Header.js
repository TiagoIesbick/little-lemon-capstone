import logo from '../assets/images/logo.png';
import Nav from './Nav';
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Header() {
    const headerRef = useRef(null);

    useEffect(() => {
        let prevScrollPos = window.scrollY;

        const handleScroll = () => {
          const currentScrollPos = window.scrollY;
          const headerElement = headerRef.current;
          console.log(headerElement.childNodes[1].childNodes[1].style.top);
          if (!headerElement) {
            return;
          }
          if (prevScrollPos > currentScrollPos) {
            headerElement.style.top = "0px";
            headerElement.childNodes[1].childNodes[1].style.top = "75.59px";
          } else {
            headerElement.style.top = "-200px";
            headerElement.childNodes[1].childNodes[1].style.top = "-200px";
          }
          prevScrollPos = currentScrollPos;
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
          window.removeEventListener('scroll', handleScroll)
        }
    }, []);

    return (
        <header ref={headerRef} >
            <img src={logo} alt="logo" className='logo'/>
            <Nav />
            <a href="/" role="button" onClick={(e) => e.preventDefault()}><FontAwesomeIcon icon={solid('cart-plus')} /></a>
        </header>
    );
};