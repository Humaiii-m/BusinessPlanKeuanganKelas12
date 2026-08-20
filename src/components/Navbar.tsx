import React from 'react';
import { 
  Compass, 
  BookOpen, 
  FileText, 
  Coins, 
  HelpCircle, 
  Edit3, 
  Award, 
  Send, 
  Settings, 
  Sparkles, 
  Printer 
} from 'lucide-react';
import { AppTab } from '../types';

interface NavbarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onOpenTeacherConfig: () => void;
  onOpenMentorModal: () => void;
  onPrintSummary: () => void;
}

interface StepItem {
  id: AppTab;
  label: string;
  shortLabel: string;
  stepNumber: number;
  icon: React.ElementType;
}

const STEPS: StepItem[] = [
  { id: 'beranda', label: 'Beranda', shortLabel: 'Home', stepNumber: 1, icon: Compass },
  { id: 'bmc', label: 'Review BMC', shortLabel: 'BMC', stepNumber: 2, icon: BookOpen },
  { id: 'materi-bp', label: 'Materi BP', shortLabel: 'BP', stepNumber: 3, icon: FileText },
  { id: 'materi-keuangan', label: 'Materi Keuangan', shortLabel: 'Keuangan', stepNumber: 4, icon: Coins },
  { id: 'quiz', label: 'Mini Quiz', shortLabel: 'Quiz', stepNumber: 5, icon: HelpCircle },
  { id: 'builder', label: 'Perencanaan Bisnis', shortLabel: 'Praktik', stepNumber: 6, icon: Edit3 },
  { id: 'hasil', label: 'Hasil Perencanaan', shortLabel: 'Hasil', stepNumber: 7, icon: Award },
  { id: 'pengumpulan', label: 'Pengumpulan Tugas', shortLabel: 'Kumpul', stepNumber: 8, icon: Send },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenTeacherConfig,
  onOpenMentorModal,
  onPrintSummary,
}) => {
  const currentStepIndex = STEPS.findIndex((s) => s.id === currentTab);
  const progressPercent = ((currentStepIndex) / (STEPS.length - 1)) * 100;

  return (
    <header className="sticky top-0 z-40 bg-[#F7F1E5]/95 backdrop-blur-md border-b border-[#D6C7AE] shadow-xs print:hidden">
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Title */}
          <div 
            onClick={() => onSelectTab('beranda')}
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#4F6F52] text-white flex items-center justify-center shadow-md shadow-[#4F6F52]/20 group-hover:scale-105 transition-transform">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-[#1A120B] leading-tight font-serif-natural">
                  Business Plan <span className="text-[#4F6F52] font-sans">& Keuangan</span>
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-[#D2E3C8] text-[#1A120B] border border-[#D6C7AE] rounded-md text-[10px] font-bold uppercase tracking-wider">
                  Kelas 12 SMA
                </span>
              </div>
              <p className="text-[11px] text-[#5C5248] hidden md:block">
                Media Belajar Informatika & Entrepreneurship
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenMentorModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EDE4D3] hover:bg-[#D2E3C8] border border-[#D6C7AE] text-[#1A120B] text-xs font-semibold transition-colors"
              title="Tanya Mentor AI seputar data perencanaanmu"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4F6F52]" />
              <span className="hidden sm:inline">Tanya Mentor AI</span>
            </button>

            {currentTab === 'hasil' && (
              <button
                onClick={onPrintSummary}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold shadow-xs transition-colors"
                title="Cetak atau Simpan PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cetak PDF</span>
              </button>
            )}

            <button
              onClick={onOpenTeacherConfig}
              className="p-2 rounded-lg bg-[#EDE4D3] hover:bg-[#D2E3C8] border border-[#D6C7AE] text-[#1A120B] transition-colors"
              title="Pengaturan Guru, Template, & Google Classroom"
              id="teacher-settings-btn"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Track Line */}
      <div className="w-full bg-[#EDE4D3] h-1 relative overflow-hidden">
        <div 
          className="h-full bg-[#4F6F52] transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Steps Navigation Bar */}
      <nav className="bg-[#EDE4D3]/70 border-t border-[#D6C7AE]/70 overflow-x-auto scrollbar-none py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between min-w-max gap-1">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentTab === step.id;
            const isCompleted = idx < currentStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => onSelectTab(step.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#4F6F52] text-white font-bold shadow-xs border border-[#4F6F52]'
                    : isCompleted
                    ? 'text-[#1A120B] hover:bg-[#D2E3C8]/60 font-medium'
                    : 'text-[#5C5248] hover:text-[#1A120B] hover:bg-[#EDE4D3]'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    isActive
                      ? 'bg-[#D2E3C8] text-[#1A120B]'
                      : isCompleted
                      ? 'bg-[#D2E3C8] text-[#1A120B]'
                      : 'bg-[#D6C7AE]/60 text-[#5C5248]'
                  }`}
                >
                  {step.stepNumber}
                </span>
                <span className="hidden md:inline">{step.label}</span>
                <span className="md:hidden">{step.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
