import React, { useState } from 'react';
import { X, QrCode, Copy, Check, ExternalLink, ShieldCheck, Download, AlertCircle, Phone } from 'lucide-react';
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

  const waUrl = `https://wa.me/6285904408774?text=${encodeURIComponent(
    `Halo Arata Price AI, saya sudah melakukan pembayaran via QRIS${
      totalAmount ? ` sebesar ${formatRupiah(totalAmount)}` : ''
    }. Berikut saya lampirkan bukti pembayaran dan file untuk diproses.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full my-auto shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] transition-colors">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-slate-850 dark:to-indigo-950/30">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-1.5">
                <span>Pembayaran QRIS</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                  Resmi
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {merchantName} • NMID: {nmid}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Banner inside Modal */}
        <div className="bg-amber-50/90 dark:bg-amber-950/40 border-b border-amber-200/80 dark:border-amber-800/60 px-4 py-2.5 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>Perhatian:</strong> Ini adalah tarif hemat khusus jika Anda pesan <strong>di luar marketplace seperti Shopee</strong>. Pembayaran bisa via QRIS di bawah lalu konfirmasi ke nomor <strong>{phoneNumber}</strong>.
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {/* Amount to pay badge if available */}
          {totalAmount !== undefined && totalAmount > 0 && (
            <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between shadow-inner border border-slate-800">
              <span className="text-slate-300 font-medium">Total yang harus dibayar:</span>
              <span className="font-mono font-extrabold text-emerald-400 text-base sm:text-lg">
                {formatRupiah(totalAmount)}
              </span>
            </div>
          )}

          {/* QR Code Card Display matching the official QRIS standee */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm text-center flex flex-col items-center">
            {/* Header branding */}
            <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-black tracking-tighter text-slate-950 text-base">
                  QRIS
                </span>
                <span className="text-[10px] font-semibold text-slate-500 leading-tight text-left hidden sm:inline-block">
                  QR Code Standar<br />Pembayaran Nasional
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-red-600 text-sm tracking-wider">
                  GPN
                </span>
              </div>
            </div>

            <div className="mb-2">
              <h4 className="font-black text-slate-900 text-lg tracking-wide">
                {merchantName}
              </h4>
              <p className="text-xs text-slate-600 font-mono font-medium">
                NMID: {nmid}
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                A01
              </p>
            </div>

            {/* QR Image Container (exact 250x250 format) */}
            <div className="relative p-3 bg-white rounded-2xl border-2 border-slate-100 shadow-inner max-w-[274px] mx-auto flex items-center justify-center">
              <img
                src={qrisQrApiUrl}
                alt="QRIS REXEL ID"
                width={250}
                height={250}
                className="w-[250px] h-[250px] object-contain mx-auto block rounded-lg"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/qris.png';
                }}
              />
            </div>

            <div className="mt-3.5 space-y-0.5">
              <p className="text-xs font-black text-slate-900 tracking-wider uppercase">
                SATU QRIS UNTUK SEMUA
              </p>
              <p className="text-[11px] text-slate-500 leading-normal">
                Bisa di-scan pakai GoPay, OVO, Dana, BCA, Mandiri, ShopeePay, dll.
              </p>
              <p className="text-[10px] text-slate-400">
                Dicetak oleh: 93600914 • Cek di: www.aspi-qris.id
              </p>
            </div>
          </div>

          {/* Quick Copy Action Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopyNmid}
              className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-medium text-[11px] flex items-center justify-between transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700"
            >
              <span className="truncate">NMID: {nmid}</span>
              {copiedNmid ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 shrink-0 ml-1">
                  <Check className="w-3.5 h-3.5" /> Disalin
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0 ml-1" />
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyPhone}
              className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-medium text-[11px] flex items-center justify-between transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700"
            >
              <span className="truncate">WA: {phoneNumber}</span>
              {copiedPhone ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 shrink-0 ml-1">
                  <Check className="w-3.5 h-3.5" /> Disalin
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0 ml-1" />
              )}
            </button>
          </div>

          {/* 4 Steps Instructions */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-2">
            <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Langkah Pembayaran & Konfirmasi:
            </h5>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <li>
                Buka aplikasi perbankan digital atau e-wallet apa saja berlogo QRIS.
              </li>
              <li>
                Scan kode QRIS di atas dan periksa nama merchant: <strong>{merchantName}</strong>.
              </li>
              <li>
                Ketik nominal transfer{totalAmount ? ` (${formatRupiah(totalAmount)})` : ''} lalu selesaikan pembayaran.
              </li>
              <li>
                Screenshot bukti transfer, lalu kirimkan konfirmasi via WhatsApp ke nomor <strong className="text-emerald-600 dark:text-emerald-400">{phoneNumber}</strong>.
              </li>
            </ol>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col sm:flex-row items-center gap-2">
          <a
            href={qrisQrApiUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="QRIS_REXEL_ID.png"
            className="w-full sm:w-auto py-2.5 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh / Buka Gambar QRIS</span>
          </a>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all text-center"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Konfirmasi ke WhatsApp ({phoneNumber})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
