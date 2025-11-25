"use client";

import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFaqSchema, InputCreateFAQ } from "@/app/schemas/faq";
import { FAQ } from "@/app/types/types";

interface FAQFormProps {
  setFaqs: Dispatch<SetStateAction<FAQ[] | null>>;
  apiBase?: string;
  currentFaqs: MutableRefObject<FAQ[] | null>;
}

export function CreateFAQForm({ setFaqs, apiBase, currentFaqs }: FAQFormProps) {
  const { register, handleSubmit, formState, reset } = useForm<InputCreateFAQ>({
    resolver: zodResolver(createFaqSchema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onCreate(values: InputCreateFAQ) {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${apiBase || "http://localhost:8000"}/api/faq`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const newFaq = await response.json();
        setFaqs((prev: any) => [...prev, newFaq]);
        currentFaqs.current = [...(currentFaqs.current || []), newFaq];
        reset();
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onCreate)}
      className="flex flex-col gap-4 text-black"
    >
      <input
        {...register("question")}
        placeholder="Question"
        className="border p-2 rounded"
      />
      {formState.errors.question && (
        <p className="text-red-500 text-sm">
          {formState.errors.question.message}
        </p>
      )}

      <textarea
        {...register("answer")}
        placeholder="Answer"
        className="border p-2 rounded"
      />
      {formState.errors.answer && (
        <p className="text-red-500 text-sm">
          {formState.errors.answer.message}
        </p>
      )}

      <div className="flex gap-8">
        <button
          className="bg-blue-600 text-white p-2 rounded"
          disabled={loading}
          type="submit"
        >
          Save FAQ
        </button>
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
    </form>
  );
}
