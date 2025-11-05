'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default ProfilePage;
