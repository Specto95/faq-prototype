"use client";

import { useState, lazy } from "react";
import { useFetch } from "./hooks/useFetch";
import { FAQ } from "./types/types";
import { FAQListByMode } from "./components/faq/FAQListByMode";

const CreateFAQForm = lazy(() =>
  import("./components/faq/create/CreateFAQForm").then((mod) => ({
    default: mod.CreateFAQForm,
  }))
);

const SearchFAQForm = lazy(() =>
  import("./components/faq/search/SearchFAQForm").then((mod) => ({
    default: mod.SearchFAQForm,
  }))
);

export default function Home() {
  const [mode, setMode] = useState<"create" | "search">("create");
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const { faqs, isLoading, error, setFaqs, refetch, currentFaqs } = useFetch(
    `${apiBase}/api/faqs`
  );

  const handleClearFAQs = () => {
    setFaqs(null);
  };

  return (
    <main className="flex h-screen flex-col items-center justify-start p-10">
      <h1 className="text-2xl font-bold mb-6">Q-Finder</h1>

      <div className="flex gap-3 mb-8">
        <button
          onClick={() => {
            setMode("create");
          }}
          className={`p-2 rounded text-white ${
            mode === "create" ? "bg-blue-600" : "bg-blue-400"
          }`}
        >
          Crear FAQ
        </button>

        <button
          onClick={() => {
            setMode("search");
            handleClearFAQs();
          }}
          className={`p-2 rounded text-white ${
            mode === "search" ? "bg-green-600" : "bg-green-400"
          }`}
        >
          Buscar Pregunta
        </button>

        <button
          onClick={() => refetch && refetch()}
          className={`p-2 rounded bg-red-400 text-white ${
            mode === "search" ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={mode === "search"}
        >
          Resetear FAQs
        </button>
      </div>

      <div className="flex w-full gap-6 flex-wrap">
        <div className="border p-6 rounded min-w-[40vw]">
          {mode === "create" ? (
            <CreateFAQForm
              setFaqs={
                setFaqs as React.Dispatch<React.SetStateAction<FAQ[] | null>>
              }
              apiBase={apiBase}
              currentFaqs={currentFaqs}
            />
          ) : mode === "search" ? (
            <SearchFAQForm
              setFaqs={
                setFaqs as React.Dispatch<React.SetStateAction<FAQ[] | null>>
              }
              apiBase={apiBase}
            />
          ) : null}
        </div>

        <div className="border p-6 rounded min-w-[40vw] overflow-auto">
          {mode && !isLoading ? (
            <ul>
              <FAQListByMode
                mode={mode}
                faqs={faqs || []}
                currentFaqs={currentFaqs}
              />
            </ul>
          ) : isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : !faqs || faqs.length === 0 ? (
            <p>No FAQs found</p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
}
