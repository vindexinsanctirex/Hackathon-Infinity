import React, { useState, useEffect } from 'react';
import { addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay } from 'date-fns';

const categoryColors = {
  'Reunião': '#3949AB',
  'Entrega': '#43A047',
  'Evento': '#E53935',
  'Outro': '#BDBDBD'
};

export default function Calendar({ userId }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Outro' });
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/tasks?user_id=${userId}`)
      .then(res => res.json())
      .then(setTasks);
  }, [userId, showModal]);

  const renderHeader = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>&lt;</button>
      <h3 style={{ margin: 0 }}>{format(currentMonth, 'MMMM yyyy')}</h3>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>&gt;</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
          {format(addDays(startDate, i), 'EEE')}
        </div>
      );
    }
    return <div style={{ display: 'flex' }}>{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const rows = [];
    let days = [];
    let day = startDate;
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const dayTasks = tasks.filter(t => t.date === formattedDate);
        days.push(
          <div
            key={formattedDate}
            style={{
              flex: 1,
              minHeight: 64,
              border: '1px solid var(--color-gray)',
              background: isSameMonth(day, monthStart) ? 'var(--color-surface)' : '#eee',
              opacity: isSameMonth(day, monthStart) ? 1 : 0.5,
              padding: 4,
              cursor: 'pointer',
              position: 'relative',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start'
            }}
            onClick={() => {
              setSelectedDate(formattedDate);
              setShowModal(true);
              setForm({ title: '', category: 'Outro' });
              setEditTask(null);
            }}
          >
            <div style={{ fontWeight: isSameDay(day, new Date()) ? 'bold' : 'normal', color: isSameDay(day, new Date()) ? 'var(--color-primary)' : undefined }}>
              {format(day, 'd')}
            </div>
            {dayTasks.map(task => (
              <div key={task.id} style={{
                background: categoryColors[task.category] || '#BDBDBD',
                color: '#fff',
                borderRadius: 4,
                padding: '2px 8px',
                margin: '6px auto 0 auto',
                fontSize: 12,
                textDecoration: task.checked ? 'line-through' : 'none',
                display: 'flex', alignItems: 'center', gap: 4,
                width: '90%',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
                onClick={e => { e.stopPropagation(); setSelectedDate(formattedDate); setShowModal(true); setEditTask(null); }}
              >
                <input type="checkbox" checked={!!task.checked} onChange={e => { e.stopPropagation(); handleCheck(task); }} style={{marginRight: 2}} />
                {task.title}
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={format(day, 'yyyy-MM-dd') + '-row'} style={{ display: 'flex' }}>{days}</div>);
      days = [];
    }
    return <div>{rows}</div>;
  };

  const handleCheck = async (task) => {
    await fetch(`http://127.0.0.1:5000/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, checked: task.checked ? 0 : 1 })
    });
    setShowModal(false); // força recarregar
    setTimeout(() => setShowModal(true), 100); // reabre modal
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    await fetch('http://127.0.0.1:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        title: form.title,
        date: selectedDate,
        category: form.category
      })
    });
    setForm({ title: '', category: 'Outro' });
    setShowModal(false); // fecha o modal após adicionar
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setForm({ title: task.title, category: task.category });
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    await fetch(`http://127.0.0.1:5000/tasks/${editTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editTask, title: form.title, category: form.category })
    });
    setEditTask(null);
    setForm({ title: '', category: 'Outro' });
    setShowModal(false); // fecha o modal após editar
  };

  const handleDeleteTask = async (id) => {
    await fetch(`http://127.0.0.1:5000/tasks/${id}`, { method: 'DELETE' });
    setShowModal(false);
    setTimeout(() => setShowModal(true), 100);
  };

  return (
    <div style={{width: '100%', maxWidth: 600, margin: '0 auto'}}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {showModal && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100}}>
          <div style={{background: 'var(--color-surface)', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px #0003', minWidth: 320, maxWidth: 400}}>
            <h3 style={{marginTop: 0, marginBottom: 12}}>Tarefas em {selectedDate}</h3>
            <ul style={{listStyle: 'none', padding: 0, marginBottom: 16}}>
              {tasks.filter(t => t.date === selectedDate).map(task => (
                <li key={task.id} style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, background: categoryColors[task.category] || '#BDBDBD', borderRadius: 6, padding: 6, color: '#fff'}}>
                  <input type="checkbox" checked={!!task.checked} onChange={() => handleCheck(task)} />
                  <span style={{flex: 1, textDecoration: task.checked ? 'line-through' : 'none'}}>{task.title} [{task.category}]</span>
                  <button onClick={() => handleEditTask(task)} style={{background: 'none', border: 'none', color: '#fff', cursor: 'pointer'}}>✏️</button>
                  <button onClick={() => handleDeleteTask(task.id)} style={{background: 'none', border: 'none', color: '#fff', cursor: 'pointer'}}>🗑️</button>
                </li>
              ))}
            </ul>
            {editTask ? (
              <form onSubmit={handleUpdateTask} style={{display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8}}>
                <input className="input-field" placeholder="Título da tarefa" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} required />
                <select className="input-field" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}>
                  <option value="Reunião">Reunião</option>
                  <option value="Entrega">Entrega</option>
                  <option value="Evento">Evento</option>
                  <option value="Outro">Outro</option>
                </select>
                <div style={{display: 'flex', gap: 8}}>
                  <button className="button-primary" type="submit">Salvar</button>
                  <button type="button" onClick={() => setEditTask(null)}>Cancelar</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAddTask} style={{display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8}}>
                <input className="input-field" placeholder="Título da tarefa" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} required />
                <select className="input-field" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}>
                  <option value="Reunião">Reunião</option>
                  <option value="Entrega">Entrega</option>
                  <option value="Evento">Evento</option>
                  <option value="Outro">Outro</option>
                </select>
                <div style={{display: 'flex', gap: 8}}>
                  <button className="button-primary" type="submit">Adicionar</button>
                  <button type="button" onClick={() => setShowModal(false)}>Fechar</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 