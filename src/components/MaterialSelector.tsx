import React from 'react';
import { MaterialId, MaterialOption } from '../types';
import { Box, Flame, Sparkles, Zap, Check, Layers } from 'lucide-react';
import { formatRupiah } from '../utils/calculator';

interface MaterialSelectorProps {
  materials: MaterialOption[];
  selectedId: MaterialId;
  onSelect: (id: MaterialId) => void;
}

export const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  materials,
  selectedId,
  onSelect,
}) => {
  const [activeFilter, setActiveFilter] = React.useState<'all' | '3d_print' | 'laser'>('all');

  const filteredMaterials = React.useMemo(() => {
    if (activeFilter === 'all') return materials;
    return materials.filter((m) => m.category === activeFilter);
  }, [materials, activeFilter]);

  const getIcon = (id: MaterialId) => {
    switch (id) {
      case 'pla_plus':
        return <Box className="w-5 h-5 text-emerald-600" />;
      case 'petg':
        return <Flame className="w-5 h-5 text-amber-600" />;
      case 'resin':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      case 'laser_engraving':
        return <Zap className="w-5 h-5 text-rose-600" />;
    }
  };

  const getBorderColor = (id: MaterialId, isSelected: boolean) => {
    if (!isSelected)
      return 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs bg-white dark:bg-slate-900';
    switch (id) {
      case 'pla_plus':
        return 'border-emerald-500 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20 shadow-xs';
      case 'petg':
        return 'border-amber-500 dark:border-amber-500 bg-amber-50/50 dark:bg-amber-950/40 ring-2 ring-amber-500/20 shadow-xs';
      case 'resin':
        return 'border-purple-500 dark:border-purple-500 bg-purple-50/50 dark:bg-purple-950/40 ring-2 ring-purple-500/20 shadow-xs';
      case 'laser_engraving':
        return 'border-rose-500 dark:border-rose-500 bg-rose-50/50 dark:bg-rose-950/40 ring-2 ring-rose-500/20 shadow-xs';
    }
  };

  const getTagBadge = (id: MaterialId) => {
    switch (id) {
      case 'pla_plus':
        return 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/80';
      case 'petg':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/80';
      case 'resin':
        return 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/80';
      case 'laser_engraving':
        return 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/80';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <label className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>1. Pilih Layanan / Bahan Material</span>
          </label>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pilih jenis filamen 3D Print atau Grafir Laser sesuai kebutuhan part Anda
          </p>
        </div>

        {/* Quick Filter Pill Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Semua
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('3d_print')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeFilter === '3d_print'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            3D Print
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('laser')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeFilter === 'laser'
                ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-300 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Laser
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredMaterials.map((mat) => {
          const isSelected = selectedId === mat.id;
          return (
            <button
              key={mat.id}
              type="button"
              onClick={() => onSelect(mat.id)}
              className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between group ${getBorderColor(
                mat.id,
                isSelected
              )}`}
            >
              {/* Top Row: Icon & Tag */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-2xs border border-slate-100 dark:border-slate-700/80 shrink-0">
                    {getIcon(mat.id)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTagBadge(mat.id)}`}>
                      {mat.tag}
                    </span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {mat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {mat.description}
                </p>
              </div>

              {/* Bottom Row: Price display */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-200/70 dark:border-slate-800 flex items-baseline justify-between">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">Tarif:</span>
                <div className="text-right">
                  <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                    {formatRupiah(mat.pricePerUnit)}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-0.5">
                    /{mat.unit}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
