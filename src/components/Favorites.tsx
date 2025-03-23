
import React, { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantCard from './RestaurantCard';
import './Favorites.css';

const Favorites: React.FC = () => {
  const context = useContext(RestaurantContext);
  if (!context) return <p>Loading...</p>;

  const { restaurants } = context;
  const favoriteRestaurants = restaurants.filter(r => r.isFavorite);

  return (
    <div className="favorites-page">
      <h2 className="favorites-title">Your Favorite Restaurants</h2>
      {favoriteRestaurants.length > 0 ? (
        <div className="restaurant-list">
          {favoriteRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <p className="no-favorites">You haven't added any favorites yet.</p>
      )}
    </div>
  );
};

export default Favorites;