import React, { useEffect, useState } from 'react';

const NamePromptModal = ({ onSetName }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for name in chrome.storage.local
        if (chrome?.storage?.local) {
            chrome.storage.local.get(['username'], (result) => {
                if (result.username) {
                    onSetName(result.username);
                }
                setLoading(false);
            });
        } else {
            // fallback for dev
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

    if (loading) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
            <div className="bg-slate-900 p-6 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4 text-white">Welcome!</h2>
                <p className="text-white mb-2">Please enter your name to continue:</p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full p-2 rounded text-black mb-4"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default NamePromptModal;
