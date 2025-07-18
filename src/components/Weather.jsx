import React, { useState, useEffect } from 'react';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForecast, setShowForecast] = useState(false);

    useEffect(() => {
        const getWeather = async (lat, lon) => {
            try {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
                const response = await fetch(url);
                const data = await response.json();
                setWeatherData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setLoading(false);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    getWeather(latitude, longitude);
                },
                (error) => {
                    console.error('Location error:', error.message);
                    setLocationError('Unable to access location');
                    setLoading(false);
                }
            );
        } else {
            setLocationError('Geolocation is not supported by this browser');
            setLoading(false);
        }
    }, []);

    if (loading) return <p className="text-sm text-white">Loading...</p>;
    if (locationError) return <p className="text-sm text-red-400">{locationError}</p>;

    const todayIndex = 0;

    return (
        <div
            className="relative bg-white/10 text-white rounded-md px-4 py-2 text-sm w-[260px] overflow-visible hover:bg-white/20 transition-all duration-300"
            onMouseEnter={() => setShowForecast(true)}
            onMouseLeave={() => setShowForecast(false)}
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold">{weatherData.daily.time[todayIndex]}</p>
                    <p>Max: {weatherData.daily.temperature_2m_max[todayIndex]}°C</p>
                    <p>Min: {weatherData.daily.temperature_2m_min[todayIndex]}°C</p>
                </div>
                <span className="italic text-xs opacity-70">Hover for 7 days</span>
            </div>

            {/* Render 7-day forecast ONLY when hovered */}
            {showForecast && (
                <div className="absolute top-full left-0 w-[260px] translate-y-2 transition-all duration-300 z-50">
                    <div className="bg-white/10 border border-white/20 p-2 mt-2 rounded-md shadow-lg grid grid-cols-2 gap-2 text-xs">
                        {weatherData.daily.time.map((date, index) => (
                            <div key={date} className="bg-white/10 p-2 rounded">
                                <p className="font-medium">{date.slice(5)}</p>
                                <p>Max: {weatherData.daily.temperature_2m_max[index]}°C</p>
                                <p>Min: {weatherData.daily.temperature_2m_min[index]}°C</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
