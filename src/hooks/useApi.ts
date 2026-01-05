import { useState, useCallback } from "react";

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseApiReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (params?: P) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T, P = void>(
  apiFunction: (params: P) => Promise<T>,
  options?: UseApiOptions<T>
): UseApiReturn<T, P> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (params?: P): Promise<T | null> => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(params as P);
        setData(result);
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Erro desconhecido");
        setError(error);
        options?.onError?.(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}