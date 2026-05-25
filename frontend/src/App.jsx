import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import MusiciansPage from './pages/MusiciansPage';
import AlbumsPage from './pages/AlbumsPage';
import TracksPage from './pages/TracksPage';
import GenresPage from './pages/GenresPage';

export default function App() {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="brand">🎵 МузыкантDB</NavLink>
        <NavLink to="/" end>Музыканты</NavLink>
        <NavLink to="/albums">Альбомы</NavLink>
        <NavLink to="/tracks">Треки</NavLink>
        <NavLink to="/genres">Жанры</NavLink>
      </nav>
      <Routes>
        <Route path="/"        element={<MusiciansPage />} />
        <Route path="/albums"  element={<AlbumsPage />} />
        <Route path="/tracks"  element={<TracksPage />} />
        <Route path="/genres"  element={<GenresPage />} />
      </Routes>
    </>
  );
}
