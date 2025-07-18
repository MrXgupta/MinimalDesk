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
            setError(`⚠️ Max ${MAX_IMAGES} images allowed.`);
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white text-black rounded-2xl w-full max-w-3xl p-6 shadow-2xl relative">

                {/* Modal Title */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Manage Background Images</h2>
                    <button
                        onClick={onClose}
                        className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Upload Control */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <label
                        htmlFor="bgUploader"
                        className="cursor-pointer bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        📁 Upload Images
                    </label>
                    <input
                        id="bgUploader"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleUpload}
                        className="hidden"
                    />
                    <div className="text-sm text-gray-600 ml-1">
                        {images.length}/{MAX_IMAGES} uploaded | JPG/PNG
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                {/* Image Grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-64 overflow-y-auto pr-1 border-t pt-4">
                    {images.map((src, idx) => (
                        <div key={idx} className="relative group rounded-lg overflow-hidden border shadow">
                            <img
                                src={src}
                                alt={`img-${idx}`}
                                className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <button
                                onClick={() => handleDelete(idx)}
                                className="absolute top-1 right-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full opacity-90 hover:opacity-100 transition"
                                title="Delete"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageManagerModal;
