import PlantIcon from '@mui/icons-material/YardOutlined';
import { Skeleton, SpeedDial } from '@mui/material';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useState } from 'react';

import Page from '../../components/Page';
import { PlantCard } from '../../components/PlantCard';
import { Pages } from '../../constants/page';
import { getPageConfiguration, getRoute } from '../../helpers/page';
import useComponentDidMount from '../../hooks/useComponentDidMount';
import useFetch from '../../hooks/useFetch';
import { IPlant } from '../../interfaces/Plant';

import styles from './Plants.module.scss';

export interface PlantProps {
  plant: IPlant;
}

const NUM_PLACEHOLDERS = 6;

const Plants: NextPage = () => {
  const { push, query } = useRouter();
  console.log(query);
  const { query: search } = query;
  const { name, description } = getPageConfiguration(Pages.Plants);
  const { data: plants, fetchData } = useFetch<IPlant[]>({ url: '/api/plants' });
  const actions = [{ icon: <PlantIcon />, name: 'Neue Pflanze', route: getRoute(Pages.PlantsAdd) }];
  const [isSpeedDialOpen, setSpeedDialOpen] = useState(false);

  useComponentDidMount(() => {
    fetchData();
  });

  return (
    <Page title={name} description={description} className={styles.PlantsPage}>
      <div className={styles.Plants}>
        {!plants
          ? Array(NUM_PLACEHOLDERS)
              .fill(null)
              .map((_, index) => <Skeleton key={index} variant="rectangular" width={300} height={350} />)
          : plants
              .filter(({ name, botanicalName }) =>
                search
                  ? botanicalName.toLowerCase().includes((search as string).toLowerCase()) ||
                    name.toLowerCase().includes((search as string).toLowerCase())
                  : true,
              )
              .map((plant) => <PlantCard key={plant.name} plant={plant} />)}
      </div>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 70, right: 24 }}
        icon={<SpeedDialIcon />}
        onClick={() => setSpeedDialOpen(!isSpeedDialOpen)}
        open={isSpeedDialOpen}
      >
        {actions.map(({ name, icon, route }) => (
          <SpeedDialAction key={name} icon={icon} tooltipTitle={name} onClick={() => push(route)} />
        ))}
      </SpeedDial>
    </Page>
  );
};

export default Plants;
