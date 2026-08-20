import React, { useState } from 'react';
import { 
  Coins, 
  ArrowRight, 
  BookOpen, 
  Calculator, 
  Lightbulb, 
  CheckCircle2, 
  Sliders, 
  HelpCircle,
  Sparkles,
  Layers
} from 'lucide-react';
import { FINANCIAL_CONCEPTS } from '../data/learningContent';
import { FinancialConcept } from '../types';
import { formatRupiah, formatNumber } from '../utils/calculations';

interface FinancialMateriViewProps {
  onContinue: () => void;
  onBack: () => void;
}

export const FinancialMateriView: React.FC<FinancialMateriViewProps> = ({
  onContinue,
  onBack,
}) => {
  const [selectedConceptId, setSelectedConceptId] = useState<string>('produk');
  
  // Interactive Mini Calculator Sandbox for students
  const [sandboxPrice, setSandboxPrice] = useState<number>(25000);
  const [sandboxHpp, setSandboxHpp] = useState<number>(15000);
  const [sandboxFixedCost, setSandboxFixedCost] = useState<number>(600000);
  const [sandboxTargetQty, setSandboxTargetQty] = useState<number>(60);

  const activeConcept: FinancialConcept = 
    FINANCIAL_CONCEPTS.find((c) => c.id === selectedConceptId) || FINANCIAL_CONCEPTS[0];

  // Sandbox calculations
  const sandboxUnitMargin = sandboxPrice - sandboxHpp;
  const sandboxOmzet = sandboxPrice * sandboxTargetQty;
  const sandboxTotalVarCost = sandboxHpp * sandboxTargetQty;
  const sandboxTotalCost = sandboxFixedCost + sandboxTotalVarCost;
  const sandboxNetProfit = sandboxOmzet - sandboxTotalCost;
  const sandboxBepUnit = sandboxUnitMargin > 0 ? Math.ceil(sandboxFixedCost / sandboxUnitMargin) : 0;
  const sandboxBepRupiah = sandboxBepUnit * sandboxPrice;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EDE4D3] text-[#1A120B] text-xs font-semibold border border-[#D6C7AE]">
          <Coins className="w-3.5 h-3.5 text-[#4F6F52]" />
          <span>Langkah 3: Fondasi Perhitungan Keuangan</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1A120B] tracking-tight font-serif-natural">
          Materi Perencanaan Keuangan
        </h1>
        <p className="text-[#5C5248] text-sm sm:text-base leading-relaxed max-w-3xl">
          Pelajari 9 konsep inti keuangan bisnis di bawah ini secara seksama. Setiap konsep yang kamu pelajari di sini akan langsung digunakan saat kamu menyusun angka bisnismu di tahap praktik.
        </p>
      </div>

      {/* Concept Tabs Navigation */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5 p-1.5 bg-[#EDE4D3]/70 rounded-2xl border border-[#D6C7AE]">
        {FINANCIAL_CONCEPTS.map((c) => {
          const isSelected = c.id === selectedConceptId;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedConceptId(c.id)}
              className={`py-2 px-2 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                isSelected
                  ? 'bg-[#4F6F52] text-white font-bold shadow-sm scale-102'
                  : 'bg-transparent text-[#5C5248] hover:bg-white hover:text-[#1A120B] font-medium'
              }`}
            >
              <span className={`text-[10px] font-mono ${isSelected ? 'text-[#D2E3C8]' : 'text-[#5C5248]'}`}>
                {c.code}
              </span>
              <span className="text-[11px] font-semibold truncate w-full">
                {c.title.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Concept Detail Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D6C7AE] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EDE4D3]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#4F6F52] text-white flex items-center justify-center font-bold text-lg">
              {activeConcept.code}
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-[#4F6F52] tracking-wider">
                Modul Keuangan
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A120B] font-serif-natural">
                {activeConcept.title}
              </h2>
            </div>
          </div>
          <span className="text-xs text-[#5C5248] bg-[#EDE4D3] px-3 py-1.5 rounded-lg border border-[#D6C7AE]">
            {activeConcept.shortDesc}
          </span>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Left: Full Description & Formula */}
          <div className="space-y-4">
            <div className="bg-[#EDE4D3]/50 p-4 rounded-xl border border-[#D6C7AE] space-y-2">
              <span className="text-xs font-bold text-[#5C5248] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#4F6F52]" />
                Penjelasan Konsep:
              </span>
              <p className="text-[#1A120B] leading-relaxed text-xs sm:text-sm">
                {activeConcept.fullDesc}
              </p>
            </div>

            {/* Formula Block */}
            {activeConcept.formula && (
              <div className="bg-[#1A120B] text-white p-4 rounded-xl border border-[#3D5640] space-y-2">
                <div className="flex items-center gap-2 text-[#D2E3C8] text-xs font-bold">
                  <Calculator className="w-4 h-4" />
                  <span>Rumus Dasar</span>
                </div>
                <div className="p-3 bg-white/10 rounded-lg font-mono text-[#D2E3C8] text-xs sm:text-sm font-bold tracking-wide">
                  {activeConcept.formula}
                </div>
                {activeConcept.formulaNote && (
                  <p className="text-[11px] text-white/80 leading-relaxed">
                    {activeConcept.formulaNote}
                  </p>
                )}
              </div>
            )}

            {/* Tips Edukatif */}
            <div className="bg-[#EDE4D3]/80 border border-[#D6C7AE] p-4 rounded-xl space-y-2">
              <span className="text-xs font-bold text-[#4F6F52] uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-[#4F6F52]" />
                Tips Praktis Siswa:
              </span>
              <ul className="list-disc pl-4 space-y-1 text-xs text-[#1A120B]">
                {activeConcept.tips.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Example & Calculation Steps */}
          <div className="space-y-4">
            <div className="border border-[#D6C7AE] p-4 rounded-xl bg-[#EDE4D3]/40 space-y-3">
              <span className="text-xs font-bold text-[#1A120B] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#4F6F52]" />
                Contoh Kasus & Langkah Hitung:
              </span>
              <p className="text-xs text-[#5C5248] italic">
                {activeConcept.exampleData.scenario}
              </p>

              <div className="space-y-1.5 border-l-2 border-[#4F6F52] pl-3">
                {activeConcept.exampleData.calculationSteps.map((step, idx) => (
                  <div key={idx} className="font-mono text-xs bg-white p-2 rounded border border-[#D6C7AE] text-[#1A120B]">
                    {step}
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#D2E3C8] border border-[#4F6F52]/30 rounded-xl text-[#1A120B] font-bold text-xs">
                🎯 Hasil: {activeConcept.exampleData.result}
              </div>
            </div>

            {/* Khusus Modul BEP Multi-Produk */}
            {activeConcept.id === 'bep' && (
              <div className="p-4 bg-[#D2E3C8]/40 border border-[#4F6F52]/30 rounded-xl text-xs text-[#1A120B] space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-[#4F6F52]">
                  <Layers className="w-4 h-4 text-[#4F6F52]" />
                  Bagaimana Jika Bisnis Memiliki Beberapa Produk?
                </div>
                <p className="leading-relaxed text-[11px] text-[#1A120B]">
                  Untuk multi-produk, BEP dihitung menggunakan <strong>BEP Omzet</strong> berbasis <em>Weighted Contribution Margin Ratio (CMR)</em>. Titik impas unit per produk diestimasi berdasarkan bauran persentase target penjualan yang kamu rencanakan.
                </p>
                <div className="text-[11px] text-[#4F6F52] font-semibold bg-white p-2 rounded border border-[#D6C7AE]">
                  Estimasi ini menggunakan asumsi proporsi bauran penjualan konstan.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Financial Simulator / Live Sandbox */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#4F6F52] text-white shadow-md shadow-[#4F6F52]/20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#D2E3C8] flex items-center gap-1.5">
              <Sliders className="w-4 h-4" />
              Simulasi Interaktif (Interactive Sandbox)
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 font-serif-natural">
              Ubah Angka & Lihat Perubahan Omzet, Laba, dan BEP Secara Langsung
            </h3>
          </div>
          <span className="text-xs text-[#D2E3C8]/80">
            Geser atau ketik untuk bereksperimen
          </span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-black/15 rounded-xl border border-white/15 space-y-1.5">
            <label className="text-[#D2E3C8] font-medium block">HPP per Unit</label>
            <div className="font-mono text-base font-bold text-white">
              {formatRupiah(sandboxHpp)}
            </div>
            <input
              type="range"
              min="5000"
              max="50000"
              step="1000"
              value={sandboxHpp}
              onChange={(e) => setSandboxHpp(Number(e.target.value))}
              className="w-full accent-[#D2E3C8] cursor-pointer"
            />
          </div>

          <div className="p-3 bg-black/15 rounded-xl border border-white/15 space-y-1.5">
            <label className="text-[#D2E3C8] font-medium block">Harga Jual per Unit</label>
            <div className="font-mono text-base font-bold text-white">
              {formatRupiah(sandboxPrice)}
            </div>
            <input
              type="range"
              min="10000"
              max="80000"
              step="1000"
              value={sandboxPrice}
              onChange={(e) => setSandboxPrice(Number(e.target.value))}
              className="w-full accent-[#D2E3C8] cursor-pointer"
            />
          </div>

          <div className="p-3 bg-black/15 rounded-xl border border-white/15 space-y-1.5">
            <label className="text-[#D2E3C8] font-medium block">Biaya Tetap Bulanan</label>
            <div className="font-mono text-base font-bold text-white">
              {formatRupiah(sandboxFixedCost)}
            </div>
            <input
              type="range"
              min="100000"
              max="2000000"
              step="50000"
              value={sandboxFixedCost}
              onChange={(e) => setSandboxFixedCost(Number(e.target.value))}
              className="w-full accent-[#D2E3C8] cursor-pointer"
            />
          </div>

          <div className="p-3 bg-black/15 rounded-xl border border-white/15 space-y-1.5">
            <label className="text-[#D2E3C8] font-medium block">Target Penjualan (Unit)</label>
            <div className="font-mono text-base font-bold text-[#D2E3C8]">
              {sandboxTargetQty} unit / bulan
            </div>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={sandboxTargetQty}
              onChange={(e) => setSandboxTargetQty(Number(e.target.value))}
              className="w-full accent-[#D2E3C8] cursor-pointer"
            />
          </div>
        </div>

        {/* Live Calculation Outcomes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 bg-black/20 rounded-xl border border-white/10 text-center">
            <div className="text-[11px] text-[#D2E3C8]">Keuntungan / Unit</div>
            <div className={`text-base sm:text-lg font-bold font-mono ${sandboxUnitMargin > 0 ? 'text-[#D2E3C8]' : 'text-rose-300'}`}>
              {formatRupiah(sandboxUnitMargin)}
            </div>
          </div>

          <div className="p-4 bg-black/20 rounded-xl border border-white/10 text-center">
            <div className="text-[11px] text-[#D2E3C8]">Proyeksi Omzet</div>
            <div className="text-base sm:text-lg font-bold font-mono text-white">
              {formatRupiah(sandboxOmzet)}
            </div>
          </div>

          <div className="p-4 bg-black/20 rounded-xl border border-white/10 text-center">
            <div className="text-[11px] text-[#D2E3C8]">Estimasi Laba Bersih</div>
            <div className={`text-base sm:text-lg font-bold font-mono ${sandboxNetProfit >= 0 ? 'text-[#D2E3C8]' : 'text-rose-300'}`}>
              {formatRupiah(sandboxNetProfit)}
            </div>
          </div>

          <div className="p-4 bg-black/20 rounded-xl border border-white/10 text-center">
            <div className="text-[11px] text-[#D2E3C8]">Titik Impas (BEP Unit)</div>
            <div className="text-base sm:text-lg font-bold font-mono text-white">
              {sandboxBepUnit} unit
            </div>
          </div>
        </div>

        <div className="p-3 bg-black/20 rounded-lg text-xs text-white/90 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#D2E3C8] shrink-0" />
          <span>
            {sandboxTargetQty >= sandboxBepUnit 
              ? `✅ Dengan target ${sandboxTargetQty} unit, bisnismu sudah melampaui BEP (${sandboxBepUnit} unit) dan menghasilkan laba ${formatRupiah(sandboxNetProfit)}.`
              : `⚠️ Target ${sandboxTargetQty} unit masih di bawah BEP (${sandboxBepUnit} unit). Bisnis masih tekor ${formatRupiah(Math.abs(sandboxNetProfit))}.`}
          </span>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#D6C7AE]">
        <button
          onClick={onBack}
          className="px-5 py-2.5 text-xs font-semibold text-[#5C5248] hover:text-[#1A120B] transition-colors cursor-pointer"
        >
          ← Kembali ke Materi Business Plan
        </button>
        <button
          onClick={onContinue}
          className="px-6 py-3 bg-[#4F6F52] hover:bg-[#3D5640] active:scale-98 text-white rounded-xl font-bold text-sm shadow-md shadow-[#4F6F52]/20 flex items-center gap-2 transition-all cursor-pointer"
        >
          <span>Saya Sudah Paham → Lanjut ke Mini Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
