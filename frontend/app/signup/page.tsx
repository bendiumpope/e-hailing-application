'use client';
import React, { useState } from 'react';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('auth/signup', { email, password, name });
      console.log("response", response);
      if (response.statusCode === 409) {
        setError('User with this email already exists');
        return;
      }
      router.push('/login');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to signup');
      }
      console.error('Failed to signup', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', width: '300px', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }}>Signup</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={{ color: '#333', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ color: '#333', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{ color: '#333', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <h1 style={{ color: 'red', marginBottom: '1rem' }}  >{error}</h1>
        <button type="submit" style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', background: '#0070f3', color: 'white', cursor: 'pointer' }}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;

