import SearchIcon from '@mui/icons-material/Search';
import { alpha, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

import React, { FormEvent, useEffect, useState } from 'react';

const SearchForm = styled('form')(({ theme }) => ({
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

export function Search() {
  const { pathname, push, query } = useRouter();
  const { query: searchQuery } = query;
  const [value, setValue] = useState(searchQuery || '');

  useEffect(() => {
    if (searchQuery && searchQuery !== value) {
      setValue(searchQuery as string);
    }
  }, [searchQuery]);

  function handleSubmit(e: FormEvent) {
    push({ pathname, query: { query: value } });
    e.preventDefault();
  }
  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Suche…"
        inputProps={{ 'aria-label': 'search' }}
        name="query"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    </SearchForm>
  );
}
