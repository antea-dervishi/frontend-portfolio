import React from 'react';
import { Link } from 'react-router-dom';
import { Album } from '../types';
import '../styles/AlbumsList.css';

interface AlbumsListProps {
  albums: Album[];
}

const AlbumsList: React.FC<AlbumsListProps> = ({ albums }) => {
  return (
    <div className="albums-container">
      {albums.map((album) => (
        <Link key={album.albumId} to={`/album/${album.albumId}`} className="album-item">
          <img src={`/images/albums/${album.cover}.jpg`} alt={album.title} className="album-image" />
        </Link>
      ))}
    </div>
  );
};

export default AlbumsList;
