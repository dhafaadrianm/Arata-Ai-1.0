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
import { Check, ShieldCheck, QrCode, Phone, Info, ArrowUpRight } from 'lucide-react';

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
    showToast(`"${calculatedResult.fileName}" ditambahkan ke daftar pesanan`);
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
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] flex flex-col font-sans text-neutral-900 dark:text-neutral-100 selection:bg-[#0071E3]/20 selection:text-[#0071E3] transition-colors">
      {/* Dynamic Island Style Toast */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-black/90 dark:bg-white/95 text-white dark:text-black px-4 py-2 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.15)] flex items-center gap-2 text-xs font-medium backdrop-blur-md">
          <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Apple-style Navigation */}
      <Navbar
        onOpenGuide={() => setIsGuideModalOpen(true)}
        onOpenQRIS={() => setIsQRISModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
        {/* Apple Clean Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
              Kalkulator Jasa Manufaktur Presisi
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Hitung Biaya 3D Printing & Laser Engraving.
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed pt-1">
              Pilih material filamen atau grafir, masukkan ukuran model seperti di software slicer, dan dapatkan kalkulasi harga transparan seketika.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsGuideModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-white dark:bg-[#1C1C1E] hover:bg-neutral-100 dark:hover:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] shadow-xs transition-all cursor-pointer"
            >
              <span>Panduan Bahan</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Clean Apple Callout: Direct Non-Marketplace Advantage */}
        <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-2xl bg-black/[0.03] dark:bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5 text-neutral-800 dark:text-neutral-200">
              <Info className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900 dark:text-white text-sm">
                  Tarif Langsung Non-Marketplace
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Hemat Biaya Layanan
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
                Harga pada kalkulator ini adalah pesanan langsung di luar platform marketplace. Pembayaran dapat dilakukan via <strong>QRIS (REXEL ID)</strong> lalu konfirmasi ke nomor <strong>085904408774</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto flex-wrap">
            <button
              type="button"
              onClick={() => setIsQRISModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.07] dark:hover:bg-white/[0.12] border border-black/[0.04] dark:border-white/[0.08] transition-all cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300" />
              <span>Kode QRIS</span>
            </button>
            <a
              href="https://wa.me/6285904408774?text=Halo%20Arata%20Price%20AI,%20saya%20mau%20konfirmasi%20pemesanan%20di%20luar%20marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-[#0071E3] hover:bg-[#0077ED] transition-all shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Konfirmasi WA</span>
            </a>
          </div>
        </div>

        {/* Quick Presets Carousel */}
        <QuickPresets onSelectPreset={handleSelectPreset} />

        {/* Main Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Slicer & Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Material Selector */}
            <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-colors">
              <MaterialSelector
                materials={MATERIALS}
                selectedId={selectedMaterialId}
                onSelect={setSelectedMaterialId}
              />
            </div>

            {/* Step 2: Calculator */}
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

            {/* Cart / Saved List */}
            <CartList
              items={cartItems}
              onRemoveItem={handleRemoveCartItem}
              onUpdateQuantity={handleUpdateCartItemQuantity}
              onClearAll={handleClearCart}
              onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
            />
          </div>

          {/* Right Column: Price Summary Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <PriceSummaryCard
              result={calculatedResult}
              onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
              onAddToCart={handleAddToCart}
              onOpenQRIS={() => setIsQRISModalOpen(true)}
              onUpdateQuantity={handleUpdateCurrentQuantity}
            />

            {/* Trust Standard Box in Apple Minimalist Style */}
            <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3 transition-colors text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-2 font-semibold text-neutral-900 dark:text-white">
                <ShieldCheck className="w-4 h-4 text-[#0071E3] dark:text-[#0A84FF]" />
                <span>Standar Mutu Manufaktur Arata</span>
              </div>
              <ul className="space-y-1.5 text-[11px] pl-5 list-disc leading-relaxed">
                <li>Material filament & resin original berstandar industri presisi.</li>
                <li>Kalibrasi mesin otomatis dengan toleransi dimensi rapi.</li>
                <li>Pemeriksaan kelayakan geometri 3D sebelum proses pencetakan.</li>
                <li>Pengemasan aman berlapis untuk proteksi pengiriman.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Apple-Style Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-3 left-3 right-3 z-40 bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] rounded-2xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center justify-between gap-3 transition-colors">
        <div className="min-w-0 pl-1">
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
            Total ({calculatedResult.quantity} pcs):
          </div>
          <div className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white font-mono leading-none">
            {formatRupiah(calculatedResult.totalPrice)}
          </div>
        </div>

        {/* Stepper on Mobile bar */}
        <div className="inline-flex items-center bg-black/[0.04] dark:bg-white/[0.08] p-0.5 rounded-full border border-black/[0.04] dark:border-white/[0.06] shrink-0">
          <button
            type="button"
            onClick={() => handleUpdateCurrentQuantity(Math.max(1, calculatedResult.quantity - 1))}
            disabled={calculatedResult.quantity <= 1}
            className="w-7 h-7 rounded-full bg-white dark:bg-[#2C2C2E] text-neutral-800 dark:text-neutral-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.1] disabled:opacity-30 flex items-center justify-center font-bold text-xs cursor-pointer shadow-2xs"
            title="Kurang 1 pcs"
          >
            <span className="text-sm leading-none">−</span>
          </button>
          <span className="w-7 text-center font-bold text-neutral-900 dark:text-white font-mono text-xs">
            {calculatedResult.quantity}
          </span>
          <button
            type="button"
            onClick={() => handleUpdateCurrentQuantity(calculatedResult.quantity + 1)}
            className="w-7 h-7 rounded-full bg-white dark:bg-[#2C2C2E] text-neutral-800 dark:text-neutral-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.1] flex items-center justify-center font-bold text-xs cursor-pointer shadow-2xs"
            title="Tambah 1 pcs"
          >
            <span className="text-sm leading-none">+</span>
          </button>
        </div>

        {/* WhatsApp Order Button */}
        <button
          type="button"
          onClick={() => setIsWhatsAppModalOpen(true)}
          className="px-4 py-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Pesan WA</span>
        </button>
      </div>

      {/* Apple Minimal Footer */}
      <footer className="border-t border-black/[0.06] dark:border-white/[0.08] mt-16 mb-20 lg:mb-0 py-10 text-xs text-neutral-500 dark:text-neutral-400 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-black/[0.04] dark:border-white/[0.06] text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.1] flex items-center justify-center shrink-0">
                <ArataLogo className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-neutral-900 dark:text-white text-sm">
                  Arata Price AI
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Dikembangkan oleh <strong className="font-medium text-neutral-700 dark:text-neutral-300">PT DHAFA TETAP BERUSAHA</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <button
                type="button"
                onClick={() => setIsQRISModalOpen(true)}
                className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
              >
                QRIS REXEL ID
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setIsGuideModalOpen(true)}
                className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
              >
                Panduan Material
              </button>
              <span>·</span>
              <a
                href="https://wa.me/6285904408774"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
              >
                WhatsApp 085904408774
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-400 dark:text-neutral-500 text-center sm:text-left">
            <p>
              Arata Price AI dikembangkan oleh <strong className="font-medium text-neutral-600 dark:text-neutral-300">PT DHAFA TETAP BERUSAHA</strong>.
            </p>
            <p>
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
