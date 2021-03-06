import { getPageConfiguration } from '../helpers/page';
import { PageConfiguration } from '../interfaces/Page';
import { Pages } from './page';

export const navigation: PageConfiguration[] = [getPageConfiguration(Pages.Home), getPageConfiguration(Pages.Calendar)];

export const navigationPaths = navigation.map(({ route }) => route);
