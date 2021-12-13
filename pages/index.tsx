import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';

import Page from '../components/Page';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <Page title="Startseite">
      <Typography variant="h1">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </Typography>
      <Image src="/favicon.ico" alt="icon" width={50} height={50} className={styles.Image} />
    </Page>
  );
};

export default Home;
