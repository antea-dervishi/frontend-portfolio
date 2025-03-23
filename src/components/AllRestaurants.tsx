import React, { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantCard from './RestaurantCard';
import './AllRestaurants.css';

const AllRestaurants: React.FC = () => {
  const context = useContext(RestaurantContext);

  if (!context) return <p>Loading context...</p>;

  const { restaurants } = context;

  if (restaurants.length === 0) return <p>Loading restaurants...</p>;

  return (
    <>
      <h1 className="all-restaurants-title">All Restaurants</h1>
      <div className="all-restaurants">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </>
  );
};

export default AllRestaurants;
