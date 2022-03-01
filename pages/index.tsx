import AddIcon from '@mui/icons-material/Add';
import { Alert, AlertColor, Fab, Skeleton, Snackbar } from '@mui/material';
import { Box } from '@mui/system';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import Link from '../components/Link';
import Page from '../components/Page/page';
import { PlantCard } from '../components/PlantCard';
import { Pages } from '../constants/page';
import { getPageConfiguration, getRoute } from '../helpers/page';
import useComponentDidMount from '../hooks/useComponentDidMount';
import useFetch, { Status } from '../hooks/useFetch';
import { IPlant } from '../interfaces/Plant';

const NUM_PLACEHOLDERS = 6;

const Plants: NextPage = () => {
  const { query } = useRouter();
  const { query: search } = query;
  const { name, description } = getPageConfiguration(Pages.Home);
  const { data: loadedPlants, fetchData, status } = useFetch<IPlant[]>();
  const [plants, setPlants] = useState<IPlant[]>([]);
  const [alert, setAlert] = useState<{ open: boolean; message: string; type: AlertColor }>({
    open: false,
    message: '',
    type: 'success',
  });
  const isLoading = status === Status.Loading;

  useComponentDidMount(() => {
    fetchData({ url: '/api/plants' });
  });

  useEffect(() => {
    if (loadedPlants === null) {
      return;
    }
    setPlants([...loadedPlants]);
  }, [loadedPlants]);

  function handleUpdate(plant: IPlant) {
    const newPlants = [...plants];

    setPlants(
      newPlants.map((currentPlant) => (currentPlant.id === plant.id ? { ...currentPlant, ...plant } : currentPlant)),
    );
  }

  function handleDelete(plant: IPlant) {
    const newPlants = [...plants];
    setPlants(newPlants.filter((currPlant) => currPlant.id !== plant.id));
    setAlert({
      open: true,
      message: `Pflanze "${plant.name}" gelöscht`,
      type: 'success',
    });
  }

  function handleCloseAlert() {
    setAlert({ ...alert, open: false });
  }

  function renderSkeletons() {
    return Array(NUM_PLACEHOLDERS)
      .fill(null)
      .map((_, index) => <Skeleton key={index} variant="rectangular" width="100%" height={350} />);
  }

  function isFilteredPlant(plant: IPlant) {
    const { botanicalName, name } = plant;
    return (
      search &&
      !botanicalName.toLowerCase().includes((search as string).toLowerCase()) &&
      !name.toLowerCase().includes((search as string).toLowerCase())
    );
  }

  function renderPlants() {
    return (
      plants &&
      plants.map((plant) => (
        <Box
          component={PlantCard}
          key={plant.name}
          plant={plant}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          {...(isFilteredPlant(plant) ? { sx: { display: 'none' } } : {})}
        />
      ))
    );
  }

  return (
    <Page title={name} description={description}>
      <Box
        sx={{
          display: 'grid',
          position: 'relative',
          gap: 3,
          flexWrap: 'wrap',
          width: '100%',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
          },
        }}
      >
        {isLoading ? renderSkeletons() : renderPlants()}
      </Box>

      <Link to={getRoute(Pages.PlantsAdd)}>
        <Fab aria-label="Plant speed dial" sx={{ position: 'fixed', bottom: 70, right: 24 }} color="primary">
          <AddIcon />
        </Fab>
      </Link>
      <Snackbar onClose={handleCloseAlert} open={alert.open} autoHideDuration={3000}>
        <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Page>
  );
};

export default Plants;
