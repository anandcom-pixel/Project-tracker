import React from 'react';
import { 
  Search, 
  X, 
  LayoutGrid, 
  Table as TableIcon, 
  SlidersHorizontal,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { CATEGORIES } from '../data/initialProjects';

export default function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount,
  onClearFilters
}) {
  const statusOptions = ['All', 'Completed', 'In Progress', 'Not Started'];
  const hasActiveFilters = searchQuery.trim() !== '' || statusFilter !== 'All' || categoryFilter !== 'All';

  return (
    <div className="bg-white p-4 rounded-2xl border border-blue-100/90 shadow-xs space-y-4">
      
      {/* Top row: Search input + View switcher */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by project name, description, or tech stack (e.g. React, Kotlin)..."
            className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl bg-sky-50/40 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode Switcher (Grid vs Table) */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => onViewModeChange('grid')}
              title="Cards Grid View"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-white text-blue-600 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              title="Table View"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'table' 
                  ? 'bg-white text-blue-600 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom row: Status Pills + Category & Sort dropdowns */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2 border-t border-slate-100">
        
        {/* Status Pill Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Status:
          </span>
          {statusOptions.map((status) => {
            const isSelected = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => onStatusFilterChange(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-transparent'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Dropdowns: Category & Sort */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5 text-xs">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-white border border-slate-200 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-white border border-slate-200 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
            >
              <option value="updated-desc">Last Updated (Newest)</option>
              <option value="updated-asc">Last Updated (Oldest)</option>
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
              <option value="status">Status Priority</option>
            </select>
          </div>

          {/* Active filter count / Clear button */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}

          <span className="text-xs text-slate-500 pl-1">
            Showing <strong className="text-slate-800">{filteredCount}</strong> of {totalCount}
          </span>
        </div>

      </div>

    </div>
  );
}
