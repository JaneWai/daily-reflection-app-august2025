import React from 'react';

interface MoodSelectorProps {
  value: number;
  onChange: (mood: number) => void;
}

const moods = [
  { value: 1, emoji: '😢', label: 'Very Sad', color: 'bg-gradient-to-br from-red-200 to-pink-200' },
  { value: 2, emoji: '😔', label: 'Sad', color: 'bg-gradient-to-br from-orange-200 to-yellow-200' },
  { value: 3, emoji: '😐', label: 'Neutral', color: 'bg-gradient-to-br from-blue-200 to-indigo-200' },
  { value: 4, emoji: '😊', label: 'Happy', color: 'bg-gradient-to-br from-green-200 to-emerald-200' },
  { value: 5, emoji: '😄', label: 'Very Happy', color: 'bg-gradient-to-br from-yellow-200 to-lime-200' }
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold font-sans text-gray-800">
        How are you feeling today?
      </label>
      <div className="flex justify-between gap-2">
        {moods.map((mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onChange(mood.value)}
            className={`flex-1 p-4 border-3 border-black font-sans text-center transition-all duration-200 ${
              value === mood.value
                ? `${mood.color} shadow-neo-lg scale-105`
                : 'bg-gradient-to-br from-amber-50 to-orange-50 shadow-neo hover:from-amber-100 hover:to-orange-100'
            } active:translate-x-1 active:translate-y-1 active:shadow-none`}
          >
            <div className="text-2xl mb-1">{mood.emoji}</div>
            <div className="text-xs font-semibold">{mood.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
