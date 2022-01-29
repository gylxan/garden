import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { useRouter } from 'next/router';

import React from 'react';

import { navigation } from '../../constants/navigation';
import { Pages } from '../../constants/page';
import { getMatchingNavigationPath } from '../../helpers/navigation';
import { getPageNameByRoute, getRoute } from '../../helpers/page';
import Link from '../Link';
import { Search } from '../Search';

export interface Props {
  authenticated?: boolean;
}

const AppBar: React.FC<Props> = ({ authenticated }) => {
  const { pathname } = useRouter();
  const showSearch = pathname === getRoute(Pages.Home);
  const matchingNavPath = getMatchingNavigationPath(pathname);

  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          overflow="inherit"
          sx={{ flexGrow: 0, mr: 2, display: { xs: 'block', md: 'none' } }}
        >
          {getPageNameByRoute(pathname)}
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {navigation.map(({ name, route }) => (
            <Link key={name} to={route}>
              <Button
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'flex',
                  textDecoration: route === matchingNavPath ? 'underline' : 'none',
                }}
                key={`${route}-button`}
              >
                {name}
              </Button>
            </Link>
          ))}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {showSearch && <Search />}
        {authenticated && (
          <IconButton size="large" edge="start" color="inherit" aria-label="account of current user" sx={{ ml: 2 }}>
            <AccountCircle />
          </IconButton>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
