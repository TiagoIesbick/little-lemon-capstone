export default function About() {
    return (
        <section className="section about-section">
            <div className="about-description text-primary">
                <h2>Little Lemon</h2>
                <h3 className="text-secondary">Chicago</h3>
                <p>
                We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                </p>
                <p>
                Indulge in a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment.
                </p>
                <p>
                We offer a locally-sourced menu with daily specials.
                </p>
            </div>
            <div className="about-photos">
                <div className="top-photo">
                    <img className="img-border" src="https://www.escoffier.edu/wp-content/uploads/2021/12/Smiling-chef-holding-two-white-plates-with-salad-in-a-kitchen-768-1.jpeg" alt="smiling-chef" />
                </div>
                <div className="bottom-photo">
                    <img src="https://www.escoffier.edu/wp-content/uploads/2021/12/Male-chef-with-black-bandana-cutting-ingredients-with-a-knife-in-the-kitchen-768.jpg" alt="male-chef" />
                </div>
            </div>
        </section>
    );
};