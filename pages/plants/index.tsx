import AddIcon from '@mui/icons-material/Add';
import { Fab, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Link from '../../components/Link';
import Page from '../../components/Page/page';
import { PlantCard } from '../../components/PlantCard';
import { Pages } from '../../constants/page';
import { getPageConfiguration, getRoute } from '../../helpers/page';
import useComponentDidMount from '../../hooks/useComponentDidMount';
import useFetch from '../../hooks/useFetch';
import { IPlant } from '../../interfaces/Plant';

const NUM_PLACEHOLDERS = 6;

const Plants: NextPage = () => {
  const { query } = useRouter();
  const { query: search } = query;
  const { name, description } = getPageConfiguration(Pages.Plants);
  const { data: plants, fetchData } = useFetch<IPlant[]>({ url: '/api/plants' });

  useComponentDidMount(() => {
    fetchData();
  });

  function renderSkeletons() {
    return Array(NUM_PLACEHOLDERS)
      .fill(null)
      .map((_, index) => <Skeleton key={index} variant="rectangular" width={300} height={350} />);
  }

  function renderPlants() {
    return (
      plants &&
      plants
        .filter(({ name, botanicalName }) =>
          search
            ? botanicalName.toLowerCase().includes((search as string).toLowerCase()) ||
              name.toLowerCase().includes((search as string).toLowerCase())
            : true,
        )
        .map((plant) => <PlantCard key={plant.name} plant={plant} />)
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
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' },
        }}
      >
        {plants ? renderPlants() : renderSkeletons()}
      </Box>

      <Link to={getRoute(Pages.PlantsAdd)}>
        <Fab aria-label="Plant speed dial" sx={{ position: 'fixed', bottom: 70, right: 24 }} color="primary">
          <AddIcon />
        </Fab>
      </Link>
    </Page>
  );
};

export default Plants;
