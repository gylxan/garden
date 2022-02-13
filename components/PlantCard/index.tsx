import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Alert,
  AlertColor,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Skeleton,
  Snackbar,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';

import useFetch, { Status } from '../../hooks/useFetch';
import { IPlant } from '../../interfaces/Plant';
import { Method } from '../../interfaces/Request';

export interface PlantsAddPageProps {
  plant: IPlant;
  onUpdate: (plant: IPlant) => void;
}

export function PlantCard({ plant, onUpdate }: PlantsAddPageProps) {
  const [isImageLoading, setImageLoading] = useState(true);
  const [alert, setAlert] = useState<{ open: boolean; message: string; type: AlertColor }>({
    open: false,
    message: '',
    type: 'success',
  });
  const { error, status, data, fetchData } = useFetch<IPlant>();
  const isRequestLoading = status === Status.Loading;

  async function updatePlant(planted: boolean) {
    await fetchData({
      url: `/api/plants/${plant.id}/plant`,
      method: planted ? Method.POST : Method.DELETE,
    });
  }

  useEffect(() => {
    if (status === Status.Successful) {
      onUpdate(data as IPlant);
      setAlert({
        open: true,
        message: `Pflanze "${plant.name}" ${data?.planted ? 'geplanzt' : 'ausgebuddelt'}`,
        type: 'success',
      });
    }

    if (status === Status.Failed) {
      setAlert({ open: true, message: `Fehler: ${error}`, type: 'error' });
    }
  }, [status]);

  async function handlePlant() {
    updatePlant(true);
  }

  async function handleUnplant() {
    updatePlant(false);
  }

  function handleCloseAlert() {
    setAlert({ ...alert, open: false });
  }

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
      <Snackbar onClose={handleCloseAlert} open={alert.open} autoHideDuration={3000}>
        <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}
