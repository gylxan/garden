import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Alert,
  AlertColor,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Skeleton,
  Snackbar,
  Typography,
} from '@mui/material';

import { useState } from 'react';

import { Pages } from '../../constants/page';
import { getRoute } from '../../helpers/page';
import { getImageUrl } from '../../helpers/plant';
import useFetch, { Status } from '../../hooks/useFetch';
import { IPlant } from '../../interfaces/Plant';
import { Method } from '../../interfaces/Request';
import Link from '../Link';

export interface PlantsAddPageProps {
  plant: IPlant;
  onUpdate: (plant: IPlant) => void;
  onDelete: (plant: IPlant) => void;
}

export function PlantCard({ plant, onUpdate, onDelete }: PlantsAddPageProps) {
  const [isImageLoading, setImageLoading] = useState(true);
  const [alert, setAlert] = useState<{ open: boolean; message: string; type: AlertColor }>({
    open: false,
    message: '',
    type: 'success',
  });
  const { status, fetchData } = useFetch<IPlant>();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const isRequestLoading = status === Status.Loading;

  const actions = [
    {
      icon: EditIcon,
      label: 'edit',
      link: getRoute(Pages.PlantsEdit, { id: plant.id }),
    },
    {
      icon: plant.planted ? RemoveCircleOutlineIcon : AddCircleOutlineIcon,
      label: plant.planted ? 'unplant' : 'plant',
      handler: plant.planted ? handleUnplant : handlePlant,
    },
    {
      icon: DeleteIcon,
      label: 'delete',
      handler: openDeleteDialog,
    },
  ];

  async function updatePlant(planted: boolean) {
    const { data, status, error } = await fetchData({
      url: `/api/plants/${plant.id}/plant`,
      method: planted ? Method.POST : Method.DELETE,
    });
    if (status === Status.Successful) {
      onUpdate(data as IPlant);
      setAlert({
        open: true,
        message: `Pflanze "${plant.name}" ${data?.planted ? 'geplanzt' : 'ausgebuddelt'}`,
        type: 'success',
      });
    } else if (status === Status.Failed) {
      setAlert({ open: true, message: `Fehler: ${error}`, type: 'error' });
    }
  }

  async function handleDelete() {
    const { data, status, error } = await fetchData({
      url: `/api/plants/${plant.id}`,
      method: Method.DELETE,
    });
    if (status === Status.Successful) {
      onDelete(data as IPlant);
    } else if (status === Status.Failed) {
      setAlert({ open: true, message: `Fehler: ${error}`, type: 'error' });
    }
  }

  function handlePlant() {
    updatePlant(true);
  }

  function handleUnplant() {
    updatePlant(false);
  }

  function openDeleteDialog() {
    setDeleteDialogOpen(true);
  }

  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
  }

  function handleCloseAlert() {
    setAlert({ ...alert, open: false });
  }

  return (
    <>
      <Card sx={{ display: 'flex', flexDirection: 'column' }}>
        <>
          <CardMedia
            component="img"
            height="140"
            image={plant.imageId ? getImageUrl(plant) : '/plants/placeholder.png'}
            alt="Plant image"
            onLoad={() => setImageLoading(false)}
            sx={{ display: isImageLoading ? 'none' : 'block', objectFit: 'contain' }}
          />
          {isImageLoading && <Skeleton variant="rectangular" height={140} />}
        </>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {plant.name}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {plant.botanicalName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {(plant.sowingDescription?.length ?? 0) > 180
              ? `${plant.sowingDescription?.substring(0, 180)}...`
              : plant.sowingDescription}
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: 'auto', position: 'relative' }}>
          {actions.map(({ icon: Icon, label, handler, link }) => {
            const button = (
              <IconButton
                key={label}
                aria-label={label}
                disabled={isRequestLoading}
                aria-disabled={isRequestLoading}
                sx={{ ml: '0 !important' }}
                {...(handler ? { onClick: handler } : {})}
              >
                <Icon />
              </IconButton>
            );
            return link ? (
              <Link key={`${label}-link`} to={link} passHref tabIndex={-1}>
                {button}
              </Link>
            ) : (
              button
            );
          })}
        </CardActions>
        <Snackbar onClose={handleCloseAlert} open={alert.open} autoHideDuration={3000}>
          <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Card>
      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog} aria-describedby="alert-dialog-delete-description">
        <DialogTitle>{`${plant.name} löschen?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-delete-description">
            Soll die Pflanze &quot;{plant.name}&quot; wirklich gelöscht werden?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Abbrechen</Button>
          <Button onClick={handleDelete}>Löschen</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
