import { useState } from 'react';

import request, { RequestProperties } from '../helpers/request';
import { Method } from '../interfaces/Request';

export enum Status {
  Initial = 'initial',
  Loading = 'loading',
  Successful = 'successful',
  Failed = 'failed',
}

export default function useFetch<T>() {
  const [fetchState, setFetchData] = useState<{ status: Status; error: null | string; data: null | T }>({
    status: Status.Initial,
    error: null,
    data: null,
  });
  const { data, status, error } = fetchState;

  async function fetchData({ url, method = Method.GET, headers, body = null }: RequestProperties) {
    setFetchData({ data, status: Status.Loading, error: null });

    try {
      const data = await request<T>({ url, method, body, headers });
      setFetchData({ data, status: Status.Successful, error: null });
    } catch (e) {
      setFetchData({ data, status: Status.Failed, error: e as string });
    }
  }

  return { status, error, data, fetchData };
}
