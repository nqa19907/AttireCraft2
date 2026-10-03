import React from 'react';
import { 
  GarmentType, 
  AccessoryItem, 
  ColorOption,
  EventScenario 
} from '../data/vietPhucData';
import { 
  X, 
  Sparkles, 
  Scale, 
  CheckCircle, 
  ArrowRight, 
  Eye,
  ShieldAlert,
  Zap,
  BookOpen
} from 'lucide-react';

interface CompareModalProps {
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
  };
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  currentOutfit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-serif-culture">
                So Sánh Phương Án Phối Đồ
              </h2>
              <p className="text-xs text-slate-400">
                Đối chiếu giữa Bản Phối Hiện Tại (Remix) và Bản Phối Chuẩn Mực Cổ Truyền
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

        {/* Side by side columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column A: User's Current Outfit */}
          <div className="bg-slate-950/70 border border-rose-500/40 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-bold text-xs">
                  Phương án 1: Bản Phối Của Bạn
                </span>
                <span className="text-xs text-slate-400">{currentOutfit.event.name}</span>
              </div>

              <h3 className="text-base font-bold text-white font-serif-culture mb-2">
                {currentOutfit.garment.name} ({currentOutfit.color.name})
              </h3>

              <div className="space-y-2 text-xs text-slate-300 my-4">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Tà áo chính:</span>
                  <span className="font-semibold text-rose-300">{currentOutfit.garment.name}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Phần dưới:</span>
                  <span className="font-semibold text-slate-200">{currentOutfit.bottom.name}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Đầu & Tóc:</span>
                  <span className="font-semibold text-slate-200">{currentOutfit.headwear.name}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Giày dép:</span>
                  <span className="font-semibold text-slate-200">{currentOutfit.footwear.name}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Cầm tay:</span>
                  <span className="font-semibold text-slate-200">{currentOutfit.handheld.name}</span>
                </div>
              </div>

              {/* Metrics Rating */}
              <div className="space-y-2 pt-2">
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Mức độ phá cách Gen Z:</span>
                  <span className="text-rose-400 font-bold">85 / 100</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '85%' }} />
                </div>

                <div className="text-[11px] text-slate-400 flex justify-between mt-2">
                  <span>Tính ứng dụng dạo phố / chụp ảnh:</span>
                  <span className="text-amber-400 font-bold">95 / 100</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              💡 <strong>Nhận xét:</strong> Phù hợp để thể hiện cá tính riêng, tạo dấu ấn thị giác độc đáo khi chụp ảnh kỷ yếu, đi cafe dạo phố.
            </div>
          </div>

          {/* Column B: Authentic Heritage Benchmark */}
          <div className="bg-slate-950/70 border border-emerald-500/40 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                  Phương án 2: Chuẩn Mực Cổ Truyền
                </span>
                <span className="text-xs text-slate-400">Điển lệ lịch sử</span>
              </div>

              <h3 className="text-base font-bold text-white font-serif-culture mb-2">
                {currentOutfit.garment.name} (Phong Thái Tràng An)
              </h3>

              <div className="space-y-2 text-xs text-slate-300 my-4">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Tà áo chính:</span>
                  <span className="font-semibold text-emerald-300">Cổ đứng 5 cúc cài khuy phải</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Phần dưới:</span>
                  <span className="font-semibold text-slate-200">Quần lụa trắng tơ tằm buông rủ</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Đầu & Tóc:</span>
                  <span className="font-semibold text-slate-200">Khăn đóng quấn nếp chữ Nhân</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Giày dép:</span>
                  <span className="font-semibold text-slate-200">Guốc mộc quai nhung / Hài gấm</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Cầm tay:</span>
                  <span className="font-semibold text-slate-200">Quạt lụa thêu hoa sen</span>
                </div>
              </div>

              {/* Metrics Rating */}
              <div className="space-y-2 pt-2">
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Độ bảo tồn giá trị di sản:</span>
                  <span className="text-emerald-400 font-bold">100 / 100</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                </div>

                <div className="text-[11px] text-slate-400 flex justify-between mt-2">
                  <span>Độ trang trọng nghi lễ:</span>
                  <span className="text-blue-400 font-bold">98 / 100</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '98%' }} />
                </div>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              💡 <strong>Nhận xét:</strong> Phương án tối ưu cho các dịp tế lễ tổ tiên, cúng bái đền chùa, đón tiếp khách quốc tế trang nghiêm.
            </div>
          </div>
        </div>

        {/* Footer info banner */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200 leading-relaxed">
            <strong>Thông điệp dự án:</strong> Cả hai phương án đều có vẻ đẹp riêng. Hiểu rõ quy chuẩn cổ truyền để khi "remix", thế hệ trẻ vẫn giữ trọn linh hồn và lòng tự tôn văn hóa dân tộc.
          </p>
        </div>
      </div>
    </div>
  );
};
