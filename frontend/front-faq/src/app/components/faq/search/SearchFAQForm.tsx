import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputSearch, searchSchema } from "@/app/schemas/faq";
import { Dispatch, SetStateAction, useState } from "react";
import { FAQ } from "@/app/types/types";

interface SearchFAQFormProps {
  setFaqs: Dispatch<SetStateAction<FAQ[] | null>>;
  apiBase?: string;
}

export function SearchFAQForm({ setFaqs, apiBase }: SearchFAQFormProps) {
  const { register, handleSubmit, formState } = useForm<InputSearch>({
    resolver: zodResolver(searchSchema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // SEARCH FAQ handler
  async function onSearch(values: InputSearch) {
    try {
      const response = await fetch(
        `${apiBase || "http://localhost:8000"}/api/search`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setFaqs([result]);
      } else {
        setFaqs([]);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSearch)}
      className="flex flex-col gap-4 text-black"
    >
      <input
        {...register("query")}
        placeholder="Search query"
        className="border p-2 rounded"
      />
      {formState.errors.query && (
        <p className="text-red-500 text-sm">{formState.errors.query.message}</p>
      )}

      <div className="flex gap-8">
        <button className="bg-green-600 text-white p-2 rounded">Search</button>
        {loading && <p>Searching...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
    </form>
  );
}
