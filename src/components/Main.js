import Home from "./Home";
import Highlights from "./Highlights";
import Testimonials from "./Testimonials";
import About from "./About";
import { Routes, Route } from "react-router-dom";

export default function Main() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/specials" element={<Highlights />} />
                <Route path="/testimonials" element={<Testimonials />} />
            </Routes>
        </main>
    );
};