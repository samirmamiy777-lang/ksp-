import React, { useEffect, useState } from 'react';
import { getTracks, createTrack, updateTrack, deleteTrack, getAlbums } from '../api';

const empty = { title: '', duration_sec: '', album_id: '' };
const fmt = (s) => s ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}` : '—';

export default function TracksPage() {
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const [t, a] = await Promise.all([getTracks(), getAlbums()]);
      setTracks(t);
      setAlbums(a);
    } catch { setError('Ошибка загрузки'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(empty); setEditId(null); setModal(true); };
  const openEdit = (t) => {
    setForm({ title: t.title, duration_sec: t.duration_sec || '', album_id: t.album_id });
    setEditId(t.id);
    setModal(true);
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.album_id) return setError('Название и альбом обязательны');
    setError('');
    try {
      const data = { ...form, album_id: +form.album_id, duration_sec: form.duration_sec ? +form.duration_sec : null };
      if (editId) await updateTrack(editId, data);
      else await createTrack(data);
      setModal(false);
      load();
    } catch { setError('Ошибка сохранения'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить трек?')) return;
    await deleteTrack(id);
    load();
  };

  const filtered = tracks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    (t.album?.title || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Треки</h1>
      {error && <div className="error">{error}</div>}
      <div className="toolbar">
        <input placeholder="Поиск по треку или альбому..." value={search} onChange={e => setSearch(e.target.value)} />
        <button className="btn btn-primary" onClick={openCreate}>+ Добавить</button>
      </div>

      {loading ? <div className="loading">Загрузка...</div> : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Название</th>
                <th>Альбом</th>
                <th>Музыкант</th>
                <th>Длительность</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.title}</td>
                  <td>{t.album?.title || '—'}</td>
                  <td>{t.album?.musician?.full_name || '—'}</td>
                  <td>{fmt(t.duration_sec)}</td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => openEdit(t)}>Изменить</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t.id)}>Удалить</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{editId ? 'Редактировать трек' : 'Новый трек'}</h2>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
              <label>Название *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Альбом *</label>
              <select value={form.album_id} onChange={e => setForm({ ...form, album_id: e.target.value })}>
                <option value="">— выберите —</option>
                {albums.map(a => <option key={a.id} value={a.id}>{a.title} ({a.musician?.full_name})</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Длительность (секунды)</label>
              <input type="number" min="1" value={form.duration_sec} onChange={e => setForm({ ...form, duration_sec: e.target.value })} />
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setModal(false)}>Отмена</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Сохранить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
