import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  Calculator, 
  Send, 
  Sparkles,
  Info,
  Building2,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { AppTab } from '../types';

interface HomeViewProps {
  onStartLearning: () => void;
  onNavigate: (tab: AppTab) => void;
  hasExistingData: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartLearning,
  onNavigate,
  hasExistingData,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 animate-in fade-in duration-300">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE4D3] border border-[#D6C7AE] text-[#1A120B] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#4F6F52]" />
          <span>Media Pembelajaran Informatika & Kewirausahaan Kelas 12</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A120B] tracking-tight leading-tight font-serif-natural">
          Business Plan & <br className="hidden sm:block" />
          <span className="text-[#4F6F52]">Perencanaan Keuangan</span>
        </h1>

        <p className="text-lg sm:text-xl font-medium text-[#5C5248]">
          Rancang. Hitung. Evaluasi.
        </p>

        <p className="text-sm sm:text-base text-[#5C5248] leading-relaxed max-w-2xl mx-auto">
          Media interaktif untuk membantu kamu memahami perencanaan bisnis dan keuangan, kemudian menerapkannya pada bisnis yang sudah kamu rancang sebelumnya melalui Business Model Canvas (BMC).
        </p>

        {/* Primary CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartLearning}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#4F6F52] hover:bg-[#3D5640] active:scale-98 text-white rounded-xl font-bold text-sm shadow-lg shadow-[#4F6F52]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
            id="start-learning-btn"
          >
            <span>Mulai Belajar</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {hasExistingData && (
            <button
              onClick={() => onNavigate('builder')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#EDE4D3] hover:bg-[#D2E3C8] border border-[#D6C7AE] text-[#1A120B] rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-[#4F6F52]" />
              <span>Lanjutkan Perencanaan Tersimpan</span>
            </button>
          )}
        </div>

        {/* Note / Callout */}
        <div className="inline-flex items-center gap-2 text-xs text-[#5C5248] bg-[#EDE4D3]/70 px-4 py-2 rounded-lg border border-[#D6C7AE]">
          <Info className="w-4 h-4 text-[#4F6F52] shrink-0" />
          <span>Siapkan Business Model Canvas dan ide bisnis yang sudah kamu buat sebelumnya.</span>
        </div>
      </div>

      {/* 3 Main Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Goal 1 */}
        <div className="p-6 rounded-2xl bg-white border border-[#D6C7AE] shadow-xs hover:border-[#4F6F52] transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#EDE4D3] text-[#4F6F52] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1A120B]">1. Pelajari Konsep</h3>
            <p className="text-xs text-[#5C5248] leading-relaxed">
              Review kembali 9 blok BMC dan pelajari konsep keuangan: HPP, modal awal, biaya tetap, biaya variabel, harga jual, omzet, laba, hingga titik impas (BEP).
            </p>
          </div>
          <button
            onClick={() => onNavigate('bmc')}
            className="mt-4 pt-3 border-t border-[#EDE4D3] text-xs font-bold text-[#4F6F52] hover:text-[#3D5640] flex items-center justify-between cursor-pointer"
          >
            <span>Buka Materi BMC</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Goal 2 */}
        <div className="p-6 rounded-2xl bg-white border border-[#D6C7AE] shadow-xs hover:border-[#4F6F52] transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#D2E3C8] text-[#4F6F52] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1A120B]">2. Uji Pemahaman</h3>
            <p className="text-xs text-[#5C5248] leading-relaxed">
              Kerjakan 10 soal quiz self-assessment interaktif untuk mengevaluasi pemahaman konsepmu secara mandiri sebelum menyusun angka bisnis.
            </p>
          </div>
          <button
            onClick={() => onNavigate('quiz')}
            className="mt-4 pt-3 border-t border-[#EDE4D3] text-xs font-bold text-[#4F6F52] hover:text-[#3D5640] flex items-center justify-between cursor-pointer"
          >
            <span>Coba Mini Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Goal 3 */}
        <div className="p-6 rounded-2xl bg-white border border-[#D6C7AE] shadow-xs hover:border-[#4F6F52] transition-all flex flex-col justify-between group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#EDE4D3] text-[#4F6F52] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1A120B]">3. Susun Perencanaan</h3>
            <p className="text-xs text-[#5C5248] leading-relaxed">
              Terapkan pada produk bisnismu secara dinamis, simulasikan laba dan BEP, cetak hasil dokumen rapi (PDF), lalu kumpulkan ke Google Classroom.
            </p>
          </div>
          <button
            onClick={() => onNavigate('builder')}
            className="mt-4 pt-3 border-t border-[#EDE4D3] text-xs font-bold text-[#4F6F52] hover:text-[#3D5640] flex items-center justify-between cursor-pointer"
          >
            <span>Buka Builder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Learning Flow Outline */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#4F6F52] text-white shadow-md shadow-[#4F6F52]/20 space-y-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#D2E3C8]">
            Alur Pembelajaran
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 font-serif-natural">
            Pelajari → Contoh → Coba Quiz → Praktik → Hasil
          </h2>
          <p className="text-xs text-[#D2E3C8]/90 mt-1">
            Ikuti tahapan pembelajaran ini secara berurutan untuk hasil belajar maksimal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-black/15 rounded-xl border border-white/15 space-y-1">
            <div className="text-[#D2E3C8] font-bold">1. Review BMC</div>
            <p className="text-white/80 text-[11px]">Mengingat kembali 9 elemen model bisnis.</p>
          </div>
          <div className="p-3 bg-black/15 rounded-xl border border-white/15 space-y-1">
            <div className="text-[#D2E3C8] font-bold">2. Materi & Rumus</div>
            <p className="text-white/80 text-[11px]">Memahami modal, HPP, omzet, laba, & BEP.</p>
          </div>
          <div className="p-3 bg-black/15 rounded-xl border border-white/15 space-y-1">
            <div className="text-[#D2E3C8] font-bold">3. Self-Quiz</div>
            <p className="text-white/80 text-[11px]">Uji pemahaman mandiri dengan feedback.</p>
          </div>
          <div className="p-3 bg-black/15 rounded-xl border border-white/15 space-y-1">
            <div className="text-[#D2E3C8] font-bold">4. Praktik Rancang</div>
            <p className="text-white/80 text-[11px]">Isi produk, modal, & hitung proyeksi laba.</p>
          </div>
          <div className="p-3 bg-black/15 rounded-xl border border-white/15 space-y-1">
            <div className="text-[#D2E3C8] font-bold">5. Hasil & Kumpul</div>
            <p className="text-white/80 text-[11px]">Cetak PDF & serahkan ke Google Classroom.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
