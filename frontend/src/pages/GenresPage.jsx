import React, { useEffect, useState } from 'react';
import { getGenres, createGenre, updateGenre, deleteGenre } from '../api';

const empty = { name: '', description: '' };

export default function GenresPage() {
  const [genres, setGenres] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try { setGenres(await getGenres()); }
    catch { setError('Ошибка загрузки'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(empty); setEditId(null); setModal(true); };
  const openEdit = (g) => { setForm({ name: g.name, description: g.description || '' }); setEditId(g.id); setModal(true); };

  const handleSubmit = async () => {
    if (!form.name.trim()) return setError('Название обязательно');
    setError('');
    try {
      if (editId) await updateGenre(editId, form);
      else await createGenre(form);
      setModal(false);
      load();
    } catch { setError('Ошибка сохранения'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить жанр?')) return;
    await deleteGenre(id);
    load();
  };

  return (
    <div className="page">
      <h1>Жанры</h1>
      {error && <div className="error">{error}</div>}
      <div className="toolbar">
        <span style={{ color: '#888', fontSize: 14 }}>Всего: {genres.length}</span>
        <button className="btn btn-primary" onClick={openCreate}>+ Добавить</button>
      </div>

      {loading ? <div className="loading">Загрузка...</div> : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>#</th><th>Название</th><th>Описание</th><th>Действия</th></tr>
            </thead>
            <tbody>
              {genres.map(g => (
                <tr key={g.id}>
                  <td>{g.id}</td>
                  <td><strong>{g.name}</strong></td>
                  <td>{g.description || '—'}</td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => openEdit(g)}>Изменить</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(g.id)}>Удалить</button>
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
            <h2>{editId ? 'Редактировать жанр' : 'Новый жанр'}</h2>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
              <label>Название *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Описание</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
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
