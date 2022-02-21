import CalendarIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import PlantIcon from '@mui/icons-material/YardOutlined';

import { PageConfiguration } from '../interfaces/Page';

export enum Pages {
  Home,
  Calendar,
  PlantsAdd,
  PlantsEdit,
}

export const pages: Record<Pages, PageConfiguration> = {
  [Pages.Home]: {
    name: 'Pflanzen',
    description: 'Willkommen im Garten',
    route: '/',
    icon: PlantIcon,
  },
  [Pages.PlantsAdd]: {
    name: 'Pflanze hinzufügen',
    description: 'Pflanzen hinzufügen',
    route: '/add',
    icon: PlantIcon,
  },
  [Pages.PlantsEdit]: {
    name: 'Pflanze bearbeiten',
    description: 'Bearbeiten der Pflanze',
    route: '/{id}',
    icon: EditIcon,
  },
  [Pages.Calendar]: {
    name: 'Kalender',
    description: 'Übersicht der Zeiten für die Aussaat und Ernte der Pflanzen',
    route: '/calendar',
    icon: CalendarIcon,
  },
};
