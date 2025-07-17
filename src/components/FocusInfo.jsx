import React from 'react';

const FocusInfo = () => {
    const today = new Date().toLocaleDateString();

    return (
        <div className="focus-info">
            <p>📅 {today}</p>
            <p>⏱️ Stay focused!</p>
            {/* Optional: integrate weather via API */}
        </div>
    );
};

export default FocusInfo;