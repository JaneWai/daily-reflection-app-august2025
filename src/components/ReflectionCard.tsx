import React, { useState } from 'react';
import { Calendar, Heart, Target, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';
import { ReflectionEntry } from '../types';

interface ReflectionCardProps {
  entry: ReflectionEntry;
  onDelete?: (id: string) => void;
}

const moodEmojis = ['😢', '😔', '😐', '😊', '😄'];
const moodLabels = ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];

export const ReflectionCard: React.FC<ReflectionCardProps> = ({ entry, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(entry.id);
    }
    setShowDeleteConfirm(false);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border-3 border-black shadow-neo-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-primary-600" />
          <h3 className="font-sans font-bold text-lg">{formatDate(entry.date)}</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{moodEmojis[entry.mood - 1]}</span>
            <span className="font-sans text-sm font-semibold text-gray-600">
              {moodLabels[entry.mood - 1]}
            </span>
          </div>
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="text-error-600 hover:text-error-800 hover:bg-error-50"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </div>

      {entry.gratitude.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-success-600" />
            <h4 className="font-sans font-semibold text-success-800">Grateful for:</h4>
          </div>
          <ul className="space-y-1 ml-6">
            {entry.gratitude.map((item, index) => (
              <li key={index} className="font-sans text-gray-700 text-sm">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="font-sans font-semibold text-primary-800">Daily Reflection:</h4>
        <p className="font-sans text-gray-700 leading-relaxed">{entry.reflection}</p>
      </div>

      {entry.goals && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-secondary-600" />
            <h4 className="font-sans font-semibold text-secondary-800">Goals:</h4>
          </div>
          <p className="font-sans text-gray-700 leading-relaxed ml-6">{entry.goals}</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white to-gray-50 border-3 border-black shadow-neo-xl p-6 max-w-md w-full">
            <h3 className="font-sans font-bold text-lg mb-4 text-center">Delete Reflection?</h3>
            <p className="font-sans text-gray-700 text-center mb-6">
              Are you sure you want to delete this reflection from <strong>{formatDate(entry.date)}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                size="sm"
                className="bg-gradient-to-r from-error-500 to-error-600 text-white shadow-neo hover:from-error-600 hover:to-error-700 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <Trash2 size={16} className="mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
