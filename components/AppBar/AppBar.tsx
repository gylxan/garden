import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, Box, Button, IconButton, InputBase, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

import React from 'react';

import { navigation } from '../../constants/navigation';
import { Pages } from '../../constants/page';
import { getPageNameByRoute, getRoute } from '../../helpers/page';
import Link from '../Link';

export interface Props {
  authenticated?: boolean;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const AppBar: React.FC<Props> = ({ authenticated }) => {
  const { pathname } = useRouter();
  const showSearch = pathname === getRoute(Pages.Plants);

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
                  textDecoration: route === pathname ? 'underline' : 'none',
                }}
                key={`${route}-button`}
              >
                {name}
              </Button>
            </Link>
          ))}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {showSearch && (
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Suche…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        )}
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
