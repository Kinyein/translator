import { useEffect, useState } from "react";

export function useDebounce<T> (value: T, delay:number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer);
  }, [value, delay])

  return debouncedValue
}

// useDebounce<string>(1, 200) <T> se usa para que al llamar la función en el momento se define que tipo de valor deber ser alguna prop, en este caso el primer valor debe ser string, lo infiere así no se especifíque