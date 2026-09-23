import React, { useState } from 'react';
import { CalculatedResult } from '../types';
import { formatRupiah, formatMinutes } from '../utils/calculator';
import {
  Receipt,
  Send,
  Copy,
  Check,
  PlusCircle,
  Clock,
  Box,
  Layers,
  Sparkles,
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
      `\n📌 *Catatan:* Ini adalah harga pesanan langsung di luar marketplace (Shopee). Pembayaran via QRIS (REXEL ID) lalu konfirmasi ke nomor 085904408774.\n` +
      `Dihitung via Arata Price AI`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-5 sticky top-24 transition-colors">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
              3. Hasil Estimasi Biaya
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Otomatis & Transparan
            </span>
          </div>
        </div>

        <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
          Tepat & Cepat
        </span>
      </div>

      {/* Main Total Price Display */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-2xl shadow-inner relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Box className="w-28 h-28 text-white" />
        </div>

        <span className="text-xs font-medium text-slate-300 block mb-1">
          Total Biaya ({result.quantity} pcs):
        </span>
        <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-emerald-400">
          {formatRupiah(result.totalPrice)}
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
          <span>Biaya Satuan:</span>
          <span className="font-bold text-white font-mono">
            {formatRupiah(result.subtotalPerItem)} / pcs
          </span>
        </div>
      </div>

      {/* Breakdown List */}
      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400">Nama Part / File:</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
            {result.fileName}
          </span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400">Material / Jasa:</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{result.materialName}</span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400">Tarif Satuan:</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
            {formatRupiah(result.unitRate)} / {result.unitLabel}
          </span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400">
            {result.serviceType === '3d_print' ? 'Estimasi Berat Total:' : 'Estimasi Panjang:'}
          </span>
          <span className="font-bold text-indigo-700 dark:text-indigo-400 font-mono">
            {result.estimatedWeightOrLength} {result.unitLabel} / pcs
          </span>
        </div>

        {result.dimensionsSummary && (
          <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">Ukuran / Detail:</span>
            <span className="font-medium text-slate-700 dark:text-slate-300 text-right">
              {result.dimensionsSummary}
            </span>
          </div>
        )}

        {result.estimatedPrintTimeMinutes && (
          <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>Est. Waktu Cetak:</span>
            </span>
            <span className="font-bold text-slate-700 dark:text-slate-300">
              ~{formatMinutes(result.estimatedPrintTimeMinutes)} / pcs
            </span>
          </div>
        )}

        <div className="py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-slate-600 dark:text-slate-400 font-medium">Jumlah Pesanan:</span>
          {onUpdateQuantity ? (
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => onUpdateQuantity(Math.max(1, result.quantity - 1))}
                disabled={result.quantity <= 1}
                className="w-6 h-6 rounded bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 flex items-center justify-center font-bold text-xs cursor-pointer shadow-2xs"
                title="Kurang 1 pcs"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-9 text-center font-extrabold text-slate-900 dark:text-white font-mono text-xs">
                {result.quantity} pcs
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(result.quantity + 1)}
                className="w-6 h-6 rounded bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center font-bold text-xs cursor-pointer shadow-2xs"
                title="Tambah 1 pcs"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <span className="font-extrabold text-slate-900 dark:text-white font-mono">
              {result.quantity} pcs
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        {/* WhatsApp Order Button */}
        <button
          type="button"
          onClick={onOpenWhatsApp}
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-sm shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Kirim Pesanan ke WhatsApp</span>
        </button>

        {/* QRIS Payment Button */}
        <button
          type="button"
          onClick={onOpenQRIS}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shadow-indigo-600/20"
        >
          <QrCode className="w-4 h-4" />
          <span>Bayar via QRIS (REXEL ID)</span>
        </button>

        {/* Add to Project Cart Button */}
        <button
          type="button"
          onClick={onAddToCart}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-750 text-indigo-700 dark:text-indigo-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-indigo-200/60 dark:border-slate-700"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Simpan ke Daftar Part Pesanan</span>
        </button>

        {/* Copy Breakdown */}
        <button
          type="button"
          onClick={handleCopyText}
          className="w-full py-2 px-3 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">Rincian Berhasil Disalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Salin Rincian Teks</span>
            </>
          )}
        </button>
      </div>

      {/* Non-marketplace notice box */}
      <div className="p-3 bg-amber-50/90 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-800/60 text-[11px] text-amber-900 dark:text-amber-300 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-amber-950 dark:text-amber-200">
          <Info className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
          <span>Pemesanan Non-Marketplace:</span>
        </div>
        <p className="leading-relaxed">
          Ini adalah harga jika Anda pesan <strong>di luar marketplace</strong> seperti Shopee. Pembayaran bisa pakai <strong>QRIS</strong> lalu konfirmasi ke nomor <strong>085904408774</strong>.
        </p>
      </div>

      {/* Guarantee & Notes */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
        <p className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Harga Otomatis & Transparan
        </p>
        <p>
          Estimasi dihitung dari berat & panjang aktual. Tidak ada biaya tersembunyi.
        </p>
      </div>
    </div>
  );
};
