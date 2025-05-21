
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FaqItem {
  question: string;
  answer: string;
  id: string;
}

interface FaqDisplayProps {
  faqItems: FaqItem[];
}

const FaqDisplay: React.FC<FaqDisplayProps> = ({ faqItems }) => {
  const { language } = useLanguage();

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>
            <div className="prose mt-2">
              {faq.answer.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                <p key={index} className="mb-2 text-gray-700">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqDisplay;
