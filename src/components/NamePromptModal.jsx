import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react'; // optional: any React icon library

const NamePromptModal = ({ onSetName }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (chrome?.storage?.local) {
            chrome.storage.local.get(['username'], (result) => {
                if (result.username) {
                    onSetName(result.username);
                }
                setLoading(false);
            });
        } else {
            const savedName = localStorage.getItem('username');
            if (savedName) onSetName(savedName);
            setLoading(false);
        }
    }, []);

    const handleSubmit = () => {
        if (!name.trim()) return;

        if (chrome?.storage?.local) {
            chrome.storage.local.set({ username: name }, () => {
                onSetName(name);
            });
        } else {
            localStorage.setItem('username', name);
            onSetName(name);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    if (loading) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center animate-fadeIn">
            <div className="bg-white/10 text-white rounded-2xl p-6 w-full max-w-md mx-4 border border-white/20 shadow-xl backdrop-blur-lg">
                <div className="flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-yellow-300 mr-2" />
                    <h2 className="text-2xl font-semibold tracking-wide">Welcome to Your Dashboard</h2>
                </div>

                <p className="text-sm text-gray-300 mb-3 text-center">Please enter your name to personalize the experience ✨</p>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., Batman 🦇"
                    className="w-full px-4 py-2 mb-4 text-black rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 active:scale-95 transition rounded-lg text-white font-semibold shadow-lg"
                >
                    Continue →
                </button>
            </div>
        </div>
    );
};

export default NamePromptModal;