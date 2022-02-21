import { Pages, pages } from '../constants/page';

import Dict = NodeJS.Dict;

export const getPageConfiguration = (page: Pages) => pages[page];

export const getRoute = (page: Pages, parameters?: Dict<string | number | null | undefined>): string => {
  if (!parameters) {
    return pages[page].route;
  }
  const regex = new RegExp(`\\{${Object.keys(parameters).join('|')}\\}`, 'gi');
  return pages[page].route.replace(regex, (matched) => `${parameters[matched.replace(/[{}]/gi, '')] ?? ''}`);
};

export const getPageNameByRoute = (route: string): string | undefined =>
  Object.values(pages).find((page) => page.route === route)?.name;
