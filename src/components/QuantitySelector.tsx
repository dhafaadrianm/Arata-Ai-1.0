import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (qty: number) => void;
  label?: string;
  sublabel?: string;
  min?: number;
  max?: number;
  showQuickButtons?: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  label = 'Jumlah Pesanan (Pcs)',
  sublabel = 'Berapa banyak part yang ingin dibuat?',
  min = 1,
  max = 9999,
  showQuickButtons = true,
}) => {
  const quickPcs = [1, 2, 5, 10, 20, 50, 100];

  const handleDecrement = () => {
    onChange(Math.max(min, value - 1));
  };

  const handleIncrement = () => {
    onChange(Math.min(max, value + 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    if (isNaN(parsed)) {
      onChange(min);
    } else {
      onChange(Math.max(min, Math.min(max, parsed)));
    }
  };

  return (
    <div className="bg-slate-50/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 p-4 sm:p-5 space-y-3.5 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <span>{label}</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-[11px] font-extrabold font-mono border border-indigo-200/50 dark:border-indigo-800/60">
              {value} PCS
            </span>
          </label>
          {sublabel && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sublabel}</p>}
        </div>

        {/* Stepper with Large Buttons */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white dark:bg-slate-900 p-1 rounded-xl border-2 border-indigo-200/80 dark:border-indigo-800/80 shadow-xs">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={value <= min}
            aria-label="Kurang 1 pcs"
            className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600 text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
          >
            <Minus className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="relative">
            <input
              type="number"
              min={min}
              max={max}
              value={value}
              onChange={handleInputChange}
              aria-label="Input jumlah pcs"
              className="w-16 sm:w-20 h-10 text-center font-mono font-black text-lg sm:text-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg bg-transparent"
            />
          </div>

          <button
            type="button"
            onClick={handleIncrement}
            disabled={value >= max}
            aria-label="Tambah 1 pcs"
            className="w-10 h-10 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Quick Pcs Badges */}
      {showQuickButtons && (
        <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mr-1">
            Pilih Cepat:
          </span>
          {quickPcs.map((qty) => {
            const isSelected = value === qty;
            return (
              <button
                key={qty}
                type="button"
                onClick={() => onChange(qty)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs scale-105 ring-2 ring-indigo-600/30'
                    : 'bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                }`}
              >
                {qty} pcs
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
