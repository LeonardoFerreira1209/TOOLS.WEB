import { useCallback, useState } from 'react';
import storage from './storage';

export default function useStorage(key) {
  const [state, setState] = useState(() => storage.get(key));

  const set = useCallback(newValue => {
    storage.set(key, newValue);
    setState(newValue);

  }, [key]);

  const reset = useCallback(newValue => {
    storage.remove(key);
    setState(newValue);

  }, [key]);

  return [state, set, reset];
}