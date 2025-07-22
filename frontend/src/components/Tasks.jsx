import React, { useEffect, useState } from 'react';

export default function Tasks({ userId, showToast }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    const res = await fetch(`http://127.0.0.1:5000/tasks?user_id=${userId}`);
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => { fetchTasks(); }, [userId]);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://127.0.0.1:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, title, date, category })
      });
      setTitle(''); setDate(''); setCategory('');
      fetchTasks();
      showToast && showToast('Tarefa adicionada!', 'info');
    } catch {
      showToast && showToast('Erro ao adicionar tarefa.', 'error');
    }
  };

  const toggleCheck = async (task) => {
    try {
      await fetch(`http://127.0.0.1:5000/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, checked: task.checked ? 0 : 1 })
      });
      fetchTasks();
      showToast && showToast('Tarefa atualizada!', 'info');
    } catch {
      showToast && showToast('Erro ao atualizar tarefa.', 'error');
    }
  };

  const removeTask = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
      showToast && showToast('Tarefa removida!', 'info');
    } catch {
      showToast && showToast('Erro ao remover tarefa.', 'error');
    }
  };

  return (
    <div style={{width: '100%', maxWidth: 400}}>
      <form onSubmit={addTask} style={{display: 'flex', gap: 8, marginBottom: 16}}>
        <input className="input-field" placeholder="Tarefa" value={title} onChange={e => setTitle(e.target.value)} required />
        <input className="input-field" type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <input className="input-field" placeholder="Categoria" value={category} onChange={e => setCategory(e.target.value)} />
        <button className="button-primary" type="submit">+</button>
      </form>
      {loading ? <div>Carregando...</div> : (
        <ul style={{listStyle: 'none', padding: 0}}>
          {tasks.map(task => (
            <li key={task.id} style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
              <input type="checkbox" checked={!!task.checked} onChange={() => toggleCheck(task)} />
              <span style={{textDecoration: task.checked ? 'line-through' : 'none'}}>{task.title} ({task.date}) [{task.category}]</span>
              <button onClick={() => removeTask(task.id)} style={{marginLeft: 'auto'}}>🗑️</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 