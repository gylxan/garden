import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import Head from '../components/Head';
import '../styles/globals.css';

const BottomNavigation = dynamic(() => import('../components/BottomNavigation'), { ssr: false });

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head />
      <Component {...pageProps} />
      <BottomNavigation />
    </div>
  );
}

export default App;
