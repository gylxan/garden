import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction as MuiBottomNavigationAction,
  Paper,
} from '@mui/material';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

import React from 'react';

import { navigation } from '../../constants/navigation';
import Link from '../Link';

export interface Props {}

const BottomNavigation: React.FC<Props> = () => {
  const { pathname } = useRouter();
  return isMobile ? (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <MuiBottomNavigation showLabels value={pathname}>
        {navigation.map(({ name, route, icon: Icon }) => (
          <MuiBottomNavigationAction
            key={route}
            label={name}
            icon={<Icon />}
            component={Link}
            to={route}
            value={route}
          />
        ))}
      </MuiBottomNavigation>
    </Paper>
  ) : null;
};

export default BottomNavigation;
