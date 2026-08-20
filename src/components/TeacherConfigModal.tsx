import React, { useState } from 'react';
import { X, Settings, School, Link, RotateCcw, Sparkles, Download, Upload, Check } from 'lucide-react';
import { BusinessPlanData } from '../types';
import { SAMPLE_NOURA_BAKERY, DEFAULT_INITIAL_DATA } from '../data/learningContent';

interface TeacherConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BusinessPlanData;
  onUpdateData: (newData: Partial<BusinessPlanData>) => void;
  onResetData: () => void;
  onLoadPreset: (preset: BusinessPlanData) => void;
}

export const TeacherConfigModal: React.FC<TeacherConfigModalProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
  onResetData,
  onLoadPreset,
}) => {
  const [copied, setCopied] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleExportJson = () => {
    const jsonStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonStr);
    downloadAnchor.setAttribute(
      'download',
      `BusinessPlan_${(data.businessName || 'Siswa').replace(/\s+/g, '_')}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.products && parsed.initialCapitalItems) {
            onLoadPreset(parsed);
            alert('Berhasil memuat data perencanaan dari file JSON!');
            onClose();
          } else {
            alert('Format file JSON tidak sesuai struktur Business Plan.');
          }
        } catch {
          alert('Gagal membaca file JSON. Pastikan file valid.');
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A120B]/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#D6C7AE] overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#4F6F52] text-[#FFFDF9]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/20 text-white flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Pengaturan Kelas & Guru</h3>
              <p className="text-xs text-[#D2E3C8]">
                Konfigurasi Google Classroom, identitas sekolah, & template
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

        {/* Body */}
        <div className="p-6 space-y-5 text-sm">
          {/* Google Classroom URL */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A120B] flex items-center gap-1.5">
              <Link className="w-4 h-4 text-[#4F6F52]" />
              Link Tugas Google Classroom
            </label>
            <input
              type="url"
              value={data.googleClassroomUrl}
              onChange={(e) => onUpdateData({ googleClassroomUrl: e.target.value })}
              placeholder="https://classroom.google.com/c/XXXXX/a/YYYYY/details"
              className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#D6C7AE] rounded-xl text-[#1A120B] text-xs focus:ring-2 focus:ring-[#4F6F52] focus:outline-hidden"
            />
            <p className="text-[11px] text-[#5C5248]">
              Guru dapat memasukkan link tugas Google Classroom di sini agar tombol "Kumpul ke Google Classroom" langsung membuka link tugas tersebut.
            </p>
          </div>

          {/* School Name & Teacher Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#1A120B] flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-[#5C5248]" />
                Nama Sekolah / Instansi
              </label>
              <input
                type="text"
                value={data.schoolName}
                onChange={(e) => onUpdateData({ schoolName: e.target.value })}
                placeholder="Contoh: SMAN 1 Jakarta"
                className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#D6C7AE] rounded-lg text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52] focus:outline-hidden"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#1A120B]">
                Nama Guru Pengampu
              </label>
              <input
                type="text"
                value={data.teacherName}
                onChange={(e) => onUpdateData({ teacherName: e.target.value })}
                placeholder="Contoh: Ibu Humaidah, M.Pd."
                className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#D6C7AE] rounded-lg text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="border-t border-[#D6C7AE] pt-4 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A120B]">
              Bantuan & Template Pembelajaran
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onLoadPreset(SAMPLE_NOURA_BAKERY);
                  alert('Contoh bisnis Noura Bakery berhasil dimuat!');
                  onClose();
                }}
                className="p-3 text-left border border-[#D6C7AE] bg-[#FAF6F0] hover:bg-[#EDE4D3] rounded-xl transition-colors group flex items-start gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-[#4F6F52] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#1A120B]">
                    Muat Contoh "Noura Bakery"
                  </div>
                  <div className="text-[11px] text-[#5C5248]">
                    3 produk lengkap dengan HPP, biaya, dan target realistis.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={handleExportJson}
                className="p-3 text-left border border-[#D6C7AE] bg-[#FAF6F0] hover:bg-[#EDE4D3] rounded-xl transition-colors flex items-start gap-2.5"
              >
                <Download className="w-4 h-4 text-[#5C5248] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#1A120B]">
                    Ekspor File JSON
                  </div>
                  <div className="text-[11px] text-[#5C5248]">
                    Simpan backup data formulir ke komputer.
                  </div>
                </div>
              </button>
            </div>

            {/* Import JSON */}
            <div className="flex items-center gap-2 pt-1">
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF6F0] hover:bg-[#EDE4D3] border border-[#D6C7AE] text-[#1A120B] rounded-lg text-xs font-medium transition-colors">
                <Upload className="w-3.5 h-3.5 text-[#5C5248]" />
                <span>Impor File JSON Siswa</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJson}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Reset Planning State */}
          <div className="border-t border-[#D6C7AE] pt-4">
            {!resetConfirm ? (
              <button
                type="button"
                onClick={() => setResetConfirm(true)}
                className="text-xs font-semibold text-rose-700 hover:text-rose-800 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Seluruh Data Perencanaan ke Kosong</span>
              </button>
            ) : (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                <p className="text-xs text-rose-900 font-medium">
                  Apakah kamu yakin ingin mengosongkan semua data yang sudah kamu ketik?
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onResetData();
                      setResetConfirm(false);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-bold"
                  >
                    Ya, Hapus & Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetConfirm(false)}
                    className="px-3 py-1.5 bg-[#FFFDF9] border border-[#D6C7AE] text-[#1A120B] rounded-lg text-xs font-semibold"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#FAF6F0] border-t border-[#D6C7AE] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#4F6F52] hover:bg-[#3F5942] text-[#FFFDF9] rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            Simpan & Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
