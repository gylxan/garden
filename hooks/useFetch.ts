import { useState } from 'react';

import request, { RequestProperties } from '../helpers/request';
import { Method } from '../interfaces/Request';

export enum Status {
  Initial = 'initial',
  Loading = 'loading',
  Successful = 'successful',
  Failed = 'failed',
}

interface FetchState<T> {
  status: Status;
  error: null | string;
  data: null | T;
}

export default function useFetch<T>() {
  const [fetchState, setFetchData] = useState<FetchState<T>>({
    status: Status.Initial,
    error: null,
    data: null,
  });
  const { data, status, error } = fetchState;

  async function fetchData({
    url,
    method = Method.GET,
    headers,
    body = null,
  }: RequestProperties): Promise<FetchState<T>> {
    setFetchData({ data, status: Status.Loading, error: null });

    try {
      const data = await request<T>({ url, method, body, headers });
      const response = { data, status: Status.Successful, error: null };
      setFetchData(response);
      return response;
    } catch (e) {
      const response = { data, status: Status.Failed, error: e as string };
      setFetchData(response);
      return response;
    }
  }

  return { status, error, data, fetchData };
}
