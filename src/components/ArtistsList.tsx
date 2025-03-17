import React from 'react';
import ArtistItem from './ArtistItem';
import { Artist } from '../types';
import '../styles/ArtistsList.css';

interface ArtistsListProps {
  artists: Artist[];
}

const ArtistsList: React.FC<ArtistsListProps> = ({ artists }) => {
  return (
    <div className="artists-list">
      <h2 className="section-title">Browse the artists</h2>
      {artists.map((artist) => (
        <ArtistItem key={artist.id} artist={artist} />
      ))}
    </div>
  );
};

export default ArtistsList;
