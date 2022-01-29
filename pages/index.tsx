import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Page from '../components/Page/page';
import { Pages } from '../constants/page';
import { getPageConfiguration, getRoute } from '../helpers/page';

const Home: NextPage = () => {
  const { name, description } = getPageConfiguration(Pages.Home);
  return (
    <Page title={name} description={description}>
      <Typography variant="h1">Garden</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Card sx={{ maxWidth: 345 }}>
          <Link href={getRoute(Pages.Plants)} passHref>
            <CardActionArea>
              <CardMedia>
                <Image src="/favicon.ico" alt="icon" width={50} height={50} />
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
                <Image src="/favicon.ico" alt="icon" width={50} height={50} />
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
      </Box>
    </Page>
  );
};

export default Home;
