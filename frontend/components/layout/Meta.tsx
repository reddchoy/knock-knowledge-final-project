import { url } from '@/config';
import Head from 'next/head';

interface Props {
  title?: string;
  keywords?: string;
  description?: string;
}

const Meta = ({ title, keywords, description }: Props) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <link rel="manifest" href="/manifest.json" />
      <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
      <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
      <link rel="apple-touch-icon" href="/icons/icon-512x512.png"></link>
      <meta name="theme-color" content="#faf7f6" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Knock Knowledge" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${url}/apple-touch-icon.png`} />

      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: 'Knock Knowledge',
  keywords: 'Knock Knowledge, online course, online course platform',
  description: 'online course platform',
};

export default Meta;
