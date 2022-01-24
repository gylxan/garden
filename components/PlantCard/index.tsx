import { Card, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import classNames from 'classnames';

import { useState } from 'react';

import { PlantProps } from '../../pages/plants';

import styles from './PlantCard.module.scss';

export function PlantCard({ plant }: PlantProps) {
  const [isImageLoading, setImageLoading] = useState(true);
  return (
    <Card className={styles.Plant}>
      <>
        <CardMedia
          className={classNames(styles.Image, { [styles.Loading]: isImageLoading })}
          component="img"
          height="140"
          image={plant.imageUrl}
          alt="Plant image"
          onLoad={() => setImageLoading(false)}
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
          {plant.sowingDescription?.length ?? 0 > 180 ? `${plant.sowingDescription.substring(0, 180)}...` : plant.sowingDescription}
        </Typography>
      </CardContent>
    </Card>
  );
}
