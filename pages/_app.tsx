import type { AppProps } from 'next/app';
import NextHead from 'next/head';

import React from 'react';

import AppBar from '../components/AppBar';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <NextHead>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </NextHead>
      <AppBar />
      <Component {...pageProps} />
      <BottomNavigation />
    </div>
  );
}

export default App;
