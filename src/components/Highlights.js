import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const data = [
    {
      id: "1",
      title: "Greek salad",
      description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, gernished with crunchy garlic and rosemary croutons. ",
      image: require('../assets/images/product_1.jpg'),
      price: "$12.99",
    },
    {
      id: "2",
      title: "Bruschetta",
      description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
      image: require('../assets/images/product_2.jpg'),
      price: "$5.99",
    },
    {
      id: "3",
      title: "Penne pasta",
      description: "This penne pasta is a Mediterranean-style family staple",
      image: require('../assets/images/product_3.jpg'),
      price: "$6.00",
    }
];

export default function Highlights() {
    const listItems = data.map(item => {
        return (
            <article key={item.id} className="article-box">
                <img src={item.image} alt="menu-item" className='specials-image'/>
                <div className="specials-details">
                    <div className='title'>
                        {item.title}
                    <span className='text-price'>{item.price}</span>
                    </div>
                    <p className='item-description'>{item.description}</p>
                    <p className='item-delivery'>
                        Order a delivery <FontAwesomeIcon icon={faMotorcycle} />
                    </p>
                </div>
            </article>
        );
    });

    return (
        <section className="section highlights-section">
            <header>
                <h2 className='text-primary'>Specials</h2>
                <Link to="/menu"><button className="bg-secondary">Online Menu</button></Link>
            </header>
            <div className="articles-container">
                {listItems}
            </div>
        </section>
    );
};