
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext';
import './SurpriseRestaurant.css';

const SurpriseRestaurant: React.FC = () => {
  const context = useContext(RestaurantContext);

  if (!context) return <p>Loading...</p>;

  const { restaurants } = context;

  const getRandomRestaurant = () => {
    if (restaurants.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    return restaurants[randomIndex];
  };

  const randomRestaurant = getRandomRestaurant();

  if (!randomRestaurant) return <p>No restaurants available</p>;

  return (
    <div className="surprise-container">
      <h2>Don't know what to eat?</h2>
      <Link to={`/restaurants/${randomRestaurant.id}`} className="surprise-button">
        Surprise me!
      </Link>
    </div>
  );
};

export default SurpriseRestaurant;
