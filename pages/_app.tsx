import type { AppProps } from 'next/app';

import AppBar from '../components/AppBar';
import BottomNavigation from '../components/BottomNavigation';
import Head from '../components/Head';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head />
      <AppBar />
      <Component {...pageProps} />
      <BottomNavigation />
    </div>
  );
}

export default App;
