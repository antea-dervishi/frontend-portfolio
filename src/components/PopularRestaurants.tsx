import React, { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantCard from './RestaurantCard';
import './PopularRestaurants.css';

const PopularRestaurants: React.FC = () => {
  const context = useContext(RestaurantContext);

  if (!context) return <p>Loading...</p>;

  const { restaurants } = context;

  const reviewed = restaurants
    .filter(r => Array.isArray((r as any).reviewsList) && (r as any).reviewsList.length > 0)
    .map(r => {
      const reviews = (r as any).reviewsList;
      const average = reviews.reduce((acc: number, review: any) => acc + review.stars, 0) / reviews.length;
      return { ...r, averageRating: average };
    })
    .sort((a, b) => b.averageRating - a.averageRating);

  const nonReviewed = restaurants.filter(r => !Array.isArray((r as any).reviewsList) || (r as any).reviewsList.length === 0);

  const top10 = [...reviewed.slice(0, 10), ...nonReviewed].slice(0, 10);

  return (
    <div className="popular-restaurants">
      <h2 className="popular-title">Popular Restaurants</h2>
      <div className="popular-grid">
        {top10.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default PopularRestaurants;
