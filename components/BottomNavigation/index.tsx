import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction as MuiBottomNavigationAction,
  Paper,
} from '@mui/material';
import { useRouter } from 'next/router';

import React from 'react';

import { navigation } from '../../constants/navigation';
import { getMatchingNavigationPath } from '../../helpers/navigation';
import Link from '../Link';

export interface Props {}

const BottomNavigation: React.FC<Props> = () => {
  const { pathname } = useRouter();
  const matchingNavPath = getMatchingNavigationPath(pathname);
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { sm: 'block', md: 'none' } }} elevation={3}>
      <MuiBottomNavigation showLabels value={matchingNavPath}>
        {navigation.map(({ name, route, icon: Icon }) => (
          <MuiBottomNavigationAction
            key={route}
            label={name}
            // @ts-expect-error
            icon={<Icon />}
            component={Link}
            to={route}
            value={route}
          />
        ))}
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNavigation;
