import React, { useEffect, useState } from 'react';
import { getMusicians, createMusician, updateMusician, deleteMusician, getGenres } from '../api';

const empty = { full_name: '', birth_date: '', country: '', biography: '', genre_id: '' };

export default function MusiciansPage() {
  const [musicians, setMusicians] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const [m, g] = await Promise.all([getMusicians(), getGenres()]);
      setMusicians(m);
      setGenres(g);
    } catch { setError('Ошибка загрузки данных'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(empty); setEditId(null); setModal(true); };
  const openEdit = (m) => {
    setForm({
      full_name: m.full_name,
      birth_date: m.birth_date ? m.birth_date.slice(0, 10) : '',
      country: m.country || '',
      biography: m.biography || '',
      genre_id: m.genre_id || '',
    });
    setEditId(m.id);
    setModal(true);
  };

  const handleSubmit = async () => {
    if (!form.full_name.trim()) return setError('Имя обязательно');
    setError('');
    try {
      const data = { ...form, genre_id: form.genre_id ? +form.genre_id : null };
      if (editId) await updateMusician(editId, data);
      else await createMusician(data);
      setModal(false);
      load();
    } catch { setError('Ошибка сохранения'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить музыканта?')) return;
    await deleteMusician(id);
    load();
  };

  const filtered = musicians.filter(m =>
    m.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Музыканты</h1>
      {error && <div className="error">{error}</div>}
      <div className="toolbar">
        <input
          placeholder="Поиск по имени..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={openCreate}>+ Добавить</button>
      </div>

      {loading ? <div className="loading">Загрузка...</div> : (
        <div className="cards">
          {filtered.map(m => (
            <div className="card" key={m.id}>
              <h3>{m.full_name}</h3>
              {m.genre && <span className="genre-badge">{m.genre.name}</span>}
              {m.country && <p>🌍 {m.country}</p>}
              {m.birth_date && <p>🎂 {m.birth_date.slice(0, 10)}</p>}
              <p>💿 Альбомов: {m.albums?.length ?? 0}</p>
              {m.biography && <p style={{ marginTop: 8, fontSize: 12, color: '#888' }}>{m.biography.slice(0, 80)}...</p>}
              <div className="actions">
                <button className="btn btn-secondary btn-sm" onClick={() => openEdit(m)}>Изменить</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.id)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{editId ? 'Редактировать музыканта' : 'Новый музыкант'}</h2>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
              <label>Имя *</label>
              <input value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Дата рождения</label>
              <input type="date" value={form.birth_date} onChange={e => setForm({ ...form, birth_date: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Страна</label>
              <input value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Жанр</label>
              <select value={form.genre_id} onChange={e => setForm({ ...form, genre_id: e.target.value })}>
                <option value="">— не выбран —</option>
                {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Биография</label>
              <textarea value={form.biography} onChange={e => setForm({ ...form, biography: e.target.value })} />
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
