import React, { useState, useEffect } from 'react';
import { X, Check, Smile } from 'lucide-react';
import { 
  AVATAR_OPTIONS, 
  GRADIENT_PRESETS, 
  ROLE_SUGGESTIONS, 
  getInitials, 
  renderAvatarContent 
} from '../utils/profile';

function ProfileFormDialog({ onClose, onSave, profile }) {
  const [name, setName] = useState(() => profile?.name || '');
  const [role, setRole] = useState(() => profile?.role || '');
  const [avatarType, setAvatarType] = useState(() => profile?.avatarType || 'initials');
  const [colorGradient, setColorGradient] = useState(() => profile?.colorGradient || GRADIENT_PRESETS[0].id);
  const [error, setError] = useState('');

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Display name is required');
      return;
    }

    onSave({
      name: name.trim(),
      role: role.trim() || 'Project Owner',
      avatarType,
      colorGradient
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 id="edit-profile-title" className="text-lg font-bold text-slate-900">
              Customize User Profile
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalize your header profile badge, avatar style, and role.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Bar */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Live Header Preview:</span>
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div className="relative">
              <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${colorGradient} flex items-center justify-center text-white shadow-xs`}>
                {renderAvatarContent(avatarType, name || 'User')}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {name.trim() || 'Your Name'}
              </div>
              <div className="text-[10px] font-medium text-slate-500">
                {role.trim() || 'Project Owner'}
              </div>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Display Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Display Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Project owner"
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 border ${error ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200'} text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
            />
            {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
          </div>

          {/* Role / Subtitle */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Role / Subtitle
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Independent Developer, Project Owner"
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {/* Quick role suggestions */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {ROLE_SUGGESTIONS.map((sug) => (
                <button
                  type="button"
                  key={sug}
                  onClick={() => setRole(sug)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                    role === sug 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Avatar Icon Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
              <Smile className="w-3.5 h-3.5 text-blue-600" />
              <span>Avatar Icon</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {AVATAR_OPTIONS.map((opt) => {
                const isSelected = avatarType === opt.id;
                const IconComp = opt.icon;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setAvatarType(opt.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-50/70 text-blue-700 font-bold shadow-2xs' 
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${colorGradient} flex items-center justify-center text-white text-xs shadow-2xs`}>
                      {opt.id === 'initials' ? (
                        <span className="font-bold text-[10px]">{getInitials(name || 'AM')}</span>
                      ) : (
                        <IconComp className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                    <span className="text-[11px] truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Avatar Color Gradient Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Avatar Color Gradient
            </label>
            <div className="flex flex-wrap items-center gap-2.5">
              {GRADIENT_PRESETS.map((preset) => {
                const isSelected = colorGradient === preset.id;
                return (
                  <button
                    type="button"
                    key={preset.id}
                    onClick={() => setColorGradient(preset.id)}
                    title={preset.name}
                    className={`w-8 h-8 rounded-full ${preset.preview} flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                      isSelected ? 'ring-3 ring-blue-600 ring-offset-2 scale-110' : 'hover:opacity-90'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md shadow-blue-500/25 transition transform active:scale-95 cursor-pointer"
            >
              Save Profile
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default function EditProfileModal({ isOpen, onClose, onSave, profile }) {
  if (!isOpen) return null;

  return (
    <ProfileFormDialog
      key={profile ? `${profile.name}-${profile.role}-${profile.avatarType}-${profile.colorGradient}` : 'default-profile'}
      onClose={onClose}
      onSave={onSave}
      profile={profile}
    />
  );
}
