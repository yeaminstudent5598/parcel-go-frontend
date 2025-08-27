import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How do I track my parcel?",
    answer: "You can track your parcel by entering the Tracking ID provided to you on our Home page or in your dashboard. You will see real-time updates of your parcel's location."
  },
  {
    question: "What is the delivery time?",
    answer: "Delivery time depends on the destination. For deliveries within the same city, it usually takes 24 hours. For other districts, it can take 48-72 hours."
  },
  {
    question: "What if my parcel is damaged?",
    answer: "We handle all parcels with extreme care. However, in the rare case of damage, we have a compensation policy. Please contact our customer support with your parcel details for assistance."
  },
  {
    question: "Can I cancel a delivery request?",
    answer: "Yes, you can cancel a delivery request from your Sender dashboard as long as the parcel has not been dispatched for delivery. Once it is in transit, it cannot be cancelled."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including mobile banking (bKash, Nagad), credit/debit cards, and cash on delivery."
  }
];

const FAQPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us directly.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-slate-600 dark:text-slate-400">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
