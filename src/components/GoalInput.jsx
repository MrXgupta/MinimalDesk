import React, { useState } from 'react';

const GoalInput = () => {
    const [goal, setGoal] = useState('');

    return (
        <div className="w-full max-w-md px-4 py-2 mt-6 flex flex-col gap-2 items-center">
            <label
                htmlFor="goal"
                className="text-base text-gray-300 font-medium"
            >
                What is your main goal today?
            </label>
            <input
                type="text"
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Type your goal here..."
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-600 bg-black/40 backdrop-blur text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
        </div>
    );
};

export default GoalInput;
