import React, { useEffect, useState } from 'react';

export default function Notes({ userId, showToast }) {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    setLoading(true);
    const res = await fetch(`http://127.0.0.1:5000/notes?user_id=${userId}`);
    const data = await res.json();
    setNotes(data);
    setLoading(false);
  };

  useEffect(() => { fetchNotes(); }, [userId]);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://127.0.0.1:5000/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, content, created_at: new Date().toISOString() })
      });
      setContent('');
      fetchNotes();
      showToast && showToast('Nota adicionada!', 'info');
    } catch {
      showToast && showToast('Erro ao adicionar nota.', 'error');
    }
  };

  const updateNote = async (note) => {
    const newContent = prompt('Editar nota:', note.content);
    if (newContent !== null && newContent !== note.content) {
      try {
        await fetch(`http://127.0.0.1:5000/notes/${note.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: newContent, created_at: new Date().toISOString() })
        });
        fetchNotes();
        showToast && showToast('Nota atualizada!', 'info');
      } catch {
        showToast && showToast('Erro ao atualizar nota.', 'error');
      }
    }
  };

  const removeNote = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/notes/${id}`, { method: 'DELETE' });
      fetchNotes();
      showToast && showToast('Nota removida!', 'info');
    } catch {
      showToast && showToast('Erro ao remover nota.', 'error');
    }
  };

  return (
    <div style={{width: '100%', maxWidth: 400}}>
      <form onSubmit={addNote} style={{display: 'flex', gap: 8, marginBottom: 16}}>
        <input className="input-field" placeholder="Nova nota" value={content} onChange={e => setContent(e.target.value)} required />
        <button className="button-primary" type="submit">+</button>
      </form>
      {loading ? <div>Carregando...</div> : (
        <ul style={{listStyle: 'none', padding: 0}}>
          {notes.map(note => (
            <li key={note.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 8,
              background: 'var(--color-surface)',
              borderRadius: 8,
              padding: 8,
              color: 'var(--color-text)'
            }}>
              <span style={{flex: 1}}>{note.content}</span>
              <button onClick={() => updateNote(note)}>✏️</button>
              <button onClick={() => removeNote(note.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 