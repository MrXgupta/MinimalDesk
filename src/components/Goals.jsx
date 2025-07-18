import React, { useEffect, useState } from 'react';
import { CheckCircle, Circle, Pencil, Trash2, Search, Target } from 'lucide-react';

const Goals = () => {
    const [goal, setGoal] = useState(null); // { text: string, completed: boolean }
    const [input, setInput] = useState('');
    const [mode, setMode] = useState('goal'); // 'goal' or 'search'
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('dailyGoal');
        if (stored) setGoal(JSON.parse(stored));
    }, []);

    useEffect(() => {
        if (goal) {
            localStorage.setItem('dailyGoal', JSON.stringify(goal));
        } else {
            localStorage.removeItem('dailyGoal');
        }
    }, [goal]);

    const saveGoal = () => {
        if (input.trim() === '') return;
        const newGoal = { text: input.trim(), completed: false };
        setGoal(newGoal);
        setInput('');
    };

    const toggleComplete = () => {
        if (!goal) return;
        setGoal({ ...goal, completed: !goal.completed });
    };

    const editGoal = () => {
        setInput(goal.text);
        setGoal(null);
    };

    const deleteGoal = () => {
        setGoal(null);
    };

    const submitSearch = () => {
        if (searchQuery.trim()) {
            const query = encodeURIComponent(searchQuery.trim());
            window.open(`https://www.google.com/search?q=${query}`);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 text-white mt-6">
            <div className="flex gap-4">
                <button
                    className={`transition px-4 py-2 rounded ${mode === 'goal' ? 'bg-white text-black' : 'border border-white'}`}
                    onClick={() => setMode('goal')}
                    title="Switch to Goal"
                >
                    <Target className="inline mr-2" size={18} /> Goal
                </button>
                <button
                    className={`transition px-4 py-2 rounded ${mode === 'search' ? 'bg-white text-black' : 'border border-white'}`}
                    onClick={() => setMode('search')}
                    title="Switch to Search"
                >
                    <Search className="inline mr-2" size={18} /> Search
                </button>
            </div>

            {mode === 'goal' && (
                <div className="flex flex-col items-center gap-4">
                    {!goal ? (
                        <>
                            <p className="text-lg">What is your Goal for Today?</p>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && saveGoal()}
                                className="capitalize bg-transparent border-b-2 border-white focus:outline-0 text-white px-4 py-2 w-72 text-center"
                                placeholder="Type your goal and press Enter"
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <p className={`text-xl font-semibold ${goal.completed ? 'line-through text-green-400' : ''}`}>
                                GOAL — <span className="italic">{goal.text}</span>
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={toggleComplete}
                                    className="hover:text-green-400 transition-all"
                                    title="Mark as Done"
                                >
                                    {goal.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
                                </button>
                                <button
                                    onClick={editGoal}
                                    className="hover:text-yellow-400 transition-all"
                                    title="Edit Goal"
                                >
                                    <Pencil size={20} />
                                </button>
                                <button
                                    onClick={deleteGoal}
                                    className="hover:text-red-400 transition-all"
                                    title="Delete Goal"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {mode === 'search' && (
                <div className="flex flex-col items-center gap-3">
                    <p className="text-lg">Search Google</p>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
                        className="capitalize bg-transparent border-b-2 border-white focus:outline-0 text-white px-4 py-2 w-72 text-center"
                        placeholder="Type and press Enter"
                    />
                    <button
                        onClick={submitSearch}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
                    >
                        Google It
                    </button>
                </div>
            )}
        </div>
    );
};

export default Goals;