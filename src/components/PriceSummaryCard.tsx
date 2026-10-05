import React, { useState } from 'react';
import { CalculatedResult } from '../types';
import { formatRupiah, formatMinutes } from '../utils/calculator';
import {
  Send,
  Copy,
  Check,
  PlusCircle,
  Clock,
  QrCode,
  Info,
  Minus,
  Plus,
} from 'lucide-react';

interface PriceSummaryCardProps {
  result: CalculatedResult;
  onOpenWhatsApp: () => void;
  onAddToCart: () => void;
  onOpenQRIS: () => void;
  onUpdateQuantity?: (quantity: number) => void;
}

export const PriceSummaryCard: React.FC<PriceSummaryCardProps> = ({
  result,
  onOpenWhatsApp,
  onAddToCart,
  onOpenQRIS,
  onUpdateQuantity,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    const summaryText = `*ESTIMASI ARATA PRICE AI*\n` +
      `Part: ${result.fileName}\n` +
      `Layanan: ${result.materialName}\n` +
      `Estimasi: ${result.estimatedWeightOrLength} ${result.unitLabel}\n` +
      `Tarif: ${formatRupiah(result.unitRate)}/${result.unitLabel}\n` +
      `Kuantiti: ${result.quantity} pcs\n` +
      `Subtotal: ${formatRupiah(result.subtotalPerItem)}/pcs\n` +
      `*TOTAL ESTIMASI: ${formatRupiah(result.totalPrice)}*\n` +
      (result.dimensionsSummary ? `Ukuran: ${result.dimensionsSummary}\n` : '') +
      `\n📌 Catatan: Tarif khusus pemesanan non-marketplace. Pembayaran via QRIS (REXEL ID) lalu konfirmasi ke nomor 085904408774.\n` +
      `Dihitung via Arata Price AI`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] space-y-5 sticky top-24 transition-colors">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
            Langkah 3
          </span>
          <h3 className="font-semibold text-neutral-900 dark:text-white text-base tracking-tight">
            Ringkasan Estimasi
          </h3>
        </div>

        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Kalkulasi Real-Time
        </span>
      </div>

      {/* Apple-style Total Price Display */}
      <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08]">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Total Estimasi Biaya
          </span>
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 font-mono">
            {result.quantity} pcs
          </span>
        </div>

        <div className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white font-mono my-1">
          {formatRupiah(result.totalPrice)}
        </div>

        <div className="pt-2 mt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span>Biaya per pcs</span>
          <span className="font-semibold text-neutral-800 dark:text-neutral-200 font-mono">
            {formatRupiah(result.subtotalPerItem)}
          </span>
        </div>
      </div>

      {/* Breakdown List */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between py-1.5 border-b border-black/[0.04] dark:border-white/[0.06]">
          <span className="text-neutral-500 dark:text-neutral-400">Nama Part</span>
          <span className="font-medium text-neutral-900 dark:text-white truncate max-w-[190px]">
            {result.fileName}
          </span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-black/[0.04] dark:border-white/[0.06]">
          <span className="text-neutral-500 dark:text-neutral-400">Bahan / Layanan</span>
          <span className="font-medium text-neutral-900 dark:text-white">{result.materialName}</span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-black/[0.04] dark:border-white/[0.06]">
          <span className="text-neutral-500 dark:text-neutral-400">Tarif Satuan</span>
          <span className="font-medium text-neutral-900 dark:text-white font-mono">
            {formatRupiah(result.unitRate)} / {result.unitLabel}
          </span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-black/[0.04] dark:border-white/[0.06]">
          <span className="text-neutral-500 dark:text-neutral-400">
            {result.serviceType === '3d_print' ? 'Estimasi Berat' : 'Estimasi Panjang'}
          </span>
          <span className="font-medium text-neutral-900 dark:text-white font-mono">
            {result.estimatedWeightOrLength} {result.unitLabel} / pcs
          </span>
        </div>

        {result.dimensionsSummary && (
          <div className="flex justify-between py-1.5 border-b border-black/[0.04] dark:border-white/[0.06]">
            <span className="text-neutral-500 dark:text-neutral-400">Ukuran</span>
            <span className="font-medium text-neutral-900 dark:text-white text-right">
              {result.dimensionsSummary}
            </span>
          </div>
        )}

        {result.estimatedPrintTimeMinutes && (
          <div className="flex justify-between py-1.5 border-b border-black/[0.04] dark:border-white/[0.06]">
            <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Est. Waktu Mesin</span>
            </span>
            <span className="font-medium text-neutral-900 dark:text-white">
              ~{formatMinutes(result.estimatedPrintTimeMinutes)} / pcs
            </span>
          </div>
        )}

        {/* Quantity in Summary */}
        <div className="py-2 border-b border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
          <span className="text-neutral-500 dark:text-neutral-400">Jumlah Pesanan</span>
          {onUpdateQuantity ? (
            <div className="inline-flex items-center bg-black/[0.04] dark:bg-white/[0.08] p-0.5 rounded-full border border-black/[0.06] dark:border-white/[0.08]">
              <button
                type="button"
                onClick={() => onUpdateQuantity(Math.max(1, result.quantity - 1))}
                disabled={result.quantity <= 1}
                className="w-6 h-6 rounded-full bg-white dark:bg-[#2C2C2E] text-neutral-800 dark:text-neutral-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.1] disabled:opacity-30 flex items-center justify-center font-bold text-xs cursor-pointer transition-all shadow-2xs"
                title="Kurang 1 pcs"
              >
                <Minus className="w-3 h-3 stroke-[2.5]" />
              </button>
              <span className="w-10 text-center font-semibold text-neutral-900 dark:text-white font-mono text-xs">
                {result.quantity} pcs
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(result.quantity + 1)}
                className="w-6 h-6 rounded-full bg-white dark:bg-[#2C2C2E] text-neutral-800 dark:text-neutral-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.1] flex items-center justify-center font-bold text-xs cursor-pointer transition-all shadow-2xs"
                title="Tambah 1 pcs"
              >
                <Plus className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            <span className="font-semibold text-neutral-900 dark:text-white font-mono">
              {result.quantity} pcs
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        {/* WhatsApp Order Button */}
        <button
          type="button"
          onClick={onOpenWhatsApp}
          className="w-full py-3 px-4 rounded-2xl bg-[#0071E3] hover:bg-[#0077ED] active:scale-[0.98] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <Send className="w-4 h-4" />
          <span>Kirim Pesanan ke WhatsApp</span>
        </button>

        {/* QRIS Button */}
        <button
          type="button"
          onClick={onOpenQRIS}
          className="w-full py-2.5 px-4 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.07] dark:hover:bg-white/[0.12] active:scale-[0.98] text-neutral-900 dark:text-white font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-black/[0.04] dark:border-white/[0.06]"
        >
          <QrCode className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300" />
          <span>Bayar via QRIS (REXEL ID)</span>
        </button>

        {/* Save to Project Cart */}
        <button
          type="button"
          onClick={onAddToCart}
          className="w-full py-2 px-3 rounded-2xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05] font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Simpan ke Daftar Part Pesanan</span>
        </button>

        {/* Copy text breakdown */}
        <button
          type="button"
          onClick={handleCopyText}
          className="w-full py-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 font-medium text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400">Rincian tersalin ke clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Salin ringkasan teks</span>
            </>
          )}
        </button>
      </div>

      {/* Minimal Apple Notice Callout */}
      <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-medium text-neutral-900 dark:text-white">
          <Info className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 shrink-0" />
          <span>Pemesanan Langsung Non-Marketplace</span>
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Tarif spesial langsung di luar marketplace. Pembayaran via <strong>QRIS REXEL ID</strong> dan konfirmasi instan ke <strong>085904408774</strong>.
        </p>
      </div>
    </div>
  );
};
