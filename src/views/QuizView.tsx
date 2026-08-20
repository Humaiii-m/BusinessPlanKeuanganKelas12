import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Award, 
  Lightbulb, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/learningContent';
import { QuizQuestion } from '../types';

interface QuizViewProps {
  onContinueToBuilder: () => void;
  onReviewMateri: () => void;
  onOpenConcept: (conceptId: string) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  onContinueToBuilder,
  onReviewMateri,
  onOpenConcept,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];
  const isAnswered = selectedAnswer !== undefined;

  const handleSelectOption = (optionIndex: number) => {
    if (showFeedback) return; // Prevent changing after submitting
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleConfirmAnswer = () => {
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowFeedback(false);
    } else {
      setIsQuizCompleted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestartQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowFeedback(false);
    setIsQuizCompleted(false);
  };

  // Calculate final score
  const totalCorrect = QUIZ_QUESTIONS.reduce((acc, q, idx) => {
    return userAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const scorePercentage = Math.round((totalCorrect / QUIZ_QUESTIONS.length) * 100);

  // Interpretation text
  let interpretation = '';
  let interpretationBadgeColor = '';
  if (scorePercentage >= 80) {
    interpretation = 'Luar biasa! Kamu sudah sangat siap dan memahami konsep untuk membuat perencanaan bisnis & keuanganmu.';
    interpretationBadgeColor = 'bg-[#D2E3C8]/70 text-[#1A120B] border-[#4F6F52]/40';
  } else if (scorePercentage >= 60) {
    interpretation = 'Kamu sudah memahami sebagian besar materi penting. Sebaiknya perhatikan kembali penjelasan pada soal yang belum tepat.';
    interpretationBadgeColor = 'bg-amber-100 text-amber-950 border-amber-300';
  } else {
    interpretation = 'Sebaiknya pelajari dan review kembali beberapa modul materi keuangan sebelum mulai menyusun angka perencanaan.';
    interpretationBadgeColor = 'bg-rose-100 text-rose-950 border-rose-300';
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EDE4D3] text-[#1A120B] text-xs font-semibold border border-[#D6C7AE]">
          <HelpCircle className="w-3.5 h-3.5 text-[#4F6F52]" />
          <span>Langkah 4: Evaluasi Mandiri</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1A120B] tracking-tight font-serif-natural">
          Mini Quiz Self-Assessment
        </h1>
        <p className="text-[#5C5248] text-xs sm:text-sm leading-relaxed">
          Uji pemahaman konsepmu secara mandiri melalui 10 soal interaktif berikut. Quiz ini bertujuan membantu kamu mengingat kembali konsep tanpa tekanan nilai rapor.
        </p>
      </div>

      {!isQuizCompleted ? (
        <div className="space-y-6">
          {/* Progress Bar & Counter */}
          <div className="bg-white p-4 rounded-2xl border border-[#D6C7AE] shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#D2E3C8] text-[#1A120B] font-bold text-xs flex items-center justify-center border border-[#D6C7AE]">
                #{currentQ.number}
              </span>
              <div>
                <div className="text-xs font-bold text-[#1A120B]">
                  Soal {currentQuestionIndex + 1} dari {QUIZ_QUESTIONS.length}
                </div>
                <div className="text-[11px] text-[#5C5248]">
                  Topik: <strong className="text-[#4F6F52]">{currentQ.topic}</strong>
                </div>
              </div>
            </div>

            <div className="w-32 sm:w-48 bg-[#EDE4D3] h-2.5 rounded-full overflow-hidden border border-[#D6C7AE]">
              <div
                className="bg-[#4F6F52] h-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D6C7AE] shadow-sm space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-[#1A120B] leading-relaxed">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((optionText, optIdx) => {
                const isSelected = selectedAnswer === optIdx;
                const isCorrect = optIdx === currentQ.correctIndex;

                let optionStyles = 'border-[#D6C7AE] hover:border-[#4F6F52] hover:bg-[#EDE4D3]/40 text-[#1A120B]';

                if (showFeedback) {
                  if (isCorrect) {
                    optionStyles = 'bg-[#D2E3C8]/60 border-[#4F6F52] text-[#1A120B] font-semibold ring-1 ring-[#4F6F52]';
                  } else if (isSelected && !isCorrect) {
                    optionStyles = 'bg-rose-50 border-rose-400 text-rose-950 font-semibold';
                  } else {
                    optionStyles = 'border-[#D6C7AE] opacity-60 text-[#5C5248]';
                  }
                } else if (isSelected) {
                  optionStyles = 'border-[#4F6F52] bg-[#D2E3C8]/40 text-[#1A120B] font-semibold ring-2 ring-[#4F6F52]/30';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyles}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-[#EDE4D3] text-[#1A120B] flex items-center justify-center font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{optionText}</span>
                    </div>

                    {showFeedback && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-[#4F6F52] shrink-0" />
                    )}
                    {showFeedback && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Immediate Constructive Feedback */}
            {showFeedback && (
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm space-y-2 animate-in fade-in ${
                  selectedAnswer === currentQ.correctIndex
                    ? 'bg-[#D2E3C8]/50 border-[#4F6F52]/40 text-[#1A120B]'
                    : 'bg-rose-50/80 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  {selectedAnswer === currentQ.correctIndex ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-[#4F6F52]" />
                      <span>Benar! Kamu sudah memahami konsep ini.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>Belum tepat. Coba pelajari kembali bagian {currentQ.topic}.</span>
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-[#5C5248]">
                  {currentQ.explanation}
                </p>

                {/* Quick study button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenConcept(currentQ.relatedConceptId)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F6F52] hover:text-[#3D5640] underline cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Buka Penjelasan Konsep: {currentQ.topic}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Card Bottom Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-[#EDE4D3]">
              <button
                type="button"
                onClick={() => onOpenConcept(currentQ.relatedConceptId)}
                className="text-xs font-semibold text-[#5C5248] hover:text-[#4F6F52] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Pelajari Konsep Ini</span>
              </button>

              {!showFeedback ? (
                <button
                  type="button"
                  disabled={!isAnswered}
                  onClick={handleConfirmAnswer}
                  className="px-6 py-2.5 bg-[#4F6F52] hover:bg-[#3D5640] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Periksa Jawaban
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 bg-[#1A120B] hover:bg-[#2C241E] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <span>
                    {currentQuestionIndex < QUIZ_QUESTIONS.length - 1
                      ? 'Soal Berikutnya'
                      : 'Lihat Skor Akhir'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Quiz Completed Summary View */
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#D6C7AE] shadow-md text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-2xl bg-[#D2E3C8] text-[#4F6F52] mx-auto flex items-center justify-center shadow-inner border border-[#D6C7AE]">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#4F6F52]">
              Hasil Self-Assessment Mandiri
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A120B] font-serif-natural">
              Skor: {totalCorrect} / {QUIZ_QUESTIONS.length}
            </h2>
            <div className="text-base font-semibold text-[#5C5248]">
              Tingkat Pemahaman: <strong className="text-[#4F6F52]">{scorePercentage}%</strong>
            </div>
          </div>

          {/* Interpretation Card */}
          <div className={`p-4 rounded-xl border max-w-lg mx-auto text-xs sm:text-sm font-medium leading-relaxed ${interpretationBadgeColor}`}>
            {interpretation}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={onReviewMateri}
              className="w-full sm:w-auto px-6 py-3 border border-[#D6C7AE] bg-white hover:bg-[#EDE4D3]/50 text-[#1A120B] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#4F6F52]" />
              <span>Review Materi Kembali</span>
            </button>

            <button
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto px-5 py-3 border border-[#D6C7AE] bg-white hover:bg-[#EDE4D3]/50 text-[#1A120B] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#5C5248]" />
              <span>Ulangi Quiz</span>
            </button>

            <button
              onClick={onContinueToBuilder}
              className="w-full sm:w-auto px-8 py-3 bg-[#4F6F52] hover:bg-[#3D5640] text-white rounded-xl text-xs font-bold shadow-md shadow-[#4F6F52]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="start-planning-btn"
            >
              <span>Mulai Perencanaan Bisnis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
