'use client';

import { useEffect } from 'react';
import { store } from '@/store';
import { Provider, useDispatch } from 'react-redux';
import { setCredentials, setLoading } from '@/store/authSlice';

function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');

      if (token && userString) {
        const user = JSON.parse(userString);
        dispatch(setCredentials({ user, token }));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return <>{children}</>;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  );
}
