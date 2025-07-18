import React, { useEffect, useState } from 'react';
import { CheckCircle, Circle, Pencil, Trash2, Search, Target } from 'lucide-react';

const Goals = () => {
    const [goal, setGoal] = useState(null);
    const [input, setInput] = useState('');
    const [mode, setMode] = useState('goal');
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
            window.location.href = `https://www.google.com/search?q=${query}`;
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 text-white w-full">
            {/* Toggle Buttons */}
            <div className="flex gap-4 mb-2">
                {[
                    { id: 'goal', label: 'Goal', icon: <Target size={18} /> },
                    { id: 'search', label: 'Search', icon: <Search size={18} /> },
                ].map((btn) => (
                    <button
                        key={btn.id}
                        onClick={() => setMode(btn.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition duration-200 ${
                            mode === btn.id
                                ? 'bg-white text-black shadow-md'
                                : 'border border-white hover:bg-white/10'
                        }`}
                    >
                        {btn.icon} {btn.label}
                    </button>
                ))}
            </div>

            {/* Goal Mode */}
            {mode === 'goal' && (
                <div className="flex flex-col items-center gap-4 w-full">
                    {!goal ? (
                        <>
                            <p className="text-lg font-medium drop-shadow-sm">What's your goal for today?</p>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && saveGoal()}
                                className="capitalize bg-transparent border-b-2 border-white focus:outline-none text-white px-4 py-2 w-72 text-center placeholder-white/70 transition duration-150"
                                placeholder="Type your goal and press Enter"
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-3 w-full">
                            <p className={`text-xl text-center font-semibold tracking-wide transition-all ${
                                goal.completed ? 'line-through text-green-400' : ''
                            }`}>
                                GOAL — <span className="italic font-light">{goal.text}</span>
                            </p>
                            <div className="flex gap-4">
                                <button onClick={toggleComplete} className="hover:text-green-400 transition-all" title="Mark as Done">
                                    {goal.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                                </button>
                                <button onClick={editGoal} className="hover:text-yellow-400 transition-all" title="Edit Goal">
                                    <Pencil size={22} />
                                </button>
                                <button onClick={deleteGoal} className="hover:text-red-400 transition-all" title="Delete Goal">
                                    <Trash2 size={22} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Search Mode */}
            {mode === 'search' && (
                <div className="flex flex-col items-center gap-4 w-full">
                    <p className="text-lg font-medium drop-shadow-sm">Search Google</p>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
                        className="capitalize bg-transparent border-b-2 border-white focus:outline-none text-white px-4 py-2 w-72 text-center placeholder-white/70"
                        placeholder="Type and press Enter"
                    />
                    <button
                        onClick={submitSearch}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition"
                    >
                        Google It
                    </button>
                </div>
            )}
        </div>
    );
};

export default Goals;