import { auth, drive } from '@googleapis/drive';
import { drive_v3 } from '@googleapis/drive/v3';
import fs from 'fs';

import { GoogleErrors } from '../interfaces/Google';

export const DRIVE_SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file'];

export const getParentFolderId = (): string => process.env.GOOGLE_API_PARENT_FOLDER_ID as string;
export const getCredentialsJsonPath = (): string => process.env.GOOGLE_API_CREDENTIALS_JSON_PATH as string;
export const isGoogleDriveApiActive = () => !!getParentFolderId() && getParentFolderId().trim() !== '';

let driveClient: drive_v3.Drive;
function authenticate() {
  console.log(`Authenticate to Google Drive API with keyFile ${getCredentialsJsonPath()}`);
  return new auth.GoogleAuth({
    keyFile: getCredentialsJsonPath(),
    scopes: DRIVE_SCOPES,
  }).getClient();
}

async function getDriveClient() {
  if (driveClient) {
    return driveClient;
  }
  const authClient = await authenticate();
  driveClient = await drive({ version: 'v3', auth: authClient });
  return driveClient;
}

export async function uploadFile(filePath: string, fileName: string, mimeType: string): Promise<null | string> {
  if (!isGoogleDriveApiActive()) {
    return null;
  }
  const client = await getDriveClient();
  const requestBody = {
    name: fileName,
    parents: [getParentFolderId()],
  };

  const media = {
    mimeType,
    body: fs.createReadStream(filePath),
  };

  try {
    const response = await client.files.create({
      requestBody,
      media,
      fields: 'id',
    });
    console.log(`Created file ${response.data.id}`);
    return response.data.id as string;
  } catch (e) {
    throw (e as GoogleErrors).errors[0];
  }
}

export async function deleteFile(fileId: string): Promise<void> {
  if (!isGoogleDriveApiActive()) {
    return;
  }
  const client = await getDriveClient();
  try {
    await client.files.delete({
      fileId,
    });
    console.log(`Deleted file ${fileId}`);
  } catch (e) {
    throw (e as GoogleErrors).errors[0];
  }
}

export const getFileName = (plantName: string, originalFilename: string) => {
  return `${plantName.toLowerCase()}${
    originalFilename?.substring(
      originalFilename.indexOf('.') === -1 ? originalFilename.length : originalFilename.indexOf('.'),
    ) || '.png'
  }`;
};
