import React, { useState } from 'react';
import { 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Target, 
  Layers, 
  DollarSign, 
  ShoppingBag, 
  Megaphone, 
  Settings2,
  Building
} from 'lucide-react';

interface BusinessPlanMateriViewProps {
  onContinue: () => void;
  onBack: () => void;
}

export const BusinessPlanMateriView: React.FC<BusinessPlanMateriViewProps> = ({
  onContinue,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'struktur' | 'contoh'>('struktur');

  const bpSections = [
    {
      title: '1. Identitas & Profil Bisnis',
      desc: 'Nama usaha, jenis industri (kuliner, fashion, jasa IT), visi misi, dan deskripsi singkat latar belakang didirikannya usaha.',
      icon: Building,
      badge: 'Struktur Dasar',
    },
    {
      title: '2. Produk atau Jasa',
      desc: 'Rincian produk/jasa yang ditawarkan, spesifikasi, variasi varian, keunggulan kualitas, dan kemasannya.',
      icon: ShoppingBag,
      badge: 'Fokus Produk',
    },
    {
      title: '3. Target Pelanggan & Analisis Pasar',
      desc: 'Profil segmen pembeli spesifik, kebutuhan mereka, serta peta pesaing (kompetitor) yang ada di pasar.',
      icon: Target,
      badge: 'Pasar',
    },
    {
      title: '4. Strategi Pemasaran & Promosi',
      desc: 'Cara mempromosikan produk (media sosial, konten video, tester, diskon pengenalan) dan saluran penjualan.',
      icon: Megaphone,
      badge: 'Pemasaran',
    },
    {
      title: '5. Rencana Operasional & Produksi',
      desc: 'Alur pembuatan produk dari belanja bahan, proses produksi, kendali mutu (QC), hingga pengiriman ke pelanggan.',
      icon: Settings2,
      badge: 'Operasional',
    },
    {
      title: '6. Perencanaan Keuangan (Financial Plan)',
      desc: 'Kalkulasi modal awal, biaya tetap, biaya variabel, HPP, harga jual, estimasi omzet, laba bersih, dan Break Even Point (BEP).',
      icon: DollarSign,
      badge: 'FOKUS UTAMA KITA',
      isHighlight: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EDE4D3] text-[#1A120B] text-xs font-semibold border border-[#D6C7AE]">
          <FileText className="w-3.5 h-3.5 text-[#4F6F52]" />
          <span>Langkah 2: Memahami Dokumen Rencana Bisnis</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1A120B] tracking-tight font-serif-natural">
          Materi Business Plan
        </h1>
        <p className="text-[#5C5248] text-sm sm:text-base leading-relaxed max-w-3xl">
          Setelah memiliki ide di BMC, langkah berikutnya adalah menuangkannya ke dalam sebuah <strong>Business Plan</strong> yang terstruktur dan terukur.
        </p>
      </div>

      {/* Definisi Utama Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#4F6F52] text-white shadow-md shadow-[#4F6F52]/20 space-y-3">
        <span className="text-xs uppercase font-bold tracking-wider text-[#D2E3C8] flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Definisi Sederhana
        </span>
        <blockquote className="text-lg sm:text-xl font-medium leading-relaxed italic border-l-4 border-[#D2E3C8] pl-4">
          "Business Plan adalah dokumen tertulis yang menjelaskan rencana menjalankan sebuah bisnis, termasuk produk, target pelanggan, strategi pemasaran, alur operasional, dan perhitungan keuangannya."
        </blockquote>
        <p className="text-xs text-[#D2E3C8]/90 pt-1">
          Business Plan berfungsi sebagai peta jalan (kompas) agar kamu dan tim wirausahamu tidak salah langkah dalam mengelola modal dan produksi.
        </p>
      </div>

      {/* Toggle View: Struktur vs Contoh Nyata */}
      <div className="space-y-4">
        <div className="flex border-b border-[#D6C7AE]">
          <button
            onClick={() => setActiveTab('struktur')}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'struktur'
                ? 'border-[#4F6F52] text-[#4F6F52]'
                : 'border-transparent text-[#5C5248] hover:text-[#1A120B]'
            }`}
          >
            <Layers className="w-4 h-4" />
            6 Bagian Utama Business Plan
          </button>
          <button
            onClick={() => setActiveTab('contoh')}
            className={`py-3 px-5 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'contoh'
                ? 'border-[#4F6F52] text-[#4F6F52]'
                : 'border-transparent text-[#5C5248] hover:text-[#1A120B]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Contoh Ringkas (Noura Bakery)
          </button>
        </div>

        {activeTab === 'struktur' ? (
          <div className="space-y-4">
            <div className="p-4 bg-[#D2E3C8]/40 border border-[#4F6F52]/30 rounded-xl text-xs text-[#1A120B] flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#4F6F52] shrink-0" />
              <span>
                <strong>Catatan Penting:</strong> Dalam kurikulum Informatika & Kewirausahaan ini, kita akan memberikan perhatian khusus pada <strong>Perencanaan Keuangan</strong> agar siswa terbiasa menghitung angka secara presisi.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bpSections.map((sec, idx) => {
                const Icon = sec.icon;
                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      sec.isHighlight
                        ? 'bg-[#D2E3C8]/30 border-[#4F6F52] shadow-xs ring-2 ring-[#4F6F52]/20'
                        : 'bg-white border-[#D6C7AE] hover:border-[#4F6F52]'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            sec.isHighlight
                              ? 'bg-[#4F6F52] text-white'
                              : 'bg-[#EDE4D3] text-[#4F6F52]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            sec.isHighlight
                              ? 'bg-[#4F6F52] text-white'
                              : 'bg-[#EDE4D3] text-[#5C5248]'
                          }`}
                        >
                          {sec.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-[#1A120B]">{sec.title}</h3>
                      <p className="text-xs text-[#5C5248] leading-relaxed">{sec.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-white border border-[#D6C7AE] space-y-6 text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE4D3]">
              <div>
                <span className="text-xs uppercase font-bold text-[#4F6F52]">
                  Studi Kasus Sederhana
                </span>
                <h3 className="text-lg font-bold text-[#1A120B] font-serif-natural">
                  Business Plan: Noura Bakery Studio
                </h3>
              </div>
              <span className="px-2.5 py-1 bg-[#D2E3C8] text-[#1A120B] border border-[#D6C7AE] rounded-lg text-xs font-bold">
                Contoh Kelas 12
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#EDE4D3]/50 border border-[#D6C7AE] rounded-xl space-y-1">
                <span className="font-bold text-[#1A120B] block">1. Identitas Usaha</span>
                <p className="text-[#5C5248]">
                  Usaha pastry rumahan kekinian yang dikelola oleh tim siswa kelas 12 untuk melayani kebutuhan camilan higienis di lingkungan sekolah dan sekitarnya.
                </p>
              </div>

              <div className="p-4 bg-[#EDE4D3]/50 border border-[#D6C7AE] rounded-xl space-y-1">
                <span className="font-bold text-[#1A120B] block">2. Produk Unggulan</span>
                <p className="text-[#5C5248]">
                  Brownies Fudgy Shiny Crust (Box 20x10), Choco Chip Cookies Toples, dan Mini Dessert Box Tiramisu.
                </p>
              </div>

              <div className="p-4 bg-[#EDE4D3]/50 border border-[#D6C7AE] rounded-xl space-y-1">
                <span className="font-bold text-[#1A120B] block">3. Target Pasar</span>
                <p className="text-[#5C5248]">
                  Siswa, mahasiswa, dan guru pecinta kudapan manis dengan daya beli Rp20.000–Rp30.000 per transaksi.
                </p>
              </div>

              <div className="p-4 bg-[#EDE4D3]/50 border border-[#D6C7AE] rounded-xl space-y-1">
                <span className="font-bold text-[#1A120B] block">4. Strategi Pemasaran</span>
                <p className="text-[#5C5248]">
                  Video pembuatan kue di TikTok (@NouraBakery), pre-order WhatsApp setiap hari Rabu, dan titip jual di kantin sekolah.
                </p>
              </div>

              <div className="p-4 bg-[#D2E3C8]/30 border border-[#4F6F52]/20 rounded-xl space-y-1 md:col-span-2">
                <span className="font-bold text-[#4F6F52] block">5. Rencana Keuangan Singkat</span>
                <p className="text-[#1A120B] leading-relaxed">
                  Modal awal sebesar Rp2.300.000 (oven, mixer, kemasan perdana). Biaya tetap bulanan Rp600.000. Target omzet bulanan Rp2.730.000 dengan estimasi laba bersih Rp600.000/bulan (BEP 60 box brownies).
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#D6C7AE]">
        <button
          onClick={onBack}
          className="px-5 py-2.5 text-xs font-semibold text-[#5C5248] hover:text-[#1A120B] transition-colors cursor-pointer"
        >
          ← Kembali ke Review BMC
        </button>
        <button
          onClick={onContinue}
          className="px-6 py-3 bg-[#4F6F52] hover:bg-[#3D5640] active:scale-98 text-white rounded-xl font-bold text-sm shadow-md shadow-[#4F6F52]/20 flex items-center gap-2 transition-all cursor-pointer"
        >
          <span>Lanjut ke Materi Perencanaan Keuangan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
