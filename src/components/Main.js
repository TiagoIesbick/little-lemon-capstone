import Home from "./Home";
import Highlights from "./Highlights";
import Testimonials from "./Testimonials";
import About from "./About";
import BookingForm from "./BookingForm";
import { Routes, Route } from "react-router-dom";
import { useReducer } from "react";

const date = new Date();
const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`

const updateTimes = (state, action) => {
    switch (action.type) {
        case "SET_DATE":
            return {...state, date: action.payload.date}
        case "SET_TIME":
            return {...state, time: action.payload.time}
        case "SET_MULTIPLE":
            return {...state, ...action.payload}
        default:
            throw new Error("Something went wrong")
    }
};

export default function Main() {
    const initialState = {date: [today], time: [["select", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]]};
    const [state, dispatch] = useReducer(updateTimes, initialState)

    console.log(state.time);
    console.log(state.date);

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/specials" element={<Highlights />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/reservations" element={<BookingForm availableTimes={state} dispatch={dispatch} />} />
            </Routes>
        </main>
    );
};