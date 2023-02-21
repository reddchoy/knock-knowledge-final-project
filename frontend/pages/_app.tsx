import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Roboto } from '@next/font/google';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import Loader from '@/components/layout/Loader';

const roboto = Roboto({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [refreshCounter, setRefreshCounter] = useState<boolean>(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      setIsLoading(true);
    });

    Router.events.on('routeChangeComplete', (url) => {
      setIsLoading(false);
    });

    Router.events.on('routeChangeError', (url) => {
      setIsLoading(false);
    });
  }, []);

  return (
    <main className={roboto.className}>
      <Provider store={store}>
        {isLoading && <Loader />}
        <Layout
          openPopup={openPopup}
          setOpenPopup={(e) => setOpenPopup(e)}
          refreshCounter={refreshCounter}
          setRefreshCounter={(e) => setRefreshCounter(e)}
        >
          <Component
            {...pageProps}
            openPopup={(e: boolean) => setOpenPopup(e)}
            refreshCounter={(e: boolean) => setRefreshCounter(e)}
          />
        </Layout>
      </Provider>
    </main>
  );
}
