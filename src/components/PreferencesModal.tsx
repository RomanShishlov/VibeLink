import React from 'react';
import { X } from 'lucide-react';
import { UserPreferences } from '../types';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSave: (preferences: UserPreferences) => void;
}

const PreferencesModal: React.FC<PreferencesModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSave,
}) => {
  if (!isOpen) return null;

  const handleAgeRangeChange = (index: 0 | 1, value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;

    // Ensure the value is within valid range
    if (index === 0) { // Min age
      if (numValue < 17) return; // Minimum allowed age is 17
      if (numValue > preferences.ageRange[1]) return; // Can't be greater than max age
    } else { // Max age
      if (numValue < preferences.ageRange[0]) return; // Can't be less than min age
      if (numValue > 99) return; // Maximum allowed age is 99
    }

    const newAgeRange: [number, number] = [...preferences.ageRange] as [number, number];
    newAgeRange[index] = numValue;

    onSave({
      ...preferences,
      ageRange: newAgeRange,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Preferences</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Distance (km)
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={preferences.maxDistance}
              onChange={(e) =>
                onSave({ ...preferences, maxDistance: parseInt(e.target.value, 10) })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-right text-sm text-gray-600">
              {preferences.maxDistance} km
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Range
            </label>
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Min Age</label>
                <input
                  type="number"
                  min="17"
                  max="99"
                  value={preferences.ageRange[0]}
                  onChange={(e) => handleAgeRangeChange(0, e.target.value)}
                  className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <span className="text-gray-400">to</span>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Max Age</label>
                <input
                  type="number"
                  min="17"
                  max="99"
                  value={preferences.ageRange[1]}
                  onChange={(e) => handleAgeRangeChange(1, e.target.value)}
                  className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {['Music', 'Sports', 'Travel', 'Gaming', 'Art', 'Food'].map((interest) => (
                <button
                  key={interest}
                  onClick={() => {
                    const newInterests = preferences.interests.includes(interest)
                      ? preferences.interests.filter((i) => i !== interest)
                      : [...preferences.interests, interest];
                    onSave({ ...preferences, interests: newInterests });
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    preferences.interests.includes(interest)
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesModal;