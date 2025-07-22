import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [cpfOrEmail, setCpfOrEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!cpfOrEmail) {
      setError('Digite o CPF ou e-mail.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf: cpfOrEmail, email: cpfOrEmail, birthdate })
      });
      if (!res.ok) throw new Error('Falha no login');
      const user = await res.json();
      onLogin(user);
    } catch (err) {
      setError('Dados inválidos ou erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <form className="central-container" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, background: 'none', boxShadow: 'none' }}>
        <h1 style={{ marginBottom: 24, textAlign: 'center' }}>Área do Colaborador</h1>
        <input
          className="input-field"
          placeholder="CPF ou E-mail"
          value={cpfOrEmail}
          onChange={e => setCpfOrEmail(e.target.value)}
          required
        />
        <input
          className="input-field"
          placeholder="Data de nascimento"
          type="date"
          value={birthdate}
          onChange={e => setBirthdate(e.target.value)}
          required
        />
        <button className="button-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Acessando...' : 'Acessar'}
        </button>
        {error && <div style={{color: 'red', marginTop: 12}}>{error}</div>}
      </form>
    </div>
  );
} 