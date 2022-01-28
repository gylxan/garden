import classNames from 'classnames';
import Head from 'next/head';

import React from 'react';

import styles from './Page.module.scss';

interface PageProps {
  title: string;
  description?: string;
  className?: string;
}

const Page: React.FC<PageProps> = ({ title, description, children, className }) => {
  return (
    <div className={classNames(styles.Page, className)}>
      <Head>
        <title>{title} | Garden</title>
        <meta name="description" content={description} />
      </Head>
      <main className={styles.Main}>{children}</main>
    </div>
  );
};

export default Page;
