import { useState } from 'react';

import { Method } from '../interfaces/Request';

type Properties = {
  url: string;
  method?: Method;
  headers?: HeadersInit;
};

export enum Status {
  Initial = 'initial',
  Loading = 'loading',
  Successful = 'successful',
  Failed = 'failed',
}

export default function useFetch<T>({ url, method = Method.GET, headers }: Properties) {
  const [fetchState, setFetchData] = useState<{ status: Status; error: null | string; data: null | T }>({
    status: Status.Initial,
    error: null,
    data: null,
  });
  const { data, status, error } = fetchState;

  function fetchData(body: any = null) {
    setFetchData({ data, status: Status.Loading, error: null });
    return fetch(url, { method, body, headers })
      .then(async (response) => {
        if (response.ok) {
          const data = (await response.json()) as unknown as T;
          setFetchData({ data, status: Status.Successful, error: null });
          return data;
        }
        throw response;
      })
      .catch(async (response) => {
        const error = (await response.json())?.error?.message;
        setFetchData({ data, status: Status.Failed, error: error || response.statusText });
      });
  }

  return { status, error, data, fetchData };
}
