import PlantIcon from '@mui/icons-material/Yard';
import { Typography } from '@mui/material';
import type { NextPage } from 'next';

import Page from '../../components/Page';
import { getPageConfiguration } from '../../helpers/page';
import { Pages } from "../../constants/page";

const Plants: NextPage = () => {
  const { name, description } = getPageConfiguration(Pages.Plants);
  return (
    <Page title={name} description={description}>
      <Typography variant="h4">Willkommen bei den Pflanzen</Typography>
      <PlantIcon />
    </Page>
  );
};

export default Plants;
