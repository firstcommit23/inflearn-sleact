import { Dispatch, SetStateAction, useCallback, useState, UIEvent, ChangeEvent } from 'react';

type ReturnTypes<T = any> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

const useInput = <T = any>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value as unknown as T);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
