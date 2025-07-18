import React, { useEffect, useState } from "react";

const MAX_IMAGES = 10;

const ImageManagerModal = ({ onClose, onUpdate }) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadImages = async () => {
            const localImages = chrome?.storage?.local
                ? await new Promise(resolve => chrome.storage.local.get(['userImages'], res => resolve(res.userImages || [])))
                : JSON.parse(localStorage.getItem('userImages') || '[]');

            setImages(localImages);
        };

        loadImages();
    }, []);

    const saveImages = async (imgs) => {
        setImages(imgs);
        onUpdate?.(imgs);
        if (chrome?.storage?.local) {
            chrome.storage.local.set({ userImages: imgs });
        } else {
            localStorage.setItem('userImages', JSON.stringify(imgs));
        }
    };

    const handleUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > MAX_IMAGES) {
            setError(`Max ${MAX_IMAGES} images allowed.`);
            return;
        }
        setError('');

        const newImages = await Promise.all(
            files.map(file =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                })
            )
        );

        saveImages([...images, ...newImages]);
    };

    const handleDelete = (index) => {
        const updated = [...images];
        updated.splice(index, 1);
        saveImages(updated);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-lg w-full max-w-2xl p-6 relative">
                <h2 className="text-xl font-bold mb-4">Manage Background Images</h2>
                <input type="file" accept="image/*" multiple onChange={handleUpload} />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className="grid grid-cols-3 gap-3 mt-4">
                    {images.map((src, idx) => (
                        <div key={idx} className="relative group">
                            <img src={src} alt={`img-${idx}`} className="w-full h-28 object-cover rounded" />
                            <button
                                onClick={() => handleDelete(idx)}
                                className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 absolute top-3 right-3"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ImageManagerModal;
