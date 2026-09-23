import React from 'react';
import { Box, Sparkles, Phone, HelpCircle, QrCode, Moon, Sun } from 'lucide-react';
import { ArataLogo } from './ArataLogo';

interface NavbarProps {
  onOpenGuide: () => void;
  onOpenQRIS: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGuide,
  onOpenQRIS,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center shrink-0">
              <ArataLogo className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>Arata</span>
                  <span className="text-indigo-600 dark:text-indigo-400">Price</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-black bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-xs">
                    AI
                  </span>
                </h1>
                <span className="hidden sm:inline-flex text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                  App Jasa
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Estimasi Cetak 3D Print & Laser Engraving
              </p>
            </div>
          </div>

          {/* Quick Price Ribbon & Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center justify-center"
              aria-label={isDarkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Malam'}
              title={isDarkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Malam (Dark Mode)'}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 stroke-[2.5]" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 stroke-[2.5]" />
              )}
            </button>

            <button
              onClick={onOpenQRIS}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 border border-indigo-200/80 dark:border-indigo-800/80 transition-colors cursor-pointer"
              title="Bayar dengan QRIS REXEL ID"
            >
              <QrCode className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline">QRIS</span>
            </button>

            <button
              onClick={onOpenGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title="Panduan Pemula & Daftar Bahan"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden md:inline">Panduan</span>
            </button>

            <a
              href="https://wa.me/6285904408774?text=Halo%20Arata%20Price%20AI,%20saya%20ingin%20tanya%20jasa%203D%20Print%20dan%20Laser%20Engraving"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 border border-emerald-200 dark:border-emerald-800 transition-colors"
              title="Konfirmasi WhatsApp ke 085904408774"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Live Price Bar (mobile & desktop friendly) */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-600 dark:text-slate-400 no-scrollbar">
          <span className="text-slate-400 dark:text-slate-500 shrink-0 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Tarif Resmi:
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
              PLA+: Rp 299/g
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200/60 dark:border-amber-800/60">
              PETG: Rp 499/g
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold border border-purple-200/60 dark:border-purple-800/60">
              Resin: Rp 599/g
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-semibold border border-rose-200/60 dark:border-rose-800/60">
              Laser: Rp 100/m
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
