import React, { useEffect, useState } from 'react';
import { getAlbums, createAlbum, updateAlbum, deleteAlbum, getMusicians } from '../api';

const empty = { title: '', release_year: '', musician_id: '' };

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [musicians, setMusicians] = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const [a, m] = await Promise.all([getAlbums(), getMusicians()]);
      setAlbums(a);
      setMusicians(m);
    } catch { setError('Ошибка загрузки'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(empty); setEditId(null); setModal(true); };
  const openEdit = (a) => {
    setForm({ title: a.title, release_year: a.release_year || '', musician_id: a.musician_id });
    setEditId(a.id);
    setModal(true);
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.musician_id) return setError('Название и музыкант обязательны');
    setError('');
    try {
      const data = { ...form, musician_id: +form.musician_id, release_year: form.release_year ? +form.release_year : null };
      if (editId) await updateAlbum(editId, data);
      else await createAlbum(data);
      setModal(false);
      load();
    } catch { setError('Ошибка сохранения'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить альбом?')) return;
    await deleteAlbum(id);
    load();
  };

  const filtered = albums.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    (a.musician?.full_name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Альбомы</h1>
      {error && <div className="error">{error}</div>}
      <div className="toolbar">
        <input placeholder="Поиск по названию или музыканту..." value={search} onChange={e => setSearch(e.target.value)} />
        <button className="btn btn-primary" onClick={openCreate}>+ Добавить</button>
      </div>

      {loading ? <div className="loading">Загрузка...</div> : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Название</th>
                <th>Музыкант</th>
                <th>Год</th>
                <th>Треков</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.title}</td>
                  <td>{a.musician?.full_name || '—'}</td>
                  <td>{a.release_year || '—'}</td>
                  <td>{a.tracks?.length ?? 0}</td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => openEdit(a)}>Изменить</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a.id)}>Удалить</button>
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
            <h2>{editId ? 'Редактировать альбом' : 'Новый альбом'}</h2>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
              <label>Название *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Музыкант *</label>
              <select value={form.musician_id} onChange={e => setForm({ ...form, musician_id: e.target.value })}>
                <option value="">— выберите —</option>
                {musicians.map(m => <option key={m.id} value={m.id}>{m.full_name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Год выпуска</label>
              <input type="number" min="1900" max="2100" value={form.release_year} onChange={e => setForm({ ...form, release_year: e.target.value })} />
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
