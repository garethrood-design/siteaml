import { X } from 'lucide-react';
import { useEffect } from 'react';
import { GalleryItem } from '../config';

interface ImageModalProps {
  item: GalleryItem;
  onClose: () => void;
}

export default function ImageModal({ item, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/90 hover:text-white transition-colors z-10 bg-white/10 rounded-full p-2 backdrop-blur-sm"
      >
        <X size={24} />
      </button>
      {item.type === 'video' ? (
        <video
          src={item.url}
          autoPlay
          controls
          className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <img
          src={item.url}
          alt="Visualização em tela cheia"
          className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  );
}
