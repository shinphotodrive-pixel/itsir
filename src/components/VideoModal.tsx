import React from 'react';
import { X, ExternalLink, Play } from 'lucide-react';

interface VideoModalProps {
  youtubeId: string;
  title: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ youtubeId, title, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white text-sm font-bold truncate pr-4">
            <Play className="w-4 h-4 text-red-500 fill-red-500 shrink-0" />
            <span className="truncate">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-xs flex items-center gap-1"
              title="YouTube에서 직접 보기"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-slate-950 text-slate-400 text-xs flex justify-between items-center">
          <span>제조사 공식 기술 시연 채널 제공</span>
          <a
            href={`https://www.youtube.com/watch?v=${youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline flex items-center gap-1"
          >
            새 탭에서 열기 <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
