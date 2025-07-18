import {useState, useEffect} from 'react'

const TimeWheel = () => {
        const [second, setSecond] = useState(new Date().getSeconds());
    const TimeWheel = () => {

        useEffect(() => {
            const interval = setInterval(() => {
                setSecond(new Date().getSeconds());
            }, 1000);
            return () => clearInterval(interval);
        }, []);

    }
        const angle = second * 6;
    return (
        <>
            <div className="relative w-24 h-24 overflow-hidden flex items-center justify-center">
                {/* Mask to show only one number at top center */}
                <div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 h-10 w-full bg-black bg-opacity-80 z-10 pointer-events-none flex items-center justify-center border-b border-white">
                        <span className="text-white text-2xl font-bold font-mono">
                            {String(second).padStart(2, '0')}
                        </span>
                </div>

                {/* Rotating Wheel */}
                <div
                    className="absolute w-full h-full flex items-center justify-center"
                    style={{
                        transform: `rotate(-${angle}deg)`,
                        transition: 'transform 0.9s ease-in-out'
                    }}
                >
                    <div className="relative w-full h-full">
                        {Array.from({length: 60}, (_, i) => {
                            const rotation = i * 6; // 6 degrees per number
                            const radius = 40; // Adjust for spacing
                            const x = radius * Math.sin((rotation * Math.PI) / 180);
                            const y = -radius * Math.cos((rotation * Math.PI) / 180);

                            return (
                                <div
                                    key={i}
                                    className="absolute text-white text-sm"
                                    style={{
                                        transform: `translate(${x}px, ${y}px)`
                                    }}
                                >
                                    {String(i).padStart(2, '0')}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}


export default TimeWheel

