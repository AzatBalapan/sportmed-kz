import React, { useRef, useState } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { Volume2, Eye, Type, Underline, Zap, RefreshCcw, ChevronUp, ChevronDown } from 'lucide-react';

interface AccessibilityWidgetProps {
  isMobile?: boolean;
}

const AccessibilityWidget: React.FC<AccessibilityWidgetProps> = ({ isMobile = false }) => {
  const {
    highContrast,
    fontSize,
    underlineLinks,
    disableAnimations,
    setHighContrast,
    setFontSize,
    setUnderlineLinks,
    setDisableAnimations,
    reset,
  } = useAccessibility();

  const [open, setOpen] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Text-to-speech: read selected text or whole page
  const handleSpeak = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    let text = window.getSelection()?.toString() || '';
    if (!text) {
      text = document.body.innerText;
    }
    if (text) {
      const utter = new window.SpeechSynthesisUtterance(text);
      speechRef.current = utter;
      setSpeaking(true);
      utter.onend = () => setSpeaking(false);
      utter.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utter);
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  };

  if (isMobile) {
    return (
      <div className="bg-gray-50 rounded-lg p-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Настройки доступности</span>
          <button
            aria-label="Reset accessibility settings"
            className="text-gray-500 hover:text-gov-blue p-1"
            onClick={reset}
          >
            <RefreshCcw size={14} />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm"><Eye className="w-3 h-3 mr-2" /> Высокий контраст</span>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={e => setHighContrast(e.target.checked)}
              aria-checked={highContrast}
              aria-label="Toggle high contrast mode"
              className="w-4 h-4"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm"><Type className="w-3 h-3 mr-2" /> Размер шрифта</span>
            <div className="flex items-center space-x-1">
              <button
                aria-label="Decrease font size"
                className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setFontSize(Math.max(0.8, fontSize - 0.1))}
                disabled={fontSize <= 0.8}
              >
                <ChevronDown className="w-3 h-3" />
              </button>
              <span className="px-1 text-xs">{Math.round(fontSize * 100)}%</span>
              <button
                aria-label="Increase font size"
                className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setFontSize(Math.min(2, fontSize + 0.1))}
                disabled={fontSize >= 2}
              >
                <ChevronUp className="w-3 h-3" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm"><Underline className="w-3 h-3 mr-2" /> Подчеркивать ссылки</span>
            <input
              type="checkbox"
              checked={underlineLinks}
              onChange={e => setUnderlineLinks(e.target.checked)}
              aria-checked={underlineLinks}
              aria-label="Toggle underline links"
              className="w-4 h-4"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm"><Zap className="w-3 h-3 mr-2" /> Отключить анимации</span>
            <input
              type="checkbox"
              checked={disableAnimations}
              onChange={e => setDisableAnimations(e.target.checked)}
              aria-checked={disableAnimations}
              aria-label="Toggle disable animations"
              className="w-4 h-4"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm"><Volume2 className="w-3 h-3 mr-2" /> Озвучить текст</span>
            <button
              aria-label={speaking ? 'Остановить озвучивание' : 'Озвучить выделенный текст или страницу'}
              className={`px-2 py-1 rounded text-xs ${speaking ? 'bg-red-500 text-white' : 'bg-gov-blue text-white'} hover:bg-gov-dark-blue`}
              onClick={handleSpeak}
            >
              {speaking ? 'Стоп' : 'Озвучить'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="z-[60] flex flex-col items-end"
      aria-label="Accessibility tools"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <button
        aria-label={open ? 'Close accessibility menu' : 'Open accessibility menu'}
        className="mb-2 rounded-full bg-gov-blue text-white shadow-lg p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gov-blue hover:bg-gov-dark-blue transition-colors flex items-center justify-center"
        onClick={() => setOpen((v) => !v)}
        style={{ width: '40px', height: '40px' }}
      >
        {open ? <ChevronDown size={18} /> : <Eye size={18} />}
      </button>
      {open && (
        <div className="w-64 bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-3 space-y-2 border border-gray-200 dark:border-gray-700 animate-fade-in" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm">Доступность</span>
            <button
              aria-label="Reset accessibility settings"
              className="text-gray-500 hover:text-gov-blue p-1"
              onClick={reset}
            >
              <RefreshCcw size={14} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm"><Eye className="w-3 h-3 mr-2" /> Высокий контраст</span>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={e => setHighContrast(e.target.checked)}
              aria-checked={highContrast}
              aria-label="Toggle high contrast mode"
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm"><Type className="w-3 h-3 mr-2" /> Размер шрифта</span>
            <div className="flex items-center space-x-1">
              <button
                aria-label="Decrease font size"
                className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setFontSize(Math.max(0.8, fontSize - 0.1))}
                disabled={fontSize <= 0.8}
              >
                <ChevronDown className="w-3 h-3" />
              </button>
              <span className="px-1 text-xs">{Math.round(fontSize * 100)}%</span>
              <button
                aria-label="Increase font size"
                className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setFontSize(Math.min(2, fontSize + 0.1))}
                disabled={fontSize >= 2}
              >
                <ChevronUp className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm"><Underline className="w-3 h-3 mr-2" /> Подчеркивать ссылки</span>
            <input
              type="checkbox"
              checked={underlineLinks}
              onChange={e => setUnderlineLinks(e.target.checked)}
              aria-checked={underlineLinks}
              aria-label="Toggle underline links"
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm"><Zap className="w-3 h-3 mr-2" /> Отключить анимации</span>
            <input
              type="checkbox"
              checked={disableAnimations}
              onChange={e => setDisableAnimations(e.target.checked)}
              aria-checked={disableAnimations}
              aria-label="Toggle disable animations"
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm"><Volume2 className="w-3 h-3 mr-2" /> Озвучить текст</span>
            <button
              aria-label={speaking ? 'Остановить озвучивание' : 'Озвучить выделенный текст или страницу'}
              className={`px-2 py-1 rounded text-xs ${speaking ? 'bg-red-500 text-white' : 'bg-gov-blue text-white'} hover:bg-gov-dark-blue`}
              onClick={handleSpeak}
            >
              {speaking ? 'Стоп' : 'Озвучить'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityWidget; 