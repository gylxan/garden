import { Pages, pages } from '../constants/page';

export const getPageConfiguration = (page: Pages) => pages[page];

export const getRoute = (page: Pages): string => pages[page].route;

export const getPageNameByRoute = (route: string): string | undefined =>
  Object.values(pages).find((page) => page.route === route)?.name;
