import React from 'react';
import { X, Box, Flame, Sparkles, Zap, CheckCircle2, HelpCircle } from 'lucide-react';
import { formatRupiah } from '../utils/calculator';
import { MATERIALS } from '../data/materials';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl max-w-2xl w-full my-auto flex flex-col shadow-2xl border border-black/[0.08] dark:border-white/[0.1] overflow-hidden transition-colors max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] flex items-center justify-center text-neutral-900 dark:text-white">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white text-base">
                Panduan Material & Tarif
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Informasi teknis layanan 3D Print dan Laser Engraving Arata
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs text-neutral-600 dark:text-neutral-300">
          {/* Price Table Card */}
          <div className="border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden bg-black/[0.015] dark:bg-white/[0.02]">
            <div className="px-4 py-2.5 font-semibold text-neutral-800 dark:text-neutral-200 text-xs border-b border-black/[0.06] dark:border-white/[0.08]">
              Daftar Tarif Layanan Resmi
            </div>
            <div className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
              {MATERIALS.map((m) => (
                <div key={m.id} className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-white block text-sm">
                      {m.name}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {m.recommendedFor}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-neutral-900 dark:text-white text-base">
                      {formatRupiah(m.pricePerUnit)}
                    </span>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 block">
                      /{m.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slicer Tips */}
          <div className="bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 space-y-2">
            <h4 className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#0071E3] dark:text-[#0A84FF]" />
              <span>Cara Mengetahui Ukuran & Berat File 3D:</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pl-5 list-disc">
              <li>
                <strong>Mode Estimasi Dimensi (P × L × T):</strong> Cukup masukkan dimensi luar part dan persentase kepadatan infill. Algoritma Arata akan menghitung perkiraan berat filamen secara otomatis.
              </li>
              <li>
                <strong>Mode Gram Langsung:</strong> Jika sudah memiliki software slicer (Bambu Studio, OrcaSlicer, Cura, Chitubox), lakukan slicing dan masukkan angka berat gram filamen yang tertera untuk akurasi optimal.
              </li>
            </ul>
          </div>

          {/* Material Comparison Cards */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-900 dark:text-white text-xs">
              Karakteristik & Aplikasi Material
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02]">
                <span className="font-semibold text-neutral-900 dark:text-white block mb-1 flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-emerald-500" /> PLA+ (Rp 299/g)
                </span>
                <p className="text-neutral-500 dark:text-neutral-400 text-[11px] leading-relaxed">
                  Finishing rapi, minim warping, ramah lingkungan, warna variatif. Ideal untuk prototipe visual, casing gadget, miniatur, dan display estetis.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02]">
                <span className="font-semibold text-neutral-900 dark:text-white block mb-1 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> PETG (Rp 499/g)
                </span>
                <p className="text-neutral-500 dark:text-neutral-400 text-[11px] leading-relaxed">
                  Tahan benturan, elastisitas tinggi, tahan panas hingga 75°C, dan tahan cuaca outdoor. Cocok untuk bracket, part mekanikal, dan komponen fungsional mesin.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02]">
                <span className="font-semibold text-neutral-900 dark:text-white block mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" /> Resin SLA (Rp 599/g)
                </span>
                <p className="text-neutral-500 dark:text-neutral-400 text-[11px] leading-relaxed">
                  Presisi mikron ultra-tinggi, permukaan sangat mulus tanpa layer lines kasat mata. Terbaik untuk action figure detail, perhiasan, dan part presisi kecil.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02]">
                <span className="font-semibold text-neutral-900 dark:text-white block mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-rose-500" /> Laser Engraving (Rp 100/m)
                </span>
                <p className="text-neutral-500 dark:text-neutral-400 text-[11px] leading-relaxed">
                  Grafir dan pemotongan laser di media akrilik, kayu, kulit, atau anodized metal. Hasil permanen, tajam, dan elegan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-black/[0.06] dark:border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black font-medium text-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
