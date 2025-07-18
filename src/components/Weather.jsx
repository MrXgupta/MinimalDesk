import React, { useState, useEffect } from 'react';

const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); // e.g., Jul 18
};

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

    if (loading) return <p className="text-sm text-white">Loading weather...</p>;
    if (locationError) return <p className="text-sm text-red-400">{locationError}</p>;

    const todayIndex = 0;

    return (
        <div
            className="relative bg-white/10 text-white rounded-xl px-4 py-3 text-sm w-[280px] shadow-md backdrop-blur-lg transition-all duration-300 group"
            onMouseEnter={() => setShowForecast(true)}
            onMouseLeave={() => setShowForecast(false)}
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-lg">{formatDate(weatherData.daily.time[todayIndex])}</p>
                    <p className="text-green-200">Max: {weatherData.daily.temperature_2m_max[todayIndex]}°C</p>
                    <p className="text-blue-200">Min: {weatherData.daily.temperature_2m_min[todayIndex]}°C</p>
                </div>
                <span className="italic text-xs text-gray-300 group-hover:text-gray-100 transition">Hover for 7-day</span>
            </div>

            {/* 7-day Forecast Hover Panel */}
            {showForecast && (
                <div className="absolute top-full left-0 w-[280px] translate-y-3 z-50 transition-all duration-300">
                    <div className="bg-white/10 border border-white/20 backdrop-blur p-3 mt-2 rounded-lg shadow-2xl grid grid-cols-2 gap-3 text-xs">
                        {weatherData.daily.time.map((date, index) => (
                            <div key={date} className="bg-white/5 rounded-md px-3 py-2">
                                <p className="font-medium text-white/90">{formatDate(date)}</p>
                                <p className="text-green-200">↑ {weatherData.daily.temperature_2m_max[index]}°C</p>
                                <p className="text-blue-200">↓ {weatherData.daily.temperature_2m_min[index]}°C</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;