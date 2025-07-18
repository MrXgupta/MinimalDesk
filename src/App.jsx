import './App.css';
import { useEffect, useState } from "react";
import Greetings from "./components/Greetings.jsx";
import Weather from "./components/Weather.jsx";
import Goals from "./components/Goals.jsx";
import ToDoList from "./components/ToDoList.jsx";
import ImageUploader from "./components/ImageUploader.jsx";
import NamePromptModal from './components/NamePromptModal';

function App() {
    const [Quote, setQuote] = useState([]);
    const [Time, setTime] = useState('');
    const [bgImage, setBgImage] = useState('');
    const [username, setUsername] = useState(null);

    useEffect(() => {
        chrome.storage?.local.get(['userImages'], (result) => {
            if (result.userImages && result.userImages.length > 0) {
                const random = Math.floor(Math.random() * result.userImages.length);
                setBgImage(result.userImages[random]);
            }
        });
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
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
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <>
            {!username && <NamePromptModal onSetName={setUsername} />}

            <div className="relative w-full h-screen text-white overflow-hidden font-sans">

                {/* Background Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/70 to-black z-0"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center blur-sm scale-110 brightness-[0.6] z-0 transition-all duration-500"
                    style={{ backgroundImage: `url(${bgImage})` }}
                ></div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col h-full backdrop-blur-md">

                    {/* Header */}
                    <header className="flex justify-between items-center px-6 py-4">
                        <h1 className="text-2xl font-bold drop-shadow-[2px_2px_0_black] tracking-wide">
                            Hey, {username || 'Bro'}!
                        </h1>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-4xl font-mono font-semibold drop-shadow-[2px_2px_0_black] transition duration-300">
                                    {Time}
                                </p>
                            </div>
                            <Weather />
                        </div>
                    </header>

                    {/* Center */}
                    <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
                        <Greetings username={username} />
                        <p className="mt-4 max-w-xl text-lg italic drop-shadow-[2px_2px_0_black]">
                            "{Quote}"
                        </p>
                        <div className="mt-6 w-full max-w-xl">
                            <Goals />
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="flex justify-between items-end px-6 py-2">
                            <ImageUploader onBgChange={setBgImage} />
                            <ToDoList />
                    </footer>
                </div>
            </div>
        </>
    );
}

export default App;
