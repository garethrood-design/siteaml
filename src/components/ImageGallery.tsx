import { useState, useEffect } from 'react';
import { Lock, Play } from 'lucide-react';
import { siteConfig } from '../config';
import ImageModal from './ImageModal';

const STORAGE_KEY = 'viewed_images';

export default function ImageGallery() {
  const [viewedImages, setViewedImages] = useState<Set<number>>(new Set());
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    loadViewedImages();
  }, []);

  function loadViewedImages() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const viewed = new Set(JSON.parse(stored));
      setViewedImages(viewed);
    }
  }

  function markImageAsViewed(imageIndex: number) {
    const newViewed = new Set([...viewedImages, imageIndex]);
    setViewedImages(newViewed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...newViewed]));
  }

  function handleImageClick(index: number) {
    if (viewedImages.has(index)) return;
    setSelectedImage(index);
  }

  function handleCloseModal() {
    if (selectedImage !== null) {
      markImageAsViewed(selectedImage);
      setSelectedImage(null);
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 max-w-3xl mx-auto w-full">
        {siteConfig.gallery.map((item, index) => {
          const isViewed = viewedImages.has(index);
          return (
            <div
              key={index}
              className={`aspect-square rounded-2xl overflow-hidden relative group ${
                isViewed ? 'cursor-not-allowed' : 'cursor-pointer'
              } shadow-lg border border-gray-800`}
              onClick={() => handleImageClick(index)}
            >
              {item.type === 'video' ? (
                <>
                  <video
                    src={item.url}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isViewed ? 'opacity-40' : 'group-hover:scale-110'
                    }`}
                  />
                  {!isViewed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                      <Play size={32} className="text-white fill-white drop-shadow-lg" />
                    </div>
                  )}
                </>
              ) : (
                <img
                  src={item.url}
                  alt={`Conteúdo ${index + 1}`}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    isViewed ? 'opacity-40' : 'group-hover:scale-110'
                  }`}
                />
              )}
              {isViewed && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-500/30 to-pink-500/30 backdrop-blur-[2px]">
                  <Lock size={40} className="text-white drop-shadow-lg" strokeWidth={1.5} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedImage !== null && (
        <ImageModal
          item={siteConfig.gallery[selectedImage]}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
