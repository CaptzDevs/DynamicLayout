import { useRef, useEffect, useCallback } from 'react';

const useDebounceCallback = (callback, delay = 300) => {
  const timeoutRef = useRef();

  const debouncedFn = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  // Optional: clear timeout on unmount
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return debouncedFn;
};

export default useDebounceCallback;
