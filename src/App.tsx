import React, { useState } from 'react';
import { 
  GARMENT_DATABASE, 
  BOTTOMS_DATABASE, 
  HEADWEAR_DATABASE, 
  FOOTWEAR_DATABASE, 
  HANDHELD_DATABASE, 
  CULTURAL_COLORS, 
  EVENT_SCENARIOS, 
  WEATHER_CONDITIONS, 
  REMIX_STYLES,
  GarmentType,
  AccessoryItem,
  ColorOption,
  EventScenario,
  WeatherCondition,
  RemixStyle,
  PresetOutfit
} from './data/vietPhucData';
import { Navbar } from './components/Navbar';
import { AvatarVisualizer } from './components/AvatarVisualizer';
import { StylingControls } from './components/StylingControls';
import { ColorHarmonyAnalyzer } from './components/ColorHarmonyAnalyzer';
import { CulturalWarningCard } from './components/CulturalWarningCard';
import { CompareModal } from './components/CompareModal';
import { LookbookModal } from './components/LookbookModal';
import { SmartStylistAIModal } from './components/SmartStylistAIModal';
import { HeritageEncyclopedia } from './components/HeritageEncyclopedia';
import { 
  Sparkles, 
  Share2, 
  Bookmark, 
  BookOpen, 
  ShieldCheck, 
  Compass, 
  Zap, 
  Heart,
  ChevronRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  // Navigation View
  const [activeView, setActiveView] = useState<'studio' | 'encyclopedia' | 'lookbook'>('studio');

  // Active Outfit States
  const [selectedGarment, setSelectedGarment] = useState<GarmentType>(GARMENT_DATABASE[0]); // Áo ngũ thân tay chẽn
  const [selectedColor, setSelectedColor] = useState<ColorOption>(CULTURAL_COLORS[0]); // Đỏ Chu Sa
  const [selectedBottom, setSelectedBottom] = useState<AccessoryItem>(BOTTOMS_DATABASE[0]); // Quần lụa trắng
  const [selectedHeadwear, setSelectedHeadwear] = useState<AccessoryItem>(HEADWEAR_DATABASE[0]); // Khăn đóng gấm
  const [selectedFootwear, setSelectedFootwear] = useState<AccessoryItem>(FOOTWEAR_DATABASE[1]); // Chunky sneaker
  const [selectedHandheld, setSelectedHandheld] = useState<AccessoryItem>(HANDHELD_DATABASE[0]); // Quạt lụa
  const [selectedEvent, setSelectedEvent] = useState<EventScenario>(EVENT_SCENARIOS[0]); // Kỷ yếu
  const [selectedWeather, setSelectedWeather] = useState<WeatherCondition>(WEATHER_CONDITIONS[0]); // Nắng hè
  const [selectedStyle, setSelectedStyle] = useState<RemixStyle>(REMIX_STYLES[0]); // Gen Z Streetwear

  // Model & Environment States
  const [modelGender, setModelGender] = useState<'nu' | 'nam' | 'chibi'>('nu');
  const [backgroundTheme, setBackgroundTheme] = useState<string>('hoang_thanh');
  const [isReversedLapel, setIsReversedLapel] = useState<boolean>(false);
  const [userFaceImage, setUserFaceImage] = useState<string | null>(null);

  // Modals
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState<boolean>(false);
  const [isSmartStylistOpen, setIsSmartStylistOpen] = useState<boolean>(false);

  // Lucky Randomize Generator
  const handleRandomLucky = () => {
    const randomGarment = GARMENT_DATABASE[Math.floor(Math.random() * GARMENT_DATABASE.length)];
    const randomColor = CULTURAL_COLORS[Math.floor(Math.random() * CULTURAL_COLORS.length)];
    const randomBottom = BOTTOMS_DATABASE[Math.floor(Math.random() * BOTTOMS_DATABASE.length)];
    const randomHeadwear = HEADWEAR_DATABASE[Math.floor(Math.random() * HEADWEAR_DATABASE.length)];
    const randomFootwear = FOOTWEAR_DATABASE[Math.floor(Math.random() * FOOTWEAR_DATABASE.length)];
    const randomHandheld = HANDHELD_DATABASE[Math.floor(Math.random() * HANDHELD_DATABASE.length)];
    const randomEvent = EVENT_SCENARIOS[Math.floor(Math.random() * EVENT_SCENARIOS.length)];
    const randomStyle = REMIX_STYLES[Math.floor(Math.random() * REMIX_STYLES.length)];

    setSelectedGarment(randomGarment);
    setSelectedColor(randomColor);
    setSelectedBottom(randomBottom);
    setSelectedHeadwear(randomHeadwear);
    setSelectedFootwear(randomFootwear);
    setSelectedHandheld(randomHandheld);
    setSelectedEvent(randomEvent);
    setSelectedStyle(randomStyle);
    setIsReversedLapel(false);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  // Preset application from Lookbook
  const handleApplyPreset = (preset: PresetOutfit) => {
    const g = GARMENT_DATABASE.find(item => item.id === preset.garmentId);
    const col = CULTURAL_COLORS.find(c => c.hex === preset.colorHex) || CULTURAL_COLORS[0];
    const b = BOTTOMS_DATABASE.find(item => item.id === preset.bottomId);
    const h = HEADWEAR_DATABASE.find(item => item.id === preset.headwearId);
    const f = FOOTWEAR_DATABASE.find(item => item.id === preset.footwearId);
    const hand = HANDHELD_DATABASE.find(item => item.id === preset.handheldId);
    const evt = EVENT_SCENARIOS.find(item => item.id === preset.eventId);
    const st = REMIX_STYLES.find(item => item.id === preset.styleId);

    if (g) setSelectedGarment(g);
    setSelectedColor(col);
    if (b) setSelectedBottom(b);
    if (h) setSelectedHeadwear(h);
    if (f) setSelectedFootwear(f);
    if (hand) setSelectedHandheld(hand);
    if (evt) setSelectedEvent(evt);
    if (st) setSelectedStyle(st);
    setIsReversedLapel(false);
    setActiveView('studio');
  };

  // Smart Stylist Apply
  const handleApplySmartStylist = (outfit: {
    garment: GarmentType;
    color: ColorOption;
    bottom: AccessoryItem;
    headwear: AccessoryItem;
    footwear: AccessoryItem;
    handheld: AccessoryItem;
    event: EventScenario;
    weather: WeatherCondition;
    style: RemixStyle;
  }) => {
    setSelectedGarment(outfit.garment);
    setSelectedColor(outfit.color);
    setSelectedBottom(outfit.bottom);
    setSelectedHeadwear(outfit.headwear);
    setSelectedFootwear(outfit.footwear);
    setSelectedHandheld(outfit.handheld);
    setSelectedEvent(outfit.event);
    setSelectedWeather(outfit.weather);
    setSelectedStyle(outfit.style);
    setIsReversedLapel(false);
    setActiveView('studio');
  };

  // Cultural Warning fix handler
  const handleFixSuggestion = (type: 'bottom' | 'headwear' | 'footwear', fixId: string) => {
    if (type === 'bottom') {
      const target = BOTTOMS_DATABASE.find(b => b.id === fixId);
      if (target) setSelectedBottom(target);
    } else if (type === 'headwear') {
      const target = HEADWEAR_DATABASE.find(h => h.id === fixId);
      if (target) setSelectedHeadwear(target);
    } else if (type === 'footwear') {
      const target = FOOTWEAR_DATABASE.find(f => f.id === fixId);
      if (target) setSelectedFootwear(target);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d14] text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        onViewChange={(v) => {
          if (v === 'lookbook') {
            setIsLookbookOpen(true);
          } else {
            setActiveView(v);
          }
        }}
        onOpenSmartStylist={() => setIsSmartStylistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenLookbookModal={() => setIsLookbookOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeView === 'studio' && (
          <div className="space-y-6">
            {/* Hero Quick Banner for Gen Z Students */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/40 border border-slate-800 p-5 sm:p-6 backdrop-blur-xl">
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider font-mono">
                      Khám phá Di Sản & Thời Trang 2026
                    </span>
                    <span className="text-slate-400 text-xs hidden sm:inline">•</span>
                    <span className="text-xs text-amber-300 font-medium hidden sm:inline">
                      Dành cho Học Sinh, Sinh Viên & Tín đồ Cổ Phục
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white font-serif-culture">
                    Việt Phục Remix: Sáng Tạo Cùng Bản Sắc Dân Tộc
                  </h1>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    Tự do kết hợp các tầng áo truyền thống (Ngũ Thân, Áo Tấc, Nhật Bình, Tứ Thân...) với phụ kiện hiện đại, đồng thời kiểm tra chuẩn mực văn hóa và ý nghĩa ngũ hành ngũ sắc.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsSmartStylistOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white text-xs font-bold shadow-lg shadow-rose-600/20 hover:scale-105 transition-all cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Gợi Ý Theo Sự Kiện</span>
                  </button>
                  <button
                    onClick={() => setActiveView('encyclopedia')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Tra Cứu Văn Hóa</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Interactive Studio Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Visual Mockup Avatar Studio (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <AvatarVisualizer
                  garment={selectedGarment}
                  color={selectedColor}
                  bottom={selectedBottom}
                  headwear={selectedHeadwear}
                  footwear={selectedFootwear}
                  handheld={selectedHandheld}
                  modelGender={modelGender}
                  onGenderChange={setModelGender}
                  backgroundTheme={backgroundTheme}
                  onBgChange={setBackgroundTheme}
                  isReversedLapel={isReversedLapel}
                  onToggleLapel={() => setIsReversedLapel(prev => !prev)}
                  userFaceImage={userFaceImage}
                  onFaceUpload={setUserFaceImage}
                />

                {/* Cultural Appropriateness & Taboo Warnings Card */}
                <CulturalWarningCard
                  garment={selectedGarment}
                  color={selectedColor}
                  bottom={selectedBottom}
                  headwear={selectedHeadwear}
                  footwear={selectedFootwear}
                  handheld={selectedHandheld}
                  event={selectedEvent}
                  isReversedLapel={isReversedLapel}
                  onFixLapel={() => setIsReversedLapel(false)}
                  onFixSuggestion={handleFixSuggestion}
                />
              </div>

              {/* Right Column: Customization Controls & Color Harmony (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Styling Selection Hub */}
                <StylingControls
                  selectedGarment={selectedGarment}
                  onSelectGarment={setSelectedGarment}
                  selectedColor={selectedColor}
                  onSelectColor={setSelectedColor}
                  selectedBottom={selectedBottom}
                  onSelectBottom={setSelectedBottom}
                  selectedHeadwear={selectedHeadwear}
                  onSelectHeadwear={setSelectedHeadwear}
                  selectedFootwear={selectedFootwear}
                  onSelectFootwear={setSelectedFootwear}
                  selectedHandheld={selectedHandheld}
                  onSelectHandheld={setSelectedHandheld}
                  selectedEvent={selectedEvent}
                  onSelectEvent={setSelectedEvent}
                  selectedWeather={selectedWeather}
                  onSelectWeather={setSelectedWeather}
                  selectedStyle={selectedStyle}
                  onSelectStyle={setSelectedStyle}
                  onRandomLucky={handleRandomLucky}
                />

                {/* Color Harmony & Ngũ Hành Analyzer */}
                <ColorHarmonyAnalyzer
                  color={selectedColor}
                  bottomColorHex={selectedBottom.colorHex}
                />

                {/* Cultural Story / History Snippet for Selected Garment */}
                <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white font-serif-culture">
                          Ý Nghĩa & Gốc Tích: {selectedGarment.name}
                        </h3>
                        <p className="text-[11px] text-amber-400">{selectedGarment.dynastyEra}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveView('encyclopedia')}
                      className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Xem toàn văn</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedGarment.culturalMeaning}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    <div>
                      <strong className="text-slate-300">Hoàn cảnh nên mặc: </strong>
                      {selectedGarment.recommendedEvents.map(eId => {
                        const e = EVENT_SCENARIOS.find(x => x.id === eId);
                        return e ? e.name : eId;
                      }).join(', ')}
                    </div>
                    <div>
                      <strong className="text-slate-300">Nguyên tắc cốt lõi: </strong>
                      {selectedGarment.rulesOfWear[0]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Heritage Encyclopedia */}
        {activeView === 'encyclopedia' && (
          <HeritageEncyclopedia />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-950 border-t border-slate-800/80 py-6 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-rose-600 flex items-center justify-center text-white text-[10px] font-bold">
              VP
            </div>
            <span className="font-semibold text-slate-300">Việt Phục Remix • AttireCraft</span>
            <span>—</span>
            <span>Dự án bảo tồn & sáng tạo trang phục truyền thống Việt Nam</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>#VietPhucRemix</span>
            <span>#GenZDiSan</span>
            <span>#AoDai</span>
            <span>#AoNguThan</span>
            <span>#NhatBinh</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Comparison Modal (Classic vs Gen Z Remix) */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        currentOutfit={{
          garment: selectedGarment,
          color: selectedColor,
          bottom: selectedBottom,
          headwear: selectedHeadwear,
          footwear: selectedFootwear,
          handheld: selectedHandheld,
          event: selectedEvent
        }}
      />

      {/* 2. Lookbook Modal (Save & Export PNG) */}
      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        currentOutfit={{
          garment: selectedGarment,
          color: selectedColor,
          bottom: selectedBottom,
          headwear: selectedHeadwear,
          footwear: selectedFootwear,
          handheld: selectedHandheld,
          event: selectedEvent,
          style: selectedStyle
        }}
        onApplyPreset={handleApplyPreset}
      />

      {/* 3. Smart Stylist AI Scenario Modal */}
      <SmartStylistAIModal
        isOpen={isSmartStylistOpen}
        onClose={() => setIsSmartStylistOpen(false)}
        onApplyOutfit={handleApplySmartStylist}
      />
    </div>
  );
}
export default App;
