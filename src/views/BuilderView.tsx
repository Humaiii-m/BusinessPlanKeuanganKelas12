import React, { useState } from 'react';
import { 
  Building2, 
  ShoppingBag, 
  Coins, 
  Calculator, 
  TrendingUp, 
  Target, 
  HelpCircle, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Info, 
  RotateCcw,
  Edit3,
  BookOpen,
  PieChart
} from 'lucide-react';
import { BusinessPlanData, FinancialSummary, ProductItem, CapitalItem, FixedCostItem } from '../types';
import { formatRupiah, formatNumber } from '../utils/calculations';

interface BuilderViewProps {
  data: BusinessPlanData;
  financials: FinancialSummary;
  onUpdateData: (newData: Partial<BusinessPlanData>) => void;
  onOpenConcept: (conceptId: string) => void;
  onCompleteToSummary: () => void;
  onOpenMentorModal: () => void;
}

export const BuilderView: React.FC<BuilderViewProps> = ({
  data,
  financials,
  onUpdateData,
  onOpenConcept,
  onCompleteToSummary,
  onOpenMentorModal,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  // Helper to add dynamic product
  const handleAddProduct = () => {
    const newProduct: ProductItem = {
      id: `prod-${Date.now()}`,
      name: '',
      description: '',
      hpp: 0,
      sellingPrice: 0,
      salesTarget: 0,
    };
    onUpdateData({ products: [...data.products, newProduct] });
  };

  const handleUpdateProduct = (id: string, field: keyof ProductItem, value: any) => {
    const updated = data.products.map((p) => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    });
    onUpdateData({ products: updated });
  };

  const handleDeleteProduct = (id: string) => {
    if (data.products.length <= 1) {
      alert('Minimal harus ada 1 produk dalam perencanaan bisnismu.');
      return;
    }
    const updated = data.products.filter((p) => p.id !== id);
    onUpdateData({ products: updated });
  };

  // Helper to add dynamic initial capital item
  const handleAddCapitalItem = () => {
    const newItem: CapitalItem = {
      id: `cap-${Date.now()}`,
      name: '',
      category: 'Peralatan',
      amount: 0,
    };
    onUpdateData({ initialCapitalItems: [...data.initialCapitalItems, newItem] });
  };

  const handleUpdateCapitalItem = (id: string, field: keyof CapitalItem, value: any) => {
    const updated = data.initialCapitalItems.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onUpdateData({ initialCapitalItems: updated });
  };

  const handleDeleteCapitalItem = (id: string) => {
    if (data.initialCapitalItems.length <= 1) {
      alert('Minimal harus ada 1 item modal awal.');
      return;
    }
    const updated = data.initialCapitalItems.filter((i) => i.id !== id);
    onUpdateData({ initialCapitalItems: updated });
  };

  // Helper to add dynamic fixed cost item
  const handleAddFixedCostItem = () => {
    const newItem: FixedCostItem = {
      id: `fc-${Date.now()}`,
      name: '',
      category: 'Sewa',
      amount: 0,
    };
    onUpdateData({ fixedCostItems: [...data.fixedCostItems, newItem] });
  };

  const handleUpdateFixedCostItem = (id: string, field: keyof FixedCostItem, value: any) => {
    const updated = data.fixedCostItems.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onUpdateData({ fixedCostItems: updated });
  };

  const handleDeleteFixedCostItem = (id: string) => {
    if (data.fixedCostItems.length <= 1) {
      alert('Minimal harus ada 1 item biaya tetap.');
      return;
    }
    const updated = data.fixedCostItems.filter((i) => i.id !== id);
    onUpdateData({ fixedCostItems: updated });
  };

  const subSteps = [
    { num: 1, title: 'Info Bisnis', icon: Building2 },
    { num: 2, title: 'Produk & HPP', icon: ShoppingBag },
    { num: 3, title: 'Modal Awal', icon: Coins },
    { num: 4, title: 'Biaya Tetap', icon: Calculator },
    { num: 5, title: 'Proyeksi Laba', icon: TrendingUp },
    { num: 6, title: 'Titik Impas (BEP)', icon: Target },
    { num: 7, title: 'Evaluasi', icon: PieChart },
    { num: 8, title: 'Refleksi', icon: Edit3 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header & Sub-Step Tracker */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE4D3] text-[#1A120B] text-xs font-semibold border border-[#D6C7AE]">
              <Edit3 className="w-3.5 h-3.5 text-[#4F6F52]" />
              <span>Praktik Penyusunan Bisnis & Keuangan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-natural font-bold text-[#1A120B] mt-1">
              Business Plan & Financial Builder
            </h1>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-2 bg-[#EDE4D3]/70 border border-[#D6C7AE] p-1.5 rounded-xl text-xs font-medium">
            <span className="px-2 py-1 bg-white rounded-lg border border-[#D6C7AE] text-[#1A120B] shadow-2xs">
              Omzet: <strong>{formatRupiah(financials.totalMonthlyRevenue)}</strong>
            </span>
            <span className={`px-2 py-1 rounded-lg border shadow-2xs ${financials.totalMonthlyNetProfit >= 0 ? 'bg-[#D2E3C8]/70 text-[#1A120B] border-[#4F6F52]/30' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>
              Laba: <strong>{formatRupiah(financials.totalMonthlyNetProfit)}</strong>
            </span>
            <button
              type="button"
              onClick={onOpenMentorModal}
              className="p-1.5 bg-[#4F6F52] text-white rounded-lg hover:bg-[#3D5640] transition-colors"
              title="Tanya Mentor AI"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sub-steps navigation pills */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 p-1.5 bg-[#EDE4D3]/60 border border-[#D6C7AE] rounded-2xl">
          {subSteps.map((s) => {
            const Icon = s.icon;
            const isActive = activeStep === s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setActiveStep(s.num)}
                className={`py-2 px-1.5 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  isActive
                    ? 'bg-[#4F6F52] text-white font-bold shadow-xs'
                    : 'text-[#5C5248] hover:bg-white/80 font-medium'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">Step {s.num}</span>
                </div>
                <span className="text-[11px] truncate w-full text-center">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: INFORMASI BISNIS & SISWA */}
      {activeStep === 1 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D6C7AE] shadow-xs space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE4D3]">
            <div>
              <span className="text-xs uppercase font-bold text-[#4F6F52]">Step 1 dari 8</span>
              <h2 className="text-xl font-serif-natural font-bold text-[#1A120B]">Identitas Siswa & Profil Bisnis</h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenConcept('produk')}
              className="text-xs font-semibold text-[#4F6F52] hover:text-[#3D5640] flex items-center gap-1.5 bg-[#EDE4D3]/60 px-3 py-1.5 rounded-lg border border-[#D6C7AE]"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Pelajari Materi Business Plan</span>
            </button>
          </div>

          <div className="p-4 bg-[#F7F1E5]/60 border border-[#D6C7AE] rounded-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A120B]">Identitas Pemilik / Kelompok</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#5C5248] mb-1">Nama Siswa / Tim</label>
                <input
                  type="text"
                  value={data.studentName}
                  onChange={(e) => onUpdateData({ studentName: e.target.value })}
                  placeholder="Contoh: Noura Aisyah & Tim"
                  className="w-full px-3 py-2 bg-white border border-[#D6C7AE] rounded-lg text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5C5248] mb-1">Kelas</label>
                <input
                  type="text"
                  value={data.studentClass}
                  onChange={(e) => onUpdateData({ studentClass: e.target.value })}
                  placeholder="Contoh: XII MIPA 2 / XII RPL"
                  className="w-full px-3 py-2 bg-white border border-[#D6C7AE] rounded-lg text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5C5248] mb-1">Kelompok / No. Absen</label>
                <input
                  type="text"
                  value={data.studentGroup}
                  onChange={(e) => onUpdateData({ studentGroup: e.target.value })}
                  placeholder="Contoh: Kelompok 3"
                  className="w-full px-3 py-2 bg-white border border-[#D6C7AE] rounded-lg text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A120B] mb-1">
                  Nama Bisnis / Brand
                </label>
                <input
                  type="text"
                  value={data.businessName}
                  onChange={(e) => onUpdateData({ businessName: e.target.value })}
                  placeholder="Contoh: Noura Bakery Studio"
                  className="w-full px-3.5 py-2.5 bg-[#F7F1E5]/50 border border-[#D6C7AE] rounded-xl text-xs sm:text-sm text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1A120B] mb-1">
                  Jenis Usaha / Kategori
                </label>
                <input
                  type="text"
                  value={data.businessType}
                  onChange={(e) => onUpdateData({ businessType: e.target.value })}
                  placeholder="Contoh: Kuliner Pastry Kekinian / Jasa Desain IT"
                  className="w-full px-3.5 py-2.5 bg-[#F7F1E5]/50 border border-[#D6C7AE] rounded-xl text-xs sm:text-sm text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A120B] mb-1">
                Deskripsi Singkat Usaha
              </label>
              <textarea
                rows={2}
                value={data.description}
                onChange={(e) => onUpdateData({ description: e.target.value })}
                placeholder="Jelaskan secara singkat apa usaha ini dan bagaimana kamu memulainya..."
                className="w-full px-3.5 py-2.5 bg-[#F7F1E5]/50 border border-[#D6C7AE] rounded-xl text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#1A120B]">
                    Target Pelanggan (Customer Segments)
                  </label>
                  <button
                    type="button"
                    onClick={() => onOpenConcept('produk')}
                    className="text-[11px] text-[#4F6F52] hover:underline flex items-center gap-1"
                  >
                    <HelpCircle className="w-3 h-3" /> ? Pelajari
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={data.targetCustomer}
                  onChange={(e) => onUpdateData({ targetCustomer: e.target.value })}
                  placeholder="Siapa pelanggan utamamu? Usia, profesi, daya beli..."
                  className="w-full px-3.5 py-2 bg-[#F7F1E5]/50 border border-[#D6C7AE] rounded-xl text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#1A120B]">
                    Value Proposition / Keunggulan Produk
                  </label>
                  <button
                    type="button"
                    onClick={() => onOpenConcept('produk')}
                    className="text-[11px] text-[#4F6F52] hover:underline flex items-center gap-1"
                  >
                    <HelpCircle className="w-3 h-3" /> ? Pelajari
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={data.valueProposition}
                  onChange={(e) => onUpdateData({ valueProposition: e.target.value })}
                  placeholder="Mengapa pelanggan harus membeli produkmu? Keunggulan rasa, harga, kemasan..."
                  className="w-full px-3.5 py-2 bg-[#F7F1E5]/50 border border-[#D6C7AE] rounded-xl text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: PRODUK (DINAMIS DENGAN REAL-TIME MARGIN & HPP) */}
      {activeStep === 2 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D6C7AE] shadow-xs space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EDE4D3]">
            <div>
              <span className="text-xs uppercase font-bold text-[#4F6F52]">Step 2 dari 8</span>
              <h2 className="text-xl font-serif-natural font-bold text-[#1A120B]">
                Daftar Produk, HPP, & Harga Jual ({data.products.length} Produk)
              </h2>
              <p className="text-xs text-[#5C5248]">
                Kamu dapat menambahkan 1, 2, 3, atau lebih produk sesuai bisnismu secara dinamis.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenConcept('hpp')}
                className="text-xs font-semibold text-[#4F6F52] hover:text-[#3D5640] flex items-center gap-1 bg-[#EDE4D3]/60 px-2.5 py-1.5 rounded-lg border border-[#D6C7AE]"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Pelajari HPP & Harga Jual</span>
              </button>
              <button
                type="button"
                onClick={handleAddProduct}
                className="px-3.5 py-1.5 bg-[#4F6F52] hover:bg-[#3D5640] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                id="add-product-btn"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tambah Produk</span>
              </button>
            </div>
          </div>

          {/* Product Items List */}
          <div className="space-y-4">
            {data.products.map((product, pIndex) => {
              const unitMargin = (product.sellingPrice || 0) - (product.hpp || 0);
              const estProductGrossProfit = unitMargin * (product.salesTarget || 0);
              const estProductOmzet = (product.sellingPrice || 0) * (product.salesTarget || 0);
              const isLoss = (product.sellingPrice || 0) > 0 && unitMargin < 0;

              return (
                <div
                  key={product.id}
                  className={`p-5 rounded-2xl border transition-all space-y-4 ${
                    isLoss 
                      ? 'bg-rose-50/60 border-rose-300' 
                      : 'bg-[#F7F1E5]/60 border-[#D6C7AE]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-[#1A120B] text-sm">
                      <span className="w-6 h-6 rounded-md bg-[#4F6F52] text-white flex items-center justify-center text-xs">
                        {pIndex + 1}
                      </span>
                      <span className="font-serif-natural font-bold">Produk #{pIndex + 1}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-100 p-1.5 rounded-lg transition-colors flex items-center gap-1"
                      title="Hapus Produk Ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A120B] mb-1">
                        Nama Produk
                      </label>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleUpdateProduct(product.id, 'name', e.target.value)}
                        placeholder="Contoh: Brownies Fudgy Box"
                        className="w-full px-3 py-2 bg-white border border-[#D6C7AE] rounded-lg text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1A120B] mb-1">
                        Deskripsi Singkat Varian
                      </label>
                      <input
                        type="text"
                        value={product.description}
                        onChange={(e) => handleUpdateProduct(product.id, 'description', e.target.value)}
                        placeholder="Contoh: Cokelat Belgia lumer kemasan box 20x10"
                        className="w-full px-3 py-2 bg-white border border-[#D6C7AE] rounded-lg text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Financial Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* HPP */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#1A120B]">
                          HPP per Unit (Rp)
                        </label>
                        <button
                          type="button"
                          onClick={() => onOpenConcept('hpp')}
                          className="text-[10px] text-[#4F6F52] hover:underline"
                        >
                          ? Pelajari
                        </button>
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={product.hpp || ''}
                        onChange={(e) => handleUpdateProduct(product.id, 'hpp', Number(e.target.value))}
                        placeholder="0"
                        className="w-full px-3 py-2 bg-white border border-[#D6C7AE] rounded-lg text-xs font-mono text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden"
                      />
                      <span className="text-[10px] text-[#5C5248] block">
                        Biaya bahan + kemasan 1 unit
                      </span>
                    </div>

                    {/* Harga Jual */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#1A120B]">
                          Harga Jual per Unit (Rp)
                        </label>
                        <button
                          type="button"
                          onClick={() => onOpenConcept('harga-jual')}
                          className="text-[10px] text-[#4F6F52] hover:underline"
                        >
                          ? Pelajari
                        </button>
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={product.sellingPrice || ''}
                        onChange={(e) => handleUpdateProduct(product.id, 'sellingPrice', Number(e.target.value))}
                        placeholder="0"
                        className="w-full px-3 py-2 bg-white border border-[#D6C7AE] rounded-lg text-xs font-mono text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden font-bold"
                      />
                      <span className="text-[10px] text-[#5C5248] block">
                        Harga dibayar pembeli
                      </span>
                    </div>

                    {/* Target Penjualan */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#1A120B]">
                          Target Penjualan / Bulan
                        </label>
                        <button
                          type="button"
                          onClick={() => onOpenConcept('omzet')}
                          className="text-[10px] text-[#4F6F52] hover:underline"
                        >
                          ? Pelajari
                        </button>
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={product.salesTarget || ''}
                        onChange={(e) => handleUpdateProduct(product.id, 'salesTarget', Number(e.target.value))}
                        placeholder="0"
                        className="w-full px-3 py-2 bg-white border border-[#D6C7AE] rounded-lg text-xs font-mono text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden"
                      />
                      <span className="text-[10px] text-[#5C5248] block">
                        Kuantitas unit dalam sebulan
                      </span>
                    </div>
                  </div>

                  {/* Micro-interaction Live Learning feedback */}
                  <div className="p-3 bg-white rounded-xl border border-[#D6C7AE] text-xs flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-[#5C5248]">Keuntungan kotor/unit:</span>{' '}
                        <strong className={`font-mono ${unitMargin > 0 ? 'text-[#4F6F52]' : unitMargin < 0 ? 'text-rose-600' : 'text-[#1A120B]'}`}>
                          {formatRupiah(unitMargin)}
                        </strong>
                      </div>
                      <div className="hidden sm:inline text-[#D6C7AE]">|</div>
                      <div>
                        <span className="text-[#5C5248]">Omzet produk:</span>{' '}
                        <strong className="font-mono text-[#1A120B]">{formatRupiah(estProductOmzet)}</strong>
                      </div>
                    </div>

                    <div>
                      <span className="text-[#5C5248]">Estimasi Laba Kotor:</span>{' '}
                      <strong className={`font-mono ${estProductGrossProfit >= 0 ? 'text-[#4F6F52]' : 'text-rose-600'}`}>
                        {formatRupiah(estProductGrossProfit)}
                      </strong>
                    </div>
                  </div>

                  {/* Warning if Selling Price < HPP */}
                  {isLoss && (
                    <div className="p-2.5 bg-rose-100/80 border border-rose-300 rounded-lg text-xs text-rose-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>
                        <strong>Perhatian Edukatif:</strong> Harga jualmu ({formatRupiah(product.sellingPrice)}) lebih rendah daripada HPP ({formatRupiah(product.hpp)}). Dalam simulasi ini, kamu merugi {formatRupiah(Math.abs(unitMargin))} pada setiap unit yang terjual!
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleAddProduct}
              className="w-full py-3 border-2 border-dashed border-[#4F6F52]/40 bg-[#EDE4D3]/40 hover:bg-[#EDE4D3]/70 text-[#1A120B] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Produk Lainnya (Brownies, Cookies, Minuman, dll.)</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: MODAL AWAL */}
      {activeStep === 3 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D6C7AE] shadow-xs space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EDE4D3]">
            <div>
              <span className="text-xs uppercase font-bold text-[#4F6F52]">Step 3 dari 8</span>
              <h2 className="text-xl font-serif-natural font-bold text-[#1A120B]">Kebutuhan Modal Awal</h2>
              <p className="text-xs text-[#5C5248]">
                Peralatan, stok bahan pertama, kemasan awal, dan media promosi yang dibeli sebelum buka usaha.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenConcept('modal-awal')}
                className="text-xs font-semibold text-[#4F6F52] hover:text-[#3D5640] flex items-center gap-1 bg-[#EDE4D3]/60 px-2.5 py-1.5 rounded-lg border border-[#D6C7AE]"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Pelajari Modal Awal</span>
              </button>
              <button
                type="button"
                onClick={handleAddCapitalItem}
                className="px-3.5 py-1.5 bg-[#4F6F52] hover:bg-[#3D5640] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tambah Item Modal</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {data.initialCapitalItems.map((item, cIndex) => (
              <div
                key={item.id}
                className="p-3 bg-[#F7F1E5]/60 rounded-xl border border-[#D6C7AE] grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-xs"
              >
                <div className="sm:col-span-6">
                  <label className="block text-[11px] text-[#5C5248] mb-0.5 sm:hidden">Nama Kebutuhan</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdateCapitalItem(item.id, 'name', e.target.value)}
                    placeholder="Contoh: Oven Listrik, Mixer, Banner, Stok Awal"
                    className="w-full px-3 py-2 bg-white border border-[#D6C7AE] rounded-lg text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] text-[#5C5248] mb-0.5 sm:hidden">Kategori</label>
                  <select
                    value={item.category}
                    onChange={(e) => handleUpdateCapitalItem(item.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D6C7AE] rounded-lg text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden"
                  >
                    <option value="Peralatan">Peralatan</option>
                    <option value="Bahan Awal">Bahan Awal</option>
                    <option value="Kemasan">Kemasan</option>
                    <option value="Promosi">Promosi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-[#5C5248] mb-0.5 sm:hidden">Nominal (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    value={item.amount || ''}
                    onChange={(e) => handleUpdateCapitalItem(item.id, 'amount', Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-white border border-[#D6C7AE] rounded-lg text-xs font-mono text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden font-semibold"
                  />
                </div>

                <div className="sm:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDeleteCapitalItem(item.id)}
                    className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
                    title="Hapus item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#D2E3C8]/40 border border-[#4F6F52]/30 rounded-xl flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-[#1A120B]">
              Total Modal Awal yang Diperlukan:
            </span>
            <span className="text-base sm:text-xl font-extrabold font-mono text-[#4F6F52]">
              {formatRupiah(financials.totalInitialCapital)}
            </span>
          </div>
        </div>
      )}

      {/* STEP 4: BIAYA TETAP OPERASIONAL */}
      {activeStep === 4 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D6C7AE] shadow-xs space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EDE4D3]">
            <div>
              <span className="text-xs uppercase font-bold text-[#4F6F52]">Step 4 dari 8</span>
              <h2 className="text-xl font-serif-natural font-bold text-[#1A120B]">Biaya Tetap Operasional Bulanan</h2>
              <p className="text-xs text-[#5C5248]">
                Pengeluaran rutin yang wajib dibayar per bulan meskipun jumlah penjualan naik atau turun.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenConcept('biaya-tetap')}
                className="text-xs font-semibold text-[#4F6F52] hover:text-[#3D5640] flex items-center gap-1 bg-[#EDE4D3]/60 px-2.5 py-1.5 rounded-lg border border-[#D6C7AE]"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Pelajari Biaya Tetap</span>
              </button>
              <button
                type="button"
                onClick={handleAddFixedCostItem}
                className="px-3.5 py-1.5 bg-[#4F6F52] hover:bg-[#3D5640] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tambah Biaya Tetap</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {data.fixedCostItems.map((item, fIndex) => (
              <div
                key={item.id}
                className="p-3 bg-[#F7F1E5]/60 rounded-xl border border-[#D6C7AE] grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-xs"
              >
                <div className="sm:col-span-6">
                  <label className="block text-[11px] text-[#5C5248] mb-0.5 sm:hidden">Nama Biaya</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdateFixedCostItem(item.id, 'name', e.target.value)}
                    placeholder="Contoh: Sewa Meja Kantin, Kuota Internet, Gas LPG Rutin"
                    className="w-full px-3 py-2 bg-white border border-[#D6C7AE] rounded-lg text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] text-[#5C5248] mb-0.5 sm:hidden">Kategori</label>
                  <select
                    value={item.category}
                    onChange={(e) => handleUpdateFixedCostItem(item.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D6C7AE] rounded-lg text-xs text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden"
                  >
                    <option value="Sewa">Sewa Tempat</option>
                    <option value="Internet & Utilitas">Internet & Listrik/Gas</option>
                    <option value="Software">Software / Aplikasi</option>
                    <option value="Gaji & Honor">Gaji & Honor</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-[#5C5248] mb-0.5 sm:hidden">Nominal / Bulan (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    value={item.amount || ''}
                    onChange={(e) => handleUpdateFixedCostItem(item.id, 'amount', Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-white border border-[#D6C7AE] rounded-lg text-xs font-mono text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden font-semibold"
                  />
                </div>

                <div className="sm:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDeleteFixedCostItem(item.id)}
                    className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
                    title="Hapus item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#D2E3C8]/40 border border-[#4F6F52]/30 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs sm:text-sm font-bold text-[#1A120B] block">
                Total Biaya Tetap per Bulan:
              </span>
              <span className="text-[11px] text-[#5C5248]">
                Harus tertutupi dari keuntungan kotor seluruh produk
              </span>
            </div>
            <span className="text-base sm:text-xl font-extrabold font-mono text-[#4F6F52]">
              {formatRupiah(financials.totalMonthlyFixedCosts)}
            </span>
          </div>
        </div>
      )}

      {/* STEP 5: PROYEKSI PENJUALAN & LABA RUGI */}
      {activeStep === 5 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D6C7AE] shadow-xs space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EDE4D3]">
            <div>
              <span className="text-xs uppercase font-bold text-[#4F6F52]">Step 5 dari 8</span>
              <h2 className="text-xl font-serif-natural font-bold text-[#1A120B]">Proyeksi Penjualan & Simulasi Laba Rugi</h2>
              <p className="text-xs text-[#5C5248]">
                Kalkulasi otomatis berdasarkan target penjualan, harga jual, HPP, dan biaya tetap.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenConcept('laba')}
              className="text-xs font-semibold text-[#4F6F52] hover:text-[#3D5640] flex items-center gap-1 bg-[#EDE4D3]/60 px-2.5 py-1.5 rounded-lg border border-[#D6C7AE] self-start sm:self-auto"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Pelajari Omzet vs Laba</span>
            </button>
          </div>

          {/* Breakdown Table */}
          <div className="overflow-x-auto border border-[#D6C7AE] rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#EDE4D3]/60 text-[#1A120B] border-b border-[#D6C7AE] font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Produk</th>
                  <th className="p-3 text-right">Harga Jual</th>
                  <th className="p-3 text-right">HPP</th>
                  <th className="p-3 text-right">Target (Unit)</th>
                  <th className="p-3 text-right">Omzet Produk</th>
                  <th className="p-3 text-right">Laba Kotor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE4D3]">
                {data.products.map((p, idx) => {
                  const unitMargin = (p.sellingPrice || 0) - (p.hpp || 0);
                  const pRev = (p.sellingPrice || 0) * (p.salesTarget || 0);
                  const pGross = unitMargin * (p.salesTarget || 0);

                  return (
                    <tr key={p.id} className="hover:bg-[#EDE4D3]/30">
                      <td className="p-3 font-semibold text-[#1A120B]">
                        {idx + 1}. {p.name || 'Produk Baru'}
                      </td>
                      <td className="p-3 text-right font-mono">{formatRupiah(p.sellingPrice)}</td>
                      <td className="p-3 text-right font-mono text-[#5C5248]">{formatRupiah(p.hpp)}</td>
                      <td className="p-3 text-right font-mono font-bold text-[#1A120B]">{formatNumber(p.salesTarget)} unit</td>
                      <td className="p-3 text-right font-mono font-bold text-[#4F6F52]">{formatRupiah(pRev)}</td>
                      <td className={`p-3 text-right font-mono font-bold ${pGross >= 0 ? 'text-[#4F6F52]' : 'text-rose-600'}`}>
                        {formatRupiah(pGross)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Aggregated Totals Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-[#F7F1E5]/60 border border-[#D6C7AE] rounded-xl text-center">
              <span className="text-[11px] text-[#5C5248] block">Total Unit Terjual</span>
              <span className="text-base sm:text-xl font-bold font-mono text-[#1A120B]">
                {formatNumber(financials.totalUnitsTarget)} unit
              </span>
            </div>

            <div className="p-4 bg-[#D2E3C8]/40 border border-[#4F6F52]/30 rounded-xl text-center">
              <span className="text-[11px] text-[#4F6F52] font-semibold block">Total Omzet / Bulan</span>
              <span className="text-base sm:text-xl font-bold font-mono text-[#1A120B]">
                {formatRupiah(financials.totalMonthlyRevenue)}
              </span>
            </div>

            <div className="p-4 bg-[#F7F1E5]/60 border border-[#D6C7AE] rounded-xl text-center">
              <span className="text-[11px] text-[#5C5248] block">Total Estimasi Biaya</span>
              <span className="text-base sm:text-xl font-bold font-mono text-[#1A120B]">
                {formatRupiah(financials.totalMonthlyTotalCosts)}
              </span>
            </div>

            <div className={`p-4 rounded-xl border text-center ${financials.totalMonthlyNetProfit >= 0 ? 'bg-[#D2E3C8]/70 border-[#4F6F52]/40' : 'bg-rose-100/70 border-rose-300'}`}>
              <span className="text-[11px] font-bold block text-[#1A120B]">Estimasi Laba Bersih</span>
              <span className={`text-base sm:text-xl font-extrabold font-mono ${financials.totalMonthlyNetProfit >= 0 ? 'text-[#4F6F52]' : 'text-rose-800'}`}>
                {formatRupiah(financials.totalMonthlyNetProfit)}
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#EDE4D3]/60 rounded-xl border border-[#D6C7AE] text-xs text-[#1A120B] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#4F6F52] shrink-0" />
            <span>
              <strong>Catatan Edukatif:</strong> Ini adalah estimasi berdasarkan target yang kamu masukkan. Margin laba bersih bisnismu adalah <strong>{financials.netProfitMargin.toFixed(1)}%</strong>.
            </span>
          </div>
        </div>
      )}

      {/* STEP 6: BEP (BREAK EVEN POINT) */}
      {activeStep === 6 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D6C7AE] shadow-xs space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EDE4D3]">
            <div>
              <span className="text-xs uppercase font-bold text-[#4F6F52]">Step 6 dari 8</span>
              <h2 className="text-xl font-serif-natural font-bold text-[#1A120B]">Perhitungan Break Even Point (BEP)</h2>
              <p className="text-xs text-[#5C5248]">
                Titik impas di mana seluruh pengeluaran tertutupi pas tanpa ada laba maupun rugi.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenConcept('bep')}
              className="text-xs font-semibold text-[#4F6F52] hover:text-[#3D5640] flex items-center gap-1 bg-[#EDE4D3]/60 px-2.5 py-1.5 rounded-lg border border-[#D6C7AE] self-start sm:self-auto"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Pelajari Rumus BEP</span>
            </button>
          </div>

          {financials.isSingleProduct ? (
            /* Single Product BEP Display */
            <div className="space-y-4">
              <div className="p-4 bg-[#EDE4D3]/50 border border-[#D6C7AE] rounded-xl space-y-2">
                <span className="text-xs font-bold text-[#1A120B] uppercase tracking-wider">
                  Bisnis 1 Produk ({data.products[0]?.name || 'Produk Utama'}):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-[#D6C7AE]">
                    <span className="text-[#5C5248] block">Biaya Tetap</span>
                    <strong className="font-mono text-[#1A120B]">{formatRupiah(financials.totalMonthlyFixedCosts)}</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-[#D6C7AE]">
                    <span className="text-[#5C5248] block">Harga Jual</span>
                    <strong className="font-mono text-[#1A120B]">{formatRupiah(data.products[0]?.sellingPrice)}</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-[#D6C7AE]">
                    <span className="text-[#5C5248] block">HPP / Biaya Variabel</span>
                    <strong className="font-mono text-[#1A120B]">{formatRupiah(data.products[0]?.hpp)}</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-[#D6C7AE]">
                    <span className="text-[#5C5248] block">Margin Kontribusi/unit</span>
                    <strong className="font-mono text-[#4F6F52]">{formatRupiah(financials.bepData.contributionMarginPerUnit || 0)}</strong>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#4F6F52] text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md shadow-[#4F6F52]/20">
                <div>
                  <span className="text-xs uppercase font-bold text-[#D2E3C8]">Estimasi Titik Impas (BEP)</span>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
                    {formatNumber(financials.bepData.singleProductUnit)} Unit / Bulan
                  </div>
                  <div className="text-xs text-[#D2E3C8]/90 mt-1">
                    Setara dengan omzet minimal: <strong className="text-white font-mono">{formatRupiah(financials.bepData.singleProductRupiah)}</strong>
                  </div>
                </div>

                <div className="p-3 bg-white/10 rounded-xl text-xs space-y-1">
                  <div className="text-white/80">Target Penjualanmu: <strong>{data.products[0]?.salesTarget || 0} unit</strong></div>
                  <div className="text-[#D2E3C8] font-bold">
                    {(data.products[0]?.salesTarget || 0) >= (financials.bepData.singleProductUnit || 0)
                      ? '✅ Target di atas BEP (Menghasilkan Laba)'
                      : '⚠️ Target di bawah BEP (Masih Rugi)'}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Multi-Product BEP Display */
            <div className="space-y-4">
              <div className="p-4 bg-[#EDE4D3]/60 border border-[#D6C7AE] rounded-xl space-y-2 text-xs">
                <span className="font-bold text-[#1A120B] block">
                  Pendekatan BEP Multi-Produk ({data.products.length} Produk):
                </span>
                <p className="text-[#5C5248] leading-relaxed">
                  Karena memiliki lebih dari 1 produk dengan harga dan HPP berbeda, BEP dihitung menggunakan <strong>BEP Omzet</strong> berbasis Rasio Margin Kontribusi Gabungan (Weighted CMR).
                </p>
                <div className="p-2.5 bg-white rounded-lg border border-[#D6C7AE] font-mono text-[#1A120B]">
                  Rasio Margin Kontribusi Gabungan (CMR) = <strong>{((financials.bepData.weightedContributionMarginRatio || 0) * 100).toFixed(1)}%</strong>
                </div>
              </div>

              <div className="p-6 bg-[#4F6F52] text-white rounded-2xl space-y-3 shadow-md shadow-[#4F6F52]/20">
                <span className="text-xs uppercase font-bold text-[#D2E3C8]">Estimasi BEP Omzet Multi-Produk</span>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                  {formatRupiah(financials.bepData.multiProductBepRupiah)} / Bulan
                </div>
                <p className="text-xs text-[#D2E3C8]/90 leading-relaxed">
                  Bisnis membutuhkan total omzet minimal sebesar {formatRupiah(financials.bepData.multiProductBepRupiah)} per bulan untuk menutup seluruh biaya tetap {formatRupiah(financials.totalMonthlyFixedCosts)}.
                </p>
              </div>

              {/* Estimates per product breakdown */}
              {financials.bepData.productBepEstimates && (
                <div className="border border-[#D6C7AE] rounded-xl p-4 bg-[#F7F1E5]/60 space-y-3">
                  <span className="text-xs font-bold text-[#1A120B] block">
                    Estimasi Pembagian Unit Penjualan pada Titik Impas (Berdasarkan Sales Mix):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {financials.bepData.productBepEstimates.map((item) => (
                      <div key={item.productId} className="p-3 bg-white rounded-lg border border-[#D6C7AE] space-y-1">
                        <strong className="text-[#1A120B] truncate block">{item.productName}</strong>
                        <div className="text-[#5C5248]">Porsi Target: {item.sharePercentage.toFixed(1)}%</div>
                        <div className="text-[#4F6F52] font-bold font-mono">
                          Min. {formatNumber(item.estimatedUnitsAtBep)} unit
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Transparent Assumptions Note */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-700" />
              Asumsi Transparan Perhitungan:
            </span>
            <ul className="list-disc pl-4 space-y-0.5 text-amber-900">
              {financials.bepData.assumptions.map((asm, idx) => (
                <li key={idx}>{asm}</li>
              ))}
              <li>Hasil di atas adalah <em>estimasi simulasi pembelajaran</em>, bukan jaminan pasti di dunia nyata.</li>
            </ul>
          </div>
        </div>
      )}

      {/* STEP 7: EVALUASI & ANALISIS EDUKATIF */}
      {activeStep === 7 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D6C7AE] shadow-xs space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE4D3]">
            <div>
              <span className="text-xs uppercase font-bold text-[#4F6F52]">Step 7 dari 8</span>
              <h2 className="text-xl font-serif-natural font-bold text-[#1A120B]">Evaluasi & Analisis Pembelajaran</h2>
            </div>

            <button
              type="button"
              onClick={onOpenMentorModal}
              className="text-xs font-semibold text-[#4F6F52] hover:text-[#3D5640] flex items-center gap-1.5 bg-[#EDE4D3]/60 px-3 py-1.5 rounded-lg border border-[#D6C7AE]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4F6F52]" />
              <span>Tanya Mentor AI</span>
            </button>
          </div>

          {/* 5 Main Scorecards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3.5 bg-[#F7F1E5]/60 border border-[#D6C7AE] rounded-xl text-center">
              <span className="text-[11px] text-[#5C5248] block">Modal Awal</span>
              <strong className="text-xs sm:text-sm font-mono text-[#1A120B] block mt-1">
                {formatRupiah(financials.totalInitialCapital)}
              </strong>
            </div>

            <div className="p-3.5 bg-[#F7F1E5]/60 border border-[#D6C7AE] rounded-xl text-center">
              <span className="text-[11px] text-[#5C5248] block">Omzet / Bulan</span>
              <strong className="text-xs sm:text-sm font-mono text-[#4F6F52] block mt-1">
                {formatRupiah(financials.totalMonthlyRevenue)}
              </strong>
            </div>

            <div className="p-3.5 bg-[#F7F1E5]/60 border border-[#D6C7AE] rounded-xl text-center">
              <span className="text-[11px] text-[#5C5248] block">Laba / Bulan</span>
              <strong className={`text-xs sm:text-sm font-mono block mt-1 ${financials.totalMonthlyNetProfit >= 0 ? 'text-[#4F6F52]' : 'text-rose-600'}`}>
                {formatRupiah(financials.totalMonthlyNetProfit)}
              </strong>
            </div>

            <div className="p-3.5 bg-[#F7F1E5]/60 border border-[#D6C7AE] rounded-xl text-center">
              <span className="text-[11px] text-[#5C5248] block">Margin Laba</span>
              <strong className="text-xs sm:text-sm font-mono text-[#1A120B] block mt-1">
                {financials.netProfitMargin.toFixed(1)}%
              </strong>
            </div>

            <div className="p-3.5 bg-[#F7F1E5]/60 border border-[#D6C7AE] rounded-xl text-center">
              <span className="text-[11px] text-[#5C5248] block">BEP Impas</span>
              <strong className="text-xs sm:text-sm font-mono text-[#1A120B] block mt-1 truncate">
                {financials.isSingleProduct 
                  ? `${formatNumber(financials.bepData.singleProductUnit || 0)} Unit`
                  : formatRupiah(financials.bepData.multiProductBepRupiah || 0)}
              </strong>
            </div>
          </div>

          {/* Feedback list */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A120B]">
              Umpan Balik Edukatif Berdasarkan Angka Simulasi:
            </h3>

            {financials.evaluationNotes.map((note, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                  note.type === 'caution'
                    ? 'bg-rose-50 border-rose-300 text-rose-950'
                    : note.type === 'warning'
                    ? 'bg-amber-50 border-amber-300 text-amber-950'
                    : note.type === 'success'
                    ? 'bg-[#D2E3C8]/40 border-[#4F6F52]/30 text-[#1A120B]'
                    : 'bg-[#EDE4D3]/50 border-[#D6C7AE] text-[#1A120B]'
                }`}
              >
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#4F6F52]" />
                <div>
                  <strong className="block mb-0.5">{note.title}</strong>
                  <p>{note.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 8: REFLEKSI SISWA */}
      {activeStep === 8 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D6C7AE] shadow-xs space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE4D3]">
            <div>
              <span className="text-xs uppercase font-bold text-[#4F6F52]">Step 8 dari 8</span>
              <h2 className="text-xl font-serif-natural font-bold text-[#1A120B]">Refleksi Kritis Siswa</h2>
            </div>
            <span className="px-2.5 py-1 bg-[#D2E3C8] text-[#1A120B] rounded-lg text-xs font-bold">
              Tahap Akhir
            </span>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-[#1A120B]">
              Setelah melihat hasil perhitungan dan simulasi perencanaan bisnismu, apa yang ingin kamu perbaiki atau tingkatkan dari bisnis ini?
            </label>
            <p className="text-xs text-[#5C5248]">
              Contoh refleksi: strategi menekan biaya tetap, strategi promosi untuk melampaui BEP, perbaikan kemasan, atau pemilihan bahan baku.
            </p>
            <textarea
              rows={5}
              value={data.reflection}
              onChange={(e) => onUpdateData({ reflection: e.target.value })}
              placeholder="Tuliskan refleksimu di sini secara jujur dan kritis..."
              className="w-full p-4 bg-[#F7F1E5]/60 border border-[#D6C7AE] rounded-xl text-xs sm:text-sm text-[#1A120B] focus:ring-2 focus:ring-[#4F6F52]/20 focus:border-[#4F6F52] focus:outline-hidden leading-relaxed"
            />
          </div>

          <div className="p-4 bg-[#D2E3C8]/40 border border-[#4F6F52]/30 rounded-xl text-xs text-[#1A120B] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#4F6F52] shrink-0" />
            <span>
              Semua langkah perencanaan selesai! Klik tombol di bawah untuk melihat dokumen <strong>Hasil Perencanaan Bisnis & Keuangan</strong> siap cetak.
            </span>
          </div>
        </div>
      )}

      {/* Bottom Step Navigation Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-[#D6C7AE]">
        <button
          type="button"
          disabled={activeStep === 1}
          onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
          className="px-4 py-2.5 text-xs font-semibold text-[#5C5248] hover:text-[#1A120B] disabled:opacity-40 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Langkah Sebelumnya</span>
        </button>

        {activeStep < 8 ? (
          <button
            type="button"
            onClick={() => setActiveStep((prev) => Math.min(8, prev + 1))}
            className="px-6 py-2.5 bg-[#1A120B] hover:bg-[#2C241E] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>Lanjut ke Step {activeStep + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onCompleteToSummary}
            className="px-8 py-3 bg-[#4F6F52] hover:bg-[#3D5640] text-white rounded-xl text-xs font-bold shadow-md shadow-[#4F6F52]/20 transition-all flex items-center gap-2"
            id="view-summary-btn"
          >
            <span>Lihat Hasil Perencanaan Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
