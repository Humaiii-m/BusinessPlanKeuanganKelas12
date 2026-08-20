/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { ConceptModal } from './components/ConceptModal';
import { TeacherConfigModal } from './components/TeacherConfigModal';
import { TanyaMentorModal } from './components/TanyaMentorModal';
import { HomeView } from './views/HomeView';
import { BmcReviewView } from './views/BmcReviewView';
import { BusinessPlanMateriView } from './views/BusinessPlanMateriView';
import { FinancialMateriView } from './views/FinancialMateriView';
import { QuizView } from './views/QuizView';
import { BuilderView } from './views/BuilderView';
import { SummaryView } from './views/SummaryView';
import { SubmissionView } from './views/SubmissionView';
import { AppTab, BusinessPlanData } from './types';
import { DEFAULT_INITIAL_DATA, SAMPLE_NOURA_BAKERY } from './data/learningContent';
import { calculateFinancials } from './utils/calculations';

const STORAGE_KEY = 'edu_business_plan_data_v1';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<AppTab>('beranda');

  // Business Plan Data with LocalStorage Persistence
  const [data, setData] = useState<BusinessPlanData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_INITIAL_DATA;
  });

  // Modals state
  const [conceptModalOpen, setConceptModalOpen] = useState<boolean>(false);
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [teacherConfigOpen, setTeacherConfigOpen] = useState<boolean>(false);
  const [mentorModalOpen, setMentorModalOpen] = useState<boolean>(false);

  // Auto-save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  // Derived Financial Calculations
  const financials = useMemo(() => {
    return calculateFinancials(data);
  }, [data]);

  // Helper functions
  const handleUpdateData = (newData: Partial<BusinessPlanData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const handleResetData = () => {
    setData(DEFAULT_INITIAL_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleLoadPreset = (preset: BusinessPlanData) => {
    setData(preset);
  };

  const handleOpenConcept = (conceptId: string) => {
    setSelectedConceptId(conceptId);
    setConceptModalOpen(true);
  };

  const handlePrint = () => {
    // If not in 'hasil', switch to 'hasil' first then trigger print
    if (currentTab !== 'hasil') {
      setCurrentTab('hasil');
      setTimeout(() => {
        window.print();
      }, 300);
    } else {
      window.print();
    }
  };

  const hasExistingData = Boolean(
    data.businessName || 
    (data.products.length > 0 && data.products[0].name) ||
    data.studentName
  );

  return (
    <div className="min-h-screen bg-[#F7F1E5] text-[#1A120B] flex flex-col font-sans selection:bg-[#D2E3C8] selection:text-[#1A120B]">
      {/* Top Main Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenTeacherConfig={() => setTeacherConfigOpen(true)}
        onOpenMentorModal={() => setMentorModalOpen(true)}
        onPrintSummary={handlePrint}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'beranda' && (
          <HomeView
            onStartLearning={() => setCurrentTab('bmc')}
            onNavigate={setCurrentTab}
            hasExistingData={hasExistingData}
          />
        )}

        {currentTab === 'bmc' && (
          <BmcReviewView
            onContinue={() => setCurrentTab('materi-bp')}
          />
        )}

        {currentTab === 'materi-bp' && (
          <BusinessPlanMateriView
            onContinue={() => setCurrentTab('materi-keuangan')}
            onBack={() => setCurrentTab('bmc')}
          />
        )}

        {currentTab === 'materi-keuangan' && (
          <FinancialMateriView
            onContinue={() => setCurrentTab('quiz')}
            onBack={() => setCurrentTab('materi-bp')}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizView
            onContinueToBuilder={() => setCurrentTab('builder')}
            onReviewMateri={() => setCurrentTab('materi-keuangan')}
            onOpenConcept={handleOpenConcept}
          />
        )}

        {currentTab === 'builder' && (
          <BuilderView
            data={data}
            financials={financials}
            onUpdateData={handleUpdateData}
            onOpenConcept={handleOpenConcept}
            onCompleteToSummary={() => setCurrentTab('hasil')}
            onOpenMentorModal={() => setMentorModalOpen(true)}
          />
        )}

        {currentTab === 'hasil' && (
          <SummaryView
            data={data}
            financials={financials}
            onContinueToSubmission={() => setCurrentTab('pengumpulan')}
            onBackToBuilder={() => setCurrentTab('builder')}
            onPrint={handlePrint}
          />
        )}

        {currentTab === 'pengumpulan' && (
          <SubmissionView
            data={data}
            onPrint={handlePrint}
            onOpenTeacherConfig={() => setTeacherConfigOpen(true)}
            onBackToSummary={() => setCurrentTab('hasil')}
            onRestartAll={() => {
              if (window.confirm('Apakah kamu ingin kembali ke beranda? Datamu tetap tersimpan di browser.')) {
                setCurrentTab('beranda');
              }
            }}
          />
        )}
      </main>

      {/* Footer (Hidden in Print) */}
      <footer className="bg-[#EDE4D3]/60 border-t border-[#D6C7AE] py-6 px-4 text-center text-xs text-[#5C5248] print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong className="text-[#1A120B]">Media Belajar Business Plan & Perencanaan Keuangan</strong> — Kelas 12 SMA
          </div>
          <div className="text-[#8C7E72] text-[11px]">
            Informatika / IT & Entrepreneurship • Mode Pembelajaran Mandiri
          </div>
        </div>
      </footer>

      {/* Global Concept Explanation Modal */}
      <ConceptModal
        conceptId={selectedConceptId}
        isOpen={conceptModalOpen}
        onClose={() => setConceptModalOpen(false)}
        onSelectConcept={(id) => setSelectedConceptId(id)}
      />

      {/* Global Teacher / Classroom Config Modal */}
      <TeacherConfigModal
        isOpen={teacherConfigOpen}
        onClose={() => setTeacherConfigOpen(false)}
        data={data}
        onUpdateData={handleUpdateData}
        onResetData={handleResetData}
        onLoadPreset={handleLoadPreset}
      />

      {/* Global Mentor AI / Assistant Modal */}
      <TanyaMentorModal
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
        data={data}
        financials={financials}
        onNavigateToTab={(tabId) => setCurrentTab(tabId as AppTab)}
      />
    </div>
  );
}
