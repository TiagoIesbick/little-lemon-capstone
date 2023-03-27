const ConfirmedBooking = (props) => {
    const response = props.serverResponse.message ? <h1>{props.serverResponse.message}</h1> : <h1>{props.serverResponse.error.message}</h1>

    return response
};

export default ConfirmedBooking;