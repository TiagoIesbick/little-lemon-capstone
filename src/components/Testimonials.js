import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const reviews = [
    {
        id: "1",
        first_name: "John",
        rating: "5",
        image: "https://media.timeout.com/images/105864444/1024/576/image.jpg",
        review: "The best restaurant in town.",
    },
    {
        id: "2",
        first_name: "Adrian",
        rating: "5",
        image: "https://www.ezcater.com/lunchrush/wp-content/uploads/sites/2/2021/07/Zoes-Kitchen-Mediterranean-Chicken-Plate-1536x1536.jpg.webp",
        review: "Delicius food",
    },
    {
        id: "3",
        first_name: "Chris",
        rating: "5",
        image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2010/10/4/0/FNM_110110-Weeknight-Dinners-030_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382539738027.jpeg",
        review: "It's a cozy place and the food is just delicious",
    },
    {
        id: "4",
        first_name: "Karen",
        rating: "4",
        image: "https://www.receiteria.com.br/wp-content/uploads/Bruschetta.jpg",
        review: "I recommend ordering the bruschetta 😋",
    },
];

export default function Testimonials() {
    const reviewsList = reviews.map(review => {
        let stars = [];
        for (let i = 0; i < Number(review.rating); i++) {
            stars.push(<FontAwesomeIcon icon={faStar} key={i} className="text-secondary"/>);
        };
        for (let j = Number(review.rating); j < 5; j++) {
            stars.push(<FontAwesomeIcon icon={faStarRegular} key={j} className="text-secondary"/>);
        };
        return (
            <article key={review.id} className="article-box-testimonials">
                {stars}
                <div className="grid-img-name">
                    <img src={review.image} alt="review" className='review-image' />
                    <div className="first-name">
                        {review.first_name}
                    </div>
                </div>
                <div className='user-review'>
                    {review.review}
                </div>
            </article>
        );
    });

    return (
        <section className='section testimonials-section'>
            <h2 className='text-primary'>Testimonials</h2>
            <div className='articles-container'>
                {reviewsList}
            </div>
        </section>
    );
};
