import React from 'react';
import { SvgIconProps } from "@mui/material";

export interface PageConfiguration {
  name: string;
  description: string;
  route: string;
  icon?: React.FunctionComponent<SvgIconProps>;
}
