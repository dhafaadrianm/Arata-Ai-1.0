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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                Panduan Pemula & Daftar Harga Arata Price AI
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Informasi material 3D Print dan Laser Engraving
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex-1">
          {/* Price Table Card */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">
              Daftar Tarif Resmi Layanan
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {MATERIALS.map((m) => (
                <div key={m.id} className="p-3 sm:p-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{m.name}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{m.recommendedFor}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-extrabold text-indigo-700 dark:text-indigo-400 text-base">
                      {formatRupiah(m.pricePerUnit)}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                      per {m.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slicer Tips for Beginners */}
          <div className="bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 rounded-xl p-4 space-y-2">
            <h4 className="font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Cara Mendapatkan Ukuran & Berat File 3D:</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-indigo-900 dark:text-indigo-300 leading-relaxed">
              <li>
                <strong>Opsi 1 (Paling Mudah):</strong> Gunakan mode <em>"Estimasi Ukuran (P × L × T)"</em> di Arata Price. Cukup masukkan perkiraan panjang, lebar, tinggi (dalam mm), dan persentase infill. Sistem langsung mengkalkulasi berat filamennya!
              </li>
              <li>
                <strong>Opsi 2 (Super Akurat):</strong> Buka software slicer (Cura, Bambu Studio, OrcaSlicer, PrusaSlicer, Chitubox). Klik <em>"Slice"</em>, lalu lihat angka berat filamen dalam <strong>gram</strong> di pojok kanan bawah. Masukkan angka tersebut di mode <em>"Input Gram Langsung"</em>.
              </li>
            </ul>
          </div>

          {/* Material Comparison */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              Karakteristik Material
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/30">
                <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1 flex items-center gap-1">
                  <Box className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> 3D Print PLA+ (Rp 299/g)
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Bahan ramah lingkungan berbasis pati jagung. Sangat mudah dicetak, minim warping, warna cerah, cocok untuk aksesoris, action figure, pot bunga, dudukan HP, & prototipe visual.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/30">
                <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> 3D Print PETG (Rp 499/g)
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Bahan yang sama dengan botol minuman premium. Tahan panas hingga 75°C, tahan cuaca panas hujan luar ruangan, liat dan tidak mudah pecah. Sangat cocok untuk part otomotif & mekanik.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/40 dark:bg-purple-950/30">
                <span className="font-bold text-purple-900 dark:text-purple-300 block mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> 3D Print Resin (Rp 599/g)
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Menggunakan sinar UV cair (SLA/MSLA). Detail sangat mikroskopis (hingga 0.02mm), tidak memiliki garis tumpukan layer. Sangat direkomendasikan untuk miniatur anime, perhiasan, dan figur koleksi.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/40 dark:bg-rose-950/30">
                <span className="font-bold text-rose-900 dark:text-rose-300 block mb-1 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Laser Engraving (Rp 100/m)
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Sinar laser presisi tinggi membakar/mengukir permukaan kayu, akrilik, kulit, atau logam cat. Biaya dihitung per meter jalur sinar laser. Cocok untuk plakat nama, souvenir, logo, & tumbler.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-850">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white font-bold text-xs hover:bg-slate-800 dark:hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
