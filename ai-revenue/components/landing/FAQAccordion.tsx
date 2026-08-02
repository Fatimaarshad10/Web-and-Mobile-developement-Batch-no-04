"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const items: FAQItem[] = [
  {
    question: "How does AI Revenue Recovery work?",
    answer: "It continuously monitors your store performance across revenue, conversion, customer behavior, checkout flow, and order activity. When it finds patterns that typically signal lost revenue, it highlights the issue and suggests what to act on next.",
  },
  {
    question: "Is this only for Shopify stores?",
    answer: "The product is designed around ecommerce operations and storefront performance, with a strong fit for Shopify-based stores. The experience is intentionally built to help merchants understand where value is leaking and what actions will recover it.",
  },
  {
    question: "Do I need a data science team?",
    answer: "No. The platform packages the insights into clear recommendations and business context, so your team can act without building custom dashboards or analyzing raw metrics manually.",
  },
  {
    question: "Can I try this before committing?",
    answer: "Yes. The landing experience is designed around a no-commitment start, with a free onboarding flow and demo preview for early evaluation.",
  },
  {
    question: "How much time does setup take?",
    answer: "Most stores can connect and start seeing signals in a short setup window, with the product focusing on immediate visibility rather than a long technical rollout.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_10px_24px_-22px_rgba(15,23,42,0.2)]">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span className="text-base font-medium text-slate-900">{item.question}</span>
              <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && <p className="border-t border-slate-200 px-5 py-4 text-sm leading-7 text-slate-600">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
