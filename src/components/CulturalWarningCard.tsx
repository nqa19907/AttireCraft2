import React from 'react';
import { 
  CulturalRule, 
  GarmentType, 
  AccessoryItem, 
  ColorOption,
  EventScenario 
} from '../data/vietPhucData';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CulturalWarningCardProps {
  garment: GarmentType;
  color: ColorOption;
  bottom: AccessoryItem;
  headwear: AccessoryItem;
  footwear: AccessoryItem;
  handheld: AccessoryItem;
  event: EventScenario;
  isReversedLapel: boolean;
  onFixLapel: () => void;
  onFixSuggestion: (type: 'bottom' | 'headwear' | 'footwear', fixId: string) => void;
}

export const CulturalWarningCard: React.FC<CulturalWarningCardProps> = ({
  garment,
  color,
  bottom,
  headwear,
  footwear,
  handheld,
  event,
  isReversedLapel,
  onFixLapel,
  onFixSuggestion
}) => {
  // Check active cultural issues
  const issues: Array<{
    id: string;
    title: string;
    severity: 'prohibition' | 'warning' | 'tip';
    message: string;
    historicalContext: string;
    fixAction?: () => void;
    fixLabel?: string;
  }> = [];

  // 1. Lapel direction violation (CRITICAL TABOO)
  if (isReversedLapel) {
    issues.push({
      id: 'lapel_reverse',
      title: 'CẢNH BÁO TRỌNG ĐẠI: Mặc ngược vạt áo (Tả Nhậm)',
      severity: 'prohibition',
      message: 'Vạt áo truyền thống Việt Nam bắt buộc vạt trái đè lên vạt phải (cài khuy bên mạn sườn phải). Việc mặc ngược vạt phải đè vạt trái là quy cách tang ma (khâm liệm) cho người đã khuất.',
      historicalContext: 'Phong tục Hữu Nhậm được quy định nghiêm ngặt từ thời Lý, Trần, Lê đến triều Nguyễn như chuẩn mực thể hiện sự sống, sự tôn nghiêm và điềm lành.',
      fixAction: onFixLapel,
      fixLabel: 'Sửa về Chuẩn Hữu Nhậm ngay'
    });
  }

  // 2. Temple & sacred space sacredness check
  if (event.id === 'di_chua' && (bottom.id === 'quan_jeans_baggy_genz' || headwear.id === 'kinh_ram_matrix_retro')) {
    issues.push({
      id: 'sacred_temple',
      title: 'Lưu ý chuẩn mực nơi đền miếu & tôn nghiêm',
      severity: 'warning',
      message: 'Không gian chùa chiền, đình làng cần sự thanh tịnh, tôn kính tuyệt đối. Phối kính râm đen hoặc quần jeans rách cá tính có thể gây phản cảm chốn tôn nghiêm.',
      historicalContext: 'Cổ nhân coi việc vào đền chùa là việc thành tâm hướng thiện, áo quần tề chỉnh, kín đáo là thước đo lòng thành.',
      fixAction: () => onFixSuggestion('bottom', 'quan_lua_trang_suong'),
      fixLabel: 'Đổi sang Quần Lụa Trắng trang nhã'
    });
  }

  // 3. Royal Court Nhat Binh clash
  if (garment.id === 'nhat_binh' && (bottom.id === 'quan_jeans_baggy_genz' || footwear.id === 'chunky_sneaker_trang')) {
    issues.push({
      id: 'nhat_binh_clash',
      title: 'Cân nhắc khi cách tân Áo Nhật Bình Cung Đình',
      severity: 'warning',
      message: 'Áo Nhật Bình nguyên là Triều phục quý tộc của bậc Hoàng hậu, Công chúa với hoa văn Bát bửu và phượng loan. Việc kết hợp với quần jeans rách hoặc giày sneaker quá hầm hố làm mất đi vẻ đài các hoàng cung.',
      historicalContext: 'Nhật Bình đòi hỏi sự trang nhã ở phần thân dưới (váy xếp ly hoặc quần lụa) để tôn vinh sự lộng lẫy của cổ áo thêu hoa văn ngũ hành.',
      fixAction: () => onFixSuggestion('bottom', 'chan_vay_xep_ly_midi'),
      fixLabel: 'Đổi sang Chân váy xếp ly quý phái'
    });
  }

  // 4. Mourning/gloomy black on Lunar New Year or Wedding
  if ((event.id === 'tet_xuan' || event.id === 'dam_cuoi') && color.hex === '#18181b') {
    issues.push({
      id: 'festive_black_color',
      title: 'Mẹo ngày vui: Ưu tiên sắc màu hoan hỷ',
      severity: 'tip',
      message: 'Dịp đầu năm mới hoặc ngày cưới bạn thân, người Việt thường kiêng mặc nguyên cây đen trầm buồn. Thử điểm xuyết hoặc đổi sang màu Đỏ chu sa, Vàng hoàng kim hoặc Hồng đào.',
      historicalContext: 'Màu đỏ và vàng là biểu trưng cho may mắn, thịnh vượng, mang lại nguồn năng lượng tích cực cho gia chủ.',
      fixLabel: 'Tham khảo đổi màu'
    });
  }

  // 5. Quan Ho Tu Than styling check
  if (garment.id === 'tu_than' && headwear.id === 'khan_dong_gam') {
    issues.push({
      id: 'tu_than_headwear',
      title: 'Gợi ý phong vị Kinh Bắc chuẩn nét',
      severity: 'tip',
      message: 'Khăn đóng gấm thường gắn liền với Áo ngũ thân. Khi diện Áo Tứ Thân Kinh Bắc, nón quai thao hoặc vấn tóc buông lơi sẽ giúp bạn toát lên trọn vẹn nét duyên mộc mạc quan họ.',
      historicalContext: 'Chiếc nón quai thao với quai thao lụa buông dài là linh hồn của các liền chị quan họ bên dòng sông Đuống.',
      fixAction: () => onFixSuggestion('headwear', 'non_quai_thao'),
      fixLabel: 'Đổi sang Nón Quai Thao Kinh Bắc'
    });
  }

  // If no issues, show green certified badge
  if (issues.length === 0) {
    return (
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-3xl p-5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 shrink-0 border border-emerald-500/40">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-emerald-300">Bảo Tồn Chuẩn Mực Văn Hóa</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                Đạt chứng nhận di sản
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Bản phối của bạn kết hợp khéo léo giữa tinh thần trẻ trung Gen Z và sự tôn trọng nghiêm cẩn đối với quy tắc cổ truyền ({garment.name} • {event.name}).
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {issues.map((issue) => (
        <div 
          key={issue.id}
          className={`border rounded-3xl p-4.5 backdrop-blur-xl transition-all ${
            issue.severity === 'prohibition'
              ? 'bg-rose-950/60 border-rose-500/60 shadow-lg shadow-rose-950/50'
              : issue.severity === 'warning'
              ? 'bg-amber-950/50 border-amber-500/50 shadow-md shadow-amber-950/30'
              : 'bg-blue-950/40 border-blue-500/40'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
              issue.severity === 'prohibition'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : issue.severity === 'warning'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            }`}>
              {issue.severity === 'prohibition' ? (
                <ShieldAlert className="w-4 h-4" />
              ) : issue.severity === 'warning' ? (
                <AlertTriangle className="w-4 h-4" />
              ) : (
                <BookOpen className="w-4 h-4" />
              )}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className={`text-xs font-bold ${
                  issue.severity === 'prohibition' ? 'text-rose-300' : issue.severity === 'warning' ? 'text-amber-300' : 'text-blue-300'
                }`}>
                  {issue.title}
                </h4>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  issue.severity === 'prohibition' 
                    ? 'bg-rose-500/20 text-rose-300' 
                    : issue.severity === 'warning' 
                    ? 'bg-amber-500/20 text-amber-300' 
                    : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {issue.severity === 'prohibition' ? 'Cấm kỵ cổ truyền' : issue.severity === 'warning' ? 'Lưu ý bối cảnh' : 'Mẹo gợi ý'}
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                {issue.message}
              </p>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
                <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-300">Gốc rễ lịch sử: </strong>
                  {issue.historicalContext}
                </span>
              </div>

              {issue.fixAction && (
                <button
                  onClick={issue.fixAction}
                  className={`mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    issue.severity === 'prohibition'
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30'
                      : 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/30'
                  }`}
                >
                  <span>{issue.fixLabel || 'Điều chỉnh phù hợp'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
