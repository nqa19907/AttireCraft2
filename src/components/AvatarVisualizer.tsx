import React, { useState, useRef } from 'react';
import { 
  GarmentType, 
  AccessoryItem, 
  ColorOption 
} from '../data/vietPhucData';
import { 
  Sparkles, 
  RotateCcw, 
  Camera, 
  Upload, 
  Eye, 
  ShieldCheck, 
  AlertTriangle,
  Layers,
  Palette,
  Maximize2
} from 'lucide-react';

interface AvatarVisualizerProps {
  garment: GarmentType;
  color: ColorOption;
  bottom: AccessoryItem;
  headwear: AccessoryItem;
  footwear: AccessoryItem;
  handheld: AccessoryItem;
  modelGender: 'nu' | 'nam' | 'chibi';
  onGenderChange: (gender: 'nu' | 'nam' | 'chibi') => void;
  backgroundTheme: string;
  onBgChange: (bg: string) => void;
  isReversedLapel: boolean;
  onToggleLapel: () => void;
  userFaceImage: string | null;
  onFaceUpload: (dataUrl: string | null) => void;
}

export const AvatarVisualizer: React.FC<AvatarVisualizerProps> = ({
  garment,
  color,
  bottom,
  headwear,
  footwear,
  handheld,
  modelGender,
  onGenderChange,
  backgroundTheme,
  onBgChange,
  isReversedLapel,
  onToggleLapel,
  userFaceImage,
  onFaceUpload
}) => {
  const [zoomLevel, setZoomLevel] = useState<'fit' | 'close'>('fit');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onFaceUpload(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Background environments
  const bgStyles: Record<string, { name: string; bgClass: string; sceneryDetail: string }> = {
    hoang_thanh: {
      name: 'Hoàng Thành & Văn Miếu',
      bgClass: 'from-amber-950/80 via-stone-900 to-slate-950',
      sceneryDetail: 'Tường gạch vồ rêu phong, mái ngói âm dương cổ kính'
    },
    pho_co: {
      name: 'Phố Cổ Hội An & Đèn Lồng',
      bgClass: 'from-rose-950/80 via-amber-950 to-neutral-950',
      sceneryDetail: 'Tường vàng hoa giấy, đèn lồng ấm áp đêm rằm'
    },
    cyber_genz: {
      name: 'Cyber Studio Gen Z',
      bgClass: 'from-indigo-950/90 via-purple-950 to-slate-950',
      sceneryDetail: 'Ánh sáng neon hologram phản chiếu tương lai số'
    },
    dinh_lang: {
      name: 'Sân Đình & Lũy Tre Xanh',
      bgClass: 'from-emerald-950/80 via-stone-900 to-slate-950',
      sceneryDetail: 'Bóng tre xanh ngát, giếng nước gốc đa sân đình'
    }
  };

  const currentBg = bgStyles[backgroundTheme] || bgStyles.hoang_thanh;

  return (
    <div className="relative flex flex-col bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Top Bar: Model selection & Background Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-800/80 bg-slate-950/60 z-20">
        {/* Gender / Model switch */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => onGenderChange('nu')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              modelGender === 'nu'
                ? 'bg-rose-500 text-white font-semibold shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Nữ Stylist
          </button>
          <button
            onClick={() => onGenderChange('nam')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              modelGender === 'nam'
                ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Nam Stylist
          </button>
          <button
            onClick={() => onGenderChange('chibi')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              modelGender === 'chibi'
                ? 'bg-amber-500 text-white font-semibold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Chibi Gen Z
          </button>
        </div>

        {/* Action icons: Upload Face, Zoom, Reverse Lapel test */}
        <div className="flex items-center gap-2">
          {/* Lapel Direction Warning / Check */}
          <button
            onClick={onToggleLapel}
            title={isReversedLapel ? "Đang mặc ngược vạt (Tả nhậm - kỵ tang chế)!" : "Chuẩn Hữu nhậm: Vạt trái đè vạt phải"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isReversedLapel 
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
            }`}
          >
            {isReversedLapel ? <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> : <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isReversedLapel ? 'Ngược vạt (Kỵ)' : 'Chuẩn Hữu Nhậm'}</span>
          </button>

          {/* User Face Swap Button */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <button
            onClick={() => userFaceImage ? onFaceUpload(null) : fileInputRef.current?.click()}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              userFaceImage
                ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
            }`}
            title={userFaceImage ? "Gỡ ảnh chân dung" : "Tải ảnh khuôn mặt để thử đồ"}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{userFaceImage ? 'Đổi chân dung' : 'Thử khuôn mặt'}</span>
          </button>

          {/* Zoom View Toggle */}
          <button
            onClick={() => setZoomLevel(prev => prev === 'fit' ? 'close' : 'fit')}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs border border-slate-700"
            title="Đổi góc nhìn toàn thân / cận cảnh"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Visual Display Canvas */}
      <div 
        className={`relative w-full h-[520px] sm:h-[580px] bg-gradient-to-b ${currentBg.bgClass} flex items-center justify-center overflow-hidden transition-all duration-700 select-none`}
      >
        {/* Cultural Background Ambient Motifs */}
        <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
          <svg className="w-full h-full max-w-[600px] text-amber-200" viewBox="0 0 400 400" fill="none">
            {/* Dong Son drum & lotus concentric patterns */}
            <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
            <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="1" />
            <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="200" cy="200" r="20" fill="currentColor" fillOpacity="0.4" />
            {/* Sun rays */}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="200"
                y1="200"
                x2={200 + 170 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={200 + 170 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="0.75"
                opacity="0.3"
              />
            ))}
          </svg>
        </div>

        {/* Ambient glow around character */}
        <div 
          className="absolute w-72 h-96 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: color.hex }}
        />

        {/* The Vietnamese Attire Character Canvas */}
        <div 
          className={`relative z-10 transition-transform duration-500 ${
            zoomLevel === 'close' ? 'scale-125 -translate-y-12' : 'scale-100'
          }`}
        >
          <svg
            className="w-[280px] sm:w-[320px] h-[480px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"
            viewBox="0 0 320 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* DEFINITIONS & FILTERS */}
            <defs>
              <linearGradient id="garmentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color.hex} stopOpacity="1" />
                <stop offset="60%" stopColor={color.hex} stopOpacity="0.92" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
              </linearGradient>

              {/* Silk Brocade Pattern overlay */}
              <pattern id="brocade" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="#ffffff" fillOpacity="0.12" />
                <path d="M 0 10 Q 10 0 20 10 Q 10 20 0 10" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.08" />
              </pattern>

              {/* Shadow effect */}
              <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.35" />
              </filter>
            </defs>

            {/* BASE SHADOW UNDER FEET */}
            <ellipse cx="160" cy="475" rx="75" ry="12" fill="#000000" fillOpacity="0.45" />

            {/* 1. FOOTWEAR */}
            <g id="footwear-layer">
              {footwear.id === 'chunky_sneaker_trang' ? (
                // Chunky Sneaker Gen Z
                <g filter="url(#softShadow)">
                  {/* Left sneaker */}
                  <path d="M 130 455 L 148 455 C 150 465 146 472 135 474 L 118 474 C 112 473 118 462 130 455 Z" fill="#f8fafc" />
                  <path d="M 115 470 L 148 470 C 148 474 140 477 132 477 L 115 477 Z" fill="#0284c7" />
                  <circle cx="127" cy="463" r="2" fill="#0284c7" />
                  {/* Right sneaker */}
                  <path d="M 172 455 L 190 455 C 196 462 202 473 196 474 L 179 474 C 168 472 166 465 172 455 Z" fill="#f8fafc" />
                  <path d="M 166 470 L 199 470 L 199 477 C 191 477 183 477 166 474 Z" fill="#0284c7" />
                  <circle cx="187" cy="463" r="2" fill="#0284c7" />
                </g>
              ) : footwear.id === 'guoc_moc_quai_nhung' ? (
                // Traditional wooden clogs (Guốc mộc)
                <g filter="url(#softShadow)">
                  {/* Left wooden clog */}
                  <path d="M 125 460 Q 138 460 148 462 L 148 473 Q 135 473 120 470 L 120 465 Z" fill="#d97706" />
                  {/* Red velvet strap */}
                  <path d="M 130 458 Q 137 452 144 458" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
                  {/* Right wooden clog */}
                  <path d="M 166 462 Q 176 460 189 460 L 194 465 L 194 470 Q 179 473 166 473 Z" fill="#d97706" />
                  {/* Red velvet strap */}
                  <path d="M 170 458 Q 177 452 184 458" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
                </g>
              ) : footwear.id === 'hai_theu_sen_chop_cong' ? (
                // Royal curled embroidered shoes
                <g filter="url(#softShadow)">
                  <path d="M 120 458 Q 135 456 148 460 L 146 472 L 115 472 Q 110 464 120 458 Z" fill="#e11d48" />
                  <path d="M 112 465 Q 110 455 116 456" stroke="#fcd34d" strokeWidth="2.5" fill="none" />
                  <path d="M 166 460 Q 179 456 194 458 Q 204 464 199 472 L 168 472 Z" fill="#e11d48" />
                  <path d="M 202 465 Q 204 455 198 456" stroke="#fcd34d" strokeWidth="2.5" fill="none" />
                </g>
              ) : (
                // Classic Loafer / Leather shoe
                <g filter="url(#softShadow)">
                  <ellipse cx="134" cy="466" rx="16" ry="7" fill="#171717" />
                  <rect x="124" y="462" width="20" height="4" rx="1" fill="#404040" />
                  <ellipse cx="180" cy="466" rx="16" ry="7" fill="#171717" />
                  <rect x="170" y="462" width="20" height="4" rx="1" fill="#404040" />
                </g>
              )}
            </g>

            {/* 2. BOTTOMS / PANTS / SKIRTS */}
            <g id="bottoms-layer">
              {bottom.id === 'quan_jeans_baggy_genz' ? (
                // Baggy Jeans Denim with cuff
                <g>
                  {/* Left leg */}
                  <path d="M 136 295 L 122 445 L 145 445 L 157 325 Z" fill="#3b82f6" />
                  {/* Right leg */}
                  <path d="M 157 325 L 169 445 L 192 445 L 178 295 Z" fill="#2563eb" />
                  {/* Folded cuff details */}
                  <rect x="122" y="440" width="23" height="6" rx="1" fill="#93c5fd" />
                  <rect x="169" y="440" width="23" height="6" rx="1" fill="#93c5fd" />
                  {/* Denim contrast stitches */}
                  <path d="M 125 440 L 138 310" stroke="#fcd34d" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
                  <path d="M 189 440 L 176 310" stroke="#fcd34d" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
                </g>
              ) : bottom.id === 'chan_vay_xep_ly_midi' ? (
                // Pleated midi skirt
                <g>
                  <path d="M 135 285 Q 160 288 179 285 L 205 440 Q 157 452 109 440 Z" fill="#d97706" />
                  {/* Pleat lines */}
                  {[...Array(9)].map((_, i) => (
                    <line 
                      key={i} 
                      x1={138 + i * 4.5} 
                      y1="287" 
                      x2={114 + i * 10} 
                      y2="442" 
                      stroke="#92400e" 
                      strokeWidth="1.2" 
                      opacity="0.5" 
                    />
                  ))}
                </g>
              ) : bottom.id === 'vay_dup_kinh_bac' ? (
                // Black silk rustic traditional skirt
                <g>
                  <path d="M 138 285 Q 160 287 176 285 L 196 450 Q 158 455 118 450 Z" fill="#18181b" />
                  <path d="M 118 450 Q 158 455 196 450 L 194 454 Q 158 458 116 454 Z" fill="#09090b" />
                </g>
              ) : (
                // Traditional wide flowing pants (white or black silk)
                <g>
                  <path d="M 137 280 L 118 452 L 148 452 L 158 310 Z" fill={bottom.colorHex || '#fafafa'} />
                  <path d="M 158 310 L 168 452 L 198 452 L 177 280 Z" fill={bottom.colorHex === '#18181b' ? '#09090b' : '#e4e4e7'} />
                  {/* Subtle silk crease */}
                  <line x1="133" y1="330" x2="133" y2="440" stroke="#a1a1aa" strokeWidth="0.6" strokeOpacity="0.4" />
                  <line x1="183" y1="330" x2="183" y2="440" stroke="#a1a1aa" strokeWidth="0.6" strokeOpacity="0.4" />
                </g>
              )}
            </g>

            {/* 3. UPPER BODY & MAIN TRADITIONAL GARMENT */}
            <g id="main-garment-layer" filter="url(#softShadow)">
              {/* INNER COLLAR (Áo lót trắng/trung đơn) */}
              <path d="M 148 116 L 160 135 L 166 116 Z" fill="#ffffff" />
              <path d="M 151 118 L 163 133" stroke="#e2e8f0" strokeWidth="1" />

              {/* SILHOUETTES BASED ON GARMENT TYPE */}
              {garment.silhouetteType === 'tu_than' ? (
                // Áo Tứ Thân: Camisole Yếm Đào + 4 Vạt Áo
                <g>
                  {/* Yếm đào bên trong */}
                  <path d="M 148 120 Q 160 128 166 120 L 176 195 Q 158 202 138 195 Z" fill="#ec4899" />
                  {/* Dải yếm thêu hoa sen */}
                  <circle cx="157" cy="155" r="4" fill="#fbcfe8" opacity="0.8" />
                  
                  {/* Hai vạt sau buông dài */}
                  <path d="M 138 180 L 120 410 L 145 405 L 152 230 Z" fill="url(#garmentGrad)" />
                  <path d="M 176 180 L 194 410 L 169 405 L 162 230 Z" fill="url(#garmentGrad)" />

                  {/* Hai vạt trước thắt nút eo buông dài */}
                  <path d="M 135 125 L 138 215 L 157 235 L 157 145 Z" fill={color.hex} />
                  <path d="M 179 125 L 176 215 L 157 235 L 157 145 Z" fill={color.hex} opacity="0.9" />

                  {/* Nút thắt vạt lụa trước bụng */}
                  <ellipse cx="157" cy="235" rx="8" ry="6" fill="#be185d" />
                  <path d="M 154 238 L 146 335 L 155 330 Z" fill="#f43f5e" />
                  <path d="M 160 238 L 168 340 L 159 335 Z" fill="#f43f5e" />

                  {/* Thắt lưng hoa cà lụa */}
                  <rect x="136" y="215" width="42" height="10" rx="3" fill="#10b981" />
                </g>
              ) : garment.silhouetteType === 'nhat_binh' ? (
                // Áo Nhật Bình: Cổ vuông chữ Nhật thêu kim tuyến & ngũ hành ngũ sắc
                <g>
                  {/* Thân áo lộng lẫy */}
                  <path d="M 125 125 L 190 125 L 198 395 Q 158 402 116 395 Z" fill="url(#garmentGrad)" />
                  <path d="M 125 125 L 190 125 L 198 395 Q 158 402 116 395 Z" fill="url(#brocade)" />

                  {/* Cổ áo hình chữ Nhật (Đặc trưng Nhật Bình) */}
                  <path d="M 142 118 L 172 118 L 172 230 L 142 230 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
                  {/* Hoa văn bát bửu & dải ngũ sắc viền cổ */}
                  <path d="M 145 122 L 169 122 L 169 226 L 145 226 Z" fill="#b91c1c" />
                  <rect x="150" y="132" width="14" height="20" fill="#2563eb" opacity="0.7" />
                  <rect x="150" y="160" width="14" height="20" fill="#059669" opacity="0.7" />
                  <rect x="150" y="188" width="14" height="20" fill="#f59e0b" opacity="0.7" />

                  {/* Tay áo rộng viền ngũ sắc 5 dải màu */}
                  {/* Left wide sleeve */}
                  <path d="M 128 132 L 80 230 L 105 242 L 132 170 Z" fill={color.hex} />
                  <rect x="80" y="222" width="28" height="4" fill="#3b82f6" transform="rotate(22 80 222)" />
                  <rect x="82" y="226" width="28" height="4" fill="#ef4444" transform="rotate(22 82 226)" />
                  <rect x="84" y="230" width="28" height="4" fill="#eab308" transform="rotate(22 84 230)" />
                  {/* Right wide sleeve */}
                  <path d="M 186 132 L 235 230 L 210 242 L 182 170 Z" fill={color.hex} />
                  <rect x="210" y="232" width="28" height="4" fill="#3b82f6" transform="rotate(-22 210 232)" />
                  <rect x="208" y="228" width="28" height="4" fill="#ef4444" transform="rotate(-22 208 228)" />
                  <rect x="206" y="224" width="28" height="4" fill="#eab308" transform="rotate(-22 206 224)" />
                </g>
              ) : garment.silhouetteType === 'giao_linh' ? (
                // Áo Giao Lĩnh (Cổ chéo hình chữ V, Hữu nhậm: Trái đè Phải)
                <g>
                  {/* Main gown */}
                  <path d="M 125 125 L 189 125 L 202 415 Q 158 422 112 415 Z" fill="url(#garmentGrad)" />
                  <path d="M 125 125 L 189 125 L 202 415 Q 158 422 112 415 Z" fill="url(#brocade)" />

                  {/* Cross collar: Vạt trái vắt qua phải (hoặc ngược nếu bị toggle lỗi) */}
                  {isReversedLapel ? (
                    // CẢNH BÁO: MẶC NGƯỢC (Tả nhậm)
                    <g>
                      <path d="M 140 120 L 175 195 L 160 205 L 132 130 Z" fill="#ef4444" opacity="0.8" />
                      <path d="M 174 120 L 140 195 L 126 195 L 162 120 Z" fill={color.hex} stroke="#fbbf24" strokeWidth="2" />
                    </g>
                  ) : (
                    // CHUẨN CỔ TRUYỀN: Hữu nhậm (Trái đè Phải)
                    <g>
                      <path d="M 174 120 L 142 195 L 130 190 L 165 120 Z" fill={color.hex} opacity="0.8" />
                      <path d="M 140 120 L 175 195 L 186 195 L 152 120 Z" fill={color.hex} stroke="#fbbf24" strokeWidth="2" />
                    </g>
                  )}

                  {/* Đai lưng vải lụa to bản */}
                  <rect x="132" y="210" width="50" height="15" rx="3" fill="#b45309" />
                  <path d="M 160 225 L 155 310 L 165 305 Z" fill="#d97706" />
                </g>
              ) : garment.silhouetteType === 'tay_thung' ? (
                // Áo Tấc (Ngũ thân tay thụng to bản buông rủ)
                <g>
                  <path d="M 128 125 L 187 125 L 198 425 Q 158 430 116 425 Z" fill="url(#garmentGrad)" />
                  <path d="M 128 125 L 187 125 L 198 425 Q 158 430 116 425 Z" fill="url(#brocade)" />

                  {/* Cổ đứng cao viền trắng */}
                  <rect x="146" y="115" width="22" height="10" rx="3" fill={color.hex} stroke="#fcd34d" strokeWidth="1" />
                  
                  {/* 5 Hạt cúc ngũ thường */}
                  {[128, 142, 160, 182, 208].map((y, idx) => (
                    <circle key={idx} cx="166" cy={y} r="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
                  ))}

                  {/* Tay thụng siêu to rộng (30-40cm) buông qua hông */}
                  {/* Left sleeve */}
                  <path d="M 130 130 L 72 265 L 108 275 L 135 180 Z" fill={color.hex} opacity="0.95" />
                  {/* Right sleeve */}
                  <path d="M 184 130 L 242 265 L 206 275 L 179 180 Z" fill={color.hex} opacity="0.95" />
                  {/* Fold folds of big sleeves */}
                  <path d="M 72 265 Q 90 280 108 275" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
                  <path d="M 242 265 Q 224 280 206 275" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
                </g>
              ) : garment.silhouetteType === 'ba_ba' ? (
                // Áo Bà Ba: Cổ tròn, vạt xẻ ngắn ngang hông, 2 túi trước
                <g>
                  <path d="M 132 125 L 182 125 L 188 280 Q 158 286 126 280 Z" fill="url(#garmentGrad)" />
                  {/* Cổ tròn xẻ nhẹ */}
                  <circle cx="157" cy="124" r="10" fill="none" stroke="#fcd34d" strokeWidth="1" />
                  {/* Hàng nút bấm thẳng tắp chính giữa */}
                  {[134, 154, 174, 194, 214, 234, 254].map((y, idx) => (
                    <circle key={idx} cx="157" cy={y} r="2" fill="#ffffff" />
                  ))}
                  {/* Hai túi nhỏ trước vạt áo bà ba */}
                  <rect x="135" y="240" width="16" height="18" rx="2" fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />
                  <rect x="163" y="240" width="16" height="18" rx="2" fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />

                  {/* Tay áo lửng thoải mái */}
                  <path d="M 132 130 L 98 220 L 115 224 L 135 160 Z" fill={color.hex} />
                  <path d="M 182 130 L 216 220 L 199 224 L 179 160 Z" fill={color.hex} />
                </g>
              ) : (
                // Áo Ngũ Thân Tay Chẽn & Áo Dài Cách Tân (Kinh điển)
                <g>
                  {/* Thân áo ôm dáng xẻ tà */}
                  <path d="M 132 125 L 182 125 L 194 400 Q 157 406 120 400 Z" fill="url(#garmentGrad)" />
                  <path d="M 132 125 L 182 125 L 194 400 Q 157 406 120 400 Z" fill="url(#brocade)" />

                  {/* Cổ lập (cổ đứng) truyền thống viền khánh */}
                  <path d="M 148 114 L 166 114 L 166 124 L 148 124 Z" fill={color.hex} stroke="#fcd34d" strokeWidth="1" />
                  
                  {/* Đường may vạt sườn & 5 cúc khuy ngọc */}
                  <path d="M 166 124 Q 176 138 178 170 L 178 220" stroke="#fcd34d" strokeWidth="1.2" fill="none" />
                  {[126, 138, 154, 172, 192].map((y, idx) => (
                    <circle key={idx} cx={idx === 0 ? 166 : 177} cy={y} r="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
                  ))}

                  {/* Tay chẽn gọn gàng từ khuỷu đến cổ tay */}
                  {/* Left sleeve */}
                  <path d="M 132 128 L 98 235 L 114 240 L 136 160 Z" fill={color.hex} />
                  {/* Right sleeve */}
                  <path d="M 182 128 L 216 235 L 200 240 L 178 160 Z" fill={color.hex} />
                </g>
              )}
            </g>

            {/* 4. HANDHELD ACCESSORY */}
            <g id="handheld-layer" filter="url(#softShadow)">
              {handheld.id === 'quat_lua_de_tho' ? (
                // Silk fan with poetry & lotus
                <g>
                  <circle cx="218" cy="245" r="24" fill="#fff1f2" stroke="#fda4af" strokeWidth="1.5" />
                  <circle cx="218" cy="245" r="20" fill="none" stroke="#f43f5e" strokeWidth="0.75" strokeDasharray="3 2" />
                  {/* Handled fan stick */}
                  <line x1="218" y1="269" x2="218" y2="295" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
                  {/* Pink lotus motif on fan */}
                  <path d="M 218 240 Q 212 248 218 252 Q 224 248 218 240 Z" fill="#fb7185" />
                  {/* Silk tassel */}
                  <line x1="218" y1="295" x2="223" y2="315" stroke="#e11d48" strokeWidth="2" />
                </g>
              ) : handheld.id === 'tui_coi_thu_cong' ? (
                // Woven straw bag with bamboo handle
                <g>
                  {/* Round handles */}
                  <circle cx="218" cy="240" r="10" fill="none" stroke="#78350f" strokeWidth="2.5" />
                  {/* Woven basket */}
                  <path d="M 204 248 L 232 248 L 230 280 Q 218 285 206 280 Z" fill="#d97706" />
                  <line x1="206" y1="256" x2="230" y2="256" stroke="#b45309" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="208" y1="266" x2="228" y2="266" stroke="#b45309" strokeWidth="1" strokeDasharray="2 2" />
                </g>
              ) : handheld.id === 'tui_bao_tu_streetwear' ? (
                // Streetwear Crossbody Bag
                <g>
                  <path d="M 132 155 L 180 205" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 145 175 L 175 198" stroke="#0ea5e9" strokeWidth="14" strokeLinecap="round" />
                  <circle cx="160" cy="186" r="3" fill="#ffffff" />
                </g>
              ) : handheld.id === 'the_bai_khac_co_tu' ? (
                // Royal jade / brass pendant token
                <g>
                  <rect x="178" y="225" width="10" height="26" rx="2" fill="#ca8a04" stroke="#fef08a" strokeWidth="1" />
                  <line x1="183" y1="225" x2="183" y2="210" stroke="#dc2626" strokeWidth="1.5" />
                  {/* Tassels */}
                  <line x1="183" y1="251" x2="183" y2="280" stroke="#dc2626" strokeWidth="2" />
                </g>
              ) : null}
            </g>

            {/* 5. NECK & HEAD & FACE */}
            <g id="head-layer">
              {/* Neck */}
              <rect x="151" y="98" width="12" height="18" fill="#fed7aa" />

              {/* Head shape */}
              {modelGender === 'chibi' ? (
                // Chibi big cute head
                <circle cx="157" cy="72" r="34" fill="#ffedd5" />
              ) : (
                // Elegant adult head
                <ellipse cx="157" cy="74" rx="20" ry="26" fill="#fed7aa" />
              )}

              {/* USER CUSTOM FACE PHOTO OVERLAY (If uploaded) */}
              {userFaceImage ? (
                <clipPath id="avatarFaceClip">
                  <ellipse cx="157" cy="74" rx="19" ry="24" />
                </clipPath>
              ) : null}
              {userFaceImage && (
                <image
                  href={userFaceImage}
                  x="137"
                  y="50"
                  width="40"
                  height="48"
                  clipPath="url(#avatarFaceClip)"
                  preserveAspectRatio="xMidYMid slice"
                />
              )}

              {/* DEFAULT HAIR & FACIAL FEATURES (Rendered if no custom face) */}
              {!userFaceImage && (
                <g>
                  {/* Eyebrows */}
                  <path d="M 146 66 Q 150 64 153 66" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 161 66 Q 164 64 168 66" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
                  
                  {/* Eyes */}
                  <ellipse cx="150" cy="72" rx="2.5" ry="3" fill="#1c1917" />
                  <circle cx="151" cy="71" r="0.8" fill="#ffffff" />
                  <ellipse cx="164" cy="72" rx="2.5" ry="3" fill="#1c1917" />
                  <circle cx="165" cy="71" r="0.8" fill="#ffffff" />

                  {/* Blush */}
                  <circle cx="146" cy="79" r="4" fill="#fda4af" opacity="0.5" />
                  <circle cx="168" cy="79" r="4" fill="#fda4af" opacity="0.5" />

                  {/* Smile / Lips */}
                  <path d="M 154 84 Q 157 87 160 84" stroke="#e11d48" strokeWidth="1.8" strokeLinecap="round" fill="none" />

                  {/* Hair bun / styles */}
                  {modelGender === 'nu' ? (
                    // Elegant traditional female updo bun
                    <g>
                      <path d="M 137 68 Q 157 42 177 68 Q 167 52 137 68 Z" fill="#1c1917" />
                      <ellipse cx="157" cy="46" rx="14" ry="12" fill="#1c1917" />
                      {/* Jade hair pin (Trâm cài tóc) */}
                      <line x1="145" y1="42" x2="175" y2="40" stroke="#fcd34d" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="145" cy="42" r="3" fill="#10b981" />
                    </g>
                  ) : modelGender === 'nam' ? (
                    // Neat scholar haircut
                    <path d="M 136 68 Q 157 46 178 68 Q 170 54 136 68 Z" fill="#1c1917" />
                  ) : (
                    // Chibi adorable twin buns
                    <g>
                      <circle cx="132" cy="46" r="11" fill="#1c1917" />
                      <circle cx="182" cy="46" r="11" fill="#1c1917" />
                      <circle cx="132" cy="52" r="4" fill="#f43f5e" />
                      <circle cx="182" cy="52" r="4" fill="#f43f5e" />
                    </g>
                  )}
                </g>
              )}
            </g>

            {/* 6. HEADWEAR ACCESSORY OVERLAY */}
            <g id="headwear-layer" filter="url(#softShadow)">
              {headwear.id === 'khan_dong_gam' ? (
                // Traditional Turban (Khăn đóng gấm chữ Nhân)
                <g>
                  {/* Folded layers */}
                  <ellipse cx="157" cy="54" rx="23" ry="12" fill="#1e3a8a" />
                  <path d="M 135 55 Q 157 46 179 55 L 180 62 Q 157 52 134 62 Z" fill="#172554" />
                  <path d="M 136 50 Q 157 42 178 50" stroke="#fcd34d" strokeWidth="1" strokeDasharray="3 2" />
                  {/* Chữ Nhân crease in middle */}
                  <path d="M 153 58 L 157 54 L 161 58" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.7" fill="none" />
                </g>
              ) : headwear.id === 'non_quai_thao' ? (
                // Nón quai thao (Kinh Bắc round broad hat)
                <g>
                  {/* Big round flat rim tilted elegantly behind head */}
                  <ellipse cx="157" cy="40" rx="68" ry="18" fill="#d97706" stroke="#92400e" strokeWidth="2" />
                  <ellipse cx="157" cy="40" rx="55" ry="14" fill="#f59e0b" />
                  <ellipse cx="157" cy="40" rx="30" ry="8" fill="#b45309" />
                  {/* Quai thao lụa buông dài */}
                  <path d="M 115 45 Q 125 105 138 140" stroke="#f43f5e" strokeWidth="3" fill="none" />
                  <path d="M 199 45 Q 189 105 176 140" stroke="#f43f5e" strokeWidth="3" fill="none" />
                </g>
              ) : headwear.id === 'man_dinh_ngoc' ? (
                // Modern pearl-studded headpiece (Mấn ngọc)
                <g>
                  <ellipse cx="157" cy="50" rx="22" ry="13" fill="#e11d48" />
                  <ellipse cx="157" cy="48" rx="20" ry="11" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="2 3" />
                  <circle cx="157" cy="43" r="3.5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5" />
                </g>
              ) : headwear.id === 'mu_noi_beret_genz' ? (
                // Beret Gen Z hat tilted sideways
                <g>
                  <path d="M 132 55 Q 145 32 182 46 Q 180 62 144 65 Z" fill="#374151" />
                  <circle cx="160" cy="38" r="2" fill="#1f2937" />
                </g>
              ) : headwear.id === 'kinh_ram_matrix_retro' ? (
                // Y2K oval dark sunglasses
                <g>
                  <line x1="145" y1="71" x2="169" y2="71" stroke="#cbd5e1" strokeWidth="1" />
                  <ellipse cx="149" cy="72" rx="7" ry="4.5" fill="#09090b" stroke="#94a3b8" strokeWidth="1" />
                  <ellipse cx="165" cy="72" rx="7" ry="4.5" fill="#09090b" stroke="#94a3b8" strokeWidth="1" />
                </g>
              ) : headwear.id === 'khan_ran_nam_bo' ? (
                // Southern Vietnam Checkered scarf wrapped on shoulders
                <g>
                  <path d="M 132 118 Q 157 138 182 118 L 186 132 Q 157 152 128 132 Z" fill="#e2e8f0" />
                  {/* Black check pattern */}
                  <path d="M 138 122 L 140 134 M 148 126 L 150 138 M 158 128 L 160 140 M 168 126 L 170 138" stroke="#1e293b" strokeWidth="2.5" />
                  {/* Hanging tails */}
                  <path d="M 132 130 L 126 210 L 136 210 L 140 132 Z" fill="#e2e8f0" />
                  <path d="M 126 145 L 138 145 M 126 165 L 138 165 M 126 185 L 138 185" stroke="#1e293b" strokeWidth="2" />
                </g>
              ) : null}
            </g>
          </svg>
        </div>

        {/* Floating Quick Info Pill on Bottom-Left */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs p-3 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md text-xs shadow-lg z-20">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-semibold text-rose-400 truncate">{garment.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {garment.dynastyEra.split('(')[0]}
            </span>
          </div>
          <p className="text-slate-400 text-[11px] line-clamp-2 leading-relaxed">
            {garment.shortDesc}
          </p>
        </div>

        {/* Background Switcher Floating Buttons on Top-Right */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-20">
          <div className="text-[10px] text-slate-400 font-medium px-1 text-right">Bối cảnh:</div>
          {Object.entries(bgStyles).map(([key, bg]) => (
            <button
              key={key}
              onClick={() => onBgChange(key)}
              className={`px-2.5 py-1 text-[11px] rounded-lg border transition-all text-right font-medium ${
                backgroundTheme === key
                  ? 'bg-rose-500/20 border-rose-500 text-rose-200 shadow-sm'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {bg.name}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Bar: Quick Summary of Outfit Layers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-950/80 border-t border-slate-800 text-xs">
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: color.hex }} />
          <div className="truncate">
            <div className="text-[10px] text-slate-500">Màu sắc</div>
            <div className="font-medium text-slate-200 truncate">{color.name}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
          <div className="truncate">
            <div className="text-[10px] text-slate-500">Phần dưới</div>
            <div className="font-medium text-slate-200 truncate">{bottom.name}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
          <div className="truncate">
            <div className="text-[10px] text-slate-500">Phụ kiện đầu</div>
            <div className="font-medium text-slate-200 truncate">{headwear.name}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <div className="truncate">
            <div className="text-[10px] text-slate-500">Giày & Cầm tay</div>
            <div className="font-medium text-slate-200 truncate">{footwear.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
