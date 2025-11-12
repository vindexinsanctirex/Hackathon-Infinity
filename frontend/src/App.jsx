import React, { useState, useEffect } from 'react';
import './styles/theme.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Notes from './components/Notes';
import Profile from './components/Profile';
import Calendar from './components/Calendar';
import Toast from './components/Toast';

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('dashboard');
  const [dark, setDark] = useState(() => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const [notifications, setNotifications] = useState([]); // array de notificações
  const [showBellTooltip, setShowBellTooltip] = useState(false);
  const showToast = (message, type = 'info') => setToast({ message, type });

  // Notificação inicial ao entrar no dashboard
  useEffect(() => {
    if (user && page === 'dashboard') {
      setShowBellTooltip(true);
      setTimeout(() => setShowBellTooltip(false), 4000); // esconde após 4s
    }
    // eslint-disable-next-line
  }, [user, page]);

  // Exemplo: adicionar notificação (pode ser expandido para notificações reais)
  // useEffect(() => {
  //   setNotifications([{ id: 1, text: 'Exemplo de notificação!' }]);
  // }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark);
  }, [dark]);

  const handleUpdateUser = (newData) => {
    setUser({ ...user, ...newData });
    setPage('dashboard');
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <>
      <div style={{position: 'fixed', top: 12, right: 16, zIndex: 20, display: 'flex', alignItems: 'center', gap: 12}}>
        {/* Sininho de notificações */}
        <div style={{position: 'relative'}}>
          <span
            style={{fontSize: 28, cursor: 'pointer'}}
            title="Notificações"
            onMouseEnter={() => setShowBellTooltip(true)}
            onMouseLeave={() => setShowBellTooltip(false)}
            onClick={() => setShowBellTooltip(v => !v)}
          >🔔</span>
          <span style={{
            position: 'absolute',
            top: -6,
            right: -8,
            background: 'var(--color-primary)',
            color: '#fff',
            borderRadius: '50%',
            fontSize: 12,
            minWidth: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            border: '2px solid var(--color-background)'
          }}>{notifications.length}</span>
          {showBellTooltip && (
            <div style={{
              position: 'absolute',
              top: 36,
              right: 0,
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              borderRadius: 8,
              boxShadow: '0 2px 8px #0003',
              padding: '10px 18px',
              fontSize: 14,
              minWidth: 220,
              zIndex: 100,
              whiteSpace: 'pre-line',
              border: '1px solid var(--color-primary)'
            }}>
              Bem-vindo! Nenhuma notificação nova no momento.
            </div>
          )}
        </div>
        <button
          className="button-primary"
          style={{
            padding: '6px 16px',
            fontSize: 14,
            transition: 'background 0.4s, color 0.4s, box-shadow 0.4s, width 0.4s',
            boxShadow: '0 2px 8px #0002',
            width: dark ? 120 : 140,
            minWidth: 100,
            maxWidth: 180
          }}
          onClick={() => setDark(d => !d)}
        >
          {dark ? 'Modo Claro' : 'Modo Escuro'}
        </button>
      </div>
      {page === 'dashboard' && (
        <>
          <Dashboard onNavigate={setPage} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 24 }}>
            <button className="button-primary" style={{ maxWidth: 320, width: '100%' }} onClick={() => setPage('profile')}>
              Perfil do Usuário
            </button>
            <button
              className="button-primary"
              style={{
                maxWidth: 320,
                width: '100%',
                background: 'var(--color-error)',
                border: 'none'
              }}
              onMouseEnter={(e) => e.target.style.background = '#C62828'}
              onMouseLeave={(e) => e.target.style.background = 'var(--color-error)'}
              onClick={() => {
                setUser(null);
                setPage('dashboard');
              }}
            >
              Sair
            </button>
          </div>
        </>
      )}
      {page === 'calendar' && (
        <div className="central-container">
          <button onClick={() => setPage('dashboard')} style={{alignSelf: 'flex-start', marginBottom: 16}}>&larr; Voltar</button>
          <h2>Calendário</h2>
          <Calendar userId={user.id} />
        </div>
      )}
      {page === 'tasks' && (
        <div className="central-container">
          <button onClick={() => setPage('dashboard')} style={{alignSelf: 'flex-start', marginBottom: 16}}>&larr; Voltar</button>
          <h2>Tarefas</h2>
          <Tasks userId={user.id} showToast={showToast} />
        </div>
      )}
      {page === 'notes' && (
        <div className="central-container">
          <button onClick={() => setPage('dashboard')} style={{alignSelf: 'flex-start', marginBottom: 16}}>&larr; Voltar</button>
          <h2>Notas Rápidas</h2>
          <Notes userId={user.id} showToast={showToast} />
        </div>
      )}
      {page === 'profile' && (
        <Profile user={user} onBack={() => setPage('dashboard')} onUpdate={user => setUser({ ...user })} />
      )}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'info' })} />
    </>
  );
} 