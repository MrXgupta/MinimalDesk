import {useEffect, useState} from "react";

const Greetings = ({username}) => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            setGreeting('Good Morning');
        } else if (hour >= 12 && hour < 17) {
            setGreeting('Good Afternoon');
        } else if (hour >= 17 && hour < 21) {
            setGreeting('Good Evening');
        } else {
            setGreeting('Good Night');
        }
    }, []);

    return (
        <div className="w-full flex justify-center items-center mt-6 px-4">
            <h1
                className="text-4xl md:text-6xl lg:text-7xl text-center font-extrabold italic tracking-tight
                bg-clip-text
                drop-shadow-[3px_3px_0_rgba(0,0,0,0.4)] animate-fade-in-up"
            >
                {greeting}, {username}!
            </h1>
        </div>
    );
};

export default Greetings;
