import React, { useEffect, useState } from 'react';

const quotes = [
    'Believe in yourself!',
    "Don’t watch the clock; do what it does. Keep going.",
    'Stay focused and never give up.',
    'Code. Sleep. Repeat.',
    'Today is your day to shine!',
    'Dream big. Act bigger.',
    'Eat. Sleep. Code. Repeat.',
    'You’re stronger than you think.',
    '404 – Motivation not found. Just kidding. Keep going!',
];

const Quote = () => {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    }, []);

    return (
        <p className="text-lg sm:text-xl italic text-slate-200 mt-2 animate-fadeInSlow">
            “{quote}”
        </p>
    );
};

export default Quote;
