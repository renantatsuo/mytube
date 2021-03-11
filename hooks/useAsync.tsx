import React, { Reducer } from "react";

enum AsyncStatus {
  IDLE = "idle",
  PENDING = "pending",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

type AsyncState<T> = {
  status: AsyncStatus;
  data: T | null;
  error: any;
};

type AsyncAction<T> = {
  status: AsyncStatus;
  data?: T;
  error?: any;
};

const defaultInitialState = {
  status: AsyncStatus.IDLE,
  data: null,
  error: null,
};

function asyncReducer<T>(
  state: AsyncState<T>,
  action: AsyncAction<T>
): AsyncState<T> {
  return {
    ...state,
    ...action,
  };
}

function useAsync<T>() {
  const [{ status, data, error }, setState] = React.useReducer<
    Reducer<AsyncState<T>, AsyncAction<T>>
  >(asyncReducer, defaultInitialState);

  const setData = React.useCallback(
    (data) => setState({ data, status: AsyncStatus.RESOLVED }),
    [setState]
  );

  const setError = React.useCallback(
    (error) => setState({ error, status: AsyncStatus.REJECTED }),
    [setState]
  );

  const execute = React.useCallback(
    async (promise: Promise<T>) => {
      if (!promise || !promise.then) {
        throw new Error(`useAsync.execute should be a Promise`);
      }

      setState({ status: AsyncStatus.PENDING });

      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          return Promise.reject(error);
        });
    },
    [setState, setData, setError]
  );

  return {
    isIdle: status === AsyncStatus.IDLE,
    isPending: status === AsyncStatus.PENDING,
    isError: status === AsyncStatus.REJECTED,
    isResolved: status === AsyncStatus.RESOLVED,
    error,
    status,
    data,
    execute,
    setData,
    setError,
  };
}

export { useAsync };
