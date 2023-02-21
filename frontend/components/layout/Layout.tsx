import { ReactNode, useEffect } from 'react';
import Meta from './Meta';
import Nav from './Nav/Nav';
import Footer from './Footer';
import styles from '../../styles/layout/Layout.module.scss';
import { useAppDispatch } from '@/redux/store';
import { logout, restoreLogin } from '@/redux/auth/actions';
import { Toaster } from 'react-hot-toast';

interface Props {
  openPopup: boolean;
  refreshCounter: boolean;
  setOpenPopup: (e: boolean) => void;
  setRefreshCounter: (e: boolean) => void;
  children?: ReactNode;
}

const Layout = ({
  openPopup,
  setOpenPopup,
  refreshCounter,
  setRefreshCounter,
  children,
}: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      dispatch(restoreLogin(token));
    }
  }, [dispatch]);

  return (
    <>
      <Meta />
      <Nav
        openPopup={openPopup}
        setOpenPopup={(e) => setOpenPopup(e)}
        refreshCounter={refreshCounter}
        setRefreshCounter={(e) => setRefreshCounter(e)}
      />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
      <Toaster
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: 0,
            padding: '16px',
            color: '#fff',
            fontWeight: 700,
          },
          success: {
            style: {
              background: '#2A9D8F',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#2A9D8F',
            },
          },
          error: {
            style: {
              background: '#E76F51',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#E76F51',
            },
          },
        }}
      />
      <Footer />
    </>
  );
};

export default Layout;
