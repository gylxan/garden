import Head from 'next/head';

import React from 'react';

import styles from './Page.module.scss';

interface PageProps {
  title: string;
  description?: string;
}

const Index: React.FC<PageProps> = ({ title, description, children }) => {
  return (
    <div className={styles.Page}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <main className={styles.Main}>{children}</main>
    </div>
  );
};

export default Index;
