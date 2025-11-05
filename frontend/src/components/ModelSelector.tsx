import React from 'react';
import { chatAPI } from '../services/librechat';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  disabled?: boolean;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
  disabled = false
}) => {
  const models = chatAPI.getAvailableModels();

  return (
    <div className="model-selector" style={{
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: '#f5f5f5',
      marginBottom: '10px'
    }}>
      <label
        htmlFor="model-select"
        style={{
          marginRight: '10px',
          fontWeight: 'bold',
          color: '#333'
        }}
      >
        AI Model:
      </label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        disabled={disabled}
        style={{
          padding: '8px 12px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: 'white',
          fontSize: '14px',
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      >
        {models.map(model => (
          <option key={model.id} value={model.id}>
            {model.name} ({model.provider}) - {model.description}
          </option>
        ))}
      </select>
      <div style={{
        marginTop: '5px',
        fontSize: '12px',
        color: '#666'
      }}>
        💡 Tip: GPT-3.5 is fastest, GPT-4 and Claude are best for complex tasks
      </div>
    </div>
  );
};
