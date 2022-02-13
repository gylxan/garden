import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';

import { useState } from 'react';

import useFetch, { Status } from '../../hooks/useFetch';
import { IPlant } from '../../interfaces/Plant';
import { Method } from '../../interfaces/Request';

export interface PlantsAddPageProps {
  plant: IPlant;
  onUpdate: (plant: IPlant) => void;
}

export function PlantCard({ plant, onUpdate }: PlantsAddPageProps) {
  const [isImageLoading, setImageLoading] = useState(true);
  const {
    error: plantError,
    status: plantStatus,
    fetchData: updatePlant,
  } = useFetch<IPlant>({
    url: `/api/plants/${plant.id}/plant`,
    method: Method.POST,
  });
  const {
    error: unplantError,
    status: unplantStatus,
    fetchData: updateUnplant,
  } = useFetch({
    url: `/api/plants/${plant.id}/plant`,
    method: Method.DELETE,
  });

  async function handlePlant() {
    const plant = await updatePlant();
    if (!plantError) {
      onUpdate(plant as IPlant);
    }
  }

  async function handleUnplant() {
    const plant = await updateUnplant();
    if (!unplantError) {
      onUpdate(plant as IPlant);
    }
  }

  const isRequestLoading = plantStatus === Status.Loading || unplantStatus === Status.Loading;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <>
        <CardMedia
          component="img"
          height="140"
          image={plant.imageUrl || '/plants/placeholder.png'}
          alt="Plant image"
          onLoad={() => setImageLoading(false)}
          sx={{ display: isImageLoading ? 'none' : 'block' }}
        />
        {isImageLoading && <Skeleton variant="rectangular" height={140} />}
      </>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {plant.name}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div">
          {plant.botanicalName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {plant.sowingDescription?.length ?? 0 > 180
            ? `${plant.sowingDescription?.substring(0, 180)}...`
            : plant.sowingDescription}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: 'auto', position: 'relative' }}>
        {!!plant.planted ? (
          <IconButton
            aria-label="unplant"
            disabled={isRequestLoading}
            aria-disabled={isRequestLoading}
            onClick={handleUnplant}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="plant"
            disabled={isRequestLoading}
            aria-disabled={isRequestLoading}
            onClick={handlePlant}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        )}
        {isRequestLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '16px',
              left: '16px',
            }}
          />
        )}
      </CardActions>
    </Card>
  );
}
