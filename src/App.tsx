
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RestaurantProvider } from './context/RestaurantContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AllRestaurants from './components/AllRestaurants';
import RestaurantDetail from './components/RestaurantDetail';
import PopularRestaurants from './components/PopularRestaurants';
import SurpriseRestaurant from './components/SurpriseRestaurant';
import Cuisines from './components/Cuisines';
import CuisineDetail from './components/CuisineDetail';
import Favorites from './components/Favorites';
import './App.css';

const App: React.FC = () => {
  return (
    <RestaurantProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SurpriseRestaurant />
                <PopularRestaurants />
                <Cuisines />
                <AllRestaurants />
              </>
            }
          />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          <Route path="/popular" element={<PopularRestaurants />} />
          <Route path="/cuisine/:type" element={<CuisineDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<p>404 - Page Not Found</p>} />
        </Routes>
        <Footer />
      </Router>
    </RestaurantProvider>
  );
};

export default App;
