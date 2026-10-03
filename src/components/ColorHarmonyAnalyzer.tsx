import React from 'react';
import { ColorOption } from '../data/vietPhucData';
import { Sparkles, CheckCircle2, Info, Compass, Flame, Droplets, Trees, Mountain, Shield } from 'lucide-react';

interface ColorHarmonyAnalyzerProps {
  color: ColorOption;
  bottomColorHex?: string;
}

export const ColorHarmonyAnalyzer: React.FC<ColorHarmonyAnalyzerProps> = ({
  color,
  bottomColorHex = '#fafafa'
}) => {
  // Elements metadata
  const elementIcons: Record<string, { label: string; icon: React.ReactNode; color: string; desc: string }> = {
    Kim: {
      label: 'Hành Kim',
      icon: <Shield className="w-4 h-4 text-slate-200" />,
      color: 'from-slate-300 to-slate-500',
      desc: 'Kim đại diện cho sự thanh khiết, cương trực và tinh tế.'
    },
    Moc: {
      label: 'Hành Mộc',
      icon: <Trees className="w-4 h-4 text-emerald-400" />,
      color: 'from-emerald-400 to-teal-600',
      desc: 'Mộc tượng trưng cho sự sinh sôi, tươi trẻ và sức sống mùa xuân.'
    },
    Thuy: {
      label: 'Hành Thủy',
      icon: <Droplets className="w-4 h-4 text-blue-400" />,
      color: 'from-blue-400 to-indigo-600',
      desc: 'Thủy biểu trưng cho trí tuệ sâu sắc, linh hoạt và hòa hợp.'
    },
    Hoa: {
      label: 'Hành Hỏa',
      icon: <Flame className="w-4 h-4 text-rose-500" />,
      color: 'from-rose-400 to-red-600',
      desc: 'Hỏa mang năng lượng nhiệt huyết, may mắn, hỷ sự và vượng khí.'
    },
    Tho: {
      label: 'Hành Thổ',
      icon: <Mountain className="w-4 h-4 text-amber-500" />,
      color: 'from-amber-400 to-yellow-600',
      desc: 'Thổ là trung tâm vững chãi, dung dưỡng muôn vật và thịnh vượng.'
    }
  };

  const currentElement = elementIcons[color.element] || elementIcons.Hoa;

  // Harmony calculation
  // Let's compute a harmony score based on the color properties and classic Vietnamese aesthetics
  const getHarmonyScore = () => {
    switch (color.element) {
      case 'Hoa':
        return 96; // Hỏa rực rỡ, may mắn hỷ sự
      case 'Tho':
        return 94; // Hoàng kim quý phái
      case 'Thuy':
        return 92; // Trí thức nho sinh
      case 'Moc':
        return 90; // Thanh xuân tao nhã
      case 'Kim':
        return 95; // Liêm khiết chuẩn mực
      default:
        return 88;
    }
  };

  const harmonyScore = getHarmonyScore();

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Kiểm Tra Hòa Sắc & Ngũ Hành</h3>
            <p className="text-xs text-slate-400">Đánh giá độ tương hợp văn hóa & thị giác</p>
          </div>
        </div>

        {/* Harmony Score Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{harmonyScore}% Hòa Hợp</span>
        </div>
      </div>

      {/* Main Element & Palette Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Color preview card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div 
            className="w-12 h-12 rounded-xl border border-white/20 shadow-md shrink-0 flex items-center justify-center"
            style={{ backgroundColor: color.hex }}
          >
            <div className="w-3 h-3 rounded-full bg-white/40 shadow-inner" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">{color.name}</div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <span>Mã màu: {color.hex}</span>
              <span>•</span>
              <span className="capitalize">{color.contrastCategory === 'warm' ? 'Tông ấm' : color.contrastCategory === 'cool' ? 'Tông lạnh' : 'Trung tính'}</span>
            </div>
          </div>
        </div>

        {/* Ngũ hành element badge */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 shrink-0">
            {currentElement.icon}
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <span>{currentElement.label}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                Ngũ sắc cổ truyền
              </span>
            </div>
            <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
              {currentElement.desc}
            </div>
          </div>
        </div>
      </div>

      {/* Meaning & Advice */}
      <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/70 text-xs text-slate-300 space-y-2">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-amber-300">Ý nghĩa văn hóa: </strong>
            {color.culturalStory}
          </p>
        </div>
        <div className="flex items-start gap-2 pt-1 border-t border-slate-800/60">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed text-slate-300">
            <strong className="text-emerald-300">Gợi ý phối: </strong>
            {color.contrastCategory === 'warm'
              ? 'Tông màu ấm rất nổi bật trên nền ảnh phố cổ hoặc đình làng. Kết hợp cùng quần trắng ngà tơ tằm hoặc chân váy midi xếp ly để cân bằng thị giác.'
              : 'Tông màu lạnh tạo phong thái trầm ổn, đĩnh đạc của nho sinh. Rất hợp cùng phụ kiện quạt lụa hoặc kính râm retro.'}
          </p>
        </div>
      </div>
    </div>
  );
};
