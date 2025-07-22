import React, { useState, useEffect } from 'react';

export default function Profile({ user, onBack, onUpdate }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: user.name || '',
    email: user.email || '',
    role: user.role || '',
    cpf: user.cpf || '',
    birthdate: user.birthdate || '',
    bio: user.bio || '',
    photo: user.photo || ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Buscar dados do backend ao abrir
  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`http://127.0.0.1:5000/user/${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setForm({
            name: data.name || '',
            email: data.email || '',
            role: data.role || '',
            cpf: data.cpf || '',
            birthdate: data.birthdate || '',
            bio: data.bio || '',
            photo: data.photo || ''
          });
        }
      } catch (err) {
        setError('Erro ao buscar perfil.');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
    // eslint-disable-next-line
  }, [user.id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async e => {
    e.preventDefault();
    setEdit(false);
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://127.0.0.1:5000/user/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error();
      if (onUpdate) onUpdate(form);
    } catch {
      setError('Erro ao salvar perfil.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="central-container">Carregando perfil...</div>;

  return (
    <div className="central-container" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <button onClick={onBack} style={{alignSelf: 'flex-start', marginBottom: 16}}>&larr; Voltar</button>
      <h2 style={{ marginBottom: 16 }}>Perfil do Usuário</h2>
      <div style={{marginBottom: 16}}>
        <img
          src={form.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(form.name)}
          alt="Foto do perfil"
          style={{width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: '2px solid #C0392B'}}
        />
      </div>
      {edit ? (
        <form onSubmit={handleSave} style={{display: 'flex', flexDirection: 'column', gap: 8, width: 320, alignItems: 'center'}}>
          <input className="input-field" name="name" value={form.name} onChange={handleChange} placeholder="Nome" required />
          <input className="input-field" name="email" value={form.email} onChange={handleChange} placeholder="E-mail" required />
          <input className="input-field" name="role" value={form.role} onChange={handleChange} placeholder="Função" />
          <input className="input-field" name="cpf" value={form.cpf} onChange={handleChange} placeholder="CPF" />
          <input className="input-field" name="birthdate" value={form.birthdate} onChange={handleChange} placeholder="Data de nascimento" type="date" />
          <input className="input-field" name="photo" value={form.photo} onChange={handleChange} placeholder="URL da foto" />
          <textarea className="input-field" name="bio" value={form.bio} onChange={handleChange} placeholder="Bio curta" rows={2} />
          <button className="button-primary" type="submit">Salvar</button>
        </form>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: 8, width: 320, alignItems: 'center'}}>
          <div><b>Nome:</b> {form.name}</div>
          <div><b>E-mail:</b> {form.email}</div>
          <div><b>Função:</b> {form.role}</div>
          <div><b>CPF:</b> {form.cpf}</div>
          <div><b>Data de nascimento:</b> {form.birthdate}</div>
          <div><b>Bio:</b> {form.bio}</div>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <button className="button-primary" style={{marginTop: 12, width: '70%'}} onClick={() => setEdit(true)}>Editar</button>
          </div>
        </div>
      )}
      {error && <div style={{color: 'red', marginTop: 12}}>{error}</div>}
    </div>
  );
} 