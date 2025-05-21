
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  language: 'ru' | 'kz';
}

export const parseFaqFromText = (text: string): FaqItem[] => {
  const faqItems: FaqItem[] = [];
  
  // Split into Russian and Kazakh sections (assuming Russian comes first)
  const parts = text.split(/\n\s*\n\s*\n/); // Split by multiple newlines
  
  // Try to extract questions and answers
  let currentIndex = 0;
  let currentLanguage: 'ru' | 'kz' = 'ru';
  
  const lines = text.split('\n');
  let currentQuestion = '';
  let currentAnswer = '';
  let questionNumber = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (line === '') continue;
    
    // Detect language switch (check for Kazakh questions)
    if (line.match(/^\s*\d+\.\s+[А-Я]/) && currentLanguage === 'ru' && currentQuestion && i > 30) {
      currentLanguage = 'kz';
    }
    
    // Detect question pattern (number followed by question)
    if (line.match(/^\s*\d+\.\s+/)) {
      // Save previous Q&A if exists
      if (currentQuestion && currentAnswer) {
        faqItems.push({
          id: `faq-${currentLanguage}-${questionNumber}`,
          question: currentQuestion,
          answer: currentAnswer,
          language: currentLanguage
        });
      }
      
      // Start new question
      questionNumber = line.match(/^\s*(\d+)\.\s+/)?.[1] || `${faqItems.length + 1}`;
      currentQuestion = line;
      currentAnswer = '';
    } else {
      // Continue adding to answer
      if (currentQuestion) {
        currentAnswer += (currentAnswer ? '\n' : '') + line;
      }
    }
  }
  
  // Add the last Q&A
  if (currentQuestion && currentAnswer) {
    faqItems.push({
      id: `faq-${currentLanguage}-${questionNumber}`,
      question: currentQuestion,
      answer: currentAnswer,
      language: currentLanguage
    });
  }
  
  return faqItems;
};
