export interface IPlant {
  id?: number | null;
  name: string;
  botanicalName: string;
  sowingDescription?: string | null;
  harvestDescription?: string | null;
  perennial?: boolean | null;
  sowingTimeRange?: ITimeRange | null;
  harvestTimeRange?: ITimeRange | null;
  height?: number | null;
  distance?: number | null;
  imageUrl?: string | null;
  planted?: Date | null;
}

export type ITimeRange = {
  from: number;
  to: number;
};
