import React, { useRef } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Download, 
  Upload, 
  RotateCcw
} from 'lucide-react';
import { renderAvatarContent } from '../utils/profile';

export default function Header({ 
  onOpenAddModal, 
  onExport, 
  onImportFile, 
  onResetDefaults,
  profile,
  onOpenEditProfile
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportFile(file);
      e.target.value = '';
    }
  };

  const displayName = profile?.name || 'Anand Mohandas';
  const displayRole = profile?.role || 'Project Owner';
  const avatarType = profile?.avatarType || 'initials';
  const colorGradient = profile?.colorGradient || 'from-blue-600 via-indigo-600 to-sky-500';

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

          {/* Action Toolbar & User Profile */}
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
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export</span>
            </button>

            {/* Import JSON */}
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import projects from JSON file"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4 text-slate-500" />
              <span>Import</span>
            </button>

            {/* Reset to initial mock data */}
            <button
              onClick={onResetDefaults}
              title="Reset to default mock projects"
              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer"
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

            {/* Customizable User Profile Badge Button */}
            <button
              onClick={onOpenEditProfile}
              title="Click to customize your profile"
              className="group flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200 ml-1 hover:opacity-95 transition-all cursor-pointer p-1 rounded-xl hover:bg-slate-50 text-left"
            >
              <div className="relative">
                {/* Avatar with gradient & custom icon/initials */}
                <div 
                  className={`w-9 h-9 rounded-full bg-gradient-to-tr ${colorGradient} flex items-center justify-center text-white shadow-xs group-hover:ring-2 group-hover:ring-blue-500/40 transition-all`}
                >
                  {renderAvatarContent(avatarType, displayName)}
                </div>
                {/* Online status indicator dot */}
                <span 
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" 
                  title="Active"
                />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {displayName}
                </div>
                <div className="text-[10px] font-medium text-slate-500">
                  {displayRole}
                </div>
              </div>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
