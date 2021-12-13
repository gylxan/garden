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
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </NextHead>
  );
};

export default Head;
