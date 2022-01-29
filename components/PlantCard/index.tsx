import { Card, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';

import { useState } from 'react';

import { IPlant } from '../../interfaces/Plant';

export interface PlantsAddPageProps {
  plant: IPlant;
}

export function PlantCard({ plant }: PlantsAddPageProps) {
  const [isImageLoading, setImageLoading] = useState(true);
  return (
    <Card>
      <>
        <CardMedia
          component="img"
          height="140"
          image={plant.imageUrl}
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
    </Card>
  );
}
