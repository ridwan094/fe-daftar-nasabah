import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getToken } from '../utils/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
