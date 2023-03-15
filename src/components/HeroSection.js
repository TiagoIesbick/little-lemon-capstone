export default function HeroSection() {
    return (
        <section className="section hero-section bg-primary">
            <div className='hero-section-description'>
                <h1 className='text-secondary'>Little Lemon</h1>
                <h2 className='text-white'>Chicago</h2>
                <p className='text-white'>
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