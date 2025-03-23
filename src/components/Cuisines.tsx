
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext';
import './Cuisines.css';

const Cuisines: React.FC = () => {
  const context = useContext(RestaurantContext);
  if (!context) return <p>Loading...</p>;

  const { restaurants } = context;
  const cuisineTypes = Array.from(new Set(restaurants.map(r => r.restauranttype))).filter(Boolean);

  return (
    <div className="cuisine-buttons-home">
      <h2 className="cuisine-title">CUISINES</h2>
      <div className="cuisine-buttons">
        {cuisineTypes.map((type) => (
          <Link to={`/cuisine/${type}`} key={type} className="cuisine-button">
            {type}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cuisines;