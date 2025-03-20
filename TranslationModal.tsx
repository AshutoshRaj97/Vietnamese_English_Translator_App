import React from 'react';
import './TranslationModal.css';

interface TranslationModalProps {
  translatedText: string;
  onClose: () => void;
}

const TranslationModal: React.FC<TranslationModalProps> = ({ translatedText, onClose }) => {
  return (
    <div className="translation-modal-overlay">
      <div className="translation-modal">
        <h2 className="translation-title">Translation Result</h2>
        <div className="translation-content">
          <p>{translatedText}</p>
        </div>
        <div className="translation-actions">
          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslationModal;