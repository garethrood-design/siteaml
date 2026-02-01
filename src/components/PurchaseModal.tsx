import { X, Play } from 'lucide-react';
import { useEffect } from 'react';
import { siteConfig } from '../config';
import { NUMEROS } from '../../numeros';

interface PurchaseModalProps {
  onClose: () => void;
}

export default function PurchaseModal({ onClose }: PurchaseModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const title = 'Acesso Premium Completo';
  const description = 'Desbloqueie toda a galeria exclusiva e tenha acesso vitalício a todo o conteúdo';

  const benefits = siteConfig.pricing.premium.benefits;

  const handlePayment = () => {
    const randomIndex = Math.floor(Math.random() * NUMEROS.length);
    const selectedNumber = NUMEROS[randomIndex];
    const message = `Olá! Gostaria de comprar o acesso completo por R$ ${siteConfig.pricing.premium.price},00`;
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
            src="https://console-typebot-minio.kjufc9.easypanel.host/api/v1/buckets/hot-mj/objects/download?preview=true&prefix=little-p1.mp4&version_id=null"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4">
            <div className="flex items-center gap-2 text-white text-sm font-light">
              <Play size={16} fill="white" />
              <span>Prévia do conteúdo exclusivo</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-4xl font-light text-white mb-4">
            R$ {siteConfig.pricing.premium.price}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-6 border border-gray-700">
          <p className="text-xs text-gray-400 mb-3 font-light uppercase tracking-wider">O que está incluído:</p>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-gray-300 flex items-start text-sm font-light">
                <span className="text-rose-400 mr-2 mt-0.5">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-3 px-6 rounded-full font-light text-sm tracking-wide transition-all shadow-md bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white transform hover:scale-105"
        >
          Liberar Acesso Agora
        </button>
      </div>
    </div>
  );
}
