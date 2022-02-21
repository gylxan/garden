export const convertToNumber = (value: string | undefined | null) =>
  typeof value === 'string' && value.trim() !== '' ? parseInt(value) : null;
