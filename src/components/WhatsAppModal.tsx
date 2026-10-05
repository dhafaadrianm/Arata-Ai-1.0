import React, { useState } from 'react';
import { CalculatedResult } from '../types';
import { formatRupiah } from '../utils/calculator';
import { X, Send, Copy, Check, MessageSquare, QrCode } from 'lucide-react';

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
  const [phoneNumber] = useState('6285904408774');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const itemsToInclude = cartItems.length > 0 ? cartItems : [currentResult];
  const grandTotal = itemsToInclude.reduce((sum, it) => sum + it.totalPrice, 0);

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
    msg += `📌 *Ketentuan:* Harga pesanan langsung di luar marketplace. Konfirmasi ke WhatsApp 085904408774.\n\n`;

    if (notes.trim()) {
      msg += `📝 *Catatan Khusus:* ${notes.trim()}\n\n`;
    }

    msg += `Saya akan kirimkan file desain beserta bukti transfer QRIS melalui chat ini. Terima kasih!`;
    return msg;
  };

  const messageText = generateMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWA = () => {
    const encoded = encodeURIComponent(messageText);
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl max-w-lg w-full my-auto flex flex-col shadow-2xl border border-black/[0.08] dark:border-white/[0.1] overflow-hidden transition-colors max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] flex items-center justify-center text-neutral-900 dark:text-white">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white text-base">
                Kirim Pesanan ke WhatsApp
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Konfirmasi langsung ke nomor 085904408774
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

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-medium text-neutral-700 dark:text-neutral-300">
              Nama Pemesan (Opsional)
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Contoh: Budi Santoso"
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] focus:bg-white dark:focus:bg-[#2C2C2E] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-neutral-700 dark:text-neutral-300">
              Catatan Tambahan (Warna, Toleransi, Deadline)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Butuh warna hitam pekat, file STL dikirim lewat WhatsApp..."
              className="w-full px-3.5 py-2 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] focus:bg-white dark:focus:bg-[#2C2C2E] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 transition-all"
            />
          </div>

          {/* Message Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-500 dark:text-neutral-400">
                Pratinjau Pesan yang Akan Dikirim:
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 cursor-pointer font-medium"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3.5 bg-black/[0.02] dark:bg-white/[0.04] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] text-[11px] text-neutral-700 dark:text-neutral-300 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
              {messageText}
            </pre>
          </div>

          {onOpenQRIS && (
            <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
              <span className="text-neutral-600 dark:text-neutral-400 text-[11px]">
                Perlu kode QRIS untuk pembayaran?
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenQRIS();
                }}
                className="text-[#0071E3] dark:text-[#0A84FF] font-medium text-xs hover:underline flex items-center gap-1 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Buka QRIS</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-neutral-700 dark:text-neutral-300 font-medium text-xs cursor-pointer transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSendWA}
            className="w-full py-2.5 rounded-2xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim ke WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
