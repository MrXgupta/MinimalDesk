import React, { useEffect, useRef, useState } from 'react';
import { FolderUp, Shuffle } from 'lucide-react';

const ImageShuffler = () => {
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef(null);

    // Handle folder upload
    const handleUpload = (e) => {
        const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
        const urls = files.map((file) => URL.createObjectURL(file));
        setImages(urls);
        setCurrent(0);
    };

    // Manual shuffle button
    const shuffle = () => {
        if (images.length > 1) {
            let next = Math.floor(Math.random() * images.length);
            while (next === current) {
                next = Math.floor(Math.random() * images.length);
            }
            setCurrent(next);
        }
    };

    // Auto shuffle every 15 seconds
    useEffect(() => {
        if (images.length > 0) {
            intervalRef.current = setInterval(shuffle, 15000);
        }
        return () => clearInterval(intervalRef.current);
    }, [images]);

    // Send to App via event (background updater)
    useEffect(() => {
        const currentImage = images[current];
        if (currentImage) {
            const event = new CustomEvent('background-update', { detail: currentImage });
            window.dispatchEvent(event);
        }
    }, [current, images]);

    return (
        <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-gray-700 text-white shadow-lg w-72 flex flex-col items-center">
            <label className="cursor-pointer flex items-center gap-2 text-sm hover:underline mb-3">
                <FolderUp className="w-4 h-4" />
                Upload Folder
                <input
                    type="file"
                    multiple
                    webkitdirectory="true"
                    mozdirectory="true"
                    directory="true"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                />
            </label>

            {images.length > 0 && (
                <>
                    <img
                        src={images[current]}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-md mb-2 border border-gray-600"
                    />
                    <button
                        onClick={shuffle}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded transition"
                    >
                        <Shuffle className="w-4 h-4" />
                        Shuffle Now
                    </button>
                </>
            )}
        </div>
    );
};

export default ImageShuffler;
