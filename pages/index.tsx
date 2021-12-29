import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Page from '../components/Page';
import { Pages } from '../constants/page';
import { getPageConfiguration } from '../helpers/page';
import { getRoute } from '../helpers/page';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { name, description } = getPageConfiguration(Pages.Home);
  return (
    <Page title={name} description={description}>
      <Typography variant="h1">Garden</Typography>
      <div className={styles.Cards}>
        <Card sx={{ maxWidth: 345 }}>
          <Link href={getRoute(Pages.Plants)} passHref>
            <CardActionArea>
              <CardMedia>
                <Image src="/favicon.ico" alt="icon" width={50} height={50} className={styles.Image} />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Pflanzen
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Übersicht und Verwaltung der Pflanzen im Garten.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <Link href={getRoute(Pages.Calendar)} passHref>
            <CardActionArea>
              <CardMedia>
                <Image src="/favicon.ico" alt="icon" width={50} height={50} className={styles.Image} />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Kalender
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Übersicht und Planung der Aussaat und Ernte von deinen Pflanzen im Garten.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      </div>
    </Page>
  );
};

export default Home;
