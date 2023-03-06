import Nav from "./Nav";

export default function Footer() {
    return (
        <footer>
            <div>
                Doormat Navigation
                <Nav />
            </div>
            <div>
                Contact
                <ul>
                    <li><a href="/">Address</a></li>
                    <li><a href="tel:+5551997912221">XXXXX</a></li>
                    <li><a href="mailto:littlelemon@littlelemon.com">Email</a></li>
                </ul>
            </div>
            <div>
                Social Media Links
                <ul>
                    <li><a href="/">Facebook</a></li>
                    <li><a href="/">Instagram</a></li>
                    <li><a href="/">Twitter</a></li>
                </ul>
            </div>
        </footer>
    );
};