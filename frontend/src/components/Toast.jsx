import React from 'react';

export default function Toast({ message, type = 'info', onClose }) {
  if (!message) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: type === 'error' ? 'var(--color-error)' : 'var(--color-primary)',
      color: '#fff', padding: '12px 24px', borderRadius: 8, boxShadow: '0 2px 8px #0003',
      minWidth: 180, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 500
    }}>
      <span>{message}</span>
      <button onClick={onClose} style={{background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer'}}>×</button>
    </div>
  );
} 