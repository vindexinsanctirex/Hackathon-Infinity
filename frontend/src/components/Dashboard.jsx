import React from 'react';
import logo from '../assets/logo-infinity.png';

export default function Dashboard({ onNavigate }) {
  return (
    <div className="central-container" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <img src={logo} alt="Infinity School" style={{ width: 180, marginBottom: 24 }} />
      <h2 style={{ marginBottom: 24 }}>Menu Principal</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 320, alignItems: 'center' }}>
        <a className="button-primary" href="https://drive.google.com/" target="_blank" rel="noopener noreferrer" style={{ textAlign: 'center' }}>
          Planilhas Google Drive
        </a>
        <a className="button-primary" href="https://infinityschool.eadplataforma.app/" target="_blank" rel="noopener noreferrer" style={{ textAlign: 'center' }}>
          Portal do Aluno
        </a>
        <a className="button-primary" href="https://www.infinityschool.app/area/" target="_blank" rel="noopener noreferrer" style={{ textAlign: 'center' }}>
          Infinity App
        </a>
        <button className="button-primary" onClick={() => onNavigate('calendar')} style={{ textAlign: 'center' }}>
          Calendário
        </button>
        <button className="button-primary" onClick={() => onNavigate('tasks')} style={{ textAlign: 'center' }}>
          Tarefas
        </button>
        <button className="button-primary" onClick={() => onNavigate('notes')} style={{ textAlign: 'center' }}>
          Notas Rápidas
        </button>
      </div>
    </div>
  );
} 