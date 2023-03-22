import { useState } from "react";

function removeTime(array, value) {
    let index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
};

function addDate(array, value) {
    if (!array.includes(value)) {
        array.push(value);
    }
    return array;
};

const BookingForm = (props) => {
    const [guests, setGuests] = useState("2");
    const [reserveDate, setReserveDate] = useState(props.availableTimes.date[0]);
    const [reserveTime, setReserveTime] = useState("select")

    const defaultListTime = ["select", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

    const options = props.availableTimes.date.includes(reserveDate) ?
    props.availableTimes.time[props.availableTimes.date.indexOf(reserveDate)].map(item => <option data-testid="select-option" value={item} key={item}>{item}</option>) :
    defaultListTime.map(item => <option data-testid="select-option" value={item} key={item}>{item}</option>);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted");
        console.log(reserveDate, reserveTime);
        let index = null;
        let newAvailableTimes = props.availableTimes.time;
        let newDates = props.availableTimes.date;

        if (newDates.includes(reserveDate)) {
            index = newDates.indexOf(reserveDate);
            newAvailableTimes[index] = removeTime(newAvailableTimes[index], reserveTime);
        } else {
            newDates = addDate(props.availableTimes.date, reserveDate);
            newAvailableTimes.push(removeTime(defaultListTime, reserveTime));
        };
        console.log(newDates);
        console.log(newAvailableTimes);
        props.dispatch({type: "SET_MULTIPLE", payload: {date: newDates, time: newAvailableTimes}});
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="number-of-guests">Number of Guests:</label>
                <input
                    id="number-of-guests"
                    type="range"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                />
                <label htmlFor="date">Date:</label>
                <input
                    id="date"
                    type="date"
                    value={reserveDate}
                    onChange={(e) => {if(e.target.value >= props.availableTimes.date[0]) return setReserveDate(e.target.value)}}
                />
                <label htmlFor="time">Time:</label>
                <select
                    id="time"
                    value={reserveTime}
                    onChange={(e) => {if(e.target.value !== "select") return setReserveTime(e.target.value)}}
                >
                    {options}
                </select>
                <button type="submit">Submit</button>
            </fieldset>

        </form>
    );
};

export default BookingForm;