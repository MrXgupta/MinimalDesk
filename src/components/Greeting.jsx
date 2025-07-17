const Greeting = () => {
    const hour = new Date().getHours();
    const getGreeting = () => {
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-md animate-fadeIn">
            {getGreeting()} 👋
        </h1>
    );
};

export default Greeting;
