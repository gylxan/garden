import React from 'react';

import Head from '../Head/Head';
import styles from './Page.module.scss'

interface PageProps {
  title: string;
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <div className={styles.Page}>
      <Head title={title} />
      <main className={styles.Main}>{children}</main>
    </div>
  );
};


export default Page;
