import React, { useState } from 'react';
import { X, QrCode, Copy, Check, ShieldCheck, Download, Info, Phone } from 'lucide-react';
import { formatRupiah } from '../utils/calculator';

interface QRISModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount?: number;
}

export const QRISModal: React.FC<QRISModalProps> = ({
  isOpen,
  onClose,
  totalAmount,
}) => {
  const [copiedNmid, setCopiedNmid] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!isOpen) return null;

  const nmid = 'ID1025425974736';
  const phoneNumber = '085904408774';
  const merchantName = 'REXEL ID';
  const qrisDataString =
    '00020101021126610014COM.GO-JEK.WWW01189360091431387460240210G1387460240303UMI51440014ID.CO.QRIS.WWW0215ID10254259747360303UMI5204481453033605802ID5925DHAFA%20ADRIAN%20MAULANA%2C%20Pul6008SIDOARJO61056126162070703A016304FC29';
  const qrisQrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&ecc=M&data=${qrisDataString}`;

  const handleCopyNmid = () => {
    navigator.clipboard.writeText(nmid);
    setCopiedNmid(true);
    setTimeout(() => setCopiedNmid(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl max-w-md w-full my-auto shadow-2xl border border-black/[0.08] dark:border-white/[0.1] overflow-hidden flex flex-col max-h-[92vh] transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] flex items-center justify-center text-neutral-900 dark:text-white">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white text-base">
                Pembayaran QRIS
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {merchantName} · NMID {nmid}
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

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Amount Badge */}
          {totalAmount !== undefined && totalAmount > 0 && (
            <div className="p-4 bg-black/[0.02] dark:bg-white/[0.04] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
              <span className="text-neutral-500 dark:text-neutral-400 font-medium">
                Total Pembayaran
              </span>
              <span className="font-mono font-bold text-neutral-900 dark:text-white text-lg sm:text-xl">
                {formatRupiah(totalAmount)}
              </span>
            </div>
          )}

          {/* QR Code Card */}
          <div className="bg-white rounded-3xl border border-black/[0.08] p-5 shadow-sm text-center flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-black/[0.06]">
              <span className="font-bold text-neutral-900 text-xs tracking-wider">
                QRIS INDONESIA
              </span>
              <span className="text-[11px] font-semibold text-neutral-500">
                {merchantName}
              </span>
            </div>

            <div className="p-2 bg-white rounded-2xl border border-black/[0.06] my-1">
              <img
                src={qrisQrApiUrl}
                alt="QRIS Pembayaran Resmi Arata REXEL ID"
                className="w-56 h-56 object-contain"
                loading="lazy"
              />
            </div>

            <span className="text-[11px] text-neutral-400 mt-2">
              Scan dengan GoPay, OVO, Dana, BCA, Mandiri, BRI, dll
            </span>
          </div>

          {/* Non-marketplace Note */}
          <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] space-y-1 text-[11px] text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-1.5 font-medium text-neutral-900 dark:text-white">
              <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>Ketentuan Pesanan Non-Marketplace</span>
            </div>
            <p className="leading-relaxed">
              Ini adalah harga khusus di luar platform seperti Shopee. Setelah melakukan transfer, silakan kirimkan bukti pembayaran dan file desain ke WhatsApp <strong>{phoneNumber}</strong>.
            </p>
          </div>

          {/* Copy info buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopyNmid}
              className="p-2.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.06] dark:hover:bg-white/[0.1] text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-1.5 font-medium cursor-pointer transition-colors"
            >
              {copiedNmid ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>NMID Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin NMID</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyPhone}
              className="p-2.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.06] dark:hover:bg-white/[0.1] text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-1.5 font-medium cursor-pointer transition-colors"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>No. Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin No. WA</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-neutral-700 dark:text-neutral-300 font-medium text-xs cursor-pointer transition-colors"
          >
            Tutup
          </button>
          <a
            href={`https://wa.me/6285904408774?text=${encodeURIComponent(
              `Halo Arata Price AI, saya sudah melakukan pembayaran via QRIS${
                totalAmount ? ` sebesar ${formatRupiah(totalAmount)}` : ''
              }. Mohon verifikasi bukti pembayaran saya.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-2xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Konfirmasi WA</span>
          </a>
        </div>
      </div>
    </div>
  );
};
