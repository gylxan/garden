import { Pages, pages } from '../constants/page';
import { PageConfiguration } from '../interfaces/Page';

import Dict = NodeJS.Dict;

export const getPageConfiguration = (page: Pages) => pages[page];

export const getRoute = (page: Pages, parameters?: Dict<string | number | null | undefined>): string => {
  if (!parameters) {
    return pages[page].route;
  }
  const regex = new RegExp(`\\{${Object.keys(parameters).join('|')}\\}`, 'gi');
  return pages[page].route.replace(regex, (matched) => `${parameters[matched.replace(/[{}]/gi, '')] ?? ''}`);
};

export const getPageNameByRoute = (route: string): string | undefined => getBestMatchingPage(route)?.name;

const getBestMatchingPage = (route: string): undefined | PageConfiguration => {
  let page: PageConfiguration | undefined = undefined;

  Object.values(pages).forEach((currPage) => {
    if (route.match(currPage.route.replace(/{.*}/gi, '.+'))) {
      page = !page || page.route.length < currPage.route.length ? currPage : page;
    }
  });
  return page;
};
