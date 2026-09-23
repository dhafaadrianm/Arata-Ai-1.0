import React, { useState } from 'react';
import { CalculatedResult } from '../types';
import { formatRupiah } from '../utils/calculator';
import { X, Send, Copy, Check, Phone, MessageSquare, QrCode, AlertCircle } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentResult: CalculatedResult;
  cartItems: CalculatedResult[];
  onOpenQRIS?: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  currentResult,
  cartItems,
  onOpenQRIS,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('6285904408774');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Determine items to order (if cart has items, offer whole cart or current)
  const itemsToInclude = cartItems.length > 0 ? cartItems : [currentResult];
  const grandTotal = itemsToInclude.reduce((sum, it) => sum + it.totalPrice, 0);

  // Generate clean formatted WhatsApp text
  const generateMessage = () => {
    let msg = `Halo *Arata Price AI*, saya mau pesan jasa cetak/engraving dengan rincian berikut:\n\n`;

    if (customerName.trim()) {
      msg += `👤 *Nama Pelanggan:* ${customerName.trim()}\n`;
    }

    msg += `📋 *RINCIAN ORDER (Tarif Non-Marketplace):*\n`;
    itemsToInclude.forEach((item, idx) => {
      msg += `------------------------------\n`;
      msg += `${idx + 1}. *${item.fileName}*\n`;
      msg += `   • Layanan: ${item.materialName}\n`;
      msg += `   • Estimasi: ${item.estimatedWeightOrLength} ${item.unitLabel}\n`;
      msg += `   • Tarif: ${formatRupiah(item.unitRate)}/${item.unitLabel}\n`;
      msg += `   • Jumlah: ${item.quantity} pcs\n`;
      if (item.dimensionsSummary) {
        msg += `   • Ukuran: ${item.dimensionsSummary}\n`;
      }
      msg += `   • Subtotal: ${formatRupiah(item.totalPrice)}\n`;
    });

    msg += `------------------------------\n`;
    msg += `💰 *TOTAL BIAYA:* *${formatRupiah(grandTotal)}*\n`;
    msg += `💳 *Metode Pembayaran:* QRIS (REXEL ID - NMID: ID1025425974736)\n`;
    msg += `📌 *Ketentuan:* Harga pesanan langsung di luar marketplace (Shopee). Konfirmasi ke WhatsApp 085904408774.\n\n`;

    if (notes.trim()) {
      msg += `📝 *Catatan Khusus:* ${notes.trim()}\n\n`;
    }

    msg += `Saya akan kirimkan file 3D (.STL/.OBJ/.STEP) atau vector (.SVG/.DXF) beserta bukti transfer QRIS melalui chat ini. Terima kasih!`;
    return msg;
  };

  const messageText = generateMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWA = () => {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(messageText);
    const url = cleanNumber
      ? `https://wa.me/${cleanNumber}?text=${encoded}`
      : `https://wa.me/6285904408774?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-950/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                Kirim Estimasi ke WhatsApp
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Konfirmasi pemesanan langsung ke nomor 085904408774
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Note Banner */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 flex items-start justify-between gap-2.5">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong>Catatan Pemesanan:</strong> Ini adalah harga khusus pemesanan di luar marketplace seperti Shopee. Pembayaran via <strong>QRIS (REXEL ID)</strong> lalu konfirmasi ke nomor <strong>085904408774</strong>.
              </div>
            </div>
            {onOpenQRIS && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenQRIS();
                }}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[11px] flex items-center gap-1 hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                <QrCode className="w-3 h-3" />
                <span>Lihat QRIS</span>
              </button>
            )}
          </div>

          {/* Custom Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Nama Anda (Opsional)
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nama pemesan..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Nomor WhatsApp Vendor
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Contoh: 6285904408774"
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
                <Phone className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Catatan / Permintaan Khusus (Warna, Bahan, Finishing)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Warna hitam, finishing amplas, bahan akrilik bening 3mm..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Preview of text */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-700 dark:text-slate-300">Preview Pesan WhatsApp:</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Salin Pesan</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              readOnly
              value={messageText}
              rows={8}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300 resize-none focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2.5 bg-slate-50/50 dark:bg-slate-900">
          {onOpenQRIS ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenQRIS();
              }}
              className="px-3.5 py-2 rounded-xl border border-indigo-200 dark:border-slate-700 bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center gap-1.5 hover:bg-indigo-100 dark:hover:bg-slate-750 transition-colors cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Bayar via QRIS</span>
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-xs"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handleSendWA}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim ke 0859-0440-8774</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
