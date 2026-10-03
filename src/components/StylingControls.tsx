import React, { useState } from 'react';
import {
  GarmentType,
  AccessoryItem,
  ColorOption,
  EventScenario,
  WeatherCondition,
  RemixStyle,
  GARMENT_DATABASE,
  BOTTOMS_DATABASE,
  HEADWEAR_DATABASE,
  FOOTWEAR_DATABASE,
  HANDHELD_DATABASE,
  CULTURAL_COLORS,
  EVENT_SCENARIOS,
  WEATHER_CONDITIONS,
  REMIX_STYLES
} from '../data/vietPhucData';
import { 
  Sparkles, 
  Dices, 
  Layers, 
  Palette, 
  Calendar, 
  CloudSun, 
  Zap, 
  Sliders, 
  Check, 
  Info,
  ChevronRight
} from 'lucide-react';

interface StylingControlsProps {
  selectedGarment: GarmentType;
  onSelectGarment: (garment: GarmentType) => void;
  selectedColor: ColorOption;
  onSelectColor: (color: ColorOption) => void;
  selectedBottom: AccessoryItem;
  onSelectBottom: (item: AccessoryItem) => void;
  selectedHeadwear: AccessoryItem;
  onSelectHeadwear: (item: AccessoryItem) => void;
  selectedFootwear: AccessoryItem;
  onSelectFootwear: (item: AccessoryItem) => void;
  selectedHandheld: AccessoryItem;
  onSelectHandheld: (item: AccessoryItem) => void;
  selectedEvent: EventScenario;
  onSelectEvent: (event: EventScenario) => void;
  selectedWeather: WeatherCondition;
  onSelectWeather: (weather: WeatherCondition) => void;
  selectedStyle: RemixStyle;
  onSelectStyle: (style: RemixStyle) => void;
  onRandomLucky: () => void;
}

