
import React from 'react';
import { aiSuggestions } from '../../data';

interface AISuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ onSuggestionClick }) => {
  return (
    <div>
      <h4 className="text-xs text-gray-500 mb-2">快速提问:</h4>
      <div className="flex flex-wrap gap-2 mb-3">
        {aiSuggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-xs bg-meituan-gray text-meituan-blue px-3 py-1 rounded-full hover:bg-meituan-blue hover:text-white transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AISuggestions;
