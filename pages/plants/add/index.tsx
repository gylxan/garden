import UploadIcon from '@mui/icons-material/Upload';
import {
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import React, { ChangeEvent, useEffect, useState } from 'react';

import Link from '../../../components/Link';
import Page from '../../../components/Page/page';
import { monthNames, monthNamesShort } from '../../../constants/date';
import { Pages } from '../../../constants/page';
import { defaultPlant, placeholderImageUrl } from '../../../constants/plant';
import { getPageConfiguration, getRoute } from '../../../helpers/page';
import useFetch, { Status } from '../../../hooks/useFetch';
import { IPlant } from '../../../interfaces/Plant';
import { Method } from '../../../interfaces/Request';

import styles from './PlantsAdd.module.scss';

const PlantsAdd: NextPage = () => {
  const { name, description } = getPageConfiguration(Pages.PlantsAdd);
  const { push } = useRouter();

  const { status, fetchData, error } = useFetch({
    url: '/api/plants',
    method: Method.POST,
  });
  const [image, setImage] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [plant, setPlant] = useState<IPlant>({ ...defaultPlant });
  const isLoading = status === Status.Loading;

  useEffect(() => {
    if (status === Status.Successful) {
      push(getRoute(Pages.Plants));
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
    setPlant({ ...plant, [attributeName]: value });

  const handleSliderChange = (e: Event, value: number | number[], activeThumb: number) => {
    if (Array.isArray(value) && value.length === 2) {
      // @ts-expect-error
      changePlantValue(e.target.name as keyof IPlant, { form: value[0], to: value[1] });
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
    formData.append('data', JSON.stringify(plant));
    formData.append('image', image as File);
    fetchData(formData);
  };
  const fieldProps = { disabled: isLoading, onChange: handleChange };

  return (
    <Page title={name} description={description} className={styles.PlantsAddPage}>
      <Container
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '40rem' }}
        method="post"
        onSubmit={handleSubmit}
      >
        <TextField label="Name" variant="outlined" name="name" required {...fieldProps} autoFocus />
        <TextField label="Botanischer Name" variant="outlined" name="botanicalName" {...fieldProps} required />
        <TextField
          label="Beschreibung zur Aussaat"
          multiline
          minRows={3}
          variant="outlined"
          name="sowingDescription"
          {...fieldProps}
        />
        <TextField
          label="Beschreibung zur Ernte"
          multiline
          minRows={3}
          variant="outlined"
          name="harvestDescription"
          {...fieldProps}
        />
        <FormGroup>
          <FormControlLabel control={<Switch name="perennial" {...fieldProps} />} label="Mehrjährig" />
        </FormGroup>
        <Typography variant="body1">Aussaatzeitraum</Typography>
        <Slider
          getAriaLabel={() => 'Aussaatzeitraum'}
          defaultValue={[2, 5]}
          getAriaValueText={(value) => monthNamesShort[value - 1]}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => monthNames[value - 1]}
          name="sowingTimeRange"
          step={1}
          marks={monthNamesShort.map((name, index) => ({ value: index + 1, label: name }))}
          min={1}
          max={12}
          disableSwap
          {...fieldProps}
          onChange={handleSliderChange}
        />
        <Typography variant="body1">Erntezeitraum</Typography>
        <Slider
          getAriaLabel={() => 'Erntezeitraum'}
          defaultValue={[7, 9]}
          getAriaValueText={(value) => monthNamesShort[value - 1]}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => monthNames[value - 1]}
          name="harvestTimeRange"
          step={1}
          marks={monthNamesShort.map((name, index) => ({ value: index + 1, label: name }))}
          min={1}
          max={12}
          disableSwap
          {...fieldProps}
          onChange={handleSliderChange}
        />
        <TextField label="Wachshöhe in cm" variant="outlined" name="height" type="number" {...fieldProps} />
        <TextField label="Abstand in cm" variant="outlined" name="distance" type="number" {...fieldProps} />
        <Stack direction="row" spacing={1} alignItems="center">
          <div className={styles.Image}>
            <Image alt="plant image" src={objectUrl || placeholderImageUrl} layout="fill" objectFit="contain" />
          </div>
          <Button
            variant="contained"
            color="secondary"
            component="label"
            disabled={isLoading}
            startIcon={<UploadIcon />}
            className={styles.UploadButton}
          >
            Bild auswählen
            <input type="file" name="image" accept="image/png, image/jpeg" hidden onChange={uploadToClient} />
          </Button>
        </Stack>
        {error && (
          <FormHelperText error component="div">
            Fehler: {error}
          </FormHelperText>
        )}
        <Button type="submit" variant="contained" disabled={isLoading}>
          Hinzufügen
        </Button>
        <Link to={getRoute(Pages.Plants)}>
          <Button type="reset" variant="contained" color="secondary" disabled={isLoading} className={styles.Button}>
            Abbrechen
          </Button>
        </Link>
      </Container>
    </Page>
  );
};

export default PlantsAdd;
