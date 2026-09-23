import React from 'react';
import {
  LaserInputData,
  InputModeLaser,
  MaterialOption,
} from '../types';
import {
  Zap,
  Maximize2,
  Minus,
  Plus,
  FileText,
  HelpCircle,
  Activity,
} from 'lucide-react';
import {
  estimateLaserMetersFromDimensions,
} from '../utils/calculator';
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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-6 transition-colors">
      {/* Header & Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <span>2. Informasi Desain Laser Engraving</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Tarif resmi: <strong className="text-rose-600 dark:text-rose-400 font-bold">Rp 100 / Meter</strong> panjang jalur kerja laser
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold self-start sm:self-auto border border-slate-200/60 dark:border-slate-700">
          <button
            type="button"
            onClick={() => onModeChange('dimensions')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'dimensions'
                ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-300 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Estimasi Dimensi (P×L)</span>
          </button>
          <button
            type="button"
            onClick={() => onModeChange('direct_length')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'direct_length'
                ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-300 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Input Meter Langsung</span>
          </button>
        </div>
      </div>

      {/* Part / File Name Input */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Nama Desain / Part (Opsional)
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">Contoh: Plakat Akrilik, Grafir Tumbler</span>
        </label>
        <input
          type="text"
          value={data.fileName}
          onChange={(e) => update({ fileName: e.target.value })}
          placeholder="Nama file CDR / DXF / AI / SVG atau keterangan..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>

      {/* MODE A: ESTIMASI DIMENSI LASER */}
      {mode === 'dimensions' && (
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Ukuran Area Bidang Grafir (Milimeter / mm)
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">100 mm = 10 cm</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Panjang (X)</span>
                  <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">mm</span>
                </div>
                <input
                  type="number"
                  min="5"
                  value={data.lengthX || ''}
                  onChange={(e) => update({ lengthX: Math.max(1, Number(e.target.value) || 0) })}
                  className="w-full font-bold text-base text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-rose-500 text-center font-mono"
                />
                <span className="block text-center text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                  {(data.lengthX / 10).toFixed(1)} cm
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Lebar (Y)</span>
                  <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">mm</span>
                </div>
                <input
                  type="number"
                  min="5"
                  value={data.widthY || ''}
                  onChange={(e) => update({ widthY: Math.max(1, Number(e.target.value) || 0) })}
                  className="w-full font-bold text-base text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-rose-500 text-center font-mono"
                />
                <span className="block text-center text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                  {(data.widthY / 10).toFixed(1)} cm
                </span>
              </div>
            </div>
          </div>

          {/* Engraving Style */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Jenis Pengerjaan Laser
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'raster_light',
                  title: 'Grafir Teks / Logo Ringan',
                  desc: 'Arsiran renggang (jarak ~0.4mm), cepat & hemat.',
                },
                {
                  id: 'raster_dense',
                  title: 'Grafir Foto / Blok Hitam Padat',
                  desc: 'Arsiran rapat (jarak ~0.2mm), warna pekat.',
                },
                {
                  id: 'vector_cut',
                  title: 'Vector Outline / Potong Garis',
                  desc: 'Hanya mengikuti keliling garis pinggir desain.',
                },
              ].map((style) => {
                const isSelected = data.engravingType === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => update({ engravingType: style.id as any })}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-rose-600 dark:border-rose-500 bg-rose-50/60 dark:bg-rose-950/60 ring-1 ring-rose-500 text-rose-950 dark:text-rose-200 font-bold'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{style.title}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal mt-1 leading-snug">
                      {style.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Auto calculated length display */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-rose-50 to-orange-50 dark:from-slate-800 dark:to-rose-950/40 border border-rose-100 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-rose-900 dark:text-rose-300 tracking-wide uppercase">
                  Estimasi Panjang Jalur Laser
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold text-rose-700 dark:text-rose-400 font-mono">
                    ~{estimatedMeters}
                  </span>
                  <span className="text-xs font-bold text-rose-900 dark:text-rose-300">Meter</span>
                </div>
              </div>
            </div>
            <div className="text-right text-xs text-slate-500 dark:text-slate-400">
              Biaya: {estimatedMeters} m × Rp 100
            </div>
          </div>
        </div>
      )}

      {/* MODE B: DIRECT METERS */}
      {mode === 'direct_length' && (
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Total Panjang Jalur Laser (Meter)</span>
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Dari software LaserGRBL / LightBurn
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                min="0.1"
                step="0.5"
                value={data.directMeters || ''}
                onChange={(e) => update({ directMeters: Math.max(0, Number(e.target.value) || 0) })}
                placeholder="0.0"
                className="w-full px-4 py-3 text-2xl font-extrabold text-slate-900 dark:text-white font-mono bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 dark:text-slate-500">
                METER
              </span>
            </div>

            {/* Quick meter chips */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Contoh meter:</span>
              {quickMeters.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => update({ directMeters: m })}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-rose-400 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 bg-rose-50/60 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/60 p-3 rounded-xl">
            <HelpCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <p>
              <strong>Tips Pelanggan Laser:</strong> Jika Anda memiliki file di software laser seperti LightBurn atau LaserGRBL, Anda dapat melihat total estimasi jarak lintasan (cut length / travel distance) dan memasukkan angkanya ke sini.
            </p>
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <QuantitySelector
          value={data.quantity}
          onChange={(qty) => update({ quantity: qty })}
          label="Jumlah Pesanan Laser (Kuantiti)"
          sublabel="Tentukan berapa pcs barang yang ingin digrafir"
        />
      </div>
    </div>
  );
};
