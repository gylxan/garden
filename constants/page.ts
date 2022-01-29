import CalendarIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PlantIcon from '@mui/icons-material/YardOutlined';

import { PageConfiguration } from '../interfaces/Page';

export enum Pages {
  Home,
  Plants,
  Calendar,
  PlantsAdd,
}

export const pages: Record<Pages, PageConfiguration> = {
  [Pages.Home]: {
    name: 'Home',
    description: 'Willkommen im Garden',
    route: '/',
    icon: HomeIcon,
  },
  [Pages.Plants]: {
    name: 'Pflanzen',
    description: 'Übersicht der Pflanzen',
    route: '/plants',
    icon: PlantIcon,
  },
  [Pages.PlantsAdd]: {
    name: 'Pflanze hinzufügen',
    description: 'Pflanzen hinzufügen',
    route: '/plants/add',
    icon: PlantIcon,
  },
  [Pages.Calendar]: {
    name: 'Kalender',
    description: 'Übersicht der Zeiten für die Aussaat und Ernte der Pflanzen',
    route: '/calendar',
    icon: CalendarIcon,
  },
};
