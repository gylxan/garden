// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { errorResponse, validationError } from '../../../../helpers/error';
import { IError, IErrorResponse } from '../../../../interfaces/Error';
import { IPlant } from '../../../../interfaces/Plant';
import { Method } from '../../../../interfaces/Request';
import prisma from '../../../../lib/prisma';
import { savePlant } from '../index';

// Disable internal body parser of next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

async function handleGet(req: NextApiRequest, res: NextApiResponse<IPlant | IErrorResponse>) {
  const { id } = req.query;
  try {
    const plant = await prisma.plant.findUnique({
      where: { id: parseInt(id as string) },
    });
    if (!plant) {
      throw validationError(`Keine Pflanze mit der ID ${id} gefunden`, 'id');
    }
    return res.status(200).json(plant);
  } catch (e) {
    return res.status(400).json(errorResponse(e as IError));
  }
}

async function handleUpdate(req: NextApiRequest, res: NextApiResponse<IPlant | IErrorResponse>) {
  return savePlant(req, res, false);
}

export default function handler(req: NextApiRequest, res: NextApiResponse<IPlant | IErrorResponse>) {
  switch (req.method) {
    case Method.PUT:
      return handleUpdate(req, res);
    case Method.GET:
    default:
      return handleGet(req, res);
  }
}
