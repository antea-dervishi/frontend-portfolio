import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Restaurant } from '../interfaces/Restaurant';
import './RestaurantCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { RestaurantContext } from '../context/RestaurantContext';

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  const context = useContext(RestaurantContext);

  const currentReviews = Array.isArray(restaurant.reviewsList)
    ? restaurant.reviewsList
    : [];

  const averageRating =
    currentReviews.length > 0
      ? (
          currentReviews.reduce((acc, r) => acc + r.stars, 0) /
          currentReviews.length
        ).toFixed(1)
      : null;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    context?.toggleFavorite(restaurant.id);
  };

  return (
    <div className="restaurant-card">
      <Link to={`/restaurants/${restaurant.id}`} className="card-link">
        <div className="image-container">
          {restaurant.image && (
            <img
              src={restaurant.image}
              alt={restaurant.businessname || 'restaurant'}
              className="restaurant-image"
            />
          )}
          <div className="favorite-icon" onClick={handleFavoriteClick}>
            <FontAwesomeIcon
              icon={restaurant.isFavorite ? solidHeart : regularHeart}
              className="heart-icon"
            />
          </div>
        </div>
        <div className="restaurant-info">
          <h3 className="restaurant-name">
            {restaurant.businessname?.toLowerCase() || 'Unknown'}
          </h3>
          <p className="restaurant-type">{restaurant.restauranttype || 'Unknown Type'}</p>
          {averageRating && (
            <p className="restaurant-rating">
              rating - {averageRating},<br />
              based on {currentReviews.length} review{currentReviews.length > 1 ? 's' : ''}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
