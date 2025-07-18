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
        <>
            <div>
                <h1 className="text-white text-6xl w-[100vw] text-center font-bold italic drop-shadow-[2px_2px_0_black]">{greeting} {username}!</h1>
            </div>
        </>
    )
}
export default Greetings;