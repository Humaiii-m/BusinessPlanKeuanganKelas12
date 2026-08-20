import React from 'react';
import { 
  Printer, 
  ArrowRight, 
  Building2, 
  ShoppingBag, 
  Coins, 
  Calculator, 
  Award, 
  Edit3, 
  FileText, 
  CheckCircle2,
  Calendar,
  User,
  School
} from 'lucide-react';
import { BusinessPlanData, FinancialSummary } from '../types';
import { formatRupiah, formatNumber } from '../utils/calculations';

interface SummaryViewProps {
  data: BusinessPlanData;
  financials: FinancialSummary;
  onContinueToSubmission: () => void;
  onBackToBuilder: () => void;
  onPrint: () => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  data,
  financials,
  onContinueToSubmission,
  onBackToBuilder,
  onPrint,
}) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Action Bar (Hidden in Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#FAF6F0] rounded-2xl border border-[#D6C7AE] shadow-xs print:hidden">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#4F6F52]">Dokumen Hasil Perencanaan</span>
          <h1 className="text-lg font-bold text-[#1A120B]">
            Laporan Business Plan & Perencanaan Keuangan
          </h1>
          <p className="text-xs text-[#5C5248] mt-0.5">
            Dokumen ini siap dicetak atau disimpan sebagai PDF untuk dikumpulkan ke Google Classroom.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToBuilder}
            className="px-4 py-2 border border-[#D6C7AE] bg-[#FFFDF9] hover:bg-[#EDE4D3] text-[#1A120B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#5C5248]" />
            <span>Edit Data</span>
          </button>

          <button
            onClick={onPrint}
            className="px-5 py-2 bg-[#4F6F52] hover:bg-[#3F5942] text-[#FFFDF9] rounded-xl text-xs font-bold shadow-md shadow-[#4F6F52]/20 transition-all flex items-center gap-2"
            id="print-summary-btn"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* PRINT-FRIENDLY REPORT CONTAINER */}
      <div 
        id="printable-report"
        className="bg-[#FFFDF9] p-8 sm:p-12 rounded-2xl border border-[#D6C7AE] shadow-sm print:shadow-none print:border-none print:p-0 space-y-8 text-[#1A120B]"
      >
        {/* Document Header */}
        <div className="border-b-2 border-[#1A120B] pb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#4F6F52] block">
                TUGAS INFORMATIKA & KEWIRAUSAHAAN SISWA KELAS 12
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A120B] mt-1">
                Laporan Perencanaan Bisnis & Keuangan
              </h1>
              <p className="text-sm font-semibold text-[#5C5248] mt-0.5">
                Brand: <span className="text-[#4F6F52] text-base font-bold">{data.businessName || 'Bisnis Siswa'}</span> ({data.businessType || 'Usaha Kreatif'})
              </p>
            </div>

            <div className="text-xs text-[#5C5248] space-y-1 bg-[#FAF6F0] p-3.5 rounded-xl border border-[#D6C7AE] sm:text-right print:bg-transparent print:border-none print:p-0">
              <div className="flex items-center sm:justify-end gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#8C7E72]" />
                <span>{currentDate}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <User className="w-3.5 h-3.5 text-[#8C7E72]" />
                <span className="font-bold text-[#1A120B]">{data.studentName || 'Nama Siswa'}</span>
              </div>
              <div>
                <span>{data.studentClass || 'Kelas 12'}</span> {data.studentGroup ? `| ${data.studentGroup}` : ''}
              </div>
              {data.schoolName && (
                <div className="text-[11px] text-[#8C7E72]">
                  {data.schoolName}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 1. Profil & Model Bisnis */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#1A120B] border-b border-[#D6C7AE] pb-1.5 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#4F6F52]" />
            1. Profil & Gambaran Bisnis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-[#FAF6F0] rounded-xl space-y-1 border border-[#E5D9C5] print:bg-white print:border-slate-300">
              <strong className="text-[#1A120B] block">Deskripsi Usaha:</strong>
              <p className="text-[#5C5248] leading-relaxed">{data.description || '-'}</p>
            </div>

            <div className="p-3.5 bg-[#FAF6F0] rounded-xl space-y-1 border border-[#E5D9C5] print:bg-white print:border-slate-300">
              <strong className="text-[#1A120B] block">Target Pelanggan (Customer Segments):</strong>
              <p className="text-[#5C5248] leading-relaxed">{data.targetCustomer || '-'}</p>
            </div>

            <div className="p-3.5 bg-[#FAF6F0] rounded-xl space-y-1 border border-[#E5D9C5] sm:col-span-2 print:bg-white print:border-slate-300">
              <strong className="text-[#1A120B] block">Value Proposition / Keunggulan Produk:</strong>
              <p className="text-[#5C5248] leading-relaxed">{data.valueProposition || '-'}</p>
            </div>
          </div>
        </div>

        {/* 2. Rincian Produk, HPP, & Proyeksi Omzet */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#1A120B] border-b border-[#D6C7AE] pb-1.5 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#4F6F52]" />
            2. Rincian Produk, Harga, & Target Penjualan
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#D6C7AE] rounded-lg overflow-hidden">
              <thead className="bg-[#FAF6F0] text-[#1A120B] font-bold border-b border-[#D6C7AE]">
                <tr>
                  <th className="p-2.5">No</th>
                  <th className="p-2.5">Nama Produk</th>
                  <th className="p-2.5 text-right">HPP (Modal/Unit)</th>
                  <th className="p-2.5 text-right">Harga Jual</th>
                  <th className="p-2.5 text-right">Target / Bulan</th>
                  <th className="p-2.5 text-right">Proyeksi Omzet</th>
                  <th className="p-2.5 text-right">Laba Kotor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5D9C5]">
                {data.products.map((p, idx) => {
                  const unitMargin = (p.sellingPrice || 0) - (p.hpp || 0);
                  const pRev = (p.sellingPrice || 0) * (p.salesTarget || 0);
                  const pGross = unitMargin * (p.salesTarget || 0);

                  return (
                    <tr key={p.id}>
                      <td className="p-2.5 text-[#8C7E72]">{idx + 1}</td>
                      <td className="p-2.5 font-semibold text-[#1A120B]">{p.name || 'Produk'}</td>
                      <td className="p-2.5 text-right font-mono text-[#5C5248]">{formatRupiah(p.hpp)}</td>
                      <td className="p-2.5 text-right font-mono font-bold text-[#1A120B]">{formatRupiah(p.sellingPrice)}</td>
                      <td className="p-2.5 text-right font-mono text-[#5C5248]">{formatNumber(p.salesTarget)} unit</td>
                      <td className="p-2.5 text-right font-mono font-bold text-[#1A120B]">{formatRupiah(pRev)}</td>
                      <td className={`p-2.5 text-right font-mono font-bold ${pGross >= 0 ? 'text-[#4F6F52]' : 'text-rose-700'}`}>
                        {formatRupiah(pGross)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-[#FAF6F0] font-bold border-t border-[#D6C7AE]">
                <tr>
                  <td colSpan={4} className="p-2.5 text-right text-[#5C5248]">Total Proyeksi:</td>
                  <td className="p-2.5 text-right font-mono text-[#1A120B]">{formatNumber(financials.totalUnitsTarget)} unit</td>
                  <td className="p-2.5 text-right font-mono text-[#4F6F52]">{formatRupiah(financials.totalMonthlyRevenue)}</td>
                  <td className="p-2.5 text-right font-mono text-[#4F6F52]">{formatRupiah(financials.totalMonthlyGrossProfit)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* 3. Modal Awal & Biaya Tetap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Modal Awal */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1A120B] border-b border-[#D6C7AE] pb-1 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-[#4F6F52]" />
              3. Kebutuhan Modal Awal
            </h2>
            <div className="border border-[#D6C7AE] rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <tbody className="divide-y divide-[#E5D9C5]">
                  {data.initialCapitalItems.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="p-2 text-[#1A120B]">{item.name || `Item #${idx + 1}`}</td>
                      <td className="p-2 text-[11px] text-[#5C5248]">{item.category}</td>
                      <td className="p-2 text-right font-mono font-medium text-[#1A120B]">{formatRupiah(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-[#FAF6F0] font-bold border-t border-[#D6C7AE]">
                  <tr>
                    <td colSpan={2} className="p-2 text-[#1A120B]">Total Modal Awal:</td>
                    <td className="p-2 text-right font-mono text-[#4F6F52]">{formatRupiah(financials.totalInitialCapital)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Biaya Tetap Operasional */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1A120B] border-b border-[#D6C7AE] pb-1 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-[#4F6F52]" />
              4. Biaya Tetap Bulanan
            </h2>
            <div className="border border-[#D6C7AE] rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <tbody className="divide-y divide-[#E5D9C5]">
                  {data.fixedCostItems.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="p-2 text-[#1A120B]">{item.name || `Biaya #${idx + 1}`}</td>
                      <td className="p-2 text-[11px] text-[#5C5248]">{item.category}</td>
                      <td className="p-2 text-right font-mono font-medium text-[#1A120B]">{formatRupiah(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-[#FAF6F0] font-bold border-t border-[#D6C7AE]">
                  <tr>
                    <td colSpan={2} className="p-2 text-[#1A120B]">Total Biaya Tetap:</td>
                    <td className="p-2 text-right font-mono text-[#4F6F52]">{formatRupiah(financials.totalMonthlyFixedCosts)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* 5. Ringkasan Kunci Keuangan & BEP */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#1A120B] border-b border-[#D6C7AE] pb-1.5 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#4F6F52]" />
            5. Ringkasan Indikator Keuangan & Titik Impas (BEP)
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
            <div className="p-3 bg-[#FAF6F0] border border-[#D6C7AE] rounded-xl print:bg-white">
              <span className="text-[#5C5248] block text-[10px]">Total Modal Awal</span>
              <strong className="text-xs sm:text-sm font-mono text-[#1A120B] block mt-0.5">
                {formatRupiah(financials.totalInitialCapital)}
              </strong>
            </div>

            <div className="p-3 bg-[#FAF6F0] border border-[#D6C7AE] rounded-xl print:bg-white">
              <span className="text-[#5C5248] block text-[10px]">Total Omzet / Bln</span>
              <strong className="text-xs sm:text-sm font-mono text-[#4F6F52] block mt-0.5">
                {formatRupiah(financials.totalMonthlyRevenue)}
              </strong>
            </div>

            <div className="p-3 bg-[#FAF6F0] border border-[#D6C7AE] rounded-xl print:bg-white">
              <span className="text-[#5C5248] block text-[10px]">Total Biaya / Bln</span>
              <strong className="text-xs sm:text-sm font-mono text-[#1A120B] block mt-0.5">
                {formatRupiah(financials.totalMonthlyTotalCosts)}
              </strong>
            </div>

            <div className="p-3 bg-[#FAF6F0] border border-[#D6C7AE] rounded-xl print:bg-white">
              <span className="text-[#5C5248] block text-[10px]">Estimasi Laba Bersih</span>
              <strong className={`text-xs sm:text-sm font-mono block mt-0.5 ${financials.totalMonthlyNetProfit >= 0 ? 'text-[#4F6F52] font-bold' : 'text-rose-700'}`}>
                {formatRupiah(financials.totalMonthlyNetProfit)}
              </strong>
            </div>

            <div className="p-3 bg-[#FAF6F0] border border-[#D6C7AE] rounded-xl print:bg-white">
              <span className="text-[#5C5248] block text-[10px]">Titik Impas (BEP)</span>
              <strong className="text-xs sm:text-sm font-mono text-[#1A120B] block mt-0.5">
                {financials.isSingleProduct 
                  ? `${formatNumber(financials.bepData.singleProductUnit || 0)} Unit`
                  : formatRupiah(financials.bepData.multiProductBepRupiah || 0)}
              </strong>
            </div>
          </div>

          <div className="p-3.5 bg-[#FAF6F0] border border-[#D6C7AE] rounded-xl text-xs space-y-1 text-[#5C5248] print:bg-white">
            <span className="font-bold text-[#1A120B] block">Analisis Kelayakan Simulasi:</span>
            <p className="leading-relaxed">
              Margin Laba Bersih berada pada angka <strong className="text-[#1A120B]">{financials.netProfitMargin.toFixed(1)}%</strong>. 
              {financials.estimatedPaybackMonths ? ` Estimasi pengembalian modal awal (Payback Period) tercapai dalam ±${financials.estimatedPaybackMonths} bulan.` : ''}
            </p>
          </div>
        </div>

        {/* 6. Refleksi Siswa */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#1A120B] border-b border-[#D6C7AE] pb-1.5 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#4F6F52]" />
            6. Refleksi Kritis Siswa
          </h2>
          <div className="p-4 bg-[#FAF6F0] border border-[#D6C7AE] rounded-xl text-xs text-[#1A120B] leading-relaxed italic print:bg-white">
            "{data.reflection || 'Belum ada refleksi yang dituliskan.'}"
          </div>
        </div>

        {/* Signatures for Print */}
        <div className="pt-6 grid grid-cols-2 gap-8 text-xs text-center border-t border-[#D6C7AE] print:pt-8">
          <div>
            <span className="text-[#5C5248] block mb-12">Siswa / Ketua Kelompok,</span>
            <strong className="text-[#1A120B] block border-b border-[#8C7E72] w-48 mx-auto pb-1">
              {data.studentName || '_______________________'}
            </strong>
            <span className="text-[11px] text-[#5C5248] mt-1 block">NIS / Absen: {data.studentClass || '-'}</span>
          </div>

          <div>
            <span className="text-[#5C5248] block mb-12">Guru Pembimbing / Penilai,</span>
            <strong className="text-[#1A120B] block border-b border-[#8C7E72] w-48 mx-auto pb-1">
              {data.teacherName || 'Guru Informatika & PKWU'}
            </strong>
            <span className="text-[11px] text-[#5C5248] mt-1 block">NIP: _____________________</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA (Hidden in Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#D6C7AE] print:hidden">
        <button
          onClick={onBackToBuilder}
          className="px-5 py-2.5 text-xs font-semibold text-[#5C5248] hover:text-[#1A120B] transition-colors"
        >
          ← Kembali ke Form Praktik
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onPrint}
            className="px-5 py-2.5 bg-[#FAF6F0] hover:bg-[#EDE4D3] text-[#1A120B] border border-[#D6C7AE] rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-[#5C5248]" />
            <span>Cetak Dokumen (PDF)</span>
          </button>

          <button
            onClick={onContinueToSubmission}
            className="px-6 py-3 bg-[#4F6F52] hover:bg-[#3F5942] text-[#FFFDF9] rounded-xl text-xs font-bold shadow-md shadow-[#4F6F52]/20 transition-all flex items-center gap-2"
            id="continue-to-submission-btn"
          >
            <span>Petunjuk Pengumpulan Google Classroom</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

