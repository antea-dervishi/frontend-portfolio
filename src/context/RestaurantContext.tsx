import React, { createContext, useEffect, useState } from 'react';
import { Restaurant } from '../interfaces/Restaurant';

interface Review {
  id: number;
  author: string;
  comment: string;
  stars: number;
}

interface RestaurantContextType {
  restaurants: Restaurant[];
  toggleFavorite: (id: string) => void;
  addReview: (restaurantId: string, review: Review) => void;
}

export const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await fetch('http://localhost:5001/restaurants');
      const data = await res.json();
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

      const updatedRestaurants = data.map((r: Restaurant) => ({
        ...r,
        isFavorite: storedFavorites.includes(r.id),
      }));

      setRestaurants(updatedRestaurants);
    };

    fetchRestaurants();
  }, []);

  const toggleFavorite = (id: string) => {
    const updated = restaurants.map((r) =>
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    );
    setRestaurants(updated);

    const newFavorites = updated
      .filter((r) => r.isFavorite)
      .map((r) => r.id);

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const addReview = (restaurantId: string, review: Review) => {
    const updated = restaurants.map((r) =>
      r.id === restaurantId
        ? {
            ...r,
            reviewsList: [...(r.reviewsList || []), review],
          }
        : r
    );

    setRestaurants(updated);

    const updatedRestaurant = updated.find((r) => r.id === restaurantId);
    if (updatedRestaurant) {
      fetch(`http://localhost:5001/restaurants/${restaurantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRestaurant),
      });
    }
  };

  return (
    <RestaurantContext.Provider value={{ restaurants, toggleFavorite, addReview }}>
      {children}
    </RestaurantContext.Provider>
  );
};
