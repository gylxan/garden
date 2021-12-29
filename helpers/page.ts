import { Pages, pages } from '../constants/page';

export const getPageConfiguration = (page: Pages) => pages[page];

export const getRoute = (page: Pages): string => pages[page].route;
