import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { server } from '@/config';
import Button from '../layout/Button';

const AdminRouteGuard = ({ children }: any) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    adminCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    router.events.on('routeChangeComplete', adminCheck);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', adminCheck);
    };
  }, []);

  async function adminCheck(url: string) {
    const token = localStorage.getItem('token');

    const currentUserRes = await fetch(`${server}/user/getCurrentUser`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const currentUserJson = await currentUserRes.json();

    const publicPaths = ['/'];
    const path = url.split('?')[0];
    if ((!token || !currentUserJson.isAdmin) && !publicPaths.includes(path)) {
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }
  }

  return authorized ? (
    children
  ) : (
    <div className="empty">
      <div className="msg">
        <span className="title"> WARNING !!!</span>
        <p>You have not authorized to access this page</p>
      </div>
      <Button txt="back to home" onButton={() => router.push('/')} />
      <style jsx>{`
        .empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 60px;
          height: 60vh;
        }

        .empty .msg {
          display: flex;
          align-items: center;
          gap: 24px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: bold;
        }

        .title {
          font-size: 24px;
          color: #e76f51;
        }

        @media only screen and (max-width: 425px) {
          .empty .msg {
            flex-direction: column;
            gap: 24px;
          }

          .empty .msg p {
            text-align: center;
            font-size: 16px;
            line-height: 36px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminRouteGuard;
