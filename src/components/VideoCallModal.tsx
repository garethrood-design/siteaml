import { X, MessageCircle, Video } from 'lucide-react';
import { useEffect } from 'react';
import { siteConfig } from '../config';
import { NUMEROS } from '../../numeros';

interface VideoCallModalProps {
  onClose: () => void;
}

export default function VideoCallModal({ onClose }: VideoCallModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const title = 'Chamada de Vídeo Privada';
  const description = 'Interação ao vivo com conteúdo personalizado exclusivo para você';

  const benefits = siteConfig.pricing.videoCall.benefits;

  const handlePayment = () => {
    const randomIndex = Math.floor(Math.random() * NUMEROS.length);
    const selectedNumber = NUMEROS[randomIndex];
    const message = `Olá! Gostaria de agendar uma chamada de vídeo por R$ ${siteConfig.pricing.videoCall.price},00`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${selectedNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-3xl max-w-md w-full p-8 relative shadow-2xl border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-light text-white mb-2 tracking-wide">{title}</h2>
        <p className="text-gray-400 mb-6 text-sm">{description}</p>

        <div className="mb-6 rounded-2xl overflow-hidden bg-gray-800 relative group">
          <video
            className="w-full aspect-video object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="https://console-typebot-minio.kjufc9.easypanel.host/api/v1/buckets/hot-mj/objects/download?preview=true&prefix=little-cam.mp4&version_id=null"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center">
            <Video size={64} className="text-red-400" strokeWidth={1.5} />
          </div>
        </div>

        <div className="mb-6">
          <div className="text-4xl font-light text-white mb-4">
            R$ {siteConfig.pricing.videoCall.price}
          </div>
          <div className="text-sm text-gray-400 mb-4">
            {siteConfig.pricing.videoCall.duration} minutos de duração
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-6 border border-gray-700">
          <p className="text-xs text-gray-400 mb-3 font-light uppercase tracking-wider">O que está incluído:</p>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-gray-300 flex items-start text-sm font-light">
                <span className="text-red-400 mr-2 mt-0.5">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-4 px-6 rounded-full font-light text-base tracking-wide transition-all shadow-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <MessageCircle size={20} fill="white" />
          Chamar no WhatsApp
        </button>
      </div>
    </div>
  );
}
