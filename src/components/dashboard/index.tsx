/**
 * src/components/dashboard/index.tsx
 * Basic Dashboard consuming AuthContext.
 */
import React from 'react';
import { useAuthContext } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthContext();

  if (!isAuthenticated) {
    return (
      <div className='p-6'>
        <h2 className='text-lg font-semibold'>Not signed in</h2>
        <p className='text-sm text-gray-600'>Use the login form to continue.</p>
      </div>
    );
  }

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-2'>Welcome{user?.name ? ,  : ''}!</h1>
      <p className='mb-4'>This is the dashboard — drop your app components here.</p>
      <button onClick={logout} className='px-3 py-1 rounded border'>Log out</button>
    </main>
  );
};

export default Dashboard;
