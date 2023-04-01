import Home from "./Home";
import About from "./About";
import BookingForm from "./BookingForm";
import ConfirmedBooking from "./ConfirmedBooking";
import Blank from "./Blank";
import { Routes, Route } from "react-router-dom";
import { useReducer, useEffect, useState } from "react";


const date = new Date();
const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`

/*
Here to establish an endpoint I've created my own mock server at Postman.
It receives a date in string format as a query parameter.
Mock server capacity is 1000 calls per month.
If the mock server's capacity is exceeded, application errors will occur.
'https://a84b5290-01dc-4f11-9bce-56f76278f9b5.mock.pstmn.io/api/available-times?date="2023-04-01"'
*/
const url = "https://a84b5290-01dc-4f11-9bce-56f76278f9b5.mock.pstmn.io/api/available-times";

const dataFormat = (data) => {
    return {
        date: data.date,
        time: data.time.map(time => time.substr(16,5)).sort(),
        selected_time: data.time.map(time => time.substr(16,5)).sort()[0]
    }
};

export const updateTimes = (state, action) => {
    if (action.type === 'SET_DATA') return {...state, ...action.payload};
    return state
};

export default function Main() {
    const [state, dispatch] = useReducer(updateTimes, {date: today, time: [], selected_time: undefined});
    const [serverResponse, setServerResponse] = useState({});
    const [loadingTimes, setLoadingTimes] = useState(false);

    const fetchData = async () => {
        setLoadingTimes(true);
        await fetch(`${url}?date="${state.date}"`)
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'SET_DATA', payload: dataFormat(data)});
                setLoadingTimes(false);
            });
    };

    useEffect(() => {
        fetchData(); // eslint-disable-next-line
    },[state.date]);

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Blank />} />
                <Route path="/order-online" element={<Blank />} />
                <Route path="/login" element={<Blank />} />
                <Route path="/reservations" element={<BookingForm availableTimes={state} dispatch={dispatch} today={today} setServerResponse={setServerResponse} loadingTimes={loadingTimes}/>} />
                <Route path="/confirmed-reservation" element={<ConfirmedBooking serverResponse={serverResponse} />} />
            </Routes>
            <div className="box-header-corrector"></div>
        </main>
    );
};