import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, IconButton, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

import React, { FormEvent, useEffect, useState } from 'react';

const SearchForm = styled('form')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
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
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const ClearIconButton = styled(IconButton)(() => ({
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
}));

export function Search() {
  const { pathname, push, query, isReady } = useRouter();
  const { query: searchQuery } = query;
  const [value, setValue] = useState('');

  // The effect is needed, because router is not ready on first render so
  // we can't use query as initial state for value
  useEffect(() => {
    if (isReady && searchQuery) {
      setValue(searchQuery as string);
    }
  }, [searchQuery, isReady]);

  function handleSubmit(e: FormEvent) {
    push({ pathname, query: { query: value } });
    e.preventDefault();
  }

  function clear() {
    setValue('');
    push({ pathname, query: { query: '' } });
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
      {value && (
        <ClearIconButton aria-label="delete" onClick={() => clear()} color="primary">
          <ClearIcon />
        </ClearIconButton>
      )}
    </SearchForm>
  );
}
