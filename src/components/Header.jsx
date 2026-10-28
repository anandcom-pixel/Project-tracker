import React, { useRef } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Download, 
  Upload, 
  RotateCcw
} from 'lucide-react';

export default function Header({ 
  onOpenAddModal, 
  onExport, 
  onImportFile, 
  onResetDefaults 
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportFile(file);
      e.target.value = '';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & App Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  ProjectTracker
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Track status, milestones & remaining work for your apps
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Hidden file input for JSON import */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".json,application/json" 
              className="hidden" 
            />

            {/* Export JSON */}
            <button
              onClick={onExport}
              title="Export all projects as JSON"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl shadow-xs transition-all"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export</span>
            </button>

            {/* Import JSON */}
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import projects from JSON file"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl shadow-xs transition-all"
            >
              <Upload className="w-4 h-4 text-slate-500" />
              <span>Import</span>
            </button>

            {/* Reset to initial mock data */}
            <button
              onClick={onResetDefaults}
              title="Reset to default mock projects"
              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Add Project Primary CTA */}
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm shadow-blue-500/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
