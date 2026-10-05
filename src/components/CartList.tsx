import React from 'react';
import { CalculatedResult } from '../types';
import { formatRupiah } from '../utils/calculator';
import { ShoppingBag, Trash2, Send, Plus, Minus } from 'lucide-react';

interface CartListProps {
  items: CalculatedResult[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onClearAll: () => void;
  onOpenWhatsApp: () => void;
}

export const CartList: React.FC<CartListProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearAll,
  onOpenWhatsApp,
}) => {
  if (items.length === 0) return null;

  const grandTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4 transition-colors">
      <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-black/[0.04] dark:bg-white/[0.08] flex items-center justify-center text-neutral-800 dark:text-neutral-200">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">
              Daftar Pesanan ({items.length} Model · {totalQty} pcs)
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Total sementara: <strong className="text-neutral-900 dark:text-white font-mono">{formatRupiah(grandTotal)}</strong>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-medium text-neutral-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
        >
          Kosongkan
        </button>
      </div>

      {/* Item List */}
      <div className="divide-y divide-black/[0.04] dark:divide-white/[0.06] max-h-80 overflow-y-auto pr-1">
        {items.map((item, index) => (
          <div
            key={index}
            className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs hover:bg-black/[0.015] dark:hover:bg-white/[0.02] p-2 rounded-2xl transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-neutral-900 dark:text-white truncate text-sm">
                  {item.fileName}
                </span>
                <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
                  {item.materialName}
                </span>
              </div>
              <div className="text-neutral-500 dark:text-neutral-400 mt-0.5 flex items-center gap-2 flex-wrap">
                <span>{item.estimatedWeightOrLength} {item.unitLabel} / pcs</span>
                <span>·</span>
                <span className="font-mono text-neutral-800 dark:text-neutral-200">
                  {formatRupiah(item.subtotalPerItem)} / pcs
                </span>
                {item.dimensionsSummary && (
                  <>
                    <span>·</span>
                    <span className="text-neutral-400">{item.dimensionsSummary}</span>
                  </>
                )}
              </div>
            </div>

            {/* Quantity Stepper & Price Row */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-1 sm:pt-0">
              {/* Stepper */}
              <div className="inline-flex items-center bg-black/[0.04] dark:bg-white/[0.08] p-0.5 rounded-full border border-black/[0.04] dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                  disabled={item.quantity <= 1}
                  className="w-6 h-6 rounded-full bg-white dark:bg-[#2C2C2E] hover:bg-black/[0.04] dark:hover:bg-white/[0.1] disabled:opacity-30 text-neutral-700 dark:text-neutral-200 flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                  title="Kurangi 1 pcs"
                >
                  <Minus className="w-3 h-3 stroke-[2.5]" />
                </button>
                <span className="w-8 text-center font-semibold text-neutral-900 dark:text-white font-mono text-xs">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                  className="w-6 h-6 rounded-full bg-white dark:bg-[#2C2C2E] hover:bg-black/[0.04] dark:hover:bg-white/[0.1] text-neutral-700 dark:text-neutral-200 flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                  title="Tambah 1 pcs"
                >
                  <Plus className="w-3 h-3 stroke-[2.5]" />
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right min-w-[80px]">
                <span className="font-semibold text-neutral-900 dark:text-white font-mono text-sm">
                  {formatRupiah(item.totalPrice)}
                </span>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => onRemoveItem(index)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                title="Hapus part ini"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Footer */}
      <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">Total Keseluruhan ({totalQty} pcs):</span>
          <div className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white font-mono">
            {formatRupiah(grandTotal)}
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenWhatsApp}
          className="px-5 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] active:scale-[0.98] text-white font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Kirim Seluruh Daftar ke WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
