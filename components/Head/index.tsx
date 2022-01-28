import NextHead from 'next/head';

import React from 'react';

const Head: React.FC = () => {
  return (
    <NextHead>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};

export default Head;
