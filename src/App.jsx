import './App.css';
import {useEffect, useState} from "react";
import Greetings from "./components/Greetings.jsx";
import Weather from "./components/Weather.jsx";
import Goals from "./components/Goals.jsx";
import ToDoList from "./components/ToDoList.jsx";

function App() {
    const [Quote, setQuote] = useState([]);
    const [Time, setTime] = useState('');
    const [bgImage, setBgImage] = useState('');
    // /background.jpg

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);


    const fetchQuote = async () => {
        fetch('/quotes.json')
            .then(res => res.json())
            .then(data => {
                const random = Math.floor(Math.random() * data.length);
                setQuote(data[random].text);
            });
    }


    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <>
            <div className="relative w-full h-screen overflow-hidden text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-800/80 to-slate-900/60 z-0"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center blur-md scale-105 z-0"
                    style={{
                        backgroundImage: `url(${bgImage})`
                    }}
                ></div>

                <div className="relative z-10">

                    <div className="flex justify-between items-center p-4">
                        <div>Hey BatMan!</div>
                        <div className="text-white flex gap-4 items-center">
                            <div className="flex flex-col text-right">
                                <p className="text-3xl font-bold">{Time}</p>
                            </div>
                            <Weather />
                        </div>
                    </div>

                    {/* Foreground Content Layer */}
                    <Greetings/>
                    <p className="text-white text-center italic p-4 text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]">{Quote}</p>
                    <Goals/>

                    <ToDoList />
                </div>

            </div>

        </>
    );
}

export default App;