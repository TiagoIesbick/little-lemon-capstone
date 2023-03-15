import logo from '../assets/images/logo_green.png';
import Nav from "./Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro'


export default function Footer() {
    return (
        <footer>
            <div className='footer-container'>
                <div className='footer-logo'>
                    <img src={logo} alt="logo" className='logo'/>
                </div>
                <div>
                    <span>Doormat Navigation</span>
                    <Nav />
                </div>
                <div className='contact'>
                    <span>Contact</span>
                    <ul>
                        <li><a href="https://maps.google.com/?q=Chicago"><FontAwesomeIcon icon={solid('location-dot')} /></a></li>
                        <li><a href="tel:+1408XXXXXXX"><FontAwesomeIcon icon={solid('phone')} /></a></li>
                        <li><a href="mailto:littlelemon@littlelemon.com"><FontAwesomeIcon icon={solid('envelope')} /></a></li>
                    </ul>
                </div>
                <div className='social-media-links'>
                    <span>Social Media</span>
                    <ul>
                        <li><a href="/"><FontAwesomeIcon icon={brands('facebook')}/></a></li>
                        <li><a href="/"><FontAwesomeIcon icon={brands('instagram')}/></a></li>
                        <li><a href="/"><FontAwesomeIcon icon={brands('twitter')}/></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};