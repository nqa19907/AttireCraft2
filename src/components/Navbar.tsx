import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Layers, 
  Bookmark, 
  Zap, 
  Scale, 
  ShieldCheck,
  Compass
} from 'lucide-react';

interface NavbarProps {
  activeView: 'studio' | 'encyclopedia' | 'lookbook';
  onViewChange: (view: 'studio' | 'encyclopedia' | 'lookbook') => void;
  onOpenSmartStylist: () => void;
  onOpenCompare: () => void;
  onOpenLookbookModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onViewChange,
  onOpenSmartStylist,
  onOpenCompare,
  onOpenLookbookModal
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div 
          onClick={() => onViewChange('studio')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-amber-500 to-rose-500 p-0.5 shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-rose-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-bold text-white font-serif-culture tracking-wide">
                Việt Phục Remix
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold border border-rose-500/30">
                AttireCraft
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Phối trang phục truyền thống theo phong cách Gen Z
            </p>
          </div>
        </div>

        {/* Center Main Nav Tabs */}
        <nav className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => onViewChange('studio')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
              activeView === 'studio'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Phòng Phối Đồ</span>
          </button>

          <button
            onClick={() => onViewChange('encyclopedia')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
              activeView === 'encyclopedia'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Từ Điển Di Sản</span>
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Smart Stylist button */}
          <button
            onClick={onOpenSmartStylist}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 hover:border-amber-500/40 text-xs font-semibold transition-all cursor-pointer"
            title="Gợi ý trang phục theo thời tiết & sự kiện"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Gợi Ý Nhanh</span>
          </button>

          {/* Compare button */}
          <button
            onClick={onOpenCompare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 text-xs font-semibold transition-all cursor-pointer"
            title="So sánh phương án Cổ truyền vs Gen Z Remix"
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">So Sánh</span>
          </button>

          {/* Lookbook Export button */}
          <button
            onClick={onOpenLookbookModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold shadow-lg shadow-rose-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Lookbook</span>
          </button>
        </div>
      </div>
    </header>
  );
};
