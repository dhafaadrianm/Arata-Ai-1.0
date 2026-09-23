import React from 'react';
import { PresetItem } from '../types';
import { PRESETS } from '../data/materials';
import { Sparkles, Box, Zap } from 'lucide-react';
import { formatRupiah } from '../utils/calculator';

interface QuickPresetsProps {
  onSelectPreset: (preset: PresetItem) => void;
}

export const QuickPresets: React.FC<QuickPresetsProps> = ({ onSelectPreset }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Contoh Model & Preset Cepat
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Pilih template umum untuk melihat simulasi kalkulasi otomatis
            </p>
          </div>
        </div>
        <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">1-Klik Simulasi</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelectPreset(preset)}
            className="text-left p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="p-1 rounded-md bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shadow-2xs">
                  {preset.category === '3d_print' ? (
                    <Box className="w-3.5 h-3.5" />
                  ) : (
                    <Zap className="w-3.5 h-3.5 text-rose-500" />
                  )}
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono">
                  {preset.category === '3d_print'
                    ? `${preset.weightOrLength}g`
                    : `${preset.weightOrLength}m`}
                </span>
              </div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs leading-snug group-hover:text-indigo-700 dark:group-hover:text-indigo-400">
                {preset.title}
              </h4>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 line-clamp-2">
                {preset.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
