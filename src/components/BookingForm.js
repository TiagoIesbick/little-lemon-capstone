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
    const stepOne = useRef(null);
    const stepTwo = useRef(null);
    const detailsButton = useRef(null);
    const clientButton = useRef(null);
    const availableTimesLoad = useRef(null);
    const reservationFormRef = useRef(null);
    const detailsFormRef = useRef(null);
    const clientFormRef = useRef(null);
    const submitButtonRef = useRef(null);
    const loadingTimes = props.loadingTimes
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
        if (loadingTimes) {
            availableTimesLoad.current.classList.add("btn-progress");
        } else {
            availableTimesLoad.current.classList.remove("btn-progress");
        }
    }, [loadingTimes]);

    useEffect(() => {
        if (isLoading) {
            submitButtonRef.current.classList.add("btn-progress");
        } else {
            submitButtonRef.current.classList.remove("btn-progress");
        }
    }, [isLoading]);

    const options = props.availableTimes.time.map((item, index) => <option data-testid="select-option" value={item} key={index}>{item}</option>);

    const handleClick = (e) => {
        const parentNode = e.target.parentNode;
        if (parentNode.classList.contains('details-button') || parentNode.classList.contains("fa-utensils")) {
            detailsFormRef.current.removeAttribute('hidden');
            reservationFormRef.current.setAttribute('hidden', 'true');
            clientFormRef.current.setAttribute('hidden', 'true');
            submitButtonRef.current.setAttribute('hidden', 'true');
            stepOne.current.style.borderTop = '2px solid #f4ce14';
            detailsButton.current.style.color = '#495E57';
            stepTwo.current.style.borderTop = '1px dashed #d4d6d6';
            clientButton.current.style.color = '#8d8e8e';
        };
        if (parentNode.classList.contains('reservation-button') || parentNode.classList.contains("fa-calendar-check")) {
            reservationFormRef.current.removeAttribute('hidden');
            detailsFormRef.current.setAttribute('hidden', 'true');
            clientFormRef.current.setAttribute('hidden', 'true');
            submitButtonRef.current.setAttribute('hidden', 'true');
            stepOne.current.style.borderTop = '1px dashed #d4d6d6';
            detailsButton.current.style.color = '#8d8e8e';
            stepTwo.current.style.borderTop = '1px dashed #d4d6d6';
            clientButton.current.style.color = '#8d8e8e';
        };
        if (parentNode.classList.contains('client-button') || parentNode.classList.contains("fa-user")) {
            clientFormRef.current.removeAttribute('hidden');
            submitButtonRef.current.removeAttribute('hidden');
            reservationFormRef.current.setAttribute('hidden', 'true');
            detailsFormRef.current.setAttribute('hidden', 'true');
            stepOne.current.style.borderTop = '2px solid #f4ce14';
            detailsButton.current.style.color = '#495E57';
            stepTwo.current.style.borderTop = '2px solid #f4ce14';
            clientButton.current.style.color = '#495E57';
        };
        console.log("click");
    };
    
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
            <div className="step-group-one" ref={stepOne}>
                <div className="reservation-button" role="button" onClick={handleClick}>
                    <FontAwesomeIcon  icon={solid("calendar-check")} size="lg" style={{backgroundColor: "white"}}/>
                    <span>Reservation</span>
                </div>
                <div className="details-button" role="button" onClick={handleClick} ref={detailsButton}>
                    <FontAwesomeIcon icon={solid("utensils")} size="lg" style={{backgroundColor: "white"}}/>
                    <span>Details</span>
                </div>
            </div>
            <div className="step-group-two" ref={stepTwo}>
                <div className="client-button" role="button" onClick={handleClick} ref={clientButton}>
                    <FontAwesomeIcon icon={solid("user")} size="lg" style={{backgroundColor: "white"}}/>
                    <span>Client</span>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset id="reservationForm" ref={reservationFormRef}>
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
                            ref={availableTimesLoad}
                        >
                            {options}
                        </select>
                    </div>
                </fieldset>
                <fieldset id="detailsForm" hidden ref={detailsFormRef}>
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
                <fieldset id="clientForm" hidden ref={clientFormRef}>
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
                        hidden
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