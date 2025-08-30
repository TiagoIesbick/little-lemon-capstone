import logo from '../assets/images/logo_green.png';
import Nav from "./Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'


export default function Footer() {
    return (
        <footer>
            <div className='footer-container'>
                <div className='footer-logo'>
                    <img src={logo} alt="logo" className='logo'/>
                </div>
                <div>
                    <span className='text-secondary'>Doormat Navigation</span>
                    <Nav />
                </div>
                <div className='contact'>
                    <span className='text-secondary'>Contact</span>
                    <ul>
                        <li><a href="https://maps.google.com/?q=Chicago" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLocationDot} /></a></li>
                        <li><a href="tel:+1408XXXXXXX"><FontAwesomeIcon icon={faPhone} /></a></li>
                        <li><a href="mailto:littlelemon@littlelemon.com"><FontAwesomeIcon icon={faEnvelope} /></a></li>
                    </ul>
                </div>
                <div className='social-media-links'>
                    <span className='text-secondary'>Social Media</span>
                    <ul>
                        <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook}/></a></li>
                        <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram}/></a></li>
                        <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter}/></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};