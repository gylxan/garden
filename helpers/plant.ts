import { IPlant } from '../interfaces/Plant';

export const getImageUrl = (plant: IPlant): string => `https://drive.google.com/uc?id=${plant.imageId}`;
