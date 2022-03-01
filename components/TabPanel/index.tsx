import { Box } from '@mui/system';

import React, { PropsWithChildren } from 'react';

export interface Props {
  index: number;
  value: number;
}

const TabPanel: React.FC<PropsWithChildren<Props> & React.HTMLProps<HTMLDivElement>> = ({
  index,
  value,
  children,
  ...otherProps
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...otherProps}
  >
    {value === index && <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>{children}</Box>}
  </div>
);

export default TabPanel;
