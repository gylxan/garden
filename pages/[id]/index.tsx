import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import type { GetServerSideProps, NextPage } from 'next';

import React from 'react';

import Link from '../../components/Link';
import Page from '../../components/Page/page';
import PlantForm from '../../components/PlantForm';
import { Pages } from '../../constants/page';
import { getPageConfiguration, getRoute } from '../../helpers/page';
import request from '../../helpers/request';
import { IPlant } from '../../interfaces/Plant';

type PlantsEditProps = {
  plant: IPlant | null;
  error: string | null;
};

const PlantsEdit: NextPage<PlantsEditProps> = ({ plant, error: loadError }) => {
  const { name, description } = getPageConfiguration(Pages.PlantsEdit);

  const renderError = () => {
    return (
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Beim Laden der Pflanze ist ein Fehler aufgetreten :(</Typography>
        <Typography variant="body1">{loadError}</Typography>
        <Link to={getRoute(Pages.Home)} tabIndex={-1}>
          <Button sx={{ width: '100%' }} type="button" variant="contained" color="secondary">
            Zurück
          </Button>
        </Link>
      </Box>
    );
  };

  const renderForm = () => {
    return <PlantForm plant={plant || undefined} />;
  };

  return (
    <Page title={name} description={description}>
      {loadError ? renderError() : renderForm()}
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps<PlantsEditProps> = async ({ req, params }) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = req ? `${protocol}://${req.headers.host}` : '';
  try {
    const plant = await request<IPlant>({ url: `${baseUrl}/api/plants/${params?.id}` });
    return {
      props: {
        plant,
        error: null,
      }, // will be passed to the page component as props
    };
  } catch (e) {
    return {
      props: {
        plant: null,
        error: e as string,
      }, // will be passed to the page component as props
    };
  }
};

export default PlantsEdit;
