import UploadIcon from '@mui/icons-material/Upload';
import {
  Button,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useRouter } from 'next/router';

import React, { ChangeEvent, useEffect, useState } from 'react';

import { monthNames, monthNamesShort } from '../../constants/date';
import { Pages } from '../../constants/page';
import { defaultPlant, placeholderImageUrl } from '../../constants/plant';
import { getRoute } from '../../helpers/page';
import { getImageUrl } from '../../helpers/plant';
import useFetch, { Status } from '../../hooks/useFetch';
import { IPlant } from '../../interfaces/Plant';
import { Method } from '../../interfaces/Request';
import Link from '../Link';

export interface Props {
  plant?: IPlant;
}

const PlantForm: React.FC<Props> = ({ plant }) => {
  const { push } = useRouter();

  const { status, fetchData, error } = useFetch();
  const [image, setImage] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [currentPlant, setCurrentPlant] = useState<IPlant>({ ...defaultPlant, ...(plant ? plant : {}) });
  const isLoading = status === Status.Loading;

  useEffect(() => {
    if (plant) {
      setCurrentPlant({ ...plant });
      setObjectUrl(plant.imageId ? getImageUrl(plant) : null);
    }
  }, [plant]);

  useEffect(() => {
    if (status === Status.Successful) {
      push(getRoute(Pages.Home));
    }
  }, [status, push]);

  const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.currentTarget.files?.[0];
    if (image) {
      setImage(image);
      setObjectUrl(URL.createObjectURL(image));
    }
  };

  const changePlantValue = (attributeName: keyof IPlant, value: IPlant[keyof IPlant]) =>
    setCurrentPlant((currentPlant) => ({ ...currentPlant, [attributeName]: value }));

  const handleSliderChange = (e: Event, value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      // @ts-expect-error
      changePlantValue(`${e.target.name}To` as keyof IPlant, value[1]);
      // @ts-expect-error
      changePlantValue(`${e.target.name}From` as keyof IPlant, value[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePlantValue(
      e.currentTarget.name as keyof IPlant,
      e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('data', JSON.stringify(currentPlant));
    formData.append('image', image as File);
    fetchData({
      url: `/api/plants/${plant?.id ?? ''}`,
      method: plant ? Method.PUT : Method.POST,
      body: formData,
    });
  };
  const fieldProps = { disabled: isLoading, onChange: handleChange };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '40rem', width: '100%' }}
      method="post"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        required
        {...fieldProps}
        autoFocus
        value={currentPlant.name || ''}
      />
      <TextField
        label="Botanischer Name"
        variant="outlined"
        name="botanicalName"
        {...fieldProps}
        required
        value={currentPlant.botanicalName || ''}
      />
      <TextField
        label="Beschreibung zur Aussaat"
        multiline
        minRows={3}
        variant="outlined"
        name="sowingDescription"
        {...fieldProps}
        value={currentPlant.sowingDescription || ''}
      />
      <TextField
        label="Beschreibung zur Ernte"
        multiline
        minRows={3}
        variant="outlined"
        name="harvestDescription"
        {...fieldProps}
        value={currentPlant.harvestDescription || ''}
      />
      <FormGroup>
        <FormControlLabel
          control={<Switch name="perennial" {...fieldProps} />}
          label="Mehrjährig"
          checked={currentPlant.perennial || false}
        />
      </FormGroup>
      <Typography variant="body1">Aussaatzeitraum</Typography>
      <Slider
        getAriaLabel={() => 'Aussaatzeitraum'}
        getAriaValueText={(value) => monthNamesShort[value - 1]}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => monthNames[value - 1]}
        name="sowing"
        step={1}
        marks={monthNamesShort.map((name, index) => ({ value: index + 1, label: name }))}
        min={1}
        max={12}
        disableSwap
        {...fieldProps}
        onChange={handleSliderChange}
        value={[currentPlant.sowingFrom || 2, currentPlant.sowingTo || 5]}
      />
      <Typography variant="body1">Erntezeitraum</Typography>
      <Slider
        getAriaLabel={() => 'Erntezeitraum'}
        getAriaValueText={(value) => monthNamesShort[value - 1]}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => monthNames[value - 1]}
        name="harvest"
        step={1}
        marks={monthNamesShort.map((name, index) => ({ value: index + 1, label: name }))}
        min={1}
        max={12}
        disableSwap
        {...fieldProps}
        onChange={handleSliderChange}
        value={[currentPlant.harvestFrom || 7, currentPlant.harvestTo || 9]}
      />
      <TextField
        label="Wachshöhe in cm"
        variant="outlined"
        name="height"
        type="number"
        value={currentPlant.height || ''}
        {...fieldProps}
      />
      <TextField
        label="Abstand in cm"
        variant="outlined"
        name="distance"
        type="number"
        value={currentPlant.distance || ''}
        {...fieldProps}
      />
      <Stack direction="row" spacing={1} alignItems="center">
        <Box sx={{ display: 'flex', position: 'relative', height: '100px', width: '100px' }}>
          <Image alt="plant image" src={objectUrl || placeholderImageUrl} layout="fill" objectFit="contain" />
        </Box>
        <Button variant="contained" color="secondary" component="label" disabled={isLoading} startIcon={<UploadIcon />}>
          Bild auswählen
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg, image/svg+xml"
            hidden
            onChange={uploadToClient}
          />
        </Button>
      </Stack>
      {error && (
        <FormHelperText error component="div">
          Fehler: {error}
        </FormHelperText>
      )}
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          flexDirection: { xs: 'column', md: 'row' },
          alignSelf: 'center',
          width: '100%',
          marginTop: 4,
          gap: 2,
          minWidth: { md: '400px' },
          maxWidth: { md: '400px' },
        }}
      >
        <Button sx={{ width: '100%' }} type="submit" variant="contained" disabled={isLoading}>
          Speichern
        </Button>
        <Link to={getRoute(Pages.Home)} tabIndex={-1}>
          <Button sx={{ width: '100%' }} type="reset" variant="contained" color="secondary" disabled={isLoading}>
            Abbrechen
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default PlantForm;
