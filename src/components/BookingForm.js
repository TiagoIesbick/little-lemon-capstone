import { useState, useEffect } from "react";

const BookingForm = (props) => {
    const [guests, setGuests] = useState("2");
    const [formData, setFormData] = useState({guests: null, date: null, time: null});

    useEffect(() => {
        setFormData({
            guests: guests,
            date: props.availableTimes.date,
            time: props.availableTimes.selected_time,
        });
    }, [guests, props.availableTimes.date, props.availableTimes.selected_time]);

    const options = props.availableTimes.time.map(item => <option data-testid="select-option" value={item} key={item}>{item}</option>);

    const fetchData = async (data = {}) => {
        /*
        Here I set up another endpoint to send data to the mock server.
        It receives the formData then makes a post request.
        https://f8ee9642-d2ea-440f-b7ca-4c15c4a2f0c1.mock.pstmn.io/api/reserve-a-table
        */
        const response = await fetch("https://f8ee9642-d2ea-440f-b7ca-4c15c4a2f0c1.mock.pstmn.io/api/reserve-a-table", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(formData).then( data => console.log(data));
        console.log("Form Submitted");
        const timeList = props.availableTimes.time.filter(item => item !== props.availableTimes.selected_time);
        props.dispatch({type: "SET_DATA", payload: {
            time: timeList,
            selected_time: timeList[0]
        }});
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
                    value={props.availableTimes.date}
                    onChange={(e) => {
                        if (e.target.value >= props.today) {
                            props.dispatch({type: "SET_DATA", payload: {date: e.target.value}});
                        };
                    }}
                />
                <label htmlFor="time">Available Times:</label>
                <select
                    id="time"
                    value={props.availableTimes.selected_time}
                    onChange={(e) => {
                        props.dispatch({type: "SET_DATA", payload: {selected_time: e.target.value}});
                    }}
                >
                    {options}
                </select>
                <button type="submit" disabled={props.availableTimes.selected_time === undefined}>Submit</button>
            </fieldset>

        </form>
    );
};

export default BookingForm;