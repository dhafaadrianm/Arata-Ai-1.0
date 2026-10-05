import React from 'react';
import {
  LaserInputData,
  InputModeLaser,
  MaterialOption,
} from '../types';
import {
  Zap,
  Maximize2,
  FileText,
  Activity,
  Info,
} from 'lucide-react';
import { estimateLaserMetersFromDimensions } from '../utils/calculator';
import { QuantitySelector } from './QuantitySelector';

interface LaserCalculatorProps {
  material: MaterialOption;
  data: LaserInputData;
  mode: InputModeLaser;
  onModeChange: (mode: InputModeLaser) => void;
  onChange: (data: LaserInputData) => void;
}

export const LaserCalculator: React.FC<LaserCalculatorProps> = ({
  material,
  data,
  mode,
  onModeChange,
  onChange,
}) => {
  const update = (fields: Partial<LaserInputData>) => {
    onChange({ ...data, ...fields });
  };

  const estimatedMeters =
    mode === 'direct_length'
      ? data.directMeters
      : estimateLaserMetersFromDimensions(data);

  const quickMeters = [5, 10, 15, 25, 50, 100];

  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6 transition-colors">
      {/* Header & Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
            Langkah 2
          </span>
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            Spesifikasi Laser Engraving
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Tarif resmi Rp 100 per meter panjang lintasan grafir laser
          </p>
        </div>

        {/* Segmented Control */}
        <div className="inline-flex p-1 bg-black/[0.05] dark:bg-white/[0.08] rounded-full text-xs font-medium self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onModeChange('dimensions')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'dimensions'
                ? 'bg-white dark:bg-[#2C2C2E] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
            <span>Dimensi (P×L)</span>
          </button>
          <button
            type="button"
            onClick={() => onModeChange('direct_length')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'direct_length'
                ? 'bg-white dark:bg-[#2C2C2E] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
            <span>Meter Langsung</span>
          </button>
        </div>
      </div>

      {/* Part / File Name Input */}
      <div>
        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
          Nama Desain / Part (Opsional)
        </label>
        <div className="relative">
          <FileText className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={data.fileName}
            onChange={(e) => update({ fileName: e.target.value })}
            placeholder="Contoh: Plakat Akrilik, Grafir Tumbler, Name Tag..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] focus:bg-white dark:focus:bg-[#2C2C2E] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all"
          />
        </div>
      </div>

      {/* MODE A: DIMENSIONS */}
      {mode === 'dimensions' && (
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Ukuran Area Grafir (Milimeter / mm)
              </label>
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                10 mm = 1 cm
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/[0.02] dark:bg-white/[0.04] p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] text-center">
                <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                  Panjang (X)
                </div>
                <input
                  type="number"
                  min="1"
                  max="2000"
                  value={data.lengthX || ''}
                  onChange={(e) => update({ lengthX: Math.max(1, Number(e.target.value) || 0) })}
                  className="w-full font-semibold text-lg text-neutral-900 dark:text-white bg-transparent focus:outline-none text-center font-mono"
                />
                <span className="block text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                  {(data.lengthX / 10).toFixed(1)} cm
                </span>
              </div>

              <div className="bg-black/[0.02] dark:bg-white/[0.04] p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] text-center">
                <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                  Lebar (Y)
                </div>
                <input
                  type="number"
                  min="1"
                  max="2000"
                  value={data.widthY || ''}
                  onChange={(e) => update({ widthY: Math.max(1, Number(e.target.value) || 0) })}
                  className="w-full font-semibold text-lg text-neutral-900 dark:text-white bg-transparent focus:outline-none text-center font-mono"
                />
                <span className="block text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                  {(data.widthY / 10).toFixed(1)} cm
                </span>
              </div>
            </div>
          </div>

          {/* Engraving Style */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Tipe & Kepadatan Grafir
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'vector_outline', label: 'Vector Outline', desc: 'Garis tepi / potong' },
                { id: 'raster_light', label: 'Raster Ringan', desc: 'Teks & logo standar' },
                { id: 'raster_solid', label: 'Raster Tebal', desc: 'Blok hitam pekat' },
              ].map((eng) => {
                const isSelected = data.engravingType === eng.id;
                return (
                  <button
                    key={eng.id}
                    type="button"
                    onClick={() => update({ engravingType: eng.id as any })}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-transparent ring-2 ring-[#0071E3] dark:ring-[#0A84FF] bg-black/[0.02] dark:bg-white/[0.04]'
                        : 'border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.15] bg-transparent'
                    }`}
                  >
                    <div className="font-medium text-xs text-neutral-900 dark:text-white">
                      {eng.label}
                    </div>
                    <div className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                      {eng.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Preview */}
          <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.1] text-neutral-800 dark:text-neutral-200 flex items-center justify-center shrink-0 shadow-xs">
                <Zap className="w-4 h-4 text-rose-500" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
                  Estimasi Lintasan Laser
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white font-mono">
                    ~{estimatedMeters}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">meter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE B: DIRECT METERS */}
      {mode === 'direct_length' && (
        <div className="space-y-4">
          <div className="bg-black/[0.02] dark:bg-white/[0.04] p-5 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                <span>Panjang Jalur Grafir / Potong (Meter)</span>
              </label>
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                Dari LightBurn / LaserGRBL
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={data.directMeters || ''}
                onChange={(e) => update({ directMeters: Math.max(0.1, Number(e.target.value) || 0) })}
                placeholder="0"
                className="w-full px-4 py-3 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white font-mono bg-white dark:bg-[#2C2C2E] rounded-xl border border-black/[0.08] dark:border-white/[0.1] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400 dark:text-neutral-500">
                METER
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mr-1">
                Contoh panjang:
              </span>
              {quickMeters.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => update({ directMeters: m })}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-400 bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] p-3.5 rounded-2xl">
            <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Software laser seperti LightBurn menampilkan total travel length di jendela preview kalkulasi. Masukkan nilai tersebut di sini.
            </p>
          </div>
        </div>
      )}

      {/* Quantity Stepper */}
      <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
        <QuantitySelector
          value={data.quantity}
          onChange={(qty) => update({ quantity: qty })}
          label="Jumlah Part Grafir (Kuantiti)"
          sublabel="Tentukan berapa pcs part yang akan digrafir"
        />
      </div>
    </div>
  );
};
