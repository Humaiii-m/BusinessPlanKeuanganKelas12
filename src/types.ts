/**
 * Types and Interfaces for Business Plan & Perencanaan Keuangan
 */

export type AppTab = 
  | 'beranda'
  | 'bmc'
  | 'materi-bp'
  | 'materi-keuangan'
  | 'quiz'
  | 'builder'
  | 'hasil'
  | 'pengumpulan';

export interface BmcComponent {
  id: string;
  number: number;
  title: string;
  indonesianTitle: string;
  iconName: string;
  color: string;
  definition: string;
  guidingQuestion: string;
  keyPoints: string[];
  example: string;
  connectionToBusinessPlan: string;
}

export interface FinancialConcept {
  id: string;
  code: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  formula?: string;
  formulaNote?: string;
  exampleData: {
    scenario: string;
    calculationSteps: string[];
    result: string;
  };
  tips: string[];
  relatedField: string;
}

export interface QuizQuestion {
  id: string;
  number: number;
  topic: string;
  relatedConceptId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  hpp: number; // Harga Pokok Produksi per unit
  sellingPrice: number; // Harga Jual per unit
  salesTarget: number; // Target penjualan per bulan
}

export interface CapitalItem {
  id: string;
  name: string;
  category: 'Peralatan' | 'Bahan Awal' | 'Kemasan' | 'Promosi' | 'Lainnya';
  amount: number;
}

export interface FixedCostItem {
  id: string;
  name: string;
  category: 'Sewa' | 'Internet & Utilitas' | 'Software' | 'Gaji & Honor' | 'Lainnya';
  amount: number;
}

export interface BusinessPlanData {
  // Student Identitas
  studentName: string;
  studentClass: string;
  studentGroup: string;
  
  // Identitas Bisnis
  businessName: string;
  businessType: string;
  description: string;
  targetCustomer: string;
  valueProposition: string;
  
  // Produk (Dinamis)
  products: ProductItem[];
  
  // Modal Awal (Dinamis)
  initialCapitalItems: CapitalItem[];
  
  // Biaya Tetap Operasional per Bulan (Dinamis)
  fixedCostItems: FixedCostItem[];
  
  // Refleksi Siswa
  reflection: string;
  
  // Config Guru
  googleClassroomUrl: string;
  teacherName: string;
  schoolName: string;
}

export interface FinancialSummary {
  totalInitialCapital: number;
  totalMonthlyFixedCosts: number;
  totalMonthlyVariableCosts: number;
  totalMonthlyRevenue: number; // Omzet
  totalMonthlyTotalCosts: number; // Biaya Tetap + Biaya Variabel
  totalMonthlyGrossProfit: number; // Omzet - HPP
  totalMonthlyNetProfit: number; // Omzet - Total Biaya
  netProfitMargin: number; // (Laba Bersih / Omzet) * 100
  totalUnitsTarget: number;
  
  // BEP Calculation
  isSingleProduct: boolean;
  bepData: {
    singleProductUnit?: number;
    singleProductRupiah?: number;
    contributionMarginPerUnit?: number;
    multiProductBepRupiah?: number;
    weightedContributionMarginRatio?: number;
    assumptions: string[];
    productBepEstimates?: {
      productId: string;
      productName: string;
      sharePercentage: number;
      estimatedUnitsAtBep: number;
    }[];
  };
  
  // Evaluasi
  evaluationNotes: {
    type: 'success' | 'warning' | 'info' | 'caution';
    title: string;
    message: string;
  }[];
  
  // Payback period
  estimatedPaybackMonths: number | null;
}
