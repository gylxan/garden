import NextHead from 'next/head';

import React from 'react';

export interface HeadProps {
  title: string;
}
const Head: React.FC<HeadProps> = ({ title }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content="Web page to manage and watch garden" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};

export default Head;
