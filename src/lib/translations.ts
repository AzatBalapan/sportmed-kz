
import { navigationTranslations } from './translations/navigation';
import { pagesTranslations } from './translations/pages';
import { contentTranslations } from './translations/content';
import { formsTranslations } from './translations/forms';
import { uiTranslations } from './translations/ui';

export const translations = {
  ...navigationTranslations,
  ...pagesTranslations,
  ...contentTranslations,
  ...formsTranslations,
  ...uiTranslations
};
