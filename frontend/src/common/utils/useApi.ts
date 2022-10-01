import { useEffect, useReducer } from 'react';
import { URL } from 'url';

import { ValidationOutputError } from '@/modules/eventForm/models/types';

type State<T> =
    | {
          readonly data: null;
          readonly isLoading: false;
          readonly error: null;
      }
    | {
          readonly data: null;
          readonly isLoading: true;
          readonly error: null;
      }
    | {
          readonly data: T;
          readonly isLoading: false;
          readonly error: null;
      }
    | {
          readonly data: null;
          readonly isLoading: false;
          readonly error: Error | ValidationOutputError;
      };

const doFetch = async <T>(path: URL, options?: RequestInit): Promise<T> => {
    const res = await fetch(path, options);

    if (!res.ok) {
        throw await res.json();
    }
    const responseData = await res.json();
    if (res.status === 500 || res.status === 422 || res.status === 404) {
        throw responseData;
    }
    if (res.status === 201 || res.status === 200) {
        return responseData;
    }
    throw await res.json();
};

type Action<T> =
    | { type: 'RESET' }
    | { type: 'FETCHING' }
    | { type: 'SUCCESS'; payload: T }
    | { type: 'ERROR'; payload: Error | ValidationOutputError };

const createApiReducer =
    <T>() =>
    (state: Readonly<State<T>>, action: Readonly<Action<T>>): Readonly<State<T>> => {
        switch (action.type) {
            case 'RESET':
                return { data: null, isLoading: false, error: null };
            case 'FETCHING':
                return { data: null, isLoading: true, error: null };
            case 'SUCCESS':
                return { data: action.payload, isLoading: false, error: null };
            case 'ERROR':
                return { data: null, isLoading: false, error: action.payload };
            default:
                return state;
        }
    };

export const useApi = <T>(path: URL, options?: RequestInit | null): State<T> => {
    const apiReducer = createApiReducer<T>();
    const [response, dispatch] = useReducer(apiReducer, {
        data: null,
        isLoading: false,
        error: null,
    });

    useEffect(() => {
        if (options === null) {
            dispatch({ type: 'RESET' });
        } else {
            dispatch({ type: 'FETCHING' });
            doFetch<T>(path, options)
                .then(data => dispatch({ type: 'SUCCESS', payload: data }))
                .catch(error => dispatch({ type: 'ERROR', payload: error }));
        }
    }, [path, options]);

    return response;
};
