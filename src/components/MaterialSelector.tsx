import React from 'react';
import { MaterialId, MaterialOption } from '../types';
import { Box, Flame, Sparkles, Zap, Check } from 'lucide-react';
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
        return <Box className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'petg':
        return <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'resin':
        return <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'laser_engraving':
        return <Zap className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
            Langkah 1
          </span>
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            Pilih Layanan & Bahan
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Filamen 3D printing berkualitas tinggi atau grafir laser presisi
          </p>
        </div>

        {/* Apple Segmented Control */}
        <div className="inline-flex p-1 bg-black/[0.05] dark:bg-white/[0.08] rounded-full self-start sm:self-auto text-xs">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer font-medium ${
              activeFilter === 'all'
                ? 'bg-white dark:bg-[#2C2C2E] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Semua
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('3d_print')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer font-medium ${
              activeFilter === '3d_print'
                ? 'bg-white dark:bg-[#2C2C2E] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            3D Print
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('laser')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer font-medium ${
              activeFilter === 'laser'
                ? 'bg-white dark:bg-[#2C2C2E] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Laser
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredMaterials.map((mat) => {
          const isSelected = selectedId === mat.id;
          return (
            <button
              key={mat.id}
              type="button"
              onClick={() => onSelect(mat.id)}
              className={`group text-left p-4 rounded-2xl transition-all cursor-pointer relative flex flex-col justify-between border ${
                isSelected
                  ? 'bg-white dark:bg-[#1C1C1E] border-transparent ring-2 ring-[#0071E3] dark:ring-[#0A84FF] shadow-[0_4px_16px_rgba(0,113,227,0.12)] dark:shadow-[0_4px_16px_rgba(10,132,255,0.16)]'
                  : 'bg-white dark:bg-[#1C1C1E] border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.15] hover:shadow-xs'
              }`}
            >
              <div>
                {/* Top: Icon & Selected Check */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl bg-black/[0.04] dark:bg-white/[0.08] flex items-center justify-center">
                    {getIcon(mat.id)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                      {mat.tag}
                    </span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#0071E3] dark:bg-[#0A84FF] text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="font-semibold text-neutral-900 dark:text-white text-sm tracking-tight group-hover:text-[#0071E3] dark:group-hover:text-[#0A84FF] transition-colors">
                  {mat.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {mat.description}
                </p>
              </div>

              {/* Price Row */}
              <div className="mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-baseline justify-between">
                <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
                  Tarif
                </span>
                <div className="text-right">
                  <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white font-mono">
                    {formatRupiah(mat.pricePerUnit)}
                  </span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 ml-0.5">
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
