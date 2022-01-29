import { Box } from '@mui/system';
import Head from 'next/head';

import React from 'react';

interface PageProps {
  title: string;
  description?: string;
  className?: string;
}

const Page: React.FC<PageProps> = ({ title, description, children, className }) => {
  return (
    <Box sx={{ position: 'relative' }} className={className}>
      <Head>
        <title>{title} | Garden</title>
        <meta name="description" content={description} />
      </Head>
      <Box
        component="main"
        sx={{
          py: 8,
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          mx: 4,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Page;
