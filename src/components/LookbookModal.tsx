import React, { useState, useRef } from 'react';
import { 
  GarmentType, 
  AccessoryItem, 
  ColorOption, 
  EventScenario, 
  RemixStyle,
  PRESET_LOOKBOOKS,
  PresetOutfit
} from '../data/vietPhucData';
import { 
  X, 
  Download, 
  Share2, 
  Heart, 
  Bookmark, 
  Sparkles, 
  Check, 
  Copy,
  Layers,
  Palette
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentOutfit: {
    garment: GarmentType;
    color: ColorOption;
    bottom: AccessoryItem;
    headwear: AccessoryItem;
    footwear: AccessoryItem;
    handheld: AccessoryItem;
    event: EventScenario;
    style: RemixStyle;
  };
  onApplyPreset: (preset: PresetOutfit) => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  currentOutfit,
  onApplyPreset
}) => {
  const [activeTab, setActiveTab] = useState<'my_look' | 'community'>('my_look');
  const [outfitTitle, setOutfitTitle] = useState('Bản Phối Tân Thời 2026');
  const [authorName, setAuthorName] = useState('Gen Z Stylist');
  const [savedOutfits, setSavedOutfits] = useState<PresetOutfit[]>(() => {
    try {
      const stored = localStorage.getItem('viet_phuc_saved_lookbooks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  // Handle saving outfit
  const handleSaveToLookbook = () => {
    const newOutfit: PresetOutfit = {
      id: 'look-' + Date.now(),
      title: outfitTitle,
      subtitle: `${currentOutfit.garment.name} • ${currentOutfit.style.name}`,
      styleId: currentOutfit.style.id,
      garmentId: currentOutfit.garment.id,
      colorHex: currentOutfit.color.hex,
      colorName: currentOutfit.color.name,
      bottomId: currentOutfit.bottom.id,
      headwearId: currentOutfit.headwear.id,
      footwearId: currentOutfit.footwear.id,
      handheldId: currentOutfit.handheld.id,
      eventId: currentOutfit.event.id,
      weatherId: 'nang_he',
      story: `Bản phối sáng tạo cho dịp ${currentOutfit.event.name}, kết hợp văn hóa ${currentOutfit.garment.name} cùng phong cách ${currentOutfit.style.name}.`,
      likes: 1,
      author: authorName || 'Gen Z Stylist'
    };

    const updated = [newOutfit, ...savedOutfits];
    setSavedOutfits(updated);
    try {
      localStorage.setItem('viet_phuc_saved_lookbooks', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setActiveTab('community');
  };

  // Download Lookbook Canvas as Image
  const handleDownloadCard = () => {
    setIsExporting(true);
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1100;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // Background
    ctx.fillStyle = '#0f111a';
    ctx.fillRect(0, 0, 800, 1100);

    // Decorative gradient borders & header
    const grad = ctx.createLinearGradient(0, 0, 800, 300);
    grad.addColorStop(0, '#e11d48');
    grad.addColorStop(0.5, '#b45309');
    grad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 22);

    // Header title
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
    ctx.fillText('VIỆT PHỤC REMIX', 50, 90);

    ctx.fillStyle = '#fb7185';
    ctx.font = 'bold 16px "Space Grotesk", sans-serif';
    ctx.fillText('ATTIRECRAFT LOOKBOOK EDITION • GEN Z HERITAGE', 50, 125);

    // Card frame
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(50, 150, 700, 720);

    // Outfit title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px "Playfair Display", Georgia, serif';
    ctx.fillText(outfitTitle, 80, 210);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`Stylist: ${authorName} • Bối cảnh: ${currentOutfit.event.name}`, 80, 245);

    // Color swatch representation
    ctx.fillStyle = currentOutfit.color.hex;
    ctx.beginPath();
    ctx.arc(100, 310, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px "Be Vietnam Pro", sans-serif';
    ctx.fillText(currentOutfit.color.name, 140, 305);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '14px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`Hành: ${currentOutfit.color.element} • ${currentOutfit.color.elementMeaning.split(':')[0]}`, 140, 328);

    // Layers info list
    const layers = [
      { label: 'Tà áo chính', val: currentOutfit.garment.name + ` (${currentOutfit.garment.dynastyEra.split('(')[0]})` },
      { label: 'Phần dưới', val: currentOutfit.bottom.name },
      { label: 'Phụ kiện đầu', val: currentOutfit.headwear.name },
      { label: 'Giày dép', val: currentOutfit.footwear.name },
      { label: 'Cầm tay', val: currentOutfit.handheld.name },
      { label: 'Phong cách', val: currentOutfit.style.name + ` (${currentOutfit.style.englishTitle})` }
    ];

    let startY = 400;
    layers.forEach((layer) => {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px "Be Vietnam Pro", sans-serif';
      ctx.fillText(layer.label + ':', 80, startY);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px "Be Vietnam Pro", sans-serif';
      ctx.fillText(layer.val, 240, startY);

      // divider
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(80, startY + 15);
      ctx.lineTo(720, startY + 15);
      ctx.stroke();

      startY += 55;
    });

    // Cultural meaning quote
    ctx.fillStyle = '#fef08a';
    ctx.font = 'italic 15px "Be Vietnam Pro", sans-serif';
    const quote = `"${currentOutfit.garment.culturalMeaning}"`;
    ctx.fillText(quote.length > 70 ? quote.substring(0, 68) + '...' : quote, 80, 780);

    // Heritage Seal stamp
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(550, 720, 160, 60);
    ctx.fillStyle = '#fb7185';
    ctx.font = 'bold 13px "Space Grotesk", sans-serif';
    ctx.fillText('DI SẢN VIỆT', 585, 745);
    ctx.font = '11px "Space Grotesk", sans-serif';
    ctx.fillText('CHỨNG NHẬN VĂN HÓA', 560, 765);

    // Footer hashtags
    ctx.fillStyle = '#64748b';
    ctx.font = '14px "Space Grotesk", sans-serif';
    ctx.fillText('#VietPhucRemix #AttireCraft #GenZDiSan #AoDai #VietNamHeritage', 50, 930);
    ctx.fillText('Tạo tại: Viet Phuc Remix App • AI Studio', 50, 960);

    // Trigger download
    setTimeout(() => {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `viet-phuc-remix-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      setIsExporting(false);
    }, 200);
  };

  // Share text
  const handleCopyShare = () => {
    const text = `🌟 Xem bản phối Việt Phục Remix của mình: "${outfitTitle}" (${currentOutfit.garment.name} phối ${currentOutfit.style.name} cho dịp ${currentOutfit.event.name})! 
🇻🇳 Tôn vinh di sản truyền thống cùng người trẻ Gen Z. 
#VietPhucRemix #AttireCraft #GenZDiSan`;

    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-serif-culture">
                Lookbook Việt Phục Gen Z
              </h2>
              <p className="text-xs text-slate-400">
                Lưu giữ, xuất thẻ hình ảnh thời trang và khám phá các bản phối truyền cảm hứng
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch: My Look vs Community Presets */}
        <div className="flex gap-2 p-1 bg-slate-950/80 rounded-2xl border border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('my_look')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'my_look'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Xuất Thẻ & Lưu Bộ Phối Hiện Tại
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'community'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bộ Sưu Tập Lookbook ({PRESET_LOOKBOOKS.length + savedOutfits.length})
          </button>
        </div>

        {/* TAB 1: EXPORT CURRENT LOOK */}
        {activeTab === 'my_look' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Input Form */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Đặt tên cho bản phối Lookbook:
                </label>
                <input
                  type="text"
                  value={outfitTitle}
                  onChange={(e) => setOutfitTitle(e.target.value)}
                  placeholder="Ví dụ: Kỷ yếu Hoàng Thành, Sài Gòn Nắng Chiều..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Tên Stylist / Bạn học:
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Tên của bạn hoặc nickname Gen Z"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                />
              </div>

              {/* Summary box */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-slate-200">Chi tiết bộ phối:</div>
                <div className="text-slate-400 flex items-center justify-between">
                  <span>Trang phục chính:</span>
                  <span className="font-medium text-rose-300">{currentOutfit.garment.name}</span>
                </div>
                <div className="text-slate-400 flex items-center justify-between">
                  <span>Màu sắc ngũ hành:</span>
                  <span className="font-medium text-slate-200">{currentOutfit.color.name} ({currentOutfit.color.element})</span>
                </div>
                <div className="text-slate-400 flex items-center justify-between">
                  <span>Phần dưới:</span>
                  <span className="font-medium text-slate-200">{currentOutfit.bottom.name}</span>
                </div>
                <div className="text-slate-400 flex items-center justify-between">
                  <span>Sự kiện khuyến nghị:</span>
                  <span className="font-medium text-amber-300">{currentOutfit.event.name}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <button
                  onClick={handleSaveToLookbook}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Lưu Vào Bộ Sưu Tập</span>
                </button>

                <button
                  onClick={handleDownloadCard}
                  disabled={isExporting}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExporting ? 'Đang tạo...' : 'Tải Ảnh Card PNG'}</span>
                </button>

                <button
                  onClick={handleCopyShare}
                  className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  title="Sao chép nội dung chia sẻ mạng xã hội"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>

              {copiedLink && (
                <div className="text-center text-xs text-emerald-400 font-medium animate-fade-in">
                  ✓ Đã sao chép nội dung & hashtags vào clipboard!
                </div>
              )}
            </div>

            {/* Right: Mockup Card Preview */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 relative overflow-hidden flex flex-col justify-between shadow-inner">
              <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-600" />
              
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono tracking-wider text-rose-400 font-bold uppercase">
                    VIỆT PHỤC REMIX LOOKBOOK
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                    2026 Edition
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-serif-culture mt-2 mb-1">
                  {outfitTitle || 'Tên Bản Phối'}
                </h3>
                <div className="text-xs text-amber-400 font-medium">
                  {authorName ? `Stylist: ${authorName}` : 'Gen Z Stylist'} • {currentOutfit.style.name}
                </div>

                <div className="my-5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: currentOutfit.color.hex }} />
                    <span className="text-xs font-semibold text-white">{currentOutfit.color.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {currentOutfit.garment.name} phối cùng {currentOutfit.bottom.name}, {currentOutfit.headwear.name} và {currentOutfit.footwear.name}.
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic leading-relaxed border-l-2 border-rose-500 pl-3">
                  "{currentOutfit.garment.culturalMeaning}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                <span>#VietPhucRemix #AttireCraft</span>
                <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
                  DI SẢN VIỆT NAM
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMMUNITY INSPIRATIONS & SAVED */}
        {activeTab === 'community' && (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            <div className="text-xs text-slate-400">
              Nhấp vào bất kỳ bản phối nào để áp dụng trực tiếp lên nhân vật của bạn trong phòng phối đồ:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...savedOutfits, ...PRESET_LOOKBOOKS].map((look) => (
                <div
                  key={look.id}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-3 group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">
                          {look.title}
                        </h4>
                        <div className="text-[11px] text-amber-400">{look.subtitle}</div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-rose-400 font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                        <Heart className="w-3 h-3 fill-rose-500" />
                        <span>{look.likes}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed my-2 line-clamp-2">
                      {look.story}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span>Bởi: <strong>{look.author}</strong></span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: look.colorHex }} />
                        <span>{look.colorName}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onApplyPreset(look);
                      onClose();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white text-xs font-semibold transition-all text-center cursor-pointer"
                  >
                    Thử Bản Phối Này Ngay
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
