import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Send, 
  HeartHandshake, 
  BadgeDollarSign, 
  Layers, 
  CheckCircle2, 
  Handshake, 
  Calculator, 
  ArrowRight, 
  Info,
  HelpCircle,
  BookOpen,
  Compass
} from 'lucide-react';
import { BMC_COMPONENTS } from '../data/learningContent';
import { BmcComponent } from '../types';

interface BmcReviewViewProps {
  onContinue: () => void;
}

// Icon mapping helper
const getIcon = (name: string) => {
  switch (name) {
    case 'Users': return Users;
    case 'Sparkles': return Sparkles;
    case 'Send': return Send;
    case 'HeartHandshake': return HeartHandshake;
    case 'BadgeDollarSign': return BadgeDollarSign;
    case 'Layers': return Layers;
    case 'CheckCircle2': return CheckCircle2;
    case 'Handshake': return Handshake;
    case 'Calculator': return Calculator;
    default: return Compass;
  }
};

export const BmcReviewView: React.FC<BmcReviewViewProps> = ({ onContinue }) => {
  const [selectedBmcId, setSelectedBmcId] = useState<string>(BMC_COMPONENTS[0].id);

  const activeBmc: BmcComponent = 
    BMC_COMPONENTS.find((b) => b.id === selectedBmcId) || BMC_COMPONENTS[0];
  const ActiveIcon = getIcon(activeBmc.iconName);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EDE4D3] text-[#1A120B] text-xs font-semibold border border-[#D6C7AE]">
          <BookOpen className="w-3.5 h-3.5 text-[#4F6F52]" />
          <span>Langkah 1: Review Fondasi Bisnis</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1A120B] tracking-tight font-serif-natural">
          Review Business Model Canvas (BMC)
        </h1>
        <p className="text-[#5C5248] text-sm sm:text-base leading-relaxed max-w-3xl">
          Sebelum masuk ke perhitungan keuangan dan penyusunan Business Plan, mari kita ingat kembali 9 komponen dasar model bisnis yang sudah kamu pelajari. Klik setiap kartu di bawah untuk melihat pertanyaan panduan dan contoh kasusnya.
        </p>
      </div>

      {/* 9 Blocks Interactive Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#5C5248]">
            Pilih Komponen BMC untuk Mengingat Detailnya:
          </h2>
          <span className="text-xs text-[#4F6F52] font-semibold">
            Komponen aktif: <strong className="text-[#1A120B]">{activeBmc.title}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          {BMC_COMPONENTS.map((item) => {
            const Icon = getIcon(item.iconName);
            const isSelected = item.id === selectedBmcId;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedBmcId(item.id)}
                className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-[#4F6F52] text-white border-[#4F6F52] shadow-md shadow-[#4F6F52]/20 scale-102'
                    : 'bg-white hover:bg-[#EDE4D3]/50 border-[#D6C7AE] text-[#1A120B]'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#EDE4D3] text-[#4F6F52]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#EDE4D3] text-[#5C5248]'
                    }`}
                  >
                    #{item.number}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm leading-tight mb-0.5">
                    {item.title}
                  </h3>
                  <p
                    className={`text-[11px] truncate ${
                      isSelected ? 'text-[#D2E3C8]' : 'text-[#5C5248]'
                    }`}
                  >
                    {item.indonesianTitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Block Detailed Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D6C7AE] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EDE4D3]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#D2E3C8] text-[#4F6F52] flex items-center justify-center font-bold">
              <ActiveIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#4F6F52]">
                Komponen #{activeBmc.number}
              </span>
              <h3 className="text-xl font-bold text-[#1A120B] font-serif-natural">
                {activeBmc.title} ({activeBmc.indonesianTitle})
              </h3>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Left: Definition & Questions */}
          <div className="space-y-4">
            <div className="bg-[#EDE4D3]/50 p-4 rounded-xl border border-[#D6C7AE] space-y-1.5">
              <span className="text-xs font-bold text-[#5C5248] uppercase tracking-wider">
                Pengertian Sederhana:
              </span>
              <p className="text-[#1A120B] font-medium leading-relaxed">
                {activeBmc.definition}
              </p>
            </div>

            <div className="bg-[#D2E3C8]/40 p-4 rounded-xl border border-[#4F6F52]/30 space-y-1.5">
              <span className="text-xs font-bold text-[#4F6F52] uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#4F6F52]" />
                Pertanyaan Panduan:
              </span>
              <p className="text-[#1A120B] font-bold italic text-base">
                "{activeBmc.guidingQuestion}"
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#5C5248] uppercase tracking-wider">
                Fokus Utama yang Perlu Dicatat:
              </span>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[#5C5248]">
                {activeBmc.keyPoints.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Example & Connection to Business Plan */}
          <div className="space-y-4">
            <div className="bg-[#EDE4D3]/80 p-4 rounded-xl border border-[#D6C7AE] space-y-2">
              <span className="text-xs font-bold text-[#4F6F52] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#4F6F52]" />
                Contoh Kasus (Noura Bakery):
              </span>
              <p className="text-xs text-[#1A120B] leading-relaxed font-mono bg-white p-2.5 rounded-lg border border-[#D6C7AE]">
                {activeBmc.example}
              </p>
            </div>

            <div className="bg-[#D2E3C8]/30 p-4 rounded-xl border border-[#4F6F52]/20 space-y-2">
              <span className="text-xs font-bold text-[#4F6F52] uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#4F6F52]" />
                Hubungan ke Business Plan & Keuangan:
              </span>
              <p className="text-xs text-[#1A120B] leading-relaxed">
                {activeBmc.connectionToBusinessPlan}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dari BMC ke Business Plan Section */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#4F6F52] text-white shadow-md shadow-[#4F6F52]/20 space-y-4">
        <div className="flex items-center gap-2 text-[#D2E3C8] text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Jembatan Konseptual</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif-natural">
          Dari Business Model Canvas ke Business Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/90 leading-relaxed">
          <div className="p-4 bg-black/15 rounded-xl border border-white/15 space-y-1">
            <strong className="text-white text-sm block">1. BMC (Ringkas & Strategis)</strong>
            <p className="text-white/80">
              BMC membantu kamu melihat model bisnis secara menyeluruh dalam satu lembar kerangka 9 blok. Ini adalah gambaran besar mengenai siapa pelangganmu dan bagaimana nilainya diciptakan.
            </p>
          </div>
          <div className="p-4 bg-black/15 rounded-xl border border-white/15 space-y-1">
            <strong className="text-white text-sm block">2. Business Plan (Detail & Terukur)</strong>
            <p className="text-white/80">
              Business Plan menjabarkan cara kerja operasional dan angka keuangannya secara nyata: berapa modal awal yang harus dibeli, berapa HPP per kue, berapa harga jual, dan berapa target penjualan agar tidak rugi (BEP).
            </p>
          </div>
        </div>
        <p className="text-xs text-[#D2E3C8] font-semibold pt-1">
          📌 BMC yang sudah kamu buat di tugas sebelumnya adalah fondasi utama yang akan kita ubah menjadi dokumen perencanaan terhitung di aktivitas ini.
        </p>
      </div>

      {/* Navigation CTA */}
      <div className="flex items-center justify-end pt-4">
        <button
          onClick={onContinue}
          className="px-6 py-3 bg-[#4F6F52] hover:bg-[#3D5640] active:scale-98 text-white rounded-xl font-bold text-sm shadow-md shadow-[#4F6F52]/20 flex items-center gap-2 transition-all cursor-pointer"
          id="bmc-understood-btn"
        >
          <span>Saya Sudah Memahami BMC → Lanjut ke Materi Business Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
