export interface IPlant {
  name: string;
  botanicalName: string;
  sowingDescription?: string;
  harvestDescription?: string;
  perennial: boolean;
  sowingTimeRange?: ITimeRange;
  harvestTimeRange?: ITimeRange;
  height?: number;
  distance?: number;
  imageUrl?: string;
}

export type ITimeRange = {
  from: number;
  to: number;
};
