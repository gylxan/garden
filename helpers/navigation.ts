import { navigationPaths } from '../constants/navigation';
import { getNearestMatchingPath } from './url';

export const getMatchingNavigationPath = (pathname: string) => getNearestMatchingPath(pathname, navigationPaths);
