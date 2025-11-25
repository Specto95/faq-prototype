// Decisión no trivial:
// Evito SWR u otras librerías de estado porque la prueba prioriza claridad
// y un flujo explícito de búsqueda -> resultado. El fetching es directo,
// evitando cachés que complican el comportamiento para un MVP.

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FAQ } from "../types/types";

export function useFetch(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [faqs, setFaqs] = useState<FAQ[] | null>(null);
  const currentFaqs = useRef<FAQ[] | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const json: FAQ[] = await res.json();
      setFaqs(json);
      currentFaqs.current = json;
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { faqs, setFaqs, isLoading, error, refetch: fetchData, currentFaqs };
}
