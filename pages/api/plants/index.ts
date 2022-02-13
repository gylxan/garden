// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable, { File } from 'formidable';
import * as fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as path from 'path';

import { defaultPlant } from '../../../constants/plant';
import { errorResponse, validationError } from '../../../helpers/error';
import { IError, IErrorResponse } from '../../../interfaces/Error';
import { IPlant } from '../../../interfaces/Plant';
import { Method } from '../../../interfaces/Request';
import prisma from '../../../lib/prisma';

// Disable internal body parser of next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

const defaultIncludeFields = {
  sowingTimeRange: {
    select: { from: true, to: true },
  },
  harvestTimeRange: {
    select: { from: true, to: true },
  },
};

const plantsFolder = 'plants';
const plantsPublicFolder = path.resolve('./public', plantsFolder);

async function validate(plant: IPlant) {
  const { name, botanicalName } = plant;
  // TODO Use yup for validation here
  const foundPlant = await prisma.plant.findFirst({
    where: {
      OR: [{ name }, { botanicalName }],
    },
  });
  if (!foundPlant) {
    return;
  }
  if (foundPlant.name === name) {
    throw validationError(`Pflanze mit Name "${name}" bereits vorhanden`, 'name');
  }
  if (foundPlant.botanicalName === botanicalName) {
    throw validationError(`Pflanze mit botanischen Namen "${name}" bereits vorhanden`, 'botanicalName');
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<IPlant[] | IErrorResponse>) {
  const plants = await prisma.plant.findMany({
    include: defaultIncludeFields,
    orderBy: {
      name: 'asc',
    },
  });
  return res.status(200).json(plants);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<IPlant | IErrorResponse>) {
  const form = formidable({ multiples: true, maxFileSize: 10 * 1024 * 1024 });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(err.httpCode || 400).json(errorResponse(err.message));
    }

    const plant = JSON.parse(fields.data as string);
    try {
      await validate(plant);
      if (files.image) {
        const { filepath } = files.image as unknown as File;
        const imageName = `${plant.name}.png`;
        fs.renameSync(filepath, `${plantsPublicFolder}/${imageName}`);
        plant.imageUrl = `/${plantsFolder}/${imageName}`;
      } else {
        plant.imageUrl = `/${plantsFolder}/placeholder.png`;
      }
      const newPlant = await prisma.plant.create({
        data: {
          ...defaultPlant,
          ...plant,
          distance:
            typeof plant.distance === 'string' && plant.distance.trim() !== ''
              ? parseInt(plant.distance)
              : defaultPlant.distance,
          height:
            typeof plant.height === 'string' && plant.height.trim() !== ''
              ? parseInt(plant.height)
              : defaultPlant.height,
          ...(plant.sowingTimeRange ? { sowingTimeRange: { create: { ...plant.sowingTimeRange } } } : {}),
          ...(plant.harvestTimeRange ? { harvestTimeRange: { create: { ...plant.harvestTimeRange } } } : {}),
        },
        include: defaultIncludeFields,
      });
      return res.status(200).json(newPlant);
    } catch (e) {
      return res.status(400).json(errorResponse(e as IError));
    }
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse<IPlant | IPlant[] | IErrorResponse>) {
  switch (req.method) {
    case Method.POST:
      return handlePost(req, res);
    case Method.GET:
    default:
      return handleGet(req, res);
  }
}
