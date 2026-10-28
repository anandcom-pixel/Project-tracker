import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-600 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-200',
    error: 'border-rose-200',
    info: 'border-blue-200'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-start gap-3 p-4 rounded-2xl shadow-xl bg-white border ${borderColors[toast.type || 'info']} text-slate-800 backdrop-blur-md`}>
        {icons[toast.type || 'info']}
        <div className="flex-1 text-sm font-semibold pr-2">
          {toast.message}
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
