import React from 'react';
import { Sparkles, Phone, HelpCircle, QrCode, Moon, Sun, ChevronRight } from 'lucide-react';
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
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.1] shadow-xs flex items-center justify-center shrink-0">
              <ArataLogo className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-semibold tracking-tight text-neutral-900 dark:text-white flex items-center gap-1">
                  Arata Price
                  <span className="text-[11px] font-medium tracking-normal px-1.5 py-0.5 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-black">
                    AI
                  </span>
                </span>
                <span className="hidden sm:inline-block text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
                  Precision Calculator
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal leading-none hidden sm:block mt-0.5">
                3D Printing & Laser Engraving Manufacturing
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Dark Mode Switch */}
            <button
              onClick={onToggleDarkMode}
              className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.08] active:scale-95 transition-all cursor-pointer border border-black/[0.04] dark:border-white/[0.08]"
              aria-label={isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
              title={isDarkMode ? 'Beralih ke Tampilan Terang' : 'Beralih ke Tampilan Gelap'}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 stroke-[2]" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700 stroke-[2]" />
              )}
            </button>

            {/* Quick QRIS Button */}
            <button
              onClick={onOpenQRIS}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.07] dark:hover:bg-white/[0.12] active:scale-95 border border-black/[0.04] dark:border-white/[0.08] transition-all cursor-pointer"
              title="Kode QRIS REXEL ID"
            >
              <QrCode className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300" />
              <span>QRIS</span>
            </button>

            {/* Guide Button */}
            <button
              onClick={onOpenGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.07] dark:hover:bg-white/[0.12] active:scale-95 border border-black/[0.04] dark:border-white/[0.08] transition-all cursor-pointer"
              title="Panduan Pemilihan Bahan"
            >
              <HelpCircle className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300" />
              <span className="hidden sm:inline">Panduan</span>
            </button>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/6285904408774?text=Halo%20Arata%20Price%20AI,%20saya%20ingin%20konsultasi%20jasa%203D%20Print%20atau%20Laser%20Engraving"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-[#0071E3] hover:bg-[#0077ED] active:scale-95 transition-all shadow-xs"
              title="Konsultasi WhatsApp: 085904408774"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Kontak</span>
            </a>
          </div>
        </div>

        {/* Apple-style Sub-bar with Live Standard Rates */}
        <div className="py-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[11px] overflow-x-auto no-scrollbar gap-4">
          <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 shrink-0">
            <span className="font-medium text-neutral-800 dark:text-neutral-200">Tarif Standar:</span>
            <span>PLA+ <strong className="font-semibold text-neutral-900 dark:text-white">Rp 299</strong>/g</span>
            <span className="text-neutral-300 dark:text-neutral-700">·</span>
            <span>PETG <strong className="font-semibold text-neutral-900 dark:text-white">Rp 499</strong>/g</span>
            <span className="text-neutral-300 dark:text-neutral-700">·</span>
            <span>Resin <strong className="font-semibold text-neutral-900 dark:text-white">Rp 599</strong>/g</span>
            <span className="text-neutral-300 dark:text-neutral-700">·</span>
            <span>Laser <strong className="font-semibold text-neutral-900 dark:text-white">Rp 100</strong>/m</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-neutral-400 dark:text-neutral-500 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Kalkulasi Otomatis Presisi</span>
          </div>
        </div>
      </div>
    </header>
  );
};
