// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable, { File } from 'formidable';
import * as fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as path from 'path';

import { defaultPlant } from '../../../constants/plant';
import { errorResponse, validationError } from '../../../helpers/error';
import { convertToNumber } from '../../../helpers/string';
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

const plantsFolder = 'plants';
const plantsPublicFolder = path.resolve('./public', plantsFolder);

async function validate(plant: IPlant, isCreate = true) {
  const { name, id } = plant;
  // TODO Use yup for validation here
  if (isCreate) {
    const foundPlant = await prisma.plant.findFirst({
      where: {
        name,
      },
    });
    if (!foundPlant) {
      return;
    }
    if (foundPlant.name === name) {
      throw validationError(`Pflanze mit Name "${name}" bereits vorhanden`, 'name');
    }
  } else {
    const foundPlant = await prisma.plant.findFirst({
      where: {
        OR: [
          {
            name,
          },
          {
            id: id as number,
          },
        ],
      },
    });
    if (!foundPlant) {
      throw validationError(`Pflanze mit der ID "${id}" existiert nicht`, 'name');
    }
    if (foundPlant.id !== id) {
      throw validationError(`Pflanze mit dem Namen "${name}" bereits vorhanden`, 'name');
    }
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<IPlant[] | IErrorResponse>) {
  const plants = await prisma.plant.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return res.status(200).json(plants);
}

export const savePlant = (req: NextApiRequest, res: NextApiResponse<IPlant | IErrorResponse>, isCreate = true) => {
  const form = formidable({ multiples: true, maxFileSize: 10 * 1024 * 1024 });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(err.httpCode || 400).json(errorResponse(err.message));
    }

    const plant = JSON.parse(fields.data as string);
    try {
      await validate(plant, isCreate);
      if (files.image) {
        console.log('upload file');
        const { filepath } = files.image as unknown as File;
        const imageName = `${plant.name}.png`;
        fs.renameSync(filepath, `${plantsPublicFolder}/${imageName}`);
        plant.imageUrl = `/${plantsFolder}/${imageName}`;
      } else if (isCreate) {
        plant.imageUrl = `/${plantsFolder}/placeholder.png`;
      }

      const data = {
        ...defaultPlant,
        ...plant,
        distance: convertToNumber(plant.distance) || defaultPlant.distance,
        height: convertToNumber(plant.height) || defaultPlant.height,
      };

      const newPlant = isCreate
        ? await prisma.plant.create({
            data,
          })
        : await prisma.plant.update({ data, where: { id: data.id } });
      return res.status(200).json(newPlant);
    } catch (e) {
      return res.status(400).json(errorResponse(e as IError));
    }
  });
};

async function handlePost(req: NextApiRequest, res: NextApiResponse<IPlant | IErrorResponse>) {
  return savePlant(req, res, true);
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
