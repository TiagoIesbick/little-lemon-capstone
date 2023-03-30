import { useState, useEffect, useRef } from "react";
import { useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { RadioGroup, RadioOption } from "./RadioGroup";
import useSubmit from "../hooks/useSubmit";

/*
Here I set up another endpoint to send data to the mock server.
It receives the formData via POST request.
https://f8ee9642-d2ea-440f-b7ca-4c15c4a2f0c1.mock.pstmn.io/api/reserve-a-table
*/
const urlPost = "https://f8ee9642-d2ea-440f-b7ca-4c15c4a2f0c1.mock.pstmn.io/api/reserve-a-table";


const BookingForm = (props) => {
    const navigate = useNavigate();
    const {isLoading, response, submit} = useSubmit();
    const [guests, setGuests] = useState("2");
    const [selectedTable, setSelectedTable] = useState("inside");
    const [selectedNeeds, setSelectedNeeds] = useState("no");
    const [occasion, setOccasion] = useState("");
    const [formData, setFormData] = useState({guests: null, date: null, time: null});
    const submitButtonRef = useRef(null);
    const setServerResponse = props.setServerResponse;

    useEffect(() => {
        setFormData({
            guests: guests,
            date: props.availableTimes.date,
            time: props.availableTimes.selected_time,
        });
    }, [guests, props.availableTimes.date, props.availableTimes.selected_time]);

    useEffect(() => {
        if (response) {
            console.log(response);
            setServerResponse(response);
            navigate("/confirmed-reservation");
        };
    }, [response, navigate, setServerResponse]);

    useEffect(() => {
        if (isLoading) {
            submitButtonRef.current.classList.add("btn-progress");
        } else {
            submitButtonRef.current.classList.remove("btn-progress");
        }
    }, [isLoading]);

    const options = props.availableTimes.time.map((item, index) => <option data-testid="select-option" value={item} key={index}>{item}</option>);

    const handleSubmit = (e) => {
        e.preventDefault();
        submit(urlPost, formData);
        console.log("Form Submitted");
        const timeList = props.availableTimes.time.filter(item => item !== props.availableTimes.selected_time);
        props.dispatch({type: "SET_DATA", payload: {
            time: timeList,
            selected_time: timeList[0]
        }});
    };

    return (
        <section className="section form-section">
            <div className="step-group-one">
                <div onClick={() => console.log("click")}>
                    <FontAwesomeIcon  icon={solid("circle-check")} size="lg" style={{backgroundColor: "white"}}/>
                    <span>Reservation</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={solid("circle-check")} size="lg" style={{backgroundColor: "white"}}/>
                    <span>Details</span>
                </div>
            </div>
            <div className="step-group-two">
                <div>
                    <FontAwesomeIcon icon={solid("circle-check")} size="lg" style={{backgroundColor: "white"}}/>
                    <span>Client</span>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset >
                    <div className="form-group">
                        <label htmlFor="number-of-guests">Number of Guests:</label>
                        <select
                            id="number-of-guests"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="form-control"
                        >
                            <option value="2">2 people</option>
                            <option value="3">3 people</option>
                            <option value="4">4 people</option>
                            <option value="5">5 people</option>
                            <option value="6">6 people</option>
                            <option value="7">7 people</option>
                            <option value="8">8 people</option>
                            <option value="9">9 people</option>
                            <option value="10">10 people</option>
                        </select>
                    </div>
                    <div className="form-group">
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
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Available Times:</label>
                        <select
                            id="time"
                            value={props.availableTimes.selected_time}
                            onChange={(e) => {
                                props.dispatch({type: "SET_DATA", payload: {selected_time: e.target.value}});
                            }}
                            className="form-control"
                        >
                            {options}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="occasion">Occasion:</label>
                        <select onChange={(e) => setOccasion(e.target.value)} value={occasion} className="form-control">
                            <option value="" disabled hidden>Occasion</option>
                            <option value="birthday">Birthday</option>
                            <option value="engagement">Engagement</option>
                            <option value="anniversary">Anniversary</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Table Preference:</label>
                        <RadioGroup onChange={setSelectedTable} selected={selectedTable}>
                            <RadioOption value="inside">Inside</RadioOption>
                            <RadioOption value="outside">Outside</RadioOption>
                        </RadioGroup>
                    </div>
                    <div className="form-group">
                        <label>Acessibility Needs:</label>
                        <RadioGroup onChange={setSelectedNeeds} selected={selectedNeeds}>
                            <RadioOption value="no">No</RadioOption>
                            <RadioOption value="yes">Yes</RadioOption>
                        </RadioGroup>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <textarea id="comment" name="comment" value="hello" rows={4} className="form-control" />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" autoComplete="given-name" id="firstName" required className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" autoComplete="family-name" id="lastName" required className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" autoComplete="email" id="email" required className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" autoComplete="tel" id="phone" required className="form-control" />
                    </div>
                </fieldset>
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={
                            props.availableTimes.selected_time === undefined || isLoading
                        }
                        className="bg-secondary"
                        ref={submitButtonRef}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
};

export default BookingForm;