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
  label = 'Jumlah Pesanan',
  sublabel = 'Tentukan kuantiti part',
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
    <div className="bg-black/[0.02] dark:bg-white/[0.04] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] p-4 sm:p-5 space-y-3 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-neutral-900 dark:text-white">
              {label}
            </span>
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 font-mono">
              ({value} pcs)
            </span>
          </div>
          {sublabel && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {sublabel}
            </p>
          )}
        </div>

        {/* Apple Style Stepper Capsule */}
        <div className="inline-flex items-center bg-white dark:bg-[#2C2C2E] rounded-full p-1 border border-black/[0.08] dark:border-white/[0.1] shadow-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={value <= min}
            aria-label="Kurang 1 pcs"
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-black/[0.05] dark:hover:bg-white/[0.1] active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          <input
            type="number"
            min={min}
            max={max}
            value={value}
            onChange={handleInputChange}
            aria-label="Jumlah pcs"
            className="w-14 sm:w-16 text-center font-mono font-bold text-sm sm:text-base text-neutral-900 dark:text-white focus:outline-none bg-transparent"
          />

          <button
            type="button"
            onClick={handleIncrement}
            disabled={value >= max}
            aria-label="Tambah 1 pcs"
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-black/[0.05] dark:hover:bg-white/[0.1] active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Quick Pcs Capsule Chips */}
      {showQuickButtons && (
        <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 mr-1">
            Pilih cepat:
          </span>
          {quickPcs.map((qty) => {
            const isSelected = value === qty;
            return (
              <button
                key={qty}
                type="button"
                onClick={() => onChange(qty)}
                className={`text-xs px-2.5 py-1 rounded-full font-medium font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-black shadow-xs'
                    : 'bg-black/[0.04] dark:bg-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {qty}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
