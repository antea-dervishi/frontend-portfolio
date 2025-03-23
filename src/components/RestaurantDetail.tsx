import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext';
import './RestaurantDetail.css';

const RestaurantDetail: React.FC = () => {
  const { id } = useParams();
  const context = useContext(RestaurantContext);

  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [stars, setStars] = useState(0);

  if (!context || !id) return <p>Loading...</p>;
  const { restaurants, toggleFavorite, addReview } = context;
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) return <p>Restaurant not found</p>;

  const currentReviews = Array.isArray(restaurant.reviewsList) ? restaurant.reviewsList : [];



  const averageRating =
  currentReviews.length > 0
    ? (
        currentReviews.reduce((sum: number, r: { stars: number }) => sum + r.stars, 0) / currentReviews.length
      ).toFixed(1)
    : null;


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment || stars < 1 || stars > 5) return;
    const newReview = {
      id: Date.now(),
      author,
      comment,
      stars,
    };
    addReview(restaurant.id, newReview);
    setAuthor('');
    setComment('');
    setStars(0);
  };

  return (
    <div className="restaurant-detail">
      <h1>{restaurant.businessname.toUpperCase()}</h1>
      <div className="restaurant-detail-2">
        <img src={restaurant.image} alt={restaurant.businessname} className="detail-image" />
        <div className="text-detail">
          {averageRating && (
            <p>
              <strong>rating -</strong> {averageRating}, based on {currentReviews.length} review{currentReviews.length > 1 ? 's' : ''}
            </p>
          )}
          {restaurant.phone && <p>{restaurant.phone}</p>}
          {restaurant.email && <p>{restaurant.email}</p>}
          {restaurant.address && <p>{restaurant.address}</p>}
          {restaurant.parkinglot && <p> We have a parking lot waiting for you!</p>}
        </div>
      </div>

      {currentReviews.length > 0 && (
        <>
          <h2>Reviews</h2>
          <div className="reviews">
        {currentReviews.map((review) => (
          <div key={review.id} className="review">
            <p><strong>Author:</strong> {review.author}</p>
            <p><strong>Message:</strong> {review.comment}</p>
            <p><strong>Stars:</strong> {review.stars}</p>
          </div>
        ))}
      </div>
      </>
      )}

      <form onSubmit={handleSubmit} className="review-form">
        <h2>Review Form</h2>
        <label>Name</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <label>Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <label>Stars</label>
        <input
          type="range"
          min={1}
          max={5}
          value={stars}
          onChange={(e) => setStars(parseInt(e.target.value))}
        />
        <button type="submit" className="submit">Leave a review</button>
      </form>
    </div>
  );
};

export default RestaurantDetail;