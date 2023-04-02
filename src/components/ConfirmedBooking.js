import success from '../assets/images/85744-success.gif'

const ConfirmedBooking = (props) => {
    return (
        <section className="section confirmed-reservation-section">
            <article className='confirmed-reservation-container'>
                <img src={success} alt="success-background" className='bg-success-gif'/>
                <div className="success-info">
                    <h1>{props.serverResponse.success.header}</h1>
                    <p>{props.serverResponse.success.message}</p>
                    <p>{props.serverResponse.success.footer}</p>
                </div>
            </article>
        </section>
    );
};

export default ConfirmedBooking;