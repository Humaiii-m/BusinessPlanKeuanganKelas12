import React from 'react';
import { X, BookOpen, Lightbulb, Calculator, HelpCircle } from 'lucide-react';
import { FINANCIAL_CONCEPTS } from '../data/learningContent';
import { FinancialConcept } from '../types';

interface ConceptModalProps {
  conceptId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectConcept?: (id: string) => void;
}

export const ConceptModal: React.FC<ConceptModalProps> = ({
  conceptId,
  isOpen,
  onClose,
  onSelectConcept,
}) => {
  if (!isOpen) return null;

  // Find concept by id or fallback to first concept
  const concept: FinancialConcept | undefined = 
    FINANCIAL_CONCEPTS.find((c) => c.id === conceptId) || FINANCIAL_CONCEPTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A120B]/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#D6C7AE] overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#4F6F52] text-[#FFFDF9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg text-white">
              {concept.code}
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#D2E3C8]">
                Materi Penjelasan Konsep
              </span>
              <h3 className="text-lg font-bold leading-tight">{concept.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            title="Tutup"
            id="close-concept-modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-[#1A120B] text-sm">
          {/* Quick Concept Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#D6C7AE] text-xs font-medium scrollbar-none">
            {FINANCIAL_CONCEPTS.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectConcept && onSelectConcept(c.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  c.id === concept.id
                    ? 'bg-[#4F6F52] text-[#FFFDF9] font-bold shadow-xs'
                    : 'bg-[#FAF6F0] text-[#5C5248] hover:bg-[#EDE4D3] border border-[#E5D9C5]'
                }`}
              >
                {c.code} {c.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Definition */}
          <div className="bg-[#FAF6F0] border border-[#D6C7AE] rounded-xl p-4">
            <div className="flex items-start gap-2.5">
              <BookOpen className="w-5 h-5 text-[#4F6F52] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-[#1A120B] mb-1">Pengertian</h4>
                <p className="text-[#5C5248] leading-relaxed">{concept.fullDesc}</p>
              </div>
            </div>
          </div>

          {/* Formula (if available) */}
          {concept.formula && (
            <div className="bg-[#2C241D] text-[#FFFDF9] rounded-xl p-4 border border-[#1A120B]">
              <div className="flex items-center gap-2 text-[#D2E3C8] font-semibold mb-2">
                <Calculator className="w-4 h-4" />
                <span>Rumus & Perhitungan</span>
              </div>
              <div className="p-3 bg-[#1A120B]/60 rounded-lg font-mono text-[#D2E3C8] text-sm font-semibold tracking-wide border border-[#5C5248]/30">
                {concept.formula}
              </div>
              {concept.formulaNote && (
                <p className="text-xs text-[#D6C7AE] mt-2 leading-relaxed">
                  {concept.formulaNote}
                </p>
              )}
            </div>
          )}

          {/* Real Example */}
          <div className="border border-[#D6C7AE] rounded-xl p-4 bg-[#FAF6F0]">
            <h4 className="font-bold text-[#1A120B] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4F6F52]"></span>
              Contoh Kasus Sederhana:
            </h4>
            <p className="text-[#5C5248] italic mb-2.5 text-xs">
              {concept.exampleData.scenario}
            </p>
            <div className="space-y-1.5 pl-2 border-l-2 border-[#4F6F52] text-xs text-[#1A120B]">
              {concept.exampleData.calculationSteps.map((step, idx) => (
                <div key={idx} className="font-mono bg-[#FFFDF9] p-1.5 rounded border border-[#E5D9C5]">
                  {step}
                </div>
              ))}
            </div>
            <div className="mt-3 p-2.5 bg-[#D2E3C8]/60 border border-[#D6C7AE] rounded-lg text-[#1A120B] font-semibold text-xs">
              🎯 Hasil: {concept.exampleData.result}
            </div>
          </div>

          {/* Tips Edukatif */}
          <div className="bg-[#FAF6EE] border border-[#D6C7AE] rounded-xl p-4">
            <div className="flex items-start gap-2.5">
              <Lightbulb className="w-5 h-5 text-[#CBB279] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-[#1A120B] mb-1">Tips untuk Perencanaanmu</h4>
                <ul className="list-disc pl-4 space-y-1 text-xs text-[#5C5248]">
                  {concept.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#FAF6F0] border-t border-[#D6C7AE] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#5C5248]">
            <HelpCircle className="w-4 h-4 text-[#4F6F52]" />
            <span>Media Pembelajaran Kewirausahaan & IT Siswa Kelas 12</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#4F6F52] hover:bg-[#3F5942] text-[#FFFDF9] rounded-lg text-xs font-semibold transition-colors"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

