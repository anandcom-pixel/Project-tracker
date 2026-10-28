import React from 'react';
import { 
  User, 
  Code2, 
  Terminal, 
  Rocket, 
  Laptop, 
  Crown, 
  Sparkles 
} from 'lucide-react';

export const AVATAR_OPTIONS = [
  { id: 'initials', label: 'Initials', icon: null },
  { id: 'user', label: 'User', icon: User },
  { id: 'code', label: 'Developer', icon: Code2 },
  { id: 'terminal', label: 'Terminal', icon: Terminal },
  { id: 'rocket', label: 'Rocket', icon: Rocket },
  { id: 'laptop', label: 'Laptop', icon: Laptop },
  { id: 'crown', label: 'Crown', icon: Crown },
  { id: 'sparkles', label: 'Sparkles', icon: Sparkles }
];

export const GRADIENT_PRESETS = [
  { id: 'from-blue-600 via-indigo-600 to-sky-500', name: 'Royal Blue', preview: 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500' },
  { id: 'from-purple-600 via-pink-600 to-rose-500', name: 'Neon Purple', preview: 'bg-gradient-to-tr from-purple-600 via-pink-600 to-rose-500' },
  { id: 'from-emerald-600 via-teal-600 to-cyan-500', name: 'Emerald', preview: 'bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500' },
  { id: 'from-amber-500 via-orange-600 to-rose-500', name: 'Sunset', preview: 'bg-gradient-to-tr from-amber-500 via-orange-600 to-rose-500' },
  { id: 'from-slate-800 via-slate-700 to-zinc-600', name: 'Midnight', preview: 'bg-gradient-to-tr from-slate-800 via-slate-700 to-zinc-600' }
];

export const ROLE_SUGGESTIONS = [
  'Project Owner',
  'Lead Developer',
  'Independent Developer',
  'Full Stack Engineer',
  'Mobile App Architect',
  'Founder'
];

export function getInitials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function renderAvatarContent(avatarType, name, iconClass = 'w-4 h-4 text-white') {
  if (avatarType === 'initials') {
    return <span className="font-bold uppercase tracking-tight text-xs text-white">{getInitials(name)}</span>;
  }
  const match = AVATAR_OPTIONS.find(opt => opt.id === avatarType);
  if (match && match.icon) {
    const IconComponent = match.icon;
    return <IconComponent className={iconClass} />;
  }
  return <span className="font-bold uppercase tracking-tight text-xs text-white">{getInitials(name)}</span>;
}
