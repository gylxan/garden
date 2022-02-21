import { Method } from '../interfaces/Request';

export type RequestProperties = {
  url: string;
  method?: Method;
  headers?: HeadersInit;
  body?: any;
};

export default function request<T>({ url, method = Method.GET, body = null, headers }: RequestProperties) {
  return fetch(url, { method, body, headers })
    .then(async (response) => {
      if (response.ok) {
        return (await response.json()) as unknown as T;
      }
      throw response;
    })
    .catch(async (response) => {
      const error = (await response.json())?.error?.message;
      throw error || response.statusText;
    });
}
