/**
 * src/components/auth/LoginForm.tsx
 * Demo login form that calls AuthContext.login.
 */
import React, { FormEvent, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const { login } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Replace with real API call. For now we simulate success.
      await new Promise((r) => setTimeout(r, 400));
      login({ id: username || 'demo', name: username || 'Demo User' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className='space-y-3 max-w-sm'>
      <label className='block'>
        <span className='text-sm'>Username</span>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='username'
          className='mt-1 block w-full rounded border px-2 py-1'
        />
      </label>

      <label className='block'>
        <span className='text-sm'>Password</span>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
          className='mt-1 block w-full rounded border px-2 py-1'
        />
      </label>

      <button
        type='submit'
        disabled={submitting}
        className='px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60'
      >
        {submitting ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
};

export default LoginForm;
