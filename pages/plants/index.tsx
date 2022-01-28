import { Skeleton, SpeedDial } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Page from '../../components/Page/page';
import { PlantCard } from '../../components/PlantCard';
import { Pages } from '../../constants/page';
import { getPageConfiguration, getRoute } from '../../helpers/page';
import useComponentDidMount from '../../hooks/useComponentDidMount';
import useFetch from '../../hooks/useFetch';
import { IPlant } from '../../interfaces/Plant';

import styles from './Plants.module.scss';

const NUM_PLACEHOLDERS = 6;

const Plants: NextPage = () => {
  const { push, query } = useRouter();
  const { query: search } = query;
  const { name, description } = getPageConfiguration(Pages.Plants);
  const { data: plants, fetchData } = useFetch<IPlant[]>({ url: '/api/plants' });

  useComponentDidMount(() => {
    fetchData();
  });

  function handleSpeedDialClick() {
    push(getRoute(Pages.PlantsAdd));
  }

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
    <Page title={name} description={description} className={styles.PlantsPage}>
      <div className={styles.Plants}>{plants ? renderPlants() : renderSkeletons()}</div>

      <SpeedDial
        ariaLabel="Plant speed dial"
        sx={{ position: 'fixed', bottom: 70, right: 24 }}
        icon={<SpeedDialIcon />}
        onClick={handleSpeedDialClick}
        open={false}
      />
    </Page>
  );
};

export default Plants;
