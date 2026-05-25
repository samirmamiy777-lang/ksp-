import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// --- Жанры ---
export const getGenres       = ()          => api.get('/genres').then(r => r.data);
export const getGenre        = (id)        => api.get(`/genres/${id}`).then(r => r.data);
export const createGenre     = (data)      => api.post('/genres', data).then(r => r.data);
export const updateGenre     = (id, data)  => api.put(`/genres/${id}`, data).then(r => r.data);
export const deleteGenre     = (id)        => api.delete(`/genres/${id}`);

// --- Музыканты ---
export const getMusicians    = ()          => api.get('/musicians').then(r => r.data);
export const getMusician     = (id)        => api.get(`/musicians/${id}`).then(r => r.data);
export const createMusician  = (data)      => api.post('/musicians', data).then(r => r.data);
export const updateMusician  = (id, data)  => api.put(`/musicians/${id}`, data).then(r => r.data);
export const deleteMusician  = (id)        => api.delete(`/musicians/${id}`);

// --- Альбомы ---
export const getAlbums       = ()          => api.get('/albums').then(r => r.data);
export const getAlbum        = (id)        => api.get(`/albums/${id}`).then(r => r.data);
export const createAlbum     = (data)      => api.post('/albums', data).then(r => r.data);
export const updateAlbum     = (id, data)  => api.put(`/albums/${id}`, data).then(r => r.data);
export const deleteAlbum     = (id)        => api.delete(`/albums/${id}`);

// --- Треки ---
export const getTracks       = ()          => api.get('/tracks').then(r => r.data);
export const getTrack        = (id)        => api.get(`/tracks/${id}`).then(r => r.data);
export const createTrack     = (data)      => api.post('/tracks', data).then(r => r.data);
export const updateTrack     = (id, data)  => api.put(`/tracks/${id}`, data).then(r => r.data);
export const deleteTrack     = (id)        => api.delete(`/tracks/${id}`);
