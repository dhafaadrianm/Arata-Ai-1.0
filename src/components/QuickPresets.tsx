import React from 'react';
import { PresetItem } from '../types';
import { PRESETS } from '../data/materials';
import { Sparkles, Box, Zap } from 'lucide-react';

interface QuickPresetsProps {
  onSelectPreset: (preset: PresetItem) => void;
}

export const QuickPresets: React.FC<QuickPresetsProps> = ({ onSelectPreset }) => {
  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3.5 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
            Simulasi Cepat
          </span>
          <h3 className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">
            Preset & Template Model Umum
          </h3>
        </div>
        <span className="text-[11px] text-neutral-400 dark:text-neutral-500 hidden sm:inline">
          1-Klik untuk memuat data
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelectPreset(preset)}
            className="group text-left p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.03] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:border-black/[0.12] dark:hover:border-white/[0.15] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-6 h-6 rounded-lg bg-white dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.1] text-neutral-700 dark:text-neutral-300 flex items-center justify-center shadow-2xs">
                  {preset.category === '3d_print' ? (
                    <Box className="w-3 h-3" />
                  ) : (
                    <Zap className="w-3 h-3 text-rose-500" />
                  )}
                </div>
                <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500 font-mono">
                  {preset.category === '3d_print'
                    ? `${preset.weightOrLength}g`
                    : `${preset.weightOrLength}m`}
                </span>
              </div>
              <h4 className="font-medium text-neutral-900 dark:text-white text-xs leading-snug group-hover:text-[#0071E3] dark:group-hover:text-[#0A84FF] transition-colors truncate">
                {preset.title}
              </h4>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5 line-clamp-1">
                {preset.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
