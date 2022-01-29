// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable, { File } from 'formidable';
import * as fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as path from 'path';

import { defaultPlant } from '../../constants/plant';
import { errorResponse } from '../../helpers/error';
import { IErrorResponse } from '../../interfaces/Error';
import { IPlant } from '../../interfaces/Plant';
import { Method } from '../../interfaces/Request';

const plants: IPlant[] = [
  {
    name: 'Rose',
    botanicalName: 'Rosa',
    sowingDescription:
      'Die Rosen (Rosa) sind die namensgebende Pflanzengattung der Familie der Rosengewächse (Rosaceae).',
    distance: 100,
    sowingTimeRange: {
      from: 3,
      to: 7,
    },
    height: 100,
    perennial: true,
    imageUrl: 'https://www.baumschule-hemmelmeyer.at/wp/wp-content/uploads/2020/06/rose-2417334_1920-1080x675.jpg',
  },
  {
    name: 'Salatrauke',
    botanicalName: 'Eruca sativa',
    sowingDescription:
      'Freut sich über sonnige bis halbschattige Orte z.B. auf der Fensterbank. Für die Aussaat kannst du alle 10cm ein Samenkorn tief in die Erde stecken.',
    distance: 10,
    height: 3,
    perennial: false,
    imageUrl: '/plants/placeholder.png',
  },
  {
    name: 'Erdbeere',
    botanicalName: 'Erdbeerico',
    sowingDescription: 'Freut sich über sonnige bis halbschattige Orte z.B. auf der Fensterbank.',
    distance: 10,
    height: 3,
    perennial: false,
    imageUrl: '/plants/placeholder.png',
  },
];

function handleGet(req: NextApiRequest, res: NextApiResponse<IPlant[]>) {
  return res.status(200).json(plants);
}

// Disable internal body parser of next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

const plantsFolder = 'plants';
const plantsPublicFolder = path.resolve('./public', plantsFolder);

async function handlePost(req: NextApiRequest, res: NextApiResponse<IPlant[] | IErrorResponse>) {
  const form = formidable({ multiples: true, maxFileSize: 10 * 1024 * 1024 });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(err.httpCode || 400).json(errorResponse(err.message));
    }
    const plant = JSON.parse(fields.data as string);
    if (files.image) {
      const { filepath } = files.image as unknown as File;
      const imageName = `${plant.name}.png`;
      fs.renameSync(filepath, `${plantsPublicFolder}/${imageName}`);
      plant.imageUrl = `/${plantsFolder}/${imageName}`;
    } else {
      plant.imageUrl = `/${plantsFolder}/placeholder.png`;
    }
    plants.push({ ...defaultPlant, ...plant });
    return handleGet(req, res);
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse<IPlant[] | IErrorResponse>) {
  switch (req.method) {
    case Method.POST:
      return handlePost(req, res);
    case Method.GET:
    default:
      return handleGet(req, res);
  }
}
