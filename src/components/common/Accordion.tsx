import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import './Accordion.css';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion-wrapper" role="region" aria-label="Frequently Asked Questions">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`accordion-item ${isOpen ? 'open' : ''}`}
          >
            <button
              type="button"
              className="accordion-header"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${index}`}
              id={`accordion-btn-${index}`}
            >
              <span className="accordion-question">{item.question}</span>
              <span className="accordion-icon-wrap">
                <Plus 
                  size={20} 
                  className={`accordion-plus ${isOpen ? 'rotated' : ''}`} 
                  aria-hidden="true"
                />
              </span>
            </button>
            {isOpen && (
              <div
                id={`accordion-panel-${index}`}
                role="region"
                aria-labelledby={`accordion-btn-${index}`}
                className="accordion-content"
              >
                <p className="accordion-answer">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
