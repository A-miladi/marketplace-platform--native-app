import API from '@/services';
import {useState, useCallback} from 'react';

interface UseDeleteOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

interface UseDeleteResult<P> {
  loading: boolean;
  execute: (payload?: P) => void;
}

export const useDelete = <T, P>(
  url: string,
  options: UseDeleteOptions<T> = {},
): UseDeleteResult<P> => {
  const {onSuccess, onError} = options;

  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(() => {
    setLoading(true);
    API.delete<T>(url)
      .then(response => {
        if (onSuccess) {
          onSuccess(response.data);
        }
      })
      .catch(err => {
        const errorMessage =
          err.response?.data?.message || err.message || 'An error occurred';
        if (onError) {
          onError(errorMessage);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, onSuccess, onError]);

  return {loading, execute};
};
