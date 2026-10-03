import React, { useState } from 'react';
import { GARMENT_DATABASE, GarmentType } from '../data/vietPhucData';
import { 
  BookOpen, 
  HelpCircle, 
  Award, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  ChevronRight, 
  Layers,
  History,
  ShieldCheck
} from 'lucide-react';

export const HeritageEncyclopedia: React.FC = () => {
  const [selectedGarment, setSelectedGarment] = useState<GarmentType>(GARMENT_DATABASE[0]);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);

  // Heritage Quiz Questions for youth & students
  const quizQuestions = [
    {
      question: '5 hạt cúc trên Áo Ngũ Thân truyền thống tượng trưng cho đạo lý nào trong Nho học Á Đông?',
      options: [
        'Kim - Mộc - Thủy - Hỏa - Thổ (Ngũ hành)',
        'Nhân - Nghĩa - Lễ - Trí - Tín (Ngũ thường)',
        'Công - Dung - Ngôn - Hạnh - Đức',
        'Phúc - Lộc - Thọ - Khang - Ninh'
      ],
      correctIndex: 1,
      explanation: 'Chính xác! 5 hạt cúc cài bên mạn sườn phải tượng trưng cho Ngũ Thường: Nhân, Nghĩa, Lễ, Trí, Tín - lời nhắc nhở người mặc luôn tu dưỡng đạo làm người tử tế, chánh trực.'
    },
    {
      question: 'Quy tắc cài vạt áo cổ truyền của người Việt quy định như thế nào là đúng chuẩn?',
      options: [
        'Vạt phải đè lên vạt trái (Tả nhậm)',
        'Vạt trái đè lên vạt phải (Hữu nhậm), cài cúc sườn phải',
        'Tùy ý ai thuận tay nào cài tay đó',
        'Cài khóa kéo ở chính giữa ngực'
      ],
      correctIndex: 1,
      explanation: 'Chính xác! Phong tục Hữu nhậm (vạt trái đè vạt phải) là chuẩn mực cát tường của người sống. Vạt phải đè vạt trái chỉ dùng trong lễ khâm liệm tang ma.'
    },
    {
      question: 'Vì sao gọi là "Áo Tấc"?',
      options: [
        'Vì áo chỉ dài đúng một tấc',
        'Vì phần viền gấu áo và tà tay may rộng đúng một tấc cổ (khoảng 3.5 - 4cm)',
        'Vì áo được may trong vòng một tấc thời gian',
        'Vì áo dành cho người cao một tấc'
      ],
      correctIndex: 1,
      explanation: 'Đúng vậy! Tên gọi "Áo Tấc" bắt nguồn từ quy chuẩn may phần viền quanh tà và tay áo rộng đúng một tấc cổ truyền.'
    }
  ];

  const currentQuiz = quizQuestions[currentQuizIndex];

  const handleSelectAnswer = (idx: number) => {
    if (!quizSubmitted) {
      setQuizAnswer(idx);
    }
  };

  const handleCheckQuiz = () => {
    setQuizSubmitted(true);
  };

  const handleNextQuiz = () => {
    setQuizAnswer(null);
    setQuizSubmitted(false);
    setCurrentQuizIndex((prev) => (prev + 1) % quizQuestions.length);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-rose-950/60 border border-amber-500/30 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 font-mono tracking-wider uppercase">
                Góc Văn Hóa Sâu Sắc
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                Di Sản Ngàn Năm
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-culture">
              Từ Điển & Điển Cố Việt Phục
            </h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Nơi học sinh, sinh viên tìm hiểu cội nguồn lịch sử, cấu trúc may đo độc đáo và giải mã những ẩn dụ triết học đằng sau từng tà áo truyền thống.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 hidden sm:block">
            <BookOpen className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Main Grid: Garments Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Garment selector list */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 block px-1">
            Chọn loại trang phục để tra cứu:
          </label>
          <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
            {GARMENT_DATABASE.map((g) => {
              const isSelected = selectedGarment.id === g.id;
              return (
                <div
                  key={g.id}
                  onClick={() => setSelectedGarment(g)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-rose-950/40 border-rose-500 text-white shadow-md shadow-rose-950/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold font-serif-culture text-slate-200">
                      {g.name}
                    </h4>
                    <span className="text-[10px] text-amber-400/90 font-medium">{g.dynastyEra.split('(')[0]}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-rose-400 translate-x-1' : 'text-slate-600'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 cols: In-depth Detail Card */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">
                  {selectedGarment.categoryLabel}
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold">{selectedGarment.hanTu}</span>
              </div>
              <h3 className="text-xl font-bold text-white font-serif-culture">
                {selectedGarment.name}
              </h3>
              <div className="text-xs text-amber-400 font-medium mt-0.5">
                Thời kỳ: {selectedGarment.dynastyEra}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs border border-slate-700">
                Phom: {selectedGarment.silhouetteType}
              </span>
            </div>
          </div>

          {/* Full Historical Narrative */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-amber-400" />
              <span>Nguồn Gốc Lịch Sử & Bối Cảnh</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
              {selectedGarment.fullHistory}
            </p>
          </div>

          {/* Cultural Symbolism */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Ý Nghĩa Văn Hóa & Triết Lý Đạo Đức</span>
            </h4>
            <p className="text-xs text-rose-200 leading-relaxed bg-rose-950/20 p-4 rounded-2xl border border-rose-500/30">
              {selectedGarment.culturalMeaning}
            </p>
          </div>

          {/* Key Tailoring Features */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Đặc Điểm May Đo & Nhận Diện</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedGarment.features.map((feat, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-1.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules of Wear & Cultural Protection */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Quy Chuẩn Khi Mặc & Lưu Ý Bảo Tồn</span>
            </h4>
            <div className="space-y-1.5">
              {selectedGarment.rulesOfWear.map((rule, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Heritage Quiz for Students */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Thử Thách Kiến Thức Việt Phục</h3>
              <p className="text-xs text-slate-400">Câu đố số {currentQuizIndex + 1} / {quizQuestions.length}</p>
            </div>
          </div>

          <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold">
            Kiểm tra hiểu biết văn hóa
          </span>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h4 className="text-sm font-semibold text-slate-100 leading-relaxed">
            {currentQuiz.question}
          </h4>

          <div className="space-y-2">
            {currentQuiz.options.map((opt, idx) => {
              const isSelected = quizAnswer === idx;
              const isCorrect = idx === currentQuiz.correctIndex;
              let btnClass = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';

              if (quizSubmitted) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                } else if (isSelected && !isCorrect) {
                  btnClass = 'bg-rose-950/60 border-rose-500 text-rose-200';
                }
              } else if (isSelected) {
                btnClass = 'bg-purple-950/60 border-purple-500 text-purple-200 ring-1 ring-purple-500';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between gap-3 ${btnClass}`}
                >
                  <span>{opt}</span>
                  {quizSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {quizSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Submission and Result */}
          {quizSubmitted ? (
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2">
                {quizAnswer === currentQuiz.correctIndex ? (
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Tuyệt vời! Bạn trả lời rất chuẩn xác.
                  </span>
                ) : (
                  <span className="font-bold text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Chưa chính xác rồi!
                  </span>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {currentQuiz.explanation}
              </p>
              <button
                onClick={handleNextQuiz}
                className="mt-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all"
              >
                Câu Hỏi Tiếp Theo →
              </button>
            </div>
          ) : (
            <button
              onClick={handleCheckQuiz}
              disabled={quizAnswer === null}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                quizAnswer !== null
                  ? 'bg-purple-600 hover:bg-purple-500 text-white cursor-pointer shadow-lg shadow-purple-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Kiểm Tra Đáp Án
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
