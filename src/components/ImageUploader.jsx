import React, { useEffect, useState } from 'react';
import ImageManagerModal from './ImageManageModel';

const ImageUploader = ({ onBgChange }) => {
    const [showModal, setShowModal] = useState(false);

    const [bgImages, setBgImages] = useState([]);
    const [current, setCurrent] = useState('');

    useEffect(() => {
        const load = async () => {
            const data = chrome?.storage?.local
                ? await new Promise(resolve => chrome.storage.local.get(['userImages'], res => resolve(res.userImages || [])))
                : JSON.parse(localStorage.getItem('userImages') || '[]');

            setBgImages(data);
            if (data.length) {
                const rand = data[Math.floor(Math.random() * data.length)];
                setCurrent(rand);
                onBgChange?.(rand);
            }
        };

        load();

        // Update every hour
        const interval = setInterval(() => {
            if (bgImages.length) {
                const rand = bgImages[Math.floor(Math.random() * bgImages.length)];
                setCurrent(rand);
                onBgChange?.(rand);
            }
        }, 60 * 60 * 1000); // 1 hour

        return () => clearInterval(interval);
    }, [bgImages.length]);

    const handleImagesUpdated = (images) => {
        setBgImages(images);
        if (images.length) {
            const rand = images[Math.floor(Math.random() * images.length)];
            setCurrent(rand);
            onBgChange?.(rand);
        }
    };

    return (
        <>
            <div className="p-4">
                <button
                    className="bg-transparent text-white px-4 py-2"
                    onClick={() => setShowModal(true)}
                >
                    Images
                </button>
            </div>

            {showModal && (
                <ImageManagerModal
                    onClose={() => setShowModal(false)}
                    onUpdate={handleImagesUpdated}
                />
            )}
        </>
    );
};

export default ImageUploader;
