import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function post<T, R>(endpoint: string, data: T): Promise<R> {
  try {
    const response = await apiClient.post<R>(endpoint, data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<any>;
    const message = err.response?.data?.message || 'Error al procesar la solicitud';
    throw new ApiError(err.response?.status || 500, message);
  }
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}