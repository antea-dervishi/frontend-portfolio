import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArtistsList from './components/ArtistsList';
import ArtistPage from './components/ArtistPage';
import AlbumPage from './components/AlbumPage';
import artists from './data/db';
import './App.css'; 

const App: React.FC = () => {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ArtistsList artists={artists} />} />
          <Route path="/artist/:id" element={<ArtistPage artists={artists} />} />
          <Route path="/album/:albumId" element={<AlbumPage artists={artists} />} />
        </Routes>
    </Router>
  );
};

export default App;
