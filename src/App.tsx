import { useState } from 'react';
import { Video, Instagram, Heart, MessageCircle, Eye, Images } from 'lucide-react';
import ImageGallery from './components/ImageGallery';
import AudioPlayer from './components/AudioPlayer';
import ContentModal from './components/ContentModal';
import VideoCallModal from './components/VideoCallModal';
import { siteConfig } from './config';

function App() {
  const [showContentModal, setShowContentModal] = useState(false);
  const [showVideoCallModal, setShowVideoCallModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <h1 className="text-xl font-bold text-black">privacy</h1>
        </div>
      </div>

      <div className="pt-16">
        <div className="text-center py-3">
          <h2 className="text-lg font-semibold text-black">
            {siteConfig.model.name}
          </h2>
        </div>

        <div className="relative">
          <div
            className="relative h-64 bg-cover bg-center"
            style={{
              backgroundImage: `url(${siteConfig.model.coverImage})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20"></div>


            <div className="absolute bottom-3 left-4 flex items-end gap-3">
              <div className="w-24 h-24 rounded-full border-3 border-white overflow-hidden bg-black shadow-lg relative">
                <img
                  src={siteConfig.model.profileImage}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              <div className="flex gap-4 pb-1">
                <div className="flex items-center gap-1 bg-white bg-opacity-80 rounded-md px-2 py-1">
                  <MessageCircle size={16} className="text-gray-700" />
                  <span className="text-gray-700 text-sm font-medium">38</span>
                </div>
                <div className="flex items-center gap-1 bg-white bg-opacity-80 rounded-md px-2 py-1">
                  <Eye size={16} className="text-gray-700" />
                  <span className="text-gray-700 text-sm font-medium">29</span>
                </div>
                <div className="flex items-center gap-1 bg-white bg-opacity-80 rounded-md px-2 py-1">
                  <Video size={16} className="text-gray-700" />
                  <span className="text-gray-700 text-sm font-medium">8</span>
                </div>
                <div className="flex items-center gap-1 bg-white bg-opacity-80 rounded-md px-2 py-1">
                  <Heart size={16} className="text-gray-700" />
                  <span className="text-gray-700 text-sm font-medium">9.4K</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-4 py-5 max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-xl font-bold text-black">
              {siteConfig.model.name}
            </h1>
            <img src="/image.png" alt="Verificado" className="w-[18px] h-[18px]" />
          </div>
          <p className="text-gray-600 text-sm mb-3">@{siteConfig.model.name.toLowerCase().replace(/\s+/g, '')}</p>

          <p className={`text-gray-800 text-sm leading-relaxed mb-2 ${expanded ? '' : 'line-clamp-3'}`}>
            {siteConfig.model.bio}
          </p>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-orange-500 text-sm font-semibold mb-3 hover:text-orange-600"
          >
            Ler mais
          </button>

          <div className="flex gap-3">
            <Instagram size={18} className="text-gray-600" />
          </div>
        </div>

        <div className="bg-black px-4 pb-16 pt-4 max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <AudioPlayer src="https://console-typebot-minio.kjufc9.easypanel.host/api/v1/buckets/hot-mj/objects/download?preview=true&prefix=little-audio.mp3&version_id=null" />

            <style>{`
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
              }
              .animate-pulse-custom {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
              }
            `}</style>
            <div className="grid grid-cols-2 gap-3 mb-12 w-full max-w-sm">
              <button
                onClick={() => setShowContentModal(true)}
                className="animate-pulse-custom relative flex flex-col items-center gap-2 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-light py-4 px-4 rounded-2xl transition-all transform hover:scale-105 shadow-xl"
              >
                <Images size={28} strokeWidth={1.5} />
                <span className="text-xs tracking-wide text-center leading-tight">Liberar<br />Conteúdo</span>
              </button>

              <button
                onClick={() => setShowVideoCallModal(true)}
                className="animate-pulse-custom relative flex flex-col items-center gap-2 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-light py-4 px-4 rounded-2xl transition-all transform hover:scale-105 shadow-xl"
              >
                <Video size={28} strokeWidth={1.5} />
                <span className="text-xs tracking-wide text-center leading-tight">Chamada de<br />Vídeo</span>
              </button>
            </div>

            <ImageGallery />
          </div>
        </div>
      </div>

      {showContentModal && (
        <ContentModal onClose={() => setShowContentModal(false)} />
      )}

      {showVideoCallModal && (
        <VideoCallModal onClose={() => setShowVideoCallModal(false)} />
      )}
    </div>
  );
}

export default App;
