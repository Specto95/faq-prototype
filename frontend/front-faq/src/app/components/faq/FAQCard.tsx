import { FAQ } from "../../types/types";

interface FAQCardProps {
  faq: FAQ;
}

export function FAQCard({ faq }: FAQCardProps) {
  return (
    <div className="card">
      <h4 style={{ margin: 0 }}>Q: {faq.question}</h4>
      <p style={{ marginTop: 8, color: "var(--muted)" }}>A: {faq.answer}</p>
    </div>
  );
}
