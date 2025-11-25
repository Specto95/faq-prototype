import { FAQ } from "@/app/types/types";
import { MutableRefObject } from "react";

interface FAQListByModeProps {
  mode: "create" | "search";
  faqs: FAQ[];
  currentFaqs: MutableRefObject<FAQ[] | null>;
}

export function FAQListByMode({ mode, faqs, currentFaqs }: FAQListByModeProps) {
  return (
    <>
      {mode === "search"
        ? faqs.map((faq: FAQ) => (
            <li key={faq.id} className="mb-4">
              <h3 className="font-bold">Q: {faq.question}</h3>
              <p>A: {faq.answer}</p>
            </li>
          ))
        : mode === "create"
        ? currentFaqs?.current?.map((faq: FAQ) => (
            <li key={faq.id} className="mb-4">
              <h3 className="font-bold">Q: {faq.question}</h3>
              <p>A: {faq.answer}</p>
            </li>
          ))
        : null}
    </>
  );
}
