import { FAQ } from "../../types/types";
import React from "react";

export const dynamic = "force-dynamic"; // SSR

interface FAQPageProps {
  params: { id: string };
}

export default async function Page({ params }: FAQPageProps) {
  const id = Number(params.id);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const res = await fetch(`${apiBase}/api/faqs`, { cache: "no-store" });
  if (!res.ok) return <div className="card">Error fetching FAQ</div>;

  const faqs: FAQ[] = await res.json();
  const faq = faqs.find((f) => f.id === id);

  if (!faq) {
    return <div className="card">FAQ not found</div>;
  }

  return (
    <div className="card">
      <h2 className="title">Q: {faq.question}</h2>
      <p>A: {faq.answer}</p>
    </div>
  );
}
