import React from 'react';
import { CalculatedResult } from '../types';
import { formatRupiah } from '../utils/calculator';
import { ShoppingBag, Trash2, Send, Plus, Minus, Layers } from 'lucide-react';

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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 transition-colors">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Daftar Proyek / Keranjang ({items.length} Model, {totalQty} pcs)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kumpulan part yang telah Anda simpan
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
        >
          Hapus Semua
        </button>
      </div>

      {/* Item List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto pr-1">
        {items.map((item, index) => (
          <div
            key={index}
            className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs hover:bg-slate-50/70 dark:hover:bg-slate-800/60 p-2 rounded-xl transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white truncate text-sm">
                  {item.fileName}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800 shrink-0">
                  {item.materialName}
                </span>
              </div>
              <div className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                <span>
                  {item.estimatedWeightOrLength} {item.unitLabel}/pcs
                </span>
                <span>•</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">
                  {formatRupiah(item.subtotalPerItem)}/pcs
                </span>
                {item.dimensionsSummary && (
                  <>
                    <span>•</span>
                    <span className="text-slate-400 dark:text-slate-500">{item.dimensionsSummary}</span>
                  </>
                )}
              </div>
            </div>

            {/* Quantity Stepper & Price Row */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
              {/* Stepper */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                  disabled={item.quantity <= 1}
                  className="w-7 h-7 rounded bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 disabled:opacity-30 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer transition-colors"
                  title="Kurangi 1 pcs"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-slate-900 dark:text-white font-mono text-xs">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                  className="w-7 h-7 rounded bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center cursor-pointer transition-colors font-bold"
                  title="Tambah 1 pcs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-right">
                <span className="font-extrabold text-slate-900 dark:text-white font-mono text-sm block">
                  {formatRupiah(item.totalPrice)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onRemoveItem(index)}
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                title="Hapus part ini"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Grand Total & Checkout Bar */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/80 dark:bg-slate-800/80 p-4 rounded-xl">
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Total Keseluruhan ({totalQty} item):
          </span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {formatRupiah(grandTotal)}
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenWhatsApp}
          className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Kirim Seluruh Proyek ke WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
