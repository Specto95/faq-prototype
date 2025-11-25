import { FAQCard } from "./FAQCard";
import { FAQ } from "../../types/types";
import Link from "next/link";

interface FAQListProps {
  faqs: FAQ[];
}

export function FAQList({ faqs }: FAQListProps) {
  return (
    <div>
      <h3 className="title">Results</h3>
      <ul>
        {faqs.map((f) => (
          <li key={f.id} style={{ marginBottom: 12 }}>
            <Link href={`/faq/${f.id}`}>
              <FAQCard faq={f} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
