import React, { useState } from 'react';
import { BookOpen, Plus, List } from 'lucide-react';
import { ReflectionForm } from './components/ReflectionForm';
import { ReflectionCard } from './components/ReflectionCard';
import { Button } from './components/ui/Button';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ReflectionEntry } from './types';

function App() {
  const [entries, setEntries] = useLocalStorage<ReflectionEntry[]>('reflectionEntries', []);
  const [currentView, setCurrentView] = useState<'form' | 'history'>('form');

  const handleSaveEntry = (entryData: Omit<ReflectionEntry, 'id' | 'createdAt'>) => {
    const newEntry: ReflectionEntry = {
      ...entryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    setEntries(prev => [newEntry, ...prev]);
    setCurrentView('history');
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const todayEntry = entries.find(entry => 
    entry.date === new Date().toISOString().split('T')[0]
  );

  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-400 to-secondary-400 border-b-3 border-black shadow-neo">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen size={32} className="text-white drop-shadow-lg" />
              <h1 className="text-3xl font-bold font-sans text-white drop-shadow-lg">Daily Reflection</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant={currentView === 'form' ? 'primary' : 'outline'}
                onClick={() => setCurrentView('form')}
                size="sm"
              >
                <Plus size={16} className="mr-1" />
                New Entry
              </Button>
              <Button
                variant={currentView === 'history' ? 'secondary' : 'outline'}
                onClick={() => setCurrentView('history')}
                size="sm"
              >
                <List size={16} className="mr-1" />
                History
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentView === 'form' ? (
          <div className="space-y-6">
            {todayEntry && (
              <div className="bg-gradient-to-r from-accent-200 to-accent-300 border-3 border-black shadow-neo p-4">
                <p className="font-sans text-sm text-center font-semibold">
                  ✨ You've already reflected today! You can view your entry in the history or create another one.
                </p>
              </div>
            )}
            <ReflectionForm onSave={handleSaveEntry} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center bg-gradient-to-r from-primary-200 to-secondary-200 border-3 border-black shadow-neo p-6">
              <h2 className="text-2xl font-bold font-sans mb-2">Your Reflection Journey</h2>
              <p className="font-sans text-gray-800 font-semibold">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'} recorded
              </p>
            </div>

            {sortedEntries.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-rose-100 via-orange-100 to-amber-100 border-3 border-black shadow-neo-lg">
                <BookOpen size={64} className="mx-auto text-primary-400 mb-4" />
                <h3 className="text-xl font-bold font-sans mb-2">No reflections yet</h3>
                <p className="font-sans text-gray-600 mb-6">
                  Start your journey by creating your first daily reflection.
                </p>
                <Button onClick={() => setCurrentView('form')}>
                  <Plus size={20} className="mr-2" />
                  Create First Entry
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {sortedEntries.map((entry) => (
                  <ReflectionCard 
                    key={entry.id} 
                    entry={entry} 
                    onDelete={handleDeleteEntry}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-success-300 to-accent-300 border-t-3 border-black mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="font-sans text-sm font-semibold">
            Take a moment each day to reflect and grow 🌱
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
