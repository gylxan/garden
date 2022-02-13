// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { errorResponse } from '../../../../helpers/error';
import { IError, IErrorResponse } from '../../../../interfaces/Error';
import { IPlant } from '../../../../interfaces/Plant';
import { Method } from '../../../../interfaces/Request';
import prisma from '../../../../lib/prisma';

const defaultIncludeFields = {
  sowingTimeRange: {
    select: { from: true, to: true },
  },
  harvestTimeRange: {
    select: { from: true, to: true },
  },
};

async function updatePlanted(req: NextApiRequest, res: NextApiResponse<IPlant | IErrorResponse>, planted: null | Date) {
  const { id } = req.query;
  try {
    const newPlant = await prisma.plant.update({
      where: {
        id: parseInt(id as string),
      },
      data: {
        planted,
      },
      include: defaultIncludeFields,
    });
    return res.status(200).json(newPlant);
  } catch (e) {
    return res.status(400).json(errorResponse(e as IError));
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse<IPlant | IErrorResponse>) {
  return updatePlanted(req, res, null);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<IPlant | IErrorResponse>) {
  return updatePlanted(req, res, new Date());
}

export default function handler(req: NextApiRequest, res: NextApiResponse<IPlant | IErrorResponse>) {
  switch (req.method) {
    case Method.DELETE:
      return handleDelete(req, res);
    case Method.POST:
    default:
      return handlePost(req, res);
  }
}
