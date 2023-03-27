import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";


const BookingForm = (props) => {
    const navigate = useNavigate();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        props.submitForm(formData)
            .then( data => {
                console.log(data);
                props.setServerResponse(data);
                navigate("/confirmed-reservation");
            });
        console.log("Form Submitted");
        const timeList = props.availableTimes.time.filter(item => item !== props.availableTimes.selected_time);
        props.dispatch({type: "SET_DATA", payload: {
            time: timeList,
            selected_time: timeList[0]
        }});
    };

    return (
        <section className="section form-section">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div className="form-control">
                        <label htmlFor="number-of-guests">Number of Guests:</label>
                        <input
                            id="number-of-guests"
                            type="range"
                            min="1"
                            max="10"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
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
                    </div>
                    <div className="form-control">
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
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={props.availableTimes.selected_time === undefined}
                            className="bg-secondary"
                        >
                            Submit
                        </button>
                    </div>
                </fieldset>

            </form>
        </section>
    );
};

export default BookingForm;