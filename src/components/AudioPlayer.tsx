import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateDuration = () => setDuration(audio.duration);
    const updateCurrentTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('timeupdate', updateCurrentTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('timeupdate', updateCurrentTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-4 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-2xl p-4 backdrop-blur-sm border border-rose-400/20 mb-8 max-w-2xl mx-auto w-full">
      <audio ref={audioRef} src={src} />

      <button
        onClick={togglePlay}
        className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-110 text-white shadow-lg"
      >
        {isPlaying ? (
          <Pause size={20} fill="white" />
        ) : (
          <Play size={20} fill="white" className="ml-0.5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <Volume2 size={16} className="text-rose-300 flex-shrink-0" />
          <div
            className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-500 transition-colors"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-xs text-gray-300 mt-2 text-center">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}
