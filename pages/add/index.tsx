import type { NextPage } from 'next';

import React from 'react';

import Page from '../../components/Page/page';
import PlantForm from '../../components/PlantForm';
import { Pages } from '../../constants/page';
import { getPageConfiguration } from '../../helpers/page';

const PlantsAdd: NextPage = () => {
  const { name, description } = getPageConfiguration(Pages.PlantsAdd);

  return (
    <Page title={name} description={description}>
      <PlantForm />
    </Page>
  );
};

export default PlantsAdd;
