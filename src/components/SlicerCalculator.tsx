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
  FileText,
  Clock,
  Info,
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

  const dimensionEstimates = estimateWeightFromDimensions(data, material.density);
  const quickGrams = [10, 25, 50, 75, 100, 200];
  const quickInfills = [10, 15, 20, 30, 50, 100];

  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6 transition-colors">
      {/* Header with Mode Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
            Langkah 2
          </span>
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            Spesifikasi 3D Slicer
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Simulasi dimensi fisik part atau masukkan langsung gramasi slicer
          </p>
        </div>

        {/* Apple Segmented Control Mode */}
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
            <span>Dimensi (P×L×T)</span>
          </button>
          <button
            type="button"
            onClick={() => onModeChange('direct_weight')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'direct_weight'
                ? 'bg-white dark:bg-[#2C2C2E] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
            <span>Gram Langsung</span>
          </button>
        </div>
      </div>

      {/* Part / File Name Input */}
      <div>
        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
          Nama Part / File 3D (Opsional)
        </label>
        <div className="relative">
          <FileText className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={data.fileName}
            onChange={(e) => update({ fileName: e.target.value })}
            placeholder="Contoh: Casing HP, Bracket GoPro, Gearbox v1..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] focus:bg-white dark:focus:bg-[#2C2C2E] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all"
          />
        </div>
      </div>

      {/* MODE A: DIMENSIONS SLICER SIMULATOR */}
      {mode === 'dimensions' && (
        <div className="space-y-5">
          {/* Dimension Inputs (X, Y, Z in mm) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                <span>Dimensi Luar Part (Milimeter / mm)</span>
              </label>
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                10 mm = 1 cm
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {/* Length X */}
              <div className="bg-black/[0.02] dark:bg-white/[0.04] p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] text-center">
                <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                  Panjang (X)
                </div>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={data.lengthX || ''}
                  onChange={(e) => update({ lengthX: Math.max(1, Number(e.target.value) || 0) })}
                  className="w-full font-semibold text-lg text-neutral-900 dark:text-white bg-transparent focus:outline-none text-center font-mono"
                />
                <span className="block text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                  {(data.lengthX / 10).toFixed(1)} cm
                </span>
              </div>

              {/* Width Y */}
              <div className="bg-black/[0.02] dark:bg-white/[0.04] p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] text-center">
                <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                  Lebar (Y)
                </div>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={data.widthY || ''}
                  onChange={(e) => update({ widthY: Math.max(1, Number(e.target.value) || 0) })}
                  className="w-full font-semibold text-lg text-neutral-900 dark:text-white bg-transparent focus:outline-none text-center font-mono"
                />
                <span className="block text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                  {(data.widthY / 10).toFixed(1)} cm
                </span>
              </div>

              {/* Height Z */}
              <div className="bg-black/[0.02] dark:bg-white/[0.04] p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] text-center">
                <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                  Tinggi (Z)
                </div>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={data.heightZ || ''}
                  onChange={(e) => update({ heightZ: Math.max(1, Number(e.target.value) || 0) })}
                  className="w-full font-semibold text-lg text-neutral-900 dark:text-white bg-transparent focus:outline-none text-center font-mono"
                />
                <span className="block text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                  {(data.heightZ / 10).toFixed(1)} cm
                </span>
              </div>
            </div>
          </div>

          {/* Model Geometry / Shape Type */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Karakteristik Bentuk Geometri
              </label>
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                Pengaruh rongga model
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'standard', label: 'Standar', desc: 'Bentuk umum / kotak' },
                { id: 'mechanical', label: 'Mekanikal', desc: 'Bracket & part fungsional' },
                { id: 'organic', label: 'Organik', desc: 'Figurin & miniatur lekuk' },
                { id: 'hollow', label: 'Rongga', desc: 'Case & silinder cangkang' },
              ].map((geom) => {
                const isSelected = data.geometryType === geom.id;
                return (
                  <button
                    key={geom.id}
                    type="button"
                    onClick={() => update({ geometryType: geom.id as ModelGeometryType })}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-transparent ring-2 ring-[#0071E3] dark:ring-[#0A84FF] bg-black/[0.02] dark:bg-white/[0.04]'
                        : 'border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.15] bg-transparent'
                    }`}
                  >
                    <div className="font-medium text-xs text-neutral-900 dark:text-white">
                      {geom.label}
                    </div>
                    <div className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5 leading-snug">
                      {geom.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Infill Density Slider */}
          <div className="bg-black/[0.02] dark:bg-white/[0.04] p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                  <span>Infill Density (Kepadatan Rongga)</span>
                </label>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                  Display: 15-20% · Part mekanis fungsional: 30-50%
                </p>
              </div>
              <span className="text-sm font-semibold text-neutral-900 dark:text-white font-mono px-2 py-0.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.08]">
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
              className="w-full accent-[#0071E3] cursor-pointer h-1.5 bg-black/[0.08] dark:bg-white/[0.15] rounded-lg"
            />

            {/* Infill Segment Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mr-1">
                Pilihan cepat:
              </span>
              {quickInfills.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => update({ infillPercent: val })}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                    data.infillPercent === val
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-black shadow-xs'
                      : 'bg-black/[0.04] dark:bg-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* Slicer Live Output Metric Tile */}
          <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.1] text-neutral-800 dark:text-neutral-200 flex items-center justify-center shrink-0 shadow-xs">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
                  Hasil Estimasi Filamen
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white font-mono">
                    ~{dimensionEstimates.weightGrams}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">gram</span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 ml-2 hidden sm:inline">
                    · Vol {dimensionEstimates.volumeCm3} cm³
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
              <span>Est. ~{formatMinutes(dimensionEstimates.estimatedMinutes)}</span>
            </div>
          </div>
        </div>
      )}

      {/* MODE B: DIRECT WEIGHT INPUT */}
      {mode === 'direct_weight' && (
        <div className="space-y-4">
          <div className="bg-black/[0.02] dark:bg-white/[0.04] p-5 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                <span>Berat Filamen / Resin Terpotong (Gram)</span>
              </label>
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                Dari software Bambu Studio / Cura / Chitubox
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                min="1"
                step="0.1"
                value={data.directWeight || ''}
                onChange={(e) => update({ directWeight: Math.max(0, Number(e.target.value) || 0) })}
                placeholder="0"
                className="w-full px-4 py-3 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white font-mono bg-white dark:bg-[#2C2C2E] rounded-xl border border-black/[0.08] dark:border-white/[0.1] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400 dark:text-neutral-500">
                GRAM
              </span>
            </div>

            {/* Quick Grams Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mr-1">
                Contoh berat:
              </span>
              {quickGrams.map((gram) => (
                <button
                  key={gram}
                  type="button"
                  onClick={() => update({ directWeight: gram })}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                >
                  {gram}g
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-400 bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] p-3.5 rounded-2xl">
            <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Anda dapat mengiris model (.STL) di software slicer Anda untuk mendapatkan berat akurat hingga desimal, lalu masukkan angka tersebut di sini.
            </p>
          </div>
        </div>
      )}

      {/* Quantity Stepper */}
      <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
        <QuantitySelector
          value={data.quantity}
          onChange={(qty) => update({ quantity: qty })}
          label="Jumlah Part (Kuantiti)"
          sublabel="Tentukan berapa pcs part yang akan diproduksi"
        />
      </div>
    </div>
  );
};
