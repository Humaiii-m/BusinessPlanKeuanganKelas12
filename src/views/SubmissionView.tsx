import React from 'react';
import { 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Sparkles, 
  FileText, 
  BookOpen, 
  RotateCcw, 
  Printer, 
  HelpCircle,
  School,
  Link as LinkIcon
} from 'lucide-react';
import { BusinessPlanData } from '../types';

interface SubmissionViewProps {
  data: BusinessPlanData;
  onPrint: () => void;
  onOpenTeacherConfig: () => void;
  onBackToSummary: () => void;
  onRestartAll: () => void;
}

export const SubmissionView: React.FC<SubmissionViewProps> = ({
  data,
  onPrint,
  onOpenTeacherConfig,
  onBackToSummary,
  onRestartAll,
}) => {
  const handleOpenGoogleClassroom = () => {
    if (data.googleClassroomUrl && data.googleClassroomUrl.trim() !== '') {
      window.open(data.googleClassroomUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(
        'Link Google Classroom belum diatur oleh guru. Silakan buka menu Pengaturan Guru (ikon gerigi) di kanan atas untuk memasukkan URL tugas, atau buka Google Classroom sekolahmu secara mandiri.'
      );
    }
  };

  const checklistItems = [
    { title: 'Review 9 Komponen BMC', desc: 'Mengingat kembali pilar model bisnis' },
    { title: 'Mempelajari Materi Business Plan', desc: 'Memahami 6 komponen utama rencana usaha' },
    { title: 'Mempelajari 9 Modul Keuangan', desc: 'HPP, Modal, Biaya Tetap, Omzet, Laba, & BEP' },
    { title: 'Menyelesaikan Mini Quiz Mandiri', desc: 'Self-assessment pemahaman konsep' },
    { title: 'Menyusun Rencana Produk Dinamis', desc: 'Menentukan harga jual dan target kuantitas' },
    { title: 'Menghitung Modal & Biaya Operasional', desc: 'Simulasi pengeluaran dan proyeksi laba' },
    { title: 'Analisis Titik Impas (BEP) & Refleksi', desc: 'Mengevaluasi target penjualan dan perbaikan' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-in fade-in duration-300">
      {/* Celebration Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-[#D2E3C8] text-[#4F6F52] mx-auto flex items-center justify-center shadow-xs border border-[#D6C7AE]">
          <Sparkles className="w-8 h-8 text-[#4F6F52]" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#4F6F52] text-xs font-bold border border-[#D6C7AE]">
          <span>Semua Tahapan Belajar Selesai</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A120B] tracking-tight">
          Perencanaan Bisnismu Selesai!
        </h1>
        <p className="text-[#5C5248] text-sm sm:text-base leading-relaxed">
          Hebat! Kamu telah menyelesaikan seluruh alur pembelajaran dari review BMC, penguasaan rumus keuangan, mini quiz, hingga penyusunan laporan Business Plan terhitung.
        </p>
      </div>

      {/* Completion Checklist */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF9] border border-[#D6C7AE] shadow-xs space-y-4">
        <h2 className="text-xs uppercase font-bold tracking-wider text-[#5C5248] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#4F6F52]" />
          Checklist Kelulusan Aktivitas Pembelajaran
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {checklistItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#FAF6F0] border border-[#D6C7AE] rounded-xl flex items-start gap-2.5 text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-[#4F6F52] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1A120B] block">{item.title}</strong>
                <span className="text-[#5C5248] text-[11px]">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Submission Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#2C241D] text-[#FFFDF9] border border-[#1A120B] space-y-6 shadow-md">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#D2E3C8]">
            Langkah Terakhir
          </span>
          <h2 className="text-xl sm:text-2xl font-bold mt-1 text-[#FFFDF9]">
            Simpan Hasil & Kumpulkan Tugas
          </h2>
          <p className="text-xs sm:text-sm text-[#D6C7AE] mt-1 leading-relaxed">
            Download atau simpan laporan perencanaanmu sebagai file PDF, kemudian serahkan file tersebut ke Google Classroom sesuai instruksi bapak/ibu guru.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <button
            onClick={onPrint}
            className="p-4 bg-[#4F6F52] hover:bg-[#3F5942] active:scale-98 text-[#FFFDF9] rounded-xl font-bold text-sm shadow-md shadow-[#4F6F52]/30 transition-all flex items-center justify-center gap-2.5"
            id="final-download-pdf-btn"
          >
            <Printer className="w-5 h-5" />
            <span>📄 Simpan / Cetak PDF</span>
          </button>

          <button
            onClick={handleOpenGoogleClassroom}
            className="p-4 bg-[#607274] hover:bg-[#4E5E60] active:scale-98 text-[#FFFDF9] rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2.5"
            id="google-classroom-btn"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Kumpul ke Google Classroom</span>
          </button>
        </div>

        {/* Status of Google Classroom URL */}
        <div className="p-3 bg-[#1A120B]/60 border border-[#5C5248]/40 rounded-xl text-xs text-[#D6C7AE] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <LinkIcon className="w-4 h-4 text-[#D2E3C8] shrink-0" />
            <span className="truncate">
              {data.googleClassroomUrl ? (
                <>Link tugas aktif: <strong className="text-[#FFFDF9]">{data.googleClassroomUrl}</strong></>
              ) : (
                'Link Google Classroom belum diatur oleh guru (dapat diatur lewat Pengaturan).'
              )}
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenTeacherConfig}
            className="text-xs font-bold text-[#D2E3C8] hover:underline shrink-0"
          >
            Ubah Link
          </button>
        </div>
      </div>

      {/* Step by Step Submission Guide */}
      <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D6C7AE] text-xs text-[#5C5248] space-y-3">
        <h3 className="font-bold text-[#1A120B] flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#4F6F52]" />
          Cara Mengumpulkan Tugas ke Google Classroom:
        </h3>
        <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed text-[#5C5248]">
          <li>Klik tombol <strong className="text-[#1A120B]">"📄 Simpan / Cetak PDF"</strong> di atas.</li>
          <li>Pada jendela cetak browser, pilih tujuan: <strong className="text-[#1A120B]">"Save as PDF" (Simpan sebagai PDF)</strong> lalu klik Simpan.</li>
          <li>Klik tombol <strong className="text-[#1A120B]">"Kumpul ke Google Classroom"</strong> untuk membuka halaman tugas kelasmu.</li>
          <li>Di Google Classroom, pada panel <em>Tugas Anda (Your Work)</em>, klik <strong className="text-[#1A120B]">+ Tambah atau buat</strong> &gt; pilih <strong className="text-[#1A120B]">File</strong> &gt; unggah PDF yang baru kamu simpan.</li>
          <li>Klik tombol <strong className="text-[#1A120B]">Serahkan (Turn In)</strong> untuk menyelesaikan pengumpulan.</li>
        </ol>
      </div>

      {/* Bottom Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#D6C7AE]">
        <button
          onClick={onBackToSummary}
          className="px-4 py-2 text-xs font-semibold text-[#5C5248] hover:text-[#1A120B] transition-colors"
        >
          ← Kembali ke Ringkasan Laporan
        </button>

        <button
          onClick={onRestartAll}
          className="px-4 py-2 text-xs font-semibold text-[#8C7E72] hover:text-rose-700 transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Mulai Aktivitas Baru</span>
        </button>
      </div>
    </div>
  );
};
