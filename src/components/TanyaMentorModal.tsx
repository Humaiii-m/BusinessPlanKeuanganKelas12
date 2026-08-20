import React, { useState } from 'react';
import { X, Sparkles, MessageSquare, CheckCircle2, AlertCircle, ArrowRight, Lightbulb, RefreshCw } from 'lucide-react';
import { BusinessPlanData, FinancialSummary } from '../types';
import { formatRupiah, formatNumber } from '../utils/calculations';

interface TanyaMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BusinessPlanData;
  financials: FinancialSummary;
  onNavigateToTab: (tabId: string) => void;
}

export const TanyaMentorModal: React.FC<TanyaMentorModalProps> = ({
  isOpen,
  onClose,
  data,
  financials,
}) => {
  const [activeTab, setActiveTab] = useState<'analisis' | 'tanya' | 'tips'>('analisis');
  const [studentQuestion, setStudentQuestion] = useState('');
  const [mentorAnswer, setMentorAnswer] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  if (!isOpen) return null;

  const handleAskMentor = (promptText?: string) => {
    const questionToAsk = promptText || studentQuestion;
    if (!questionToAsk.trim()) return;

    setIsThinking(true);
    setMentorAnswer(null);

    setTimeout(() => {
      // Rule-based and contextual pedagogical analysis
      const q = questionToAsk.toLowerCase();
      let response = '';

      if (q.includes('bep') || q.includes('impas') || q.includes('target')) {
        if (financials.isSingleProduct) {
          response = `Berdasarkan data bisnismu (${data.products[0]?.name || 'Produk 1'}), Biaya Tetap per bulanmu adalah ${formatRupiah(financials.totalMonthlyFixedCosts)} dan Margin Kontribusi per unit adalah ${formatRupiah(financials.bepData.contributionMarginPerUnit || 0)}. 
Untuk mencapai titik impas (BEP), kamu butuh menjual minimal ${formatNumber(financials.bepData.singleProductUnit || 0)} unit. 
Target penjualanmu saat ini adalah ${formatNumber(data.products[0]?.salesTarget || 0)} unit. ${
  (data.products[0]?.salesTarget || 0) >= (financials.bepData.singleProductUnit || 0)
    ? '✅ Bagus! Target penjualanmu sudah melampaui BEP, sehingga bisnis mulai menghasilkan laba.'
    : '⚠️ Perhatian: Target penjualanmu masih di bawah BEP. Kamu perlu menaikkan target promosi atau memangkas biaya tetap agar tidak tekor.'
}`;
        } else {
          response = `Untuk bisnis dengan ${data.products.length} produk, estimasi BEP Omzet adalah ${formatRupiah(financials.bepData.multiProductBepRupiah || 0)}. 
Rasio Margin Kontribusi Gabunganmu (Weighted CMR) berada di angka ${((financials.bepData.weightedContributionMarginRatio || 0) * 100).toFixed(1)}%. 
Target omzet bulananmu saat ini adalah ${formatRupiah(financials.totalMonthlyRevenue)}. ${
  financials.totalMonthlyRevenue >= (financials.bepData.multiProductBepRupiah || 0)
    ? '✅ Target omzetmu sudah di atas BEP gabungan. Pertahankan bauran penjualan produk terlaris!'
    : '⚠️ Target omzet bulananmu belum menutup seluruh biaya tetap. Coba fokus dorong produk yang memiliki margin keuntungan terbesar.'
}`;
        }
      } else if (q.includes('modal') || q.includes('investasi') || q.includes('balik')) {
        response = `Total Modal Awal yang kamu catat adalah ${formatRupiah(financials.totalInitialCapital)}. 
Dengan estimasi laba bersih bulanan ${formatRupiah(financials.totalMonthlyNetProfit)}, modal awalmu diperkirakan akan balik modal (Payback Period) dalam waktu sekitar ${
          financials.estimatedPaybackMonths ? `${financials.estimatedPaybackMonths} bulan` : 'belum dapat dihitung karena laba belum positif'
        }. 
💡 Saran Mentor: Pastikan peralatan yang dibeli benar-benar krusial di bulan-bulan awal agar modal awal tidak terlalu membengkak.`;
      } else if (q.includes('harga') || q.includes('hpp') || q.includes('margin')) {
        const lossProducts = data.products.filter(p => (p.sellingPrice || 0) < (p.hpp || 0));
        if (lossProducts.length > 0) {
          response = `🚨 PERINGATAN KRUSIAL: Produk "${lossProducts.map(p => p.name).join(', ')}" memiliki harga jual lebih rendah dari HPP! Segera naikkan harga jual atau cari pemasok bahan baku yang lebih terjangkau sebelum memulai operasional.`;
        } else {
          response = `Margin laba bersih bisnismu saat ini adalah ${financials.netProfitMargin.toFixed(1)}%. 
Standar margin laba yang sehat untuk bisnis skala UMKM / pelajar adalah antara 15% hingga 40%. 
Jika marginmu terlalu tipis (<15%), bisnismu rentan rugi saat harga bahan baku naik. Jika di atas 50%, pastikan kamu tidak lupa memasukkan biaya-biaya kecil seperti kemasan, stiker, gas, dan ongkos kirim.`;
        }
      } else {
        response = `Halo ${data.studentName || 'Wirausahawan Muda'}! 
Melihat perencanaan bisnismu "${data.businessName || 'Bisnis Siswa'}", kamu memiliki ${data.products.length} produk dengan total proyeksi omzet ${formatRupiah(financials.totalMonthlyRevenue)} dan estimasi laba bersih ${formatRupiah(financials.totalMonthlyNetProfit)} per bulan. 
📌 Evaluasi Umum: 
1. Keseimbangan harga jual dan HPP sudah berjalan dengan margin kotor ${formatRupiah(financials.totalMonthlyGrossProfit)}. 
2. Pastikan strategi promosi (Channels di BMC) benar-benar mampu mendatangkan ${formatNumber(financials.totalUnitsTarget)} pembeli setiap bulannya. 
3. Catat seluruh hasil ini dan tuliskan refleksi kritis pada bagian akhir tugas!`;
      }

      setMentorAnswer(response);
      setIsThinking(false);
    }, 600);
  };

  const quickPrompts = [
    'Bagaimana evaluasi titik impas (BEP) bisnismu?',
    'Apakah harga jual dan margin labaku sudah sehat?',
    'Berapa lama estimasi balik modal awal (Payback)?',
    'Apa saran mentor untuk meningkatkan keuntungan?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A120B]/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#D6C7AE] overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#4F6F52] text-[#FFFDF9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D2E3C8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">Mentor AI Pembelajaran Bisnis</h3>
                <span className="px-2 py-0.5 bg-[#D2E3C8]/30 border border-[#D2E3C8]/50 rounded-full text-[10px] font-semibold text-[#FFFDF9]">
                  Pedagogical Assistant
                </span>
              </div>
              <p className="text-xs text-[#D2E3C8]">
                Analisis edukatif & saran terstruktur berdasarkan data perencanaanmu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#D6C7AE] px-6 bg-[#FAF6F0] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('analisis')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'analisis'
                ? 'border-[#4F6F52] text-[#4F6F52] font-bold'
                : 'border-transparent text-[#5C5248] hover:text-[#1A120B]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Diagnosa Keuangan Otomatis
          </button>
          <button
            onClick={() => setActiveTab('tanya')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'tanya'
                ? 'border-[#4F6F52] text-[#4F6F52] font-bold'
                : 'border-transparent text-[#5C5248] hover:text-[#1A120B]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Tanya Mentor Interaktif
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'tips'
                ? 'border-[#4F6F52] text-[#4F6F52] font-bold'
                : 'border-transparent text-[#5C5248] hover:text-[#1A120B]'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            Panduan Evaluasi Siswa
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 text-sm text-[#1A120B]">
          {activeTab === 'analisis' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF6F0] border border-[#D6C7AE] rounded-xl space-y-2">
                <div className="text-xs font-bold uppercase text-[#5C5248] tracking-wider">
                  Ringkasan Cepat Angka Kuncimu
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1">
                  <div className="p-2.5 bg-[#FFFDF9] rounded-lg border border-[#E5D9C5]">
                    <div className="text-[11px] text-[#5C5248]">Omzet Bulanan</div>
                    <div className="text-xs font-bold text-[#1A120B]">{formatRupiah(financials.totalMonthlyRevenue)}</div>
                  </div>
                  <div className="p-2.5 bg-[#FFFDF9] rounded-lg border border-[#E5D9C5]">
                    <div className="text-[11px] text-[#5C5248]">Estimasi Laba</div>
                    <div className={`text-xs font-bold ${financials.totalMonthlyNetProfit >= 0 ? 'text-[#4F6F52]' : 'text-rose-700'}`}>
                      {formatRupiah(financials.totalMonthlyNetProfit)}
                    </div>
                  </div>
                  <div className="p-2.5 bg-[#FFFDF9] rounded-lg border border-[#E5D9C5]">
                    <div className="text-[11px] text-[#5C5248]">Margin Laba</div>
                    <div className="text-xs font-bold text-[#1A120B]">{financials.netProfitMargin.toFixed(1)}%</div>
                  </div>
                  <div className="p-2.5 bg-[#FFFDF9] rounded-lg border border-[#E5D9C5]">
                    <div className="text-[11px] text-[#5C5248]">Titik Impas</div>
                    <div className="text-xs font-bold text-[#1A120B]">
                      {financials.isSingleProduct 
                        ? `${formatNumber(financials.bepData.singleProductUnit || 0)} Unit`
                        : formatRupiah(financials.bepData.multiProductBepRupiah || 0)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes from financial evaluation */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-[#1A120B]">Catatan Analisis Mentor:</div>
                {financials.evaluationNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                      note.type === 'caution'
                        ? 'bg-rose-50 border-rose-200 text-rose-900'
                        : note.type === 'warning'
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : note.type === 'success'
                        ? 'bg-[#FAF6EE] border-[#D6C7AE] text-[#1A120B]'
                        : 'bg-[#FAF6F0] border-[#D6C7AE] text-[#1A120B]'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#4F6F52]" />
                    <div>
                      <div className="font-bold mb-0.5 text-[#1A120B]">{note.title}</div>
                      <div className="text-[#5C5248]">{note.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tanya' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#1A120B]">
                  Pilih Pertanyaan Cepat atau Ketik Sendiri:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAskMentor(prompt)}
                      className="p-2.5 text-left text-xs bg-[#FAF6F0] hover:bg-[#EDE4D3] hover:border-[#D6C7AE] border border-[#E5D9C5] rounded-xl transition-all flex items-center justify-between text-[#1A120B]"
                    >
                      <span>{prompt}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#5C5248] shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={studentQuestion}
                  onChange={(e) => setStudentQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskMentor()}
                  placeholder="Ketik pertanyaanmu seputar evaluasi bisnis..."
                  className="flex-1 px-3.5 py-2 bg-[#FAF6F0] border border-[#D6C7AE] rounded-xl text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52] focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => handleAskMentor()}
                  disabled={isThinking}
                  className="px-4 py-2 bg-[#4F6F52] hover:bg-[#3F5942] text-[#FFFDF9] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isThinking ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Tanya'}
                </button>
              </div>

              {mentorAnswer && (
                <div className="p-4 bg-[#FAF6EE] border border-[#D6C7AE] rounded-xl text-xs text-[#1A120B] space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-[#4F6F52]">
                    <Sparkles className="w-4 h-4 text-[#4F6F52]" />
                    Jawaban & Rekomendasi Mentor:
                  </div>
                  <p className="whitespace-pre-line leading-relaxed text-[#5C5248]">{mentorAnswer}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-3 text-xs text-[#5C5248]">
              <div className="p-4 bg-[#FAF6EE] border border-[#D6C7AE] rounded-xl space-y-2">
                <h4 className="font-bold text-[#1A120B] flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#CBB279]" />
                  Prinsip Kritis Evaluasi Business Plan Siswa
                </h4>
                <ul className="list-disc pl-4 space-y-1.5 text-[#5C5248]">
                  <li>
                    <strong className="text-[#1A120B]">Jangan hanya mengejar angka laba besar di atas kertas</strong>: Pastikan target penjualan realistis untuk dicapai oleh siswa SMA dalam 1 bulan pertama.
                  </li>
                  <li>
                    <strong className="text-[#1A120B]">Perhatikan Rasio Biaya Tetap</strong>: Jangan biarkan biaya sewa atau gaji tetap terlalu tinggi jika target penjualan masih dalam tahap perintisan.
                  </li>
                  <li>
                    <strong className="text-[#1A120B]">Kualitas HPP</strong>: Pastikan harga kemasan, stiker, dan bahan baku pelengkap sudah masuk ke perhitungan HPP per produk.
                  </li>
                  <li>
                    <strong className="text-[#1A120B]">Perhitungan BEP</strong>: Selalu pastikan target penjualanmu berada di atas BEP agar bisnismu tidak tekor.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#FAF6F0] border-t border-[#D6C7AE] flex items-center justify-between text-xs text-[#5C5248]">
          <span>Media Edukasi Kewirausahaan Informatika Kelas 12</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#4F6F52] hover:bg-[#3F5942] text-[#FFFDF9] rounded-lg font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

