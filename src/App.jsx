import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import DashboardMetrics from './components/DashboardMetrics';
import FilterBar from './components/FilterBar';
import ProjectCard from './components/ProjectCard';
import ProjectTable from './components/ProjectTable';
import ProjectModal from './components/ProjectModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { 
  loadStoredProjects, 
  saveProjects, 
  exportProjectsToJSON, 
  parseAndValidateProjectsJSON
} from './utils/storage';
import { INITIAL_PROJECTS } from './data/initialProjects';
import { FolderSearch, Plus } from 'lucide-react';

export default function App() {
  const [projects, setProjects] = useState(() => loadStoredProjects());
  
  // Filtering & View state
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('updated-desc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modals & Feedback
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [toast, setToast] = useState(null);

  // Persist projects whenever changed
  const updateProjectsAndPersist = (updatedList) => {
    setProjects(updatedList);
    saveProjects(updatedList);
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Quick Status Toggle Handler
  const handleStatusChange = (projectId, newStatus) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = projects.map(p => {
      if (p.id === projectId) {
        return { ...p, status: newStatus, lastUpdated: today };
      }
      return p;
    });
    updateProjectsAndPersist(updated);
    showToast(`Status updated to "${newStatus}"`, 'success');
  };

  // Save (Create / Update) Project
  const handleSaveProject = (projectData) => {
    let updated;
    const existingIndex = projects.findIndex(p => p.id === projectData.id);
    
    if (existingIndex >= 0) {
      updated = [...projects];
      updated[existingIndex] = projectData;
      showToast(`Updated "${projectData.name}"`, 'success');
    } else {
      updated = [projectData, ...projects];
      showToast(`Added new project "${projectData.name}"`, 'success');
    }

    updateProjectsAndPersist(updated);
    setIsModalOpen(false);
    setProjectToEdit(null);
  };

  // Delete Project
  const handleDeleteConfirm = (projectId) => {
    const target = projects.find(p => p.id === projectId);
    const updated = projects.filter(p => p.id !== projectId);
    updateProjectsAndPersist(updated);
    showToast(`Deleted "${target?.name || 'Project'}"`, 'info');
  };

  // Export JSON
  const handleExportJSON = () => {
    try {
      exportProjectsToJSON(projects);
      showToast('Exported projects backup JSON file', 'success');
    } catch (err) {
      showToast('Failed to export projects: ' + err.message, 'error');
    }
  };

  // Import JSON
  const handleImportFile = async (file) => {
    try {
      const text = await file.text();
      const importedProjects = parseAndValidateProjectsJSON(text);
      updateProjectsAndPersist(importedProjects);
      showToast(`Successfully imported ${importedProjects.length} projects!`, 'success');
    } catch (err) {
      showToast('Import error: ' + err.message, 'error');
    }
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    if (window.confirm('Reset all projects to the default starter projects? Any custom additions will be replaced.')) {
      updateProjectsAndPersist(INITIAL_PROJECTS);
      showToast('Reset projects to default starter data', 'info');
    }
  };

  // Open Edit Modal
  const handleEditClick = (project) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  // Open Add Modal
  const handleAddClick = () => {
    setProjectToEdit(null);
    setIsModalOpen(true);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setCategoryFilter('All');
  };

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter(p => p.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'All') {
      result = result.filter(p => p.category === categoryFilter);
    }

    // Search query filter (name, description, category, techStack)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const matchName = p.name?.toLowerCase().includes(q);
        const matchDesc = p.description?.toLowerCase().includes(q);
        const matchCat = p.category?.toLowerCase().includes(q);
        const matchWork = p.remainingWork?.toLowerCase().includes(q);
        const matchTech = p.techStack?.some(t => t.toLowerCase().includes(q));
        return matchName || matchDesc || matchCat || matchWork || matchTech;
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'updated-desc') {
        return (b.lastUpdated || '').localeCompare(a.lastUpdated || '');
      }
      if (sortBy === 'updated-asc') {
        return (a.lastUpdated || '').localeCompare(b.lastUpdated || '');
      }
      if (sortBy === 'name-asc') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (sortBy === 'name-desc') {
        return (b.name || '').localeCompare(a.name || '');
      }
      if (sortBy === 'status') {
        const order = { 'In Progress': 0, 'Not Started': 1, 'Completed': 2 };
        return (order[a.status] ?? 3) - (order[b.status] ?? 3);
      }
      return 0;
    });

    return result;
  }, [projects, statusFilter, categoryFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-blue-600 text-slate-800 flex flex-col font-sans transition-colors duration-200">
      
      {/* Header Bar */}
      <Header
        onOpenAddModal={handleAddClick}
        onExport={handleExportJSON}
        onImportFile={handleImportFile}
        onResetDefaults={handleResetDefaults}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Header Title on Blue Canvas */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-1">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Project Dashboard
            </h2>
            <p className="text-sm text-blue-100">
              Manage development cycles, track progress & remaining work
            </p>
          </div>
        </div>

        {/* Dashboard Overview Metrics */}
        <DashboardMetrics
          projects={projects}
          statusFilter={statusFilter}
          onSelectStatusFilter={(selected) => {
            setStatusFilter(selected === statusFilter ? 'All' : selected);
          }}
        />

        {/* Filter and Search Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalCount={projects.length}
          filteredCount={filteredProjects.length}
          onClearFilters={handleClearFilters}
        />

        {/* Projects Display (Grid or Table) */}
        {filteredProjects.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={handleEditClick}
                  onDelete={(p) => setProjectToDelete(p)}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          ) : (
            <ProjectTable
              projects={filteredProjects}
              onEdit={handleEditClick}
              onDelete={(p) => setProjectToDelete(p)}
              onStatusChange={handleStatusChange}
            />
          )
        ) : (
          /* Empty Search / No Projects State */
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-12 text-center max-w-md mx-auto my-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
              <FolderSearch className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No matching projects found
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {projects.length === 0
                ? "You haven't added any projects yet. Click below to create your first project or reset to default mock projects."
                : "No projects match your current filters or search query. Try clearing your filters."}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {projects.length === 0 ? (
                <>
                  <button
                    onClick={handleAddClick}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-md shadow-blue-500/25 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Project</span>
                  </button>
                  <button
                    onClick={handleResetDefaults}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition cursor-pointer shadow-xs"
                  >
                    Load Sample Projects
                  </button>
                </>
              ) : (
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition cursor-pointer"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-blue-500/40 bg-blue-700/60 backdrop-blur-xs py-5 text-center text-xs text-blue-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">ProjectTracker</span>
            <span>•</span>
            <span>Rich Solid-Blue Theme</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-medium text-blue-200">
            <span>Local Storage Active</span>
            <span>•</span>
            <span>Vercel Ready</span>
          </div>
        </div>
      </footer>

      {/* Add / Edit Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setProjectToEdit(null);
        }}
        onSave={handleSaveProject}
        projectToEdit={projectToEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(projectToDelete)}
        project={projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Global Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
