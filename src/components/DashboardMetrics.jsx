import React from 'react';
import { 
  FolderKanban, 
  CheckCircle2, 
  Clock, 
  CircleDot, 
  TrendingUp
} from 'lucide-react';

export default function DashboardMetrics({ projects, statusFilter, onSelectStatusFilter }) {
  const total = projects.length;
  const completed = projects.filter(p => p.status === 'Completed').length;
  const inProgress = projects.filter(p => p.status === 'In Progress').length;
  const notStarted = projects.filter(p => p.status === 'Not Started').length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const cards = [
    {
      id: 'All',
      label: 'Total Projects',
      count: total,
      sublabel: `${completionRate}% overall completion`,
      icon: <FolderKanban className="w-5 h-5 text-blue-600" />,
      bg: 'bg-white',
      activeRing: 'ring-2 ring-blue-600 shadow-blue-500/10 border-blue-600',
      border: 'border-blue-100/80',
      iconBg: 'bg-blue-50 text-blue-700'
    },
    {
      id: 'Completed',
      label: 'Completed',
      count: completed,
      sublabel: 'Shipped & deployed',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-white',
      activeRing: 'ring-2 ring-emerald-600 shadow-emerald-500/10 border-emerald-600',
      border: 'border-blue-100/80',
      iconBg: 'bg-emerald-50 text-emerald-700'
    },
    {
      id: 'In Progress',
      label: 'In Progress',
      count: inProgress,
      sublabel: 'Active development',
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      bg: 'bg-white',
      activeRing: 'ring-2 ring-amber-500 shadow-amber-500/10 border-amber-500',
      border: 'border-blue-100/80',
      iconBg: 'bg-amber-50 text-amber-700'
    },
    {
      id: 'Not Started',
      label: 'Not Started',
      count: notStarted,
      sublabel: 'Backlog / planned',
      icon: <CircleDot className="w-5 h-5 text-slate-500" />,
      bg: 'bg-white',
      activeRing: 'ring-2 ring-slate-500 shadow-slate-500/10 border-slate-500',
      border: 'border-blue-100/80',
      iconBg: 'bg-slate-100 text-slate-700'
    }
  ];

  return (
    <section className="space-y-4">
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card) => {
          const isSelected = statusFilter === card.id;
          return (
            <button
              key={card.id}
              onClick={() => onSelectStatusFilter(card.id)}
              className={`p-4 sm:p-5 text-left rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer relative overflow-hidden group ${card.bg} ${isSelected ? card.activeRing : `${card.border} hover:border-blue-300`}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm font-semibold text-slate-600 truncate">
                  {card.label}
                </span>
                <div className={`p-2 rounded-xl ${card.iconBg} transition-transform group-hover:scale-110`}>
                  {card.icon}
                </div>
              </div>

              <div className="flex items-baseline justify-between gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {card.count}
                </span>
                <span className="text-[11px] font-medium text-slate-500 truncate hidden sm:inline">
                  {card.sublabel}
                </span>
              </div>

              {/* Active selection bar */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Completion Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-blue-100/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-800">
            Sprint & Delivery Progress
          </span>
          <span className="text-xs text-slate-500">
            ({completed} of {total} completed)
          </span>
        </div>

        <div className="flex items-center gap-3 flex-1 sm:max-w-md">
          <div className="w-full bg-slate-100 border border-slate-200/60 h-2.5 rounded-full overflow-hidden flex">
            <div 
              className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${completionRate}%` }}
              title={`Completed: ${completionRate}%`}
            />
          </div>
          <span className="text-xs font-bold text-slate-800 min-w-[2.5rem] text-right">
            {completionRate}%
          </span>
        </div>
      </div>
    </section>
  );
}
