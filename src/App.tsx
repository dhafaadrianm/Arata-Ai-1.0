import React, { useState, useMemo } from 'react';
import {
  MaterialId,
  SlicerInputData,
  LaserInputData,
  InputMode3D,
  InputModeLaser,
  CalculatedResult,
  PresetItem,
} from './types';
import { MATERIALS } from './data/materials';
import { calculate3DPrint, calculateLaser, formatRupiah } from './utils/calculator';
import { Navbar } from './components/Navbar';
import { MaterialSelector } from './components/MaterialSelector';
import { SlicerCalculator } from './components/SlicerCalculator';
import { LaserCalculator } from './components/LaserCalculator';
import { PriceSummaryCard } from './components/PriceSummaryCard';
import { QuickPresets } from './components/QuickPresets';
import { CartList } from './components/CartList';
import { WhatsAppModal } from './components/WhatsAppModal';
import { GuideModal } from './components/GuideModal';
import { QRISModal } from './components/QRISModal';
import { ArataLogo } from './components/ArataLogo';
import { Check, ShieldCheck, Zap, Sparkles, QrCode, Phone, AlertCircle } from 'lucide-react';

export default function App() {
  // State for selected material
  const [selectedMaterialId, setSelectedMaterialId] = useState<MaterialId>('pla_plus');

  // State for 3D Print slicer calculator
  const [mode3D, setMode3D] = useState<InputMode3D>('dimensions');
  const [slicerData, setSlicerData] = useState<SlicerInputData>({
    lengthX: 60,
    widthY: 45,
    heightZ: 25,
    infillPercent: 20,
    geometryType: 'standard',
    wallThickness: 2,
    directWeight: 25,
    quantity: 1,
    fileName: 'Model 3D Part #1',
  });

  // State for Laser Engraving calculator
  const [modeLaser, setModeLaser] = useState<InputModeLaser>('dimensions');
  const [laserData, setLaserData] = useState<LaserInputData>({
    lengthX: 100,
    widthY: 100,
    engravingType: 'raster_light',
    directMeters: 10,
    quantity: 1,
    fileName: 'Desain Grafir Laser #1',
  });

  // Cart / Project list for multiple parts
  const [cartItems, setCartItems] = useState<CalculatedResult[]>([]);

  // Modals state
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isQRISModalOpen, setIsQRISModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dark mode state with persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('arata_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync dark class on <html> document element
  React.useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('arata_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('arata_theme', 'light');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Selected material object
  const currentMaterial = useMemo(() => {
    return (
      MATERIALS.find((m) => m.id === selectedMaterialId) || MATERIALS[0]
    );
  }, [selectedMaterialId]);

  // Live calculated result
  const calculatedResult: CalculatedResult = useMemo(() => {
    if (currentMaterial.category === '3d_print') {
      return calculate3DPrint(currentMaterial, slicerData, mode3D);
    } else {
      return calculateLaser(currentMaterial, laserData, modeLaser);
    }
  }, [currentMaterial, slicerData, mode3D, laserData, modeLaser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add current calculated item to cart
  const handleAddToCart = () => {
    setCartItems((prev) => [...prev, { ...calculatedResult }]);
    showToast(`"${calculatedResult.fileName}" berhasil ditambahkan ke daftar!`);
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateCartItemQuantity = (index: number, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const validQty = Math.max(1, newQty);
        return {
          ...item,
          quantity: validQty,
          totalPrice: item.subtotalPerItem * validQty,
        };
      })
    );
  };

  const handleUpdateCurrentQuantity = (newQty: number) => {
    const validQty = Math.max(1, newQty);
    if (currentMaterial.category === '3d_print') {
      setSlicerData((prev) => ({ ...prev, quantity: validQty }));
    } else {
      setLaserData((prev) => ({ ...prev, quantity: validQty }));
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Daftar part berhasil dikosongkan');
  };

  // When user clicks a preset
  const handleSelectPreset = (preset: PresetItem) => {
    setSelectedMaterialId(preset.materialId);

    if (preset.category === '3d_print') {
      setMode3D('dimensions');
      setSlicerData((prev) => ({
        ...prev,
        fileName: preset.title,
        lengthX: preset.dimensions.x,
        widthY: preset.dimensions.y,
        heightZ: preset.dimensions.z || 10,
        infillPercent: preset.infill || 20,
        directWeight: preset.weightOrLength,
        quantity: 1,
      }));
    } else {
      setModeLaser('dimensions');
      setLaserData((prev) => ({
        ...prev,
        fileName: preset.title,
        lengthX: preset.dimensions.x,
        widthY: preset.dimensions.y,
        directMeters: preset.weightOrLength,
        quantity: 1,
      }));
    }

    showToast(`Preset "${preset.title}" diterapkan`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-800 dark:text-slate-100 selection:bg-indigo-100 selection:text-indigo-900 transition-colors">
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 dark:border-slate-600 flex items-center gap-2 text-xs font-semibold animate-bounce">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        onOpenGuide={() => setIsGuideModalOpen(true)}
        onOpenQRIS={() => setIsQRISModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Intro banner */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200/50 dark:border-indigo-800/60 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Kalkulator Cepat & Transparan</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Hitung Biaya Cetak 3D & Laser Engraving
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              Pilih material, masukkan ukuran file seperti di slicer, dan dapatkan kalkulasi harga otomatis secara transparan. Siap kirim langsung ke WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setIsGuideModalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-750 transition-colors border border-indigo-200/60 dark:border-slate-700 cursor-pointer"
            >
              Lihat Panduan Bahan
            </button>
          </div>
        </div>

        {/* Non-marketplace & QRIS Payment Note Banner */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50/60 to-amber-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800/60 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 dark:bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-amber-100 text-sm sm:text-base">
                  Pemesanan Langsung Non-Marketplace
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                  Lebih Hemat
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
                <strong>Catatan:</strong> Ini adalah harga jika Anda pesan <strong>di luar marketplace seperti Shopee</strong>. Pembayaran bisa pakai <strong>QRIS (REXEL ID)</strong> lalu konfirmasi ke nomor <strong>085904408774</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto flex-wrap">
            <button
              type="button"
              onClick={() => setIsQRISModalOpen(true)}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Lihat Kode QRIS</span>
            </button>
            <a
              href="https://wa.me/6285904408774?text=Halo%20Arata%20Price%20AI,%20saya%20mau%20konfirmasi%20pemesanan%20di%20luar%20marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Konfirmasi (085904408774)</span>
            </a>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <QuickPresets onSelectPreset={handleSelectPreset} />

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Config & Slicer inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Material Selector */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs transition-colors">
              <MaterialSelector
                materials={MATERIALS}
                selectedId={selectedMaterialId}
                onSelect={setSelectedMaterialId}
              />
            </div>

            {/* Step 2: Simplified Slicer / Dimension Input */}
            {currentMaterial.category === '3d_print' ? (
              <SlicerCalculator
                material={currentMaterial}
                data={slicerData}
                mode={mode3D}
                onModeChange={setMode3D}
                onChange={setSlicerData}
              />
            ) : (
              <LaserCalculator
                material={currentMaterial}
                data={laserData}
                mode={modeLaser}
                onModeChange={setModeLaser}
                onChange={setLaserData}
              />
            )}

            {/* Cart / Multi-part List if items exist */}
            <CartList
              items={cartItems}
              onRemoveItem={handleRemoveCartItem}
              onUpdateQuantity={handleUpdateCartItemQuantity}
              onClearAll={handleClearCart}
              onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
            />
          </div>

          {/* Right Column: Price Summary Card & Sticky Totals (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <PriceSummaryCard
              result={calculatedResult}
              onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
              onAddToCart={handleAddToCart}
              onOpenQRIS={() => setIsQRISModalOpen(true)}
              onUpdateQuantity={handleUpdateCurrentQuantity}
            />

            {/* Quality & Service Trust Badges */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-2xs space-y-2.5 text-xs text-slate-600 dark:text-slate-300 transition-colors">
              <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Standar Mutu Layanan Arata</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400 pl-6 list-disc">
                <li>Bahan filamen & resin original berkualitas tinggi.</li>
                <li>Mesin terkalibrasi presisi dengan toleransi dimensi rapi.</li>
                <li>Pengecekan kelayakan file 3D sebelum proses pencetakan.</li>
                <li>Packing aman & bubble wrap tebal untuk pengiriman.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 shadow-lg flex items-center justify-between gap-3 transition-colors">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Estimasi:</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
              ({calculatedResult.quantity} pcs)
            </span>
          </div>
          <div className="text-lg font-black text-indigo-700 dark:text-indigo-400 font-mono leading-none">
            {formatRupiah(calculatedResult.totalPrice)}
          </div>
        </div>

        {/* Quick Stepper on Mobile bar */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
          <button
            type="button"
            onClick={() => handleUpdateCurrentQuantity(Math.max(1, calculatedResult.quantity - 1))}
            disabled={calculatedResult.quantity <= 1}
            className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-30 flex items-center justify-center font-bold text-xs cursor-pointer shadow-2xs"
            title="Kurang 1 pcs"
          >
            <span className="text-base leading-none">−</span>
          </button>
          <span className="w-8 text-center font-extrabold text-slate-900 dark:text-white font-mono text-xs">
            {calculatedResult.quantity}
          </span>
          <button
            type="button"
            onClick={() => handleUpdateCurrentQuantity(calculatedResult.quantity + 1)}
            className="w-8 h-8 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center font-bold text-xs cursor-pointer shadow-2xs"
            title="Tambah 1 pcs"
          >
            <span className="text-base leading-none">+</span>
          </button>
        </div>

        {/* WA Order Button */}
        <button
          type="button"
          onClick={() => setIsWhatsAppModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Pesan WA</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12 mb-16 lg:mb-0 py-8 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs shrink-0 flex items-center justify-center">
                <ArataLogo className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold text-slate-900 dark:text-white text-sm">
                  <span>Arata Price</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-indigo-600 text-white">
                    AI
                  </span>
                  <span className="text-slate-300 dark:text-slate-700 font-normal">|</span>
                  <span className="text-slate-700 dark:text-slate-300 font-semibold text-xs">Arata Manufacturing</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Platform Estimasi Biaya Cepat & Transparan untuk Jasa 3D Print dan Laser Engraving.
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                  Tarif: PLA+ Rp 299/g • PETG Rp 499/g • Resin Rp 599/g • Laser Rp 100/m
                </p>
                <p className="text-[11px] text-amber-700 dark:text-amber-300 font-medium mt-1 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-lg border border-amber-200/80 dark:border-amber-800/60 inline-block">
                  ⚠️ Catatan: ini adalah harga jika anda pesan diluar marketplace seperti shopee. pembayaran bisa pakai qris lalu konfirmasi ke nomor 085904408774.
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right shrink-0 space-y-2">
              <button
                type="button"
                onClick={() => setIsQRISModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-750 text-indigo-700 dark:text-indigo-300 font-bold text-xs border border-indigo-200 dark:border-slate-700 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QRIS REXEL ID</span>
              </button>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium border border-slate-200 dark:border-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Sistem Siap Operasi
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Cocok untuk Android, iPhone, Tablet, & Windows.
              </p>
            </div>
          </div>

          {/* Copyright & Entity statement */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 text-center sm:text-left">
            <p>
              Hak cipta milik <strong className="text-slate-700 dark:text-slate-200 font-semibold">Arata Manufacturing</strong> di bawah naungan <strong className="text-slate-700 dark:text-slate-200 font-semibold">PT Dhafa Tetap Berusaha</strong>.
            </p>
            <p className="text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} Arata Price AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        currentResult={calculatedResult}
        cartItems={cartItems}
        onOpenQRIS={() => setIsQRISModalOpen(true)}
      />

      <QRISModal
        isOpen={isQRISModalOpen}
        onClose={() => setIsQRISModalOpen(false)}
        totalAmount={
          cartItems.length > 0
            ? cartItems.reduce((s, it) => s + it.totalPrice, 0)
            : calculatedResult.totalPrice
        }
      />

      <GuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </div>
  );
}
