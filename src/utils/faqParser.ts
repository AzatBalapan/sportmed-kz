
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  language: 'ru' | 'kz';
}

export const parseFaqFromText = (text: string, langOverride?: 'ru' | 'kz'): FaqItem[] => {
  const faqItems: FaqItem[] = [];

  const lines = text.split('\n');
  let currentQuestion = '';
  let currentAnswer = '';
  let questionNumber = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue;

    // Detect question pattern (number followed by question)
    if (line.match(/^\s*\d+\.\s+/)) {
      // Save previous Q&A if exists
      if (currentQuestion && currentAnswer) {
        faqItems.push({
          id: `faq-${langOverride || 'ru'}-${questionNumber}`,
          question: currentQuestion,
          answer: currentAnswer,
          language: langOverride || 'ru',
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
      id: `faq-${langOverride || 'ru'}-${questionNumber}`,
      question: currentQuestion,
      answer: currentAnswer,
      language: langOverride || 'ru',
    });
  }
  return faqItems;
};
