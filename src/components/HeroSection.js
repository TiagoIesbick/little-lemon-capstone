export default function HeroSection() {
    return (
        <section className="section hero-section bg-primary">
            <h1 className='text-secondary'>Little Lemon</h1>
            <div className='hero-section-description text-white'>
                <h2>Chicago</h2>
                <p>
                    We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                </p>
                <button className='bg-secondary'>Reserve a Table</button>
            </div>
            <div className='hero-section-image'>
                <div className='hero-box-image'>
                </div>
            </div>
        </section>
    );
};