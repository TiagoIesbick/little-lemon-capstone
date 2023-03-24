import Home from "./Home";
import Highlights from "./Highlights";
import Testimonials from "./Testimonials";
import About from "./About";
import BookingForm from "./BookingForm";
import { Routes, Route } from "react-router-dom";
import { useReducer, useEffect } from "react";

const date = new Date();
const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`

const dataFormat = (data) => {
    return {
        date: data.date,
        time: data.time.map(time => time.substr(16,5)).sort(),
        selected_time: data.time.map(time => time.substr(16,5)).sort()[0]
    }
};

const updateTimes = (state, action) => {
    if (action.type === 'SET_DATA') return {...state, ...action.payload};
    return state
};


export default function Main() {
    const [state, dispatch] = useReducer(updateTimes, {date: today, time: [], selected_time: null});
    /*
    Here to establish an endpoint I've created my own mock server at Postman.
    It receives a date in string format as a query parameter.
    'https://f8ee9642-d2ea-440f-b7ca-4c15c4a2f0c1.mock.pstmn.io/api/available-times?date="2023-03-23"'
    */
    const url = "https://f8ee9642-d2ea-440f-b7ca-4c15c4a2f0c1.mock.pstmn.io/api/available-times";

    const fetchData = () => {
        fetch(`${url}?date="${state.date}"`)
            .then(response => response.json())
            .then(data => dispatch({type: 'SET_DATA', payload: dataFormat(data)}));
    };

    useEffect(() => {
        fetchData(); // eslint-disable-next-line
    },[state.date]);

    console.log(state);

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/specials" element={<Highlights />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/reservations" element={<BookingForm availableTimes={state} dispatch={dispatch} today={today} />} />
            </Routes>
        </main>
    );
};