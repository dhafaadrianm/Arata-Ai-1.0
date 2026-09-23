import React from 'react';
import {
  SlicerInputData,
  InputMode3D,
  ModelGeometryType,
  MaterialOption,
} from '../types';
import {
  Layers,
  Sliders,
  Maximize2,
  Box,
  Scale,
  Minus,
  Plus,
  FileText,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { estimateWeightFromDimensions, formatMinutes } from '../utils/calculator';
import { QuantitySelector } from './QuantitySelector';

interface SlicerCalculatorProps {
  material: MaterialOption;
  data: SlicerInputData;
  mode: InputMode3D;
  onModeChange: (mode: InputMode3D) => void;
  onChange: (data: SlicerInputData) => void;
}

export const SlicerCalculator: React.FC<SlicerCalculatorProps> = ({
  material,
  data,
  mode,
  onModeChange,
  onChange,
}) => {
  const update = (fields: Partial<SlicerInputData>) => {
    onChange({ ...data, ...fields });
  };

  // Calculate live preview metrics for dimensions mode
  const dimensionEstimates = estimateWeightFromDimensions(data, material.density);
  const currentCalculatedWeight =
    mode === 'direct_weight' ? data.directWeight : dimensionEstimates.weightGrams;

  const quickGrams = [10, 25, 50, 75, 100, 200];
  const quickInfills = [10, 15, 20, 30, 50, 100];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-6 transition-colors">
      {/* Header with Mode Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>2. Informasi File & Slicer Sederhana</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Tentukan ukuran fisik atau masukkan langsung berat dari software slicer
          </p>
        </div>

        {/* Segmented Control Mode */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold self-start sm:self-auto border border-slate-200/60 dark:border-slate-700">
          <button
            type="button"
            onClick={() => onModeChange('dimensions')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'dimensions'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Estimasi Ukuran (P×L×T)</span>
          </button>
          <button
            type="button"
            onClick={() => onModeChange('direct_weight')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'direct_weight'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Input Gram Langsung</span>
          </button>
        </div>
      </div>

      {/* Part / File Name Input */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Nama Part / File (Opsional)
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">Contoh: Casing HP, Gearbox v1</span>
        </label>
        <input
          type="text"
          value={data.fileName}
          onChange={(e) => update({ fileName: e.target.value })}
          placeholder="Nama file STL / OBJ / 3MF atau keterangan part..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>

      {/* MODE A: DIMENSIONS SLICER SIMULATOR */}
      {mode === 'dimensions' && (
        <div className="space-y-5">
          {/* Dimension Inputs (X, Y, Z in mm) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Dimensi Luar File (Milimeter / mm)</span>
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                10 mm = 1 cm
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
              {/* Length X */}
              <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Panjang (X)</span>
                  <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">mm</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={data.lengthX || ''}
                  onChange={(e) => update({ lengthX: Math.max(1, Number(e.target.value) || 0) })}
                  className="w-full font-bold text-base text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-center font-mono"
                />
                <span className="block text-center text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                  {(data.lengthX / 10).toFixed(1)} cm
                </span>
              </div>

              {/* Width Y */}
              <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Lebar (Y)</span>
                  <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">mm</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={data.widthY || ''}
                  onChange={(e) => update({ widthY: Math.max(1, Number(e.target.value) || 0) })}
                  className="w-full font-bold text-base text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-center font-mono"
                />
                <span className="block text-center text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                  {(data.widthY / 10).toFixed(1)} cm
                </span>
              </div>

              {/* Height Z */}
              <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Tinggi (Z)</span>
                  <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">mm</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={data.heightZ || ''}
                  onChange={(e) => update({ heightZ: Math.max(1, Number(e.target.value) || 0) })}
                  className="w-full font-bold text-base text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-center font-mono"
                />
                <span className="block text-center text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                  {(data.heightZ / 10).toFixed(1)} cm
                </span>
              </div>
            </div>
          </div>

          {/* Model Geometry / Shape Type */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Tipe Karakteristik Bentuk Model
              </label>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">Mempengaruhi kepadatan rongga</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'standard', label: 'Standar / Umum', desc: 'Kotak / part biasa' },
                { id: 'mechanical', label: 'Padat / Mekanikal', desc: 'Bracket, gear padat' },
                { id: 'organic', label: 'Organik / Figure', desc: 'Patung, miniatur lekuk' },
                { id: 'hollow', label: 'Cangkang / Rongga', desc: 'Case, pot, vas kosong' },
              ].map((geom) => {
                const isSelected = data.geometryType === geom.id;
                return (
                  <button
                    key={geom.id}
                    type="button"
                    onClick={() => update({ geometryType: geom.id as ModelGeometryType })}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/60 text-indigo-950 dark:text-indigo-200 font-bold ring-1 ring-indigo-500'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-[13px]">{geom.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-0.5">{geom.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Infill Percentage Slider & Presets */}
          <div className="bg-slate-50/80 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Infill Density (Kepadatan Dalam)</span>
                </label>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Standar pajangan: 15-20%. Part kuat fungsional: 30-50%.
                </p>
              </div>
              <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-100/80 dark:bg-indigo-950 px-2.5 py-0.5 rounded-lg border border-indigo-200/50 dark:border-indigo-850">
                {data.infillPercent}%
              </span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={data.infillPercent}
              onChange={(e) => update({ infillPercent: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />

            {/* Quick Infill Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mr-1">Preset cepat:</span>
              {quickInfills.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => update({ infillPercent: val })}
                  className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    data.infillPercent === val
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* Slicer Real-Time Simulation Result Bar */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-50 via-blue-50 to-slate-50 dark:from-slate-800 dark:via-indigo-950/40 dark:to-slate-850 border border-indigo-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-indigo-900 dark:text-indigo-300 tracking-wide uppercase">
                  Hasil Estimasi Berat Slicer
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold text-indigo-700 dark:text-indigo-400 font-mono">
                    ~{dimensionEstimates.weightGrams}
                  </span>
                  <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-300">gram</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                    (Vol: {dimensionEstimates.volumeCm3} cm³)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-lg border border-indigo-100/60 dark:border-slate-700">
              <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Est. Waktu: ~{formatMinutes(dimensionEstimates.estimatedMinutes)}</span>
            </div>
          </div>
        </div>
      )}

      {/* MODE B: DIRECT WEIGHT INPUT */}
      {mode === 'direct_weight' && (
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Masukkan Berat Filament / Resin (Gram)</span>
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Lihat di Bambu Studio / Cura / Chitubox
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  value={data.directWeight || ''}
                  onChange={(e) => update({ directWeight: Math.max(0, Number(e.target.value) || 0) })}
                  placeholder="0.0"
                  className="w-full px-4 py-3 text-2xl font-extrabold text-slate-900 dark:text-white font-mono bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 dark:text-slate-500">
                  GRAM
                </span>
              </div>
            </div>

            {/* Quick Grams Chips */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Contoh berat:</span>
              {quickGrams.map((gram) => (
                <button
                  key={gram}
                  type="button"
                  onClick={() => update({ directWeight: gram })}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {gram}g
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/60 p-3 rounded-xl">
            <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Tips Pelanggan:</strong> Anda bisa memotong file (.STL) di software slicer favorit Anda (Cura, Bambu Studio, OrcaSlicer, Chitubox). Masukkan nilai gram filamen yang tertera di sana untuk hasil yang 100% presisi.
            </p>
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <QuantitySelector
          value={data.quantity}
          onChange={(qty) => update({ quantity: qty })}
          label="Jumlah Cetak 3D (Kuantiti)"
          sublabel="Tentukan berapa pcs part yang ingin dicetak"
        />
      </div>
    </div>
  );
};