export const StylingControls: React.FC<StylingControlsProps> = ({
  selectedGarment,
  onSelectGarment,
  selectedColor,
  onSelectColor,
  selectedBottom,
  onSelectBottom,
  selectedHeadwear,
  onSelectHeadwear,
  selectedFootwear,
  onSelectFootwear,
  selectedHandheld,
  onSelectHandheld,
  selectedEvent,
  onSelectEvent,
  selectedWeather,
  onSelectWeather,
  selectedStyle,
  onSelectStyle,
  onRandomLucky
}) => {
  const [activeTab, setActiveTab] = useState<'garment' | 'accessories' | 'event_weather' | 'style'>('garment');
  const [garmentCategoryFilter, setGarmentCategoryFilter] = useState<'all' | 'cung_dinh' | 'dan_gian' | 'giao_thoi'>('all');

  const filteredGarments = garmentCategoryFilter === 'all'
    ? GARMENT_DATABASE
    : GARMENT_DATABASE.filter(g => g.category === garmentCategoryFilter);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl flex flex-col gap-6">
      {/* Top Header with Tab Switcher & Lucky Randomizer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/20">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-serif-culture tracking-wide">
              Xưởng Phối Trang Phục
            </h2>
            <p className="text-xs text-slate-400">Chọn từng tầng y phục & bối cảnh truyền thống</p>
          </div>
        </div>

        {/* Lucky Randomize Button */}
        <button
          onClick={onRandomLucky}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Dices className="w-4 h-4 animate-spin-slow" />
          <span>Phối Ngẫu Nhiên Gen Z</span>
        </button>
      </div>

      {/* Main Mode Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800/80">
        <button
          onClick={() => setActiveTab('garment')}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'garment'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>1. Chọn Áo & Màu</span>
        </button>

        <button
          onClick={() => setActiveTab('accessories')}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'accessories'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>2. Phụ Kiện & Quần</span>
        </button>

        <button
          onClick={() => setActiveTab('event_weather')}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'event_weather'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>3. Sự Kiện & Thời Tiết</span>
        </button>

        <button
          onClick={() => setActiveTab('style')}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'style'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>4. Phong Cách Remix</span>
        </button>
      </div>

      {/* TAB 1: GARMENT & COLOR SELECTION */}
      {activeTab === 'garment' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">Nhóm Trang Phục:</label>
              <span className="text-[11px] text-slate-500">{filteredGarments.length} loại y phục</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Tất Cả' },
                { id: 'giao_thoi', label: 'Triều Nguyễn & Cận Đại' },
                { id: 'cung_dinh', label: 'Cung Đình & Cổ Phong' },
                { id: 'dan_gian', label: 'Dân Gian & Nam Bộ' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setGarmentCategoryFilter(cat.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    garmentCategoryFilter === cat.id
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Garment Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
            {filteredGarments.map((g) => {
              const isSelected = selectedGarment.id === g.id;
              return (
                <div
                  key={g.id}
                  onClick={() => onSelectGarment(g)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-rose-950/40 border-rose-500/80 shadow-md shadow-rose-950/40 ring-1 ring-rose-500/50'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-xs font-bold text-white font-serif-culture">
                        {g.name}
                      </h4>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">{g.hanTu}</span>
                      )}
                    </div>
                    <div className="text-[10px] text-amber-400/90 font-medium mb-1.5">
                      {g.dynastyEra}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {g.shortDesc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t border-slate-800/60">
                    {g.tags.map((tag, idx) => (
                      <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Color Palette Selector */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <label className="text-xs font-semibold text-slate-200">Sắc Màu Ngũ Hành Cổ Truyền:</label>
                <div className="text-[11px] text-slate-400">Chọn màu sắc chủ đạo của tà áo</div>
              </div>
              <div className="text-xs font-bold text-rose-400">
                {selectedColor.name} ({selectedColor.element})
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {CULTURAL_COLORS.map((col) => {
                const isSelected = selectedColor.hex === col.hex;
                return (
                  <button
                    key={col.hex}
                    onClick={() => onSelectColor(col)}
                    className={`group relative flex flex-col items-center p-2 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-slate-800 border-rose-500 ring-2 ring-rose-500/30 scale-105'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border border-white/20 shadow-md flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: col.hex }}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                    </div>
                    <span className="text-[10px] text-slate-300 font-medium truncate w-full text-center mt-1.5">
                      {col.element}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACCESSORIES & LAYERS */}
      {activeTab === 'accessories' && (
        <div className="space-y-6 max-h-[480px] overflow-y-auto pr-1">
          {/* Bottoms */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">Phần Dưới (Quần / Chân Váy):</label>
              <span className="text-[11px] text-slate-400">{selectedBottom.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BOTTOMS_DATABASE.map(item => {
                const isSelected = selectedBottom.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectBottom(item)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-rose-950/30 border-rose-500 text-white ring-1 ring-rose-500/50'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{item.name}</span>
                        {item.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-amber-400 border border-amber-500/30">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{item.description}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Headwear */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">Phụ Kiện Đầu & Tóc (Khăn / Nón / Mấn):</label>
              <span className="text-[11px] text-slate-400">{selectedHeadwear.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {HEADWEAR_DATABASE.map(item => {
                const isSelected = selectedHeadwear.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectHeadwear(item)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-rose-950/30 border-rose-500 text-white ring-1 ring-rose-500/50'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{item.name}</span>
                        {item.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-sky-400 border border-sky-500/30">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{item.description}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footwear */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">Giày Dép (Guốc Mộc / Sneaker / Hài):</label>
              <span className="text-[11px] text-slate-400">{selectedFootwear.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FOOTWEAR_DATABASE.map(item => {
                const isSelected = selectedFootwear.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectFootwear(item)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-rose-950/30 border-rose-500 text-white ring-1 ring-rose-500/50'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{item.name}</span>
                        {item.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-emerald-400 border border-emerald-500/30">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{item.description}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Handheld accessories */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">Phụ Kiện Cầm Tay (Quạt / Túi / Thẻ Bài):</label>
              <span className="text-[11px] text-slate-400">{selectedHandheld.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {HANDHELD_DATABASE.map(item => {
                const isSelected = selectedHandheld.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectHandheld(item)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-rose-950/30 border-rose-500 text-white ring-1 ring-rose-500/50'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{item.name}</span>
                        {item.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-purple-400 border border-purple-500/30">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{item.description}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EVENT & WEATHER ADVISOR */}
      {activeTab === 'event_weather' && (
        <div className="space-y-6 max-h-[480px] overflow-y-auto pr-1">
          {/* Event scenarios */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">Bối Cảnh / Sự Kiện Sử Dụng:</label>
              <span className="text-[11px] text-rose-400 font-semibold">{selectedEvent.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EVENT_SCENARIOS.map(evt => {
                const isSelected = selectedEvent.id === evt.id;
                return (
                  <div
                    key={evt.id}
                    onClick={() => onSelectEvent(evt)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-rose-950/40 border-rose-500 shadow-md ring-1 ring-rose-500/50'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4 className="text-xs font-bold text-white">{evt.name}</h4>
                        {isSelected && <Check className="w-4 h-4 text-rose-400" />}
                      </div>
                      <div className="text-[10px] text-amber-400 mb-1">{evt.subtitle}</div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{evt.description}</p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] text-emerald-300">
                      💡 {evt.dresscodeGuide}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weather condition */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">Thời Tiết & Khí Hậu:</label>
              <span className="text-[11px] text-amber-400 font-semibold">{selectedWeather.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {WEATHER_CONDITIONS.map(w => {
                const isSelected = selectedWeather.id === w.id;
                return (
                  <div
                    key={w.id}
                    onClick={() => onSelectWeather(w)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-500 ring-1 ring-amber-500/50'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-white">{w.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300">
                        {w.tempRange}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{w.description}</p>
                    <div className="mt-2 text-[10px] text-amber-300 font-medium">
                      {w.fabricAdvice}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REMIX STYLE PRESETS */}
      {activeTab === 'style' && (
        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
          <div className="text-xs text-slate-400 leading-relaxed">
            Chọn định hướng phối đồ Gen Z để tự động đồng bộ hóa các lớp phụ kiện và tinh thần thời trang:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {REMIX_STYLES.map(st => {
              const isSelected = selectedStyle.id === st.id;
              return (
                <div
                  key={st.id}
                  onClick={() => onSelectStyle(st)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-rose-950/60 to-purple-950/60 border-rose-500 shadow-xl ring-1 ring-rose-500/60'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div>
                        <h4 className="text-sm font-bold text-white">{st.name}</h4>
                        <div className="text-[10px] text-rose-400 font-mono">{st.englishTitle}</div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-amber-300 font-medium italic my-1.5">
                      "{st.tagline}"
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                      {st.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {st.keyElements.map((el, idx) => (
                        <span key={idx} className="text-[9px] px-2 py-0.5 rounded-full bg-slate-900/90 text-slate-300 border border-slate-700">
                          {el}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 italic">
                    💡 Triết lý: {st.philosophy}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
