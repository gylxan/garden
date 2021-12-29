import { getPageConfiguration } from '../helpers/page';
import { Pages } from "./page";

export const navigation = [
  getPageConfiguration(Pages.Home),
  getPageConfiguration(Pages.Plants),
  getPageConfiguration(Pages.Calendar),
];
