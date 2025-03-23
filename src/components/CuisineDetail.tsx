
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantCard from './RestaurantCard';
import './CuisineDetail.css';

const CuisineDetail: React.FC = () => {
  const { type } = useParams();
  const context = useContext(RestaurantContext);
  if (!context) return <p>Loading...</p>;

  const { restaurants } = context;
  const filtered = restaurants.filter(
    (restaurant) => restaurant.restauranttype === type
  );

  return (
    <div className="cuisine-detail">
      <h2 className="cuisine-type-title">{type?.toUpperCase()} RESTAURANTS</h2>
      <div className="restaurant-list">
        {filtered.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default CuisineDetail;