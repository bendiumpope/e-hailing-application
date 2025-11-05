'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/authSlice';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
      <Link href="/">
        E-Hailing
      </Link>
      <nav>
        {token ? (
          <>
            <Link href="/profile" style={{ marginRight: '1rem' }}>
              Profile
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" style={{ marginRight: '1rem' }}>
              Login
            </Link>
            <Link href="/signup">
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
