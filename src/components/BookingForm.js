import { useState, useEffect, useRef } from "react";
import { useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faUtensils, faUser, faCircleArrowRight, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RadioGroup, RadioOption } from "./RadioGroup";
import { useFormik } from "formik";
import * as Yup from 'yup';
import useSubmit from "../hooks/useSubmit";

/*
Here I set up another endpoint to send data to the mock server.
It receives the formData via POST request.
Mock server capacity is 1000 calls per month.
If the mock server's capacity is exceeded, application errors will occur.
https://a84b5290-01dc-4f11-9bce-56f76278f9b5.mock.pstmn.io/api/reserve-a-table
*/
const urlPost = "https://a84b5290-01dc-4f11-9bce-56f76278f9b5.mock.pstmn.io/api/reserve-a-table";


const BookingForm = (props) => {
    const navigate = useNavigate();
    const {isLoading, response, submit} = useSubmit();
    const [selectedTable, setSelectedTable] = useState("inside");
    const [selectedNeeds, setSelectedNeeds] = useState("no");
    const [formData, setFormData] = useState({date: null, time: null, tablePreference: null, acessilityNeeds: null});
    const [pastDate, setPastDate] = useState(false);
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


    const formik = useFormik({
        initialValues: {
            guests: "2",
            occasion: '',
            comment: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        },
        onSubmit: (values) => {
            console.log(Object.assign(values, formData));
            submit(urlPost, Object.assign(values, formData));
        },
        validationSchema: Yup.object({
            comment: Yup.string().min(3, "Must be 3 characters at minimum.").max(500, "Must be 500 characters at maximum."),
            firstName: Yup.string().required("Required").max(50, "Must be 50 characters at maximum."),
            lastName: Yup.string().required("Required").max(50, "Must be 50 characters at maximum."),
            email: Yup.string().email("Invalid email address.").required("Required"),
            phone: Yup.string().matches(/^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/, "Phone number must be in international format."),
        }),
    });


    useEffect(() => {
        setFormData({
            date: props.availableTimes.date,
            time: props.availableTimes.selected_time,
            tablePreference: selectedTable,
            acessilityNeeds: selectedNeeds,
        });
    }, [props.availableTimes.date, props.availableTimes.selected_time, selectedTable, selectedNeeds]);

    useEffect(() => {
        if (response) {
            setServerResponse(response);
            if (response.hasOwnProperty('success')) {
                console.log("Form Submitted");
                const timeList = props.availableTimes.time.filter(item => item !== props.availableTimes.selected_time);
                props.dispatch({type: "SET_DATA", payload: {
                    time: timeList,
                    selected_time: timeList[0]
                }});
                formik.resetForm();
                setSelectedTable("inside");
                setSelectedNeeds("no");
                navigate("/confirmed-reservation");
            };
        };
    }, [response, navigate, setServerResponse, props, formik]);

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
        if (parentNode.classList.contains('details-button') ||
            parentNode.classList.contains("fa-utensils") ||
            parentNode.parentNode.classList.contains("arrow-to-details") ||
            parentNode.classList.contains("arrow-to-details")
            ) {
            detailsFormRef.current.removeAttribute('hidden');
            reservationFormRef.current.setAttribute('hidden', 'true');
            clientFormRef.current.setAttribute('hidden', 'true');
            submitButtonRef.current.setAttribute('hidden', 'true');
            stepOne.current.style.borderTop = '2px solid #f4ce14';
            detailsButton.current.style.color = '#495E57';
            stepTwo.current.style.borderTop = '1px dashed #d4d6d6';
            clientButton.current.style.color = '#8d8e8e';
        };
        if (parentNode.classList.contains('reservation-button') ||
            parentNode.classList.contains("fa-calendar-check") ||
            parentNode.parentNode.classList.contains("arrow-to-reservation") ||
            parentNode.classList.contains("arrow-to-reservation")
            ) {
            reservationFormRef.current.removeAttribute('hidden');
            detailsFormRef.current.setAttribute('hidden', 'true');
            clientFormRef.current.setAttribute('hidden', 'true');
            submitButtonRef.current.setAttribute('hidden', 'true');
            stepOne.current.style.borderTop = '1px dashed #d4d6d6';
            detailsButton.current.style.color = '#8d8e8e';
            stepTwo.current.style.borderTop = '1px dashed #d4d6d6';
            clientButton.current.style.color = '#8d8e8e';
        };
        if (parentNode.classList.contains('client-button') ||
            parentNode.classList.contains("fa-user") ||
            parentNode.parentNode.classList.contains("arrow-to-client") ||
            parentNode.classList.contains("arrow-to-client")
            ) {
            clientFormRef.current.removeAttribute('hidden');
            submitButtonRef.current.removeAttribute('hidden');
            reservationFormRef.current.setAttribute('hidden', 'true');
            detailsFormRef.current.setAttribute('hidden', 'true');
            stepOne.current.style.borderTop = '2px solid #f4ce14';
            detailsButton.current.style.color = '#495E57';
            stepTwo.current.style.borderTop = '2px solid #f4ce14';
            clientButton.current.style.color = '#495E57';
        };
    };

    return (
        <section className="section form-section">
            <div className="step-group-one" ref={stepOne}>
                <div className="reservation-button" aria-label="form-first-part" role="button" onClick={handleClick}>
                    <FontAwesomeIcon  icon={faCalendarCheck} size="lg" style={{backgroundColor: "white"}}/>
                    <span>Reservation</span>
                </div>
                <div className="details-button" aria-label="form-second-part" role="button" onClick={handleClick} ref={detailsButton}>
                    <FontAwesomeIcon icon={faUtensils}  size="lg" style={{backgroundColor: "white"}}/>
                    <span>Details</span>
                </div>
            </div>
            <div className="step-group-two" ref={stepTwo}>
                <div className="client-button" aria-label="form-third-part" role="button" onClick={handleClick} ref={clientButton}>
                    <FontAwesomeIcon icon={faUser}  size="lg" style={{backgroundColor: "white"}}/>
                    <span>Client</span>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                { response !== null && response.hasOwnProperty('error') && (
                <div className="error-message text-center">
                    Sorry, something went wrong 😟<br/><br/>
                    Error: {response.error.message}<br/><br/>
                    Please try again later 🤗
                </div>
                )}
                <fieldset id="reservationForm" ref={reservationFormRef}>
                    <div className="form-group">
                        <label htmlFor="number-of-guests">Number of Guests:</label>
                        <select
                            id="number-of-guests"
                            className="form-control"
                            {...formik.getFieldProps("guests")}
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
                                    setPastDate(false);
                                    props.dispatch({type: "SET_DATA", payload: {date: e.target.value}});
                                } else {
                                    setPastDate(true);
                                    setTimeout(() => setPastDate(false), 2500);
                                };
                            }}
                            className="form-control"
                        />
                        {pastDate && <div className="error-message">Unable to choose past dates.</div>}
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
                        {props.availableTimes.selected_time === undefined && <div className="error-message">No times available. Choose another date.</div>}
                    </div>
                    <div className="float-right text-primary arrow-to-details" role="button" onClick={handleClick}>
                        <FontAwesomeIcon icon={faCircleArrowRight}  size="lg" />
                    </div>
                </fieldset>
                <fieldset id="detailsForm" hidden ref={detailsFormRef}>
                    <div className="form-group">
                        <label htmlFor="occasion">Occasion:</label>
                        <select className="form-control" {...formik.getFieldProps("occasion")} >
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
                        <label>Accessibility Needs:</label>
                        <RadioGroup onChange={setSelectedNeeds} selected={selectedNeeds}>
                            <RadioOption value="no">No</RadioOption>
                            <RadioOption value="yes">Yes</RadioOption>
                        </RadioGroup>
                        { selectedNeeds === "yes" && !formik.values.comment && <div className="error-message">Provide more details in the comment field.</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <textarea id="comment" name="comment" rows={4} className="form-control" {...formik.getFieldProps("comment")} />
                        <div className="error-message">{formik.errors.comment}</div>
                    </div>
                    <div className="float-left text-primary arrow-to-reservation" role="button" onClick={handleClick}>
                        <FontAwesomeIcon icon={faCircleArrowLeft}  size="lg" />
                    </div>
                    <div className="float-right text-primary arrow-to-client" role="button" onClick={handleClick}>
                        <FontAwesomeIcon icon={faCircleArrowRight}  size="lg" />
                    </div>
                </fieldset>
                <fieldset id="clientForm" hidden ref={clientFormRef}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" autoComplete="given-name" id="firstName" maxLength="50" required className="form-control" {...formik.getFieldProps("firstName")} />
                        {formik.touched.firstName && formik.errors.firstName &&<div className="error-message">{formik.errors.firstName}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" autoComplete="family-name" id="lastName" maxLength="50" required className="form-control" {...formik.getFieldProps("lastName")} />
                        {formik.touched.lastName && formik.errors.lastName &&<div className="error-message">{formik.errors.lastName}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" autoComplete="email" id="email" required className="form-control" {...formik.getFieldProps("email")} />
                        {formik.touched.email && formik.errors.email &&<div className="error-message">{formik.errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="tel"
                            autoComplete="tel"
                            id="phone"
                            className="form-control"
                            pattern="\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$"
                            {...formik.getFieldProps("phone")}
                        />
                        <div className="error-message">{formik.errors.phone}</div>
                    </div>
                    <div className="float-left text-primary arrow-to-details" role="button" onClick={handleClick}>
                        <FontAwesomeIcon icon={faCircleArrowLeft}  size="lg" />
                    </div>
                </fieldset>
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={
                            props.availableTimes.selected_time === undefined || isLoading || !formik.isValid || formik.values.firstName === ''
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