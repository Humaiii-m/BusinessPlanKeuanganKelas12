import { BusinessPlanData, FinancialSummary } from '../types';

/**
 * Format number to Indonesian Rupiah currency format
 */
export function formatRupiah(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'Rp0';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format plain number with thousand separators
 */
export function formatNumber(num: number | undefined | null): string {
  if (num === undefined || num === null || isNaN(num)) {
    return '0';
  }
  return new Intl.NumberFormat('id-ID').format(Math.round(num));
}

/**
 * Main financial calculation engine
 */
export function calculateFinancials(data: BusinessPlanData): FinancialSummary {
  // 1. Total Modal Awal
  const totalInitialCapital = data.initialCapitalItems.reduce(
    (acc, item) => acc + (Number(item.amount) || 0),
    0
  );

  // 2. Total Biaya Tetap per Bulan
  const totalMonthlyFixedCosts = data.fixedCostItems.reduce(
    (acc, item) => acc + (Number(item.amount) || 0),
    0
  );

  // 3. Produk, Omzet, and Biaya Variabel (HPP) Total
  let totalMonthlyRevenue = 0;
  let totalMonthlyVariableCosts = 0;
  let totalUnitsTarget = 0;

  data.products.forEach((product) => {
    const qty = Math.max(0, Number(product.salesTarget) || 0);
    const price = Math.max(0, Number(product.sellingPrice) || 0);
    const hpp = Math.max(0, Number(product.hpp) || 0);

    totalMonthlyRevenue += price * qty;
    totalMonthlyVariableCosts += hpp * qty;
    totalUnitsTarget += qty;
  });

  const totalMonthlyGrossProfit = totalMonthlyRevenue - totalMonthlyVariableCosts;
  const totalMonthlyTotalCosts = totalMonthlyFixedCosts + totalMonthlyVariableCosts;
  const totalMonthlyNetProfit = totalMonthlyRevenue - totalMonthlyTotalCosts;
  const netProfitMargin = totalMonthlyRevenue > 0 
    ? (totalMonthlyNetProfit / totalMonthlyRevenue) * 100 
    : 0;

  // 4. BEP Calculations
  const isSingleProduct = data.products.length === 1;
  const bepData: FinancialSummary['bepData'] = {
    assumptions: [],
  };

  if (data.products.length === 0) {
    bepData.assumptions.push('Belum ada produk yang ditambahkan.');
  } else if (isSingleProduct) {
    const singleProd = data.products[0];
    const price = Number(singleProd.sellingPrice) || 0;
    const variablePerUnit = Number(singleProd.hpp) || 0;
    const contributionMarginPerUnit = price - variablePerUnit;

    bepData.contributionMarginPerUnit = contributionMarginPerUnit;

    if (contributionMarginPerUnit > 0) {
      const bepUnit = totalMonthlyFixedCosts / contributionMarginPerUnit;
      bepData.singleProductUnit = Math.ceil(bepUnit);
      bepData.singleProductRupiah = bepData.singleProductUnit * price;
      bepData.assumptions.push(
        `Rumus BEP Unit = Biaya Tetap / (Harga Jual - Biaya Variabel per Unit).`,
        `Kontribusi per unit adalah ${formatRupiah(contributionMarginPerUnit)}.`
      );
    } else {
      bepData.singleProductUnit = 0;
      bepData.singleProductRupiah = 0;
      bepData.assumptions.push(
        `Harga jual produk (${formatRupiah(price)}) lebih kecil atau sama dengan HPP (${formatRupiah(variablePerUnit)}), sehingga titik impas tidak dapat tercapai tanpa menaikkan harga atau menekan HPP.`
      );
    }
  } else {
    // Multi-product BEP calculation using Weighted Contribution Margin Ratio (CMR)
    if (totalMonthlyRevenue > 0) {
      const totalContributionMargin = totalMonthlyRevenue - totalMonthlyVariableCosts;
      const weightedCMR = totalContributionMargin / totalMonthlyRevenue;
      bepData.weightedContributionMarginRatio = weightedCMR;

      if (weightedCMR > 0) {
        const bepOmzet = totalMonthlyFixedCosts / weightedCMR;
        bepData.multiProductBepRupiah = Math.ceil(bepOmzet);

        // Estimate BEP units per product according to planned sales mix proportion
        bepData.productBepEstimates = data.products.map((prod) => {
          const prodQty = Math.max(0, Number(prod.salesTarget) || 0);
          const prodRev = (Number(prod.sellingPrice) || 0) * prodQty;
          const sharePercentage = totalMonthlyRevenue > 0 ? (prodRev / totalMonthlyRevenue) : 0;
          const allocatedBepOmzet = bepOmzet * sharePercentage;
          const price = Number(prod.sellingPrice) || 1;
          const estimatedUnits = price > 0 ? Math.ceil(allocatedBepOmzet / price) : 0;

          return {
            productId: prod.id,
            productName: prod.name || 'Produk',
            sharePercentage: sharePercentage * 100,
            estimatedUnitsAtBep: estimatedUnits,
          };
        });

        bepData.assumptions.push(
          `Untuk bisnis dengan ${data.products.length} produk, BEP dihitung menggunakan Rasio Margin Kontribusi Gabungan (${(weightedCMR * 100).toFixed(1)}%).`,
          `Estimasi unit per produk didasarkan pada proporsi komposisi target penjualan yang kamu rencanakan (Sales Mix).`,
          `Jika proporsi penjualan riil berubah, titik impas per produk juga akan menyesuaikan.`
        );
      } else {
        bepData.multiProductBepRupiah = 0;
        bepData.assumptions.push(
          `Total omzet tidak melebihi total biaya variabel. Pastikan harga jual rata-rata produk berada di atas HPP agar margin kontribusi positif.`
        );
      }
    } else {
      bepData.multiProductBepRupiah = 0;
      bepData.assumptions.push(`Masukkan target penjualan untuk melihat estimasi BEP multi-produk.`);
    }
  }

  // 5. Payback period (Estimasi waktu balik modal awal dalam bulan)
  let estimatedPaybackMonths: number | null = null;
  if (totalMonthlyNetProfit > 0 && totalInitialCapital > 0) {
    estimatedPaybackMonths = Number((totalInitialCapital / totalMonthlyNetProfit).toFixed(1));
  }

  // 6. Educational Evaluation Notes
  const evaluationNotes: FinancialSummary['evaluationNotes'] = [];

  // Check product pricing vs HPP
  const lossMakingProducts = data.products.filter(
    (p) => (Number(p.sellingPrice) || 0) < (Number(p.hpp) || 0)
  );
  if (lossMakingProducts.length > 0) {
    evaluationNotes.push({
      type: 'caution',
      title: 'Peringatan Harga Jual Dibawah HPP',
      message: `Terdapat ${lossMakingProducts.length} produk (${lossMakingProducts.map((p) => p.name).join(', ')}) dengan harga jual lebih rendah dari HPP. Setiap unit yang terjual akan mengalami kerugian langsung.`,
    });
  }

  // Check target vs BEP
  if (isSingleProduct && bepData.singleProductUnit) {
    const target = Number(data.products[0]?.salesTarget) || 0;
    if (target < bepData.singleProductUnit) {
      evaluationNotes.push({
        type: 'warning',
        title: 'Target Penjualan Masih di Bawah BEP',
        message: `Target penjualanmu (${formatNumber(target)} unit) masih di bawah titik impas BEP (${formatNumber(bepData.singleProductUnit)} unit). Dalam simulasi ini, bisnis masih mengalami defisit Rp${formatNumber(Math.abs(totalMonthlyNetProfit))}. Coba naikkan target penjualan, kurangi biaya tetap, atau evaluasi harga jual.`,
      });
    } else if (target === bepData.singleProductUnit) {
      evaluationNotes.push({
        type: 'info',
        title: 'Target Penjualan Tepat di Titik Impas (BEP)',
        message: `Target penjualanmu tepat berada di titik impas. Bisnis belum mencetak laba namun seluruh biaya operasional tertutupi.`,
      });
    } else {
      evaluationNotes.push({
        type: 'success',
        title: 'Target Penjualan Melebihi Titik Impas (BEP)',
        message: `Target penjualanmu (${formatNumber(target)} unit) sudah melampaui estimasi BEP (${formatNumber(bepData.singleProductUnit)} unit). Dalam simulasi ini bisnis menghasilkan estimasi laba bersih ${formatRupiah(totalMonthlyNetProfit)} per bulan.`,
      });
    }
  } else if (!isSingleProduct && bepData.multiProductBepRupiah) {
    if (totalMonthlyRevenue < bepData.multiProductBepRupiah) {
      evaluationNotes.push({
        type: 'warning',
        title: 'Target Omzet Masih di Bawah Estimasi BEP',
        message: `Target total omzet bulananmu (${formatRupiah(totalMonthlyRevenue)}) masih di bawah BEP omzet (${formatRupiah(bepData.multiProductBepRupiah)}). Diperlukan tambahan omzet sekitar ${formatRupiah(bepData.multiProductBepRupiah - totalMonthlyRevenue)} untuk mencapai titik impas operasional.`,
      });
    } else {
      evaluationNotes.push({
        type: 'success',
        title: 'Target Omzet Melampaui BEP Multi-Produk',
        message: `Target omzet bulananmu (${formatRupiah(totalMonthlyRevenue)}) telah melampaui estimasi BEP omzet (${formatRupiah(bepData.multiProductBepRupiah)}). Estimasi laba bersih bulanan mencapai ${formatRupiah(totalMonthlyNetProfit)}.`,
      });
    }
  }

  // Margin Assessment
  if (totalMonthlyRevenue > 0) {
    if (netProfitMargin < 0) {
      evaluationNotes.push({
        type: 'caution',
        title: 'Estimasi Operasional Mengalami Defisit (Laba Negatif)',
        message: `Total biaya per bulan (${formatRupiah(totalMonthlyTotalCosts)}) melebihi total pendapatan (${formatRupiah(totalMonthlyRevenue)}). Cek kembali struktur biaya tetap atau kuantitas penjualan.`,
      });
    } else if (netProfitMargin > 0 && netProfitMargin < 15) {
      evaluationNotes.push({
        type: 'info',
        title: 'Margin Laba Bersih Cenderung Tipis (<15%)',
        message: `Margin laba bersih sebesar ${netProfitMargin.toFixed(1)}%. Bisnis memiliki bantalan keamanan yang cukup ketat jika terjadi kenaikan harga bahan baku tak terduga.`,
      });
    } else if (netProfitMargin >= 15 && netProfitMargin <= 50) {
      evaluationNotes.push({
        type: 'success',
        title: 'Margin Laba Sehat dan Realistis (15% - 50%)',
        message: `Margin laba bersih sebesar ${netProfitMargin.toFixed(1)}% berada pada rentang yang sangat baik untuk bisnis skala UMKM/rintisan.`,
      });
    } else if (netProfitMargin > 50) {
      evaluationNotes.push({
        type: 'info',
        title: 'Margin Laba Sangat Tinggi (>50%)',
        message: `Margin laba bersih sebesar ${netProfitMargin.toFixed(1)}%. Pastikan seluruh komponen biaya operasional (seperti logistik, listrik, packing, promosi) sudah dihitung secara realistis.`,
      });
    }
  }

  // Initial Capital Payback Note
  if (estimatedPaybackMonths !== null) {
    evaluationNotes.push({
      type: 'info',
      title: 'Estimasi Pengembalian Modal Awal (Payback Period)',
      message: `Dengan estimasi laba bersih ${formatRupiah(totalMonthlyNetProfit)} per bulan, modal awal ${formatRupiah(totalInitialCapital)} diperkirakan dapat kembali dalam waktu sekitar ${estimatedPaybackMonths} bulan operasi yang konsisten.`,
    });
  }

  return {
    totalInitialCapital,
    totalMonthlyFixedCosts,
    totalMonthlyVariableCosts,
    totalMonthlyRevenue,
    totalMonthlyTotalCosts,
    totalMonthlyGrossProfit,
    totalMonthlyNetProfit,
    netProfitMargin,
    totalUnitsTarget,
    isSingleProduct,
    bepData,
    evaluationNotes,
    estimatedPaybackMonths,
  };
}
