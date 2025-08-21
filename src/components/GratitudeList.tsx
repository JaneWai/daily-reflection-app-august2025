import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface GratitudeListProps {
  gratitude: string[];
  onChange: (gratitude: string[]) => void;
}

export const GratitudeList: React.FC<GratitudeListProps> = ({ gratitude, onChange }) => {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim() && gratitude.length < 5) {
      onChange([...gratitude, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    onChange(gratitude.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold font-sans text-gray-800">
        What are you grateful for today? (up to 5 items)
      </label>
      
      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add something you're grateful for..."
          disabled={gratitude.length >= 5}
        />
        <Button
          type="button"
          onClick={addItem}
          disabled={!newItem.trim() || gratitude.length >= 5}
          variant="success"
          size="md"
          className="px-4"
        >
          <Plus size={20} />
        </Button>
      </div>

      {gratitude.length > 0 && (
        <div className="space-y-2">
          {gratitude.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gradient-to-r from-success-100 to-success-200 p-3 border-3 border-black shadow-neo"
            >
              <span className="font-sans text-gray-800 flex-1">{item}</span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="ml-2 p-1 text-error-600 hover:text-error-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
