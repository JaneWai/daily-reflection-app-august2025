import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { MoodSelector } from './MoodSelector';
import { GratitudeList } from './GratitudeList';
import { ReflectionEntry } from '../types';

interface ReflectionFormProps {
  onSave: (entry: Omit<ReflectionEntry, 'id' | 'createdAt'>) => void;
}

export const ReflectionForm: React.FC<ReflectionFormProps> = ({ onSave }) => {
  const [mood, setMood] = useState<number>(3);
  const [gratitude, setGratitude] = useState<string[]>([]);
  const [reflection, setReflection] = useState('');
  const [goals, setGoals] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const today = new Date().toISOString().split('T')[0];
    
    onSave({
      date: today,
      mood,
      gratitude,
      reflection,
      goals
    });

    // Reset form
    setMood(3);
    setGratitude([]);
    setReflection('');
    setGoals('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 p-6 border-3 border-black shadow-neo-lg">
        <h2 className="text-2xl font-bold font-sans mb-6 text-center bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Daily Reflection
        </h2>
        
        <div className="space-y-6">
          <MoodSelector value={mood} onChange={setMood} />
          
          <GratitudeList gratitude={gratitude} onChange={setGratitude} />
          
          <Textarea
            label="Reflect on your day"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What went well today? What could have been better? What did you learn?"
            rows={4}
            required
          />
          
          <Textarea
            label="Tomorrow's goals"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="What do you want to accomplish tomorrow?"
            rows={3}
          />
        </div>
        
        <div className="mt-8 text-center">
          <Button
            type="submit"
            size="lg"
            variant="primary"
            className="px-8"
            disabled={!reflection.trim()}
          >
            <Save size={20} className="mr-2" />
            Save Reflection
          </Button>
        </div>
      </div>
    </form>
  );
};
