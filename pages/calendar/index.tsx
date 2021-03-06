import CalendarIcon from '@mui/icons-material/CalendarToday';
import { Typography } from '@mui/material';
import type { NextPage } from 'next';

import Page from '../../components/Page/page';
import { Pages } from '../../constants/page';
import { getPageConfiguration } from '../../helpers/page';

const Calendar: NextPage = () => {
  const { name, description } = getPageConfiguration(Pages.Calendar);
  return (
    <Page title={name} description={description}>
      <Typography variant="h4">Willkommen beim Kalender</Typography>
      <CalendarIcon />
    </Page>
  );
};

export default Calendar;
