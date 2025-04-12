// src/components/resume/GeminiApiKeyInput.jsx
import { useState, useEffect } from 'react';
import { FiKey, FiCheck, FiX } from 'react-icons/fi';
import { setApiKey } from '../../services/geminiService';

export default function GeminiApiKeyInput({ onApiKeySet }) {
  const [apiKey, setApiKeyState] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Check if API key is already saved in localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKeyState(savedKey);
      const success = setApiKey(savedKey);
      setIsValid(success);
      setIsSaved(success);
      if (success && onApiKeySet) {
        onApiKeySet(true);
      }
    }
  }, [onApiKeySet]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      const success = setApiKey(apiKey);
      setIsValid(success);
      
      if (success) {
        localStorage.setItem('gemini_api_key', apiKey);
        setIsSaved(true);
        if (onApiKeySet) {
          onApiKeySet(true);
        }
      }
    }
  };

  const handleClearApiKey = () => {
    setApiKeyState('');
    setIsValid(false);
    setIsSaved(false);
    localStorage.removeItem('gemini_api_key');
    if (onApiKeySet) {
      onApiKeySet(false);
    }
  };

  return (
    <div className="mb-6">
      {!showInput && !isSaved ? (
        <button
          onClick={() => setShowInput(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FiKey className="mr-2 -ml-1 h-4 w-4" />
          Set Gemini API Key
        </button>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900">Gemini AI API Key</h3>
            {isSaved && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <FiCheck className="mr-1 h-3 w-3" />
                API Key Set
              </span>
            )}
          </div>
          
          {showInput && (
            <>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKeyState(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  onClick={handleSaveApiKey}
                  disabled={!apiKey.trim()}
                  className="ml-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  Save
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Your API key is stored locally in your browser and never sent to our servers.
              </p>
            </>
          )}
          
          {isSaved && (
            <div className="mt-3 flex justify-between">
              <p className="text-xs text-gray-500">
                AI features are now enabled with your Gemini API key.
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowInput(true)}
                  className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change
                </button>
                <button
                  onClick={handleClearApiKey}
                  className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FiX className="mr-1 h-3 w-3" />
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
