import React from 'react';
import { useParams } from 'react-router-dom';
import AlbumsList from './AlbumsList';
import { Artist } from '../types';
import '../styles/ArtistPage.css';

interface ArtistPageProps {
  artists: Artist[];
}
const ArtistPage: React.FC<ArtistPageProps> = ({ artists }) => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>Invalid artist ID</div>;
  }

  const artistId = parseInt(id, 10);
  if (isNaN(artistId)) {
    return <div>Invalid artist ID</div>;
  }
  const artist = artists.find((a) => a.id === artistId);
  if (!artist) {
    return <div>Artist not found</div>;
  }
  return (
    <div className="artist-page">
      <img src={`/images/covers/${artist.cover}.jpg`} alt={artist.name} className="artist-image2" />
      <h1 className="section-title">{artist.name}</h1>
      <p className="artist-bio">{artist.bio}</p>
      <AlbumsList albums={artist.albums} />
    </div>
  );
};

export default ArtistPage;
