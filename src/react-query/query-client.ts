import { AxiosError } from 'axios';
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const statusCode = (error as AxiosError).response?.status;
        return statusCode !== 403 && statusCode != 500 && failureCount < 2;
      },
    },
    mutations: {
      retry: false,
    },
  },
});
