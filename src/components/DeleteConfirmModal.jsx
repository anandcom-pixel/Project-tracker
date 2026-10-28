import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, project }) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900">
              Delete Project
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-800">"{project.name}"</strong>? This action will remove it from your project tracker.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(project.id);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-md shadow-rose-600/25 transition transform active:scale-95 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Project</span>
          </button>
        </div>
      </div>
    </div>
  );
}
