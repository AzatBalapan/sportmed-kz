import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AccessibilitySettings = {
  highContrast: boolean;
  fontSize: number; // 1 = normal, >1 = larger, <1 = smaller
  underlineLinks: boolean;
  disableAnimations: boolean;
  setHighContrast: (v: boolean) => void;
  setFontSize: (v: number) => void;
  setUnderlineLinks: (v: boolean) => void;
  setDisableAnimations: (v: boolean) => void;
  reset: () => void;
};

const AccessibilityContext = createContext<AccessibilitySettings | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [disableAnimations, setDisableAnimations] = useState(false);

  const reset = () => {
    setHighContrast(false);
    setFontSize(1);
    setUnderlineLinks(false);
    setDisableAnimations(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        fontSize,
        underlineLinks,
        disableAnimations,
        setHighContrast,
        setFontSize,
        setUnderlineLinks,
        setDisableAnimations,
        reset,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
}; 