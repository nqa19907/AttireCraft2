import React, { useState } from 'react';
import { 
  EVENT_SCENARIOS, 
  WEATHER_CONDITIONS, 
  GARMENT_DATABASE, 
  BOTTOMS_DATABASE, 
  HEADWEAR_DATABASE, 
  FOOTWEAR_DATABASE, 
  HANDHELD_DATABASE, 
  CULTURAL_COLORS,
  REMIX_STYLES,
  GarmentType,
  AccessoryItem,
  ColorOption,
  EventScenario,
  WeatherCondition,
  RemixStyle
} from '../data/vietPhucData';
import { 
  X, 
  Sparkles, 
  Compass, 
  Sun, 
  Wind, 
  Calendar, 
  ArrowRight,
  CheckCircle2,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SmartStylistAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyOutfit: (outfit: {
    garment: GarmentType;
    color: ColorOption;
    bottom: AccessoryItem;
    headwear: AccessoryItem;
    footwear: AccessoryItem;
    handheld: AccessoryItem;
    event: EventScenario;
    weather: WeatherCondition;
    style: RemixStyle;
  }) => void;
}

export const SmartStylistAIModal: React.FC<SmartStylistAIModalProps> = ({
  isOpen,
  onClose,
  onApplyOutfit
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>('ky_yeu');
  const [selectedWeatherId, setSelectedWeatherId] = useState<string>('se_lanh');
  const [selectedVibe, setSelectedVibe] = useState<'streetwear' | 'vintage' | 'minimal' | 'cyber'>('streetwear');

  if (!isOpen) return null;

  // Compute smart recommendation
  const computeRecommendation = () => {
    let garment = GARMENT_DATABASE[0]; // Áo ngũ thân
    let color = CULTURAL_COLORS[0]; // Red
    let bottom = BOTTOMS_DATABASE[0];
    let headwear = HEADWEAR_DATABASE[0];
    let footwear = FOOTWEAR_DATABASE[0];
    let handheld = HANDHELD_DATABASE[0];
    let style = REMIX_STYLES[0];

    // Logic based on Event
    if (selectedEventId === 'ky_yeu') {
      garment = GARMENT_DATABASE.find(g => g.id === 'ngu_than_tay_chen') || GARMENT_DATABASE[0];
      color = CULTURAL_COLORS.find(c => c.hex === '#1e3a8a') || CULTURAL_COLORS[2]; // Xanh chàm nho sinh
      bottom = BOTTOMS_DATABASE.find(b => b.id === 'quan_lua_trang_suong') || BOTTOMS_DATABASE[0];
      footwear = FOOTWEAR_DATABASE.find(f => f.id === 'chunky_sneaker_trang') || FOOTWEAR_DATABASE[1];
      headwear = HEADWEAR_DATABASE.find(h => h.id === 'khan_dong_gam') || HEADWEAR_DATABASE[0];
      handheld = HANDHELD_DATABASE.find(h => h.id === 'quat_lua_de_tho') || HANDHELD_DATABASE[0];
      style = REMIX_STYLES[0];
    } else if (selectedEventId === 'tet_xuan') {
      garment = GARMENT_DATABASE.find(g => g.id === 'ao_tac') || GARMENT_DATABASE[1];
      color = CULTURAL_COLORS.find(c => c.hex === '#b91c1c') || CULTURAL_COLORS[0]; // Đỏ thắm
      bottom = BOTTOMS_DATABASE.find(b => b.id === 'quan_lua_trang_suong') || BOTTOMS_DATABASE[0];
      footwear = FOOTWEAR_DATABASE.find(f => f.id === 'guoc_moc_quai_nhung') || FOOTWEAR_DATABASE[0];
      headwear = HEADWEAR_DATABASE.find(h => h.id === 'man_dinh_ngoc') || HEADWEAR_DATABASE[2];
      handheld = HANDHELD_DATABASE.find(h => h.id === 'tui_coi_thu_cong') || HANDHELD_DATABASE[1];
      style = REMIX_STYLES[1];
    } else if (selectedEventId === 'dao_pho') {
      garment = GARMENT_DATABASE.find(g => g.id === 'ao_ba_ba') || GARMENT_DATABASE[5];
      color = CULTURAL_COLORS.find(c => c.hex === '#eab308') || CULTURAL_COLORS[1]; // Vàng rực rỡ
      bottom = BOTTOMS_DATABASE.find(b => b.id === 'quan_jeans_baggy_genz') || BOTTOMS_DATABASE[1];
      footwear = FOOTWEAR_DATABASE.find(f => f.id === 'chunky_sneaker_trang') || FOOTWEAR_DATABASE[1];
      headwear = HEADWEAR_DATABASE.find(h => h.id === 'khan_ran_nam_bo') || HEADWEAR_DATABASE[5];
      handheld = HANDHELD_DATABASE.find(h => h.id === 'tui_bao_tu_streetwear') || HANDHELD_DATABASE[2];
      style = REMIX_STYLES[0];
    } else if (selectedEventId === 'hoi_truong') {
      garment = GARMENT_DATABASE.find(g => g.id === 'nhat_binh') || GARMENT_DATABASE[2];
      color = CULTURAL_COLORS.find(c => c.hex === '#b91c1c') || CULTURAL_COLORS[0];
      bottom = BOTTOMS_DATABASE.find(b => b.id === 'chan_vay_xep_ly_midi') || BOTTOMS_DATABASE[2];
      footwear = FOOTWEAR_DATABASE.find(f => f.id === 'hai_theu_sen_chop_cong') || FOOTWEAR_DATABASE[2];
      headwear = HEADWEAR_DATABASE.find(h => h.id === 'man_dinh_ngoc') || HEADWEAR_DATABASE[2];
      handheld = HANDHELD_DATABASE.find(h => h.id === 'the_bai_khac_co_tu') || HANDHELD_DATABASE[3];
      style = REMIX_STYLES[3];
    } else if (selectedEventId === 'di_chua') {
      garment = GARMENT_DATABASE.find(g => g.id === 'ao_tac') || GARMENT_DATABASE[1];
      color = CULTURAL_COLORS.find(c => c.hex === '#18181b') || CULTURAL_COLORS[5];
      bottom = BOTTOMS_DATABASE.find(b => b.id === 'quan_den_ong_rong') || BOTTOMS_DATABASE[3];
      footwear = FOOTWEAR_DATABASE.find(f => f.id === 'loafer_da_co_dien') || FOOTWEAR_DATABASE[3];
      headwear = HEADWEAR_DATABASE.find(h => h.id === 'khan_dong_gam') || HEADWEAR_DATABASE[0];
      handheld = HANDHELD_DATABASE.find(h => h.id === 'quat_lua_de_tho') || HANDHELD_DATABASE[0];
      style = REMIX_STYLES[2];
    } else {
      garment = GARMENT_DATABASE.find(g => g.id === 'giao_linh') || GARMENT_DATABASE[3];
      color = CULTURAL_COLORS.find(c => c.hex === '#059669') || CULTURAL_COLORS[3];
      bottom = BOTTOMS_DATABASE.find(b => b.id === 'quan_lua_trang_suong') || BOTTOMS_DATABASE[0];
      footwear = FOOTWEAR_DATABASE.find(f => f.id === 'loafer_da_co_dien') || FOOTWEAR_DATABASE[3];
      headwear = HEADWEAR_DATABASE.find(h => h.id === 'khan_dong_gam') || HEADWEAR_DATABASE[0];
      handheld = HANDHELD_DATABASE.find(h => h.id === 'quat_lua_de_tho') || HANDHELD_DATABASE[0];
      style = REMIX_STYLES[1];
    }

    const event = EVENT_SCENARIOS.find(e => e.id === selectedEventId) || EVENT_SCENARIOS[0];
    const weather = WEATHER_CONDITIONS.find(w => w.id === selectedWeatherId) || WEATHER_CONDITIONS[0];

    return { garment, color, bottom, headwear, footwear, handheld, event, weather, style };
  };

  const recommendation = computeRecommendation();

  const handleApply = () => {
    onApplyOutfit(recommendation);
    confetti({ particleCount: 60, spread: 60 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-md shadow-rose-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-serif-culture">
                Smart Stylist: Gợi Ý Theo Thời Tiết & Sự Kiện
              </h2>
              <p className="text-xs text-slate-400">
                Tự động đề xuất tổ hợp trang phục hài hòa văn hóa và khí hậu thời tiết
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

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Event selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              1. Bạn chuẩn bị tham gia sự kiện nào?
            </label>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-rose-500"
            >
              {EVENT_SCENARIOS.map(e => (
                <option key={e.id} value={e.id}>{e.name} - {e.subtitle}</option>
              ))}
            </select>
          </div>

          {/* Weather selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              2. Dự báo thời tiết ngày hôm đó?
            </label>
            <select
              value={selectedWeatherId}
              onChange={(e) => setSelectedWeatherId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-rose-500"
            >
              {WEATHER_CONDITIONS.map(w => (
                <option key={w.id} value={w.id}>{w.name} ({w.tempRange})</option>
              ))}
            </select>
          </div>
        </div>

        {/* AI Stylist Recommendation Result */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/40 border border-rose-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Bản Phối Đề Xuất Tối Ưu
            </span>
            <span className="text-xs text-amber-400 font-medium">
              Định hướng: {recommendation.style.name}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white font-serif-culture">
            {recommendation.garment.name} • {recommendation.color.name}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-500">Phần Dưới</div>
              <div className="font-semibold text-slate-200 truncate">{recommendation.bottom.name}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-500">Đầu & Tóc</div>
              <div className="font-semibold text-slate-200 truncate">{recommendation.headwear.name}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-500">Giày Dép</div>
              <div className="font-semibold text-slate-200 truncate">{recommendation.footwear.name}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-500">Phụ Kiện Cầm Tay</div>
              <div className="font-semibold text-slate-200 truncate">{recommendation.handheld.name}</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1.5 leading-relaxed">
            <div>
              💡 <strong>Lý do chọn trang phục:</strong> {recommendation.event.dresscodeGuide}
            </div>
            <div className="text-amber-300">
              ☀️ <strong>Lời khuyên thời tiết ({recommendation.weather.tempRange}):</strong> {recommendation.weather.fabricAdvice}
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={handleApply}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
          >
            <span>Áp Dụng Bản Phối Này Lên Phòng Thử Đồ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
