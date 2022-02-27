export interface IPlant {
  id?: number | null;
  name: string;
  botanicalName: string;
  sowingDescription?: string | null;
  harvestDescription?: string | null;
  perennial?: boolean | null;
  sowingFrom?: number | null;
  sowingTo?: number | null;
  harvestFrom?: number | null;
  harvestTo?: number | null;
  height?: number | null;
  distance?: number | null;
  imageId?: string | null;
  planted?: Date | null;
}
