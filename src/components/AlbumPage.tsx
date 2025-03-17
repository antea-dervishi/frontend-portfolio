import React from 'react';
import { useParams } from 'react-router-dom';
import { Artist, Album } from '../types';
import '../styles/AlbumPage.css';

interface AlbumPageProps {
  artists: Artist[];
}

const AlbumPage: React.FC<AlbumPageProps> = ({ artists }) => {
  const { albumId } = useParams<{ albumId: string }>();
  let album: Album | undefined;

  artists.forEach((artist) => {
    const foundAlbum = artist.albums.find((a) => a.albumId === albumId);
    if (foundAlbum) {
      album = foundAlbum;
    }
  });

  if (!album) {
    return <div className="album-page">Album not found</div>;
  }

  return (
    <div className="album-page">
      <img src={`/images/albums/${album.cover}.jpg`} alt={album.title} className="album-image3" />
      <p className="album-title"><strong>Title:</strong> {album.title}</p>
      <p className="album-year"><strong>Year:</strong> {album.year}</p>
<p className="album-price"><strong>Price:</strong> ${album.price}</p>

    </div>
  );
};

export default AlbumPage;
