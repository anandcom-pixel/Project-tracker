import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Layers, 
  FileText, 
  ListTodo,
  Tag
} from 'lucide-react';
import { CATEGORIES, COMMON_TECH_TAGS, STATUS_CONFIG } from '../data/initialProjects';

function ProjectFormDialog({ onClose, onSave, projectToEdit }) {
  const isEditing = Boolean(projectToEdit);

  const [name, setName] = useState(() => projectToEdit?.name || '');
  const [category, setCategory] = useState(() => {
    if (!projectToEdit) return 'Web App';
    return CATEGORIES.includes(projectToEdit.category) ? projectToEdit.category : 'Other';
  });
  const [customCategory, setCustomCategory] = useState(() => {
    if (!projectToEdit) return '';
    return CATEGORIES.includes(projectToEdit.category) ? '' : (projectToEdit.category || '');
  });
  const [status, setStatus] = useState(() => projectToEdit?.status || 'In Progress');
  const [description, setDescription] = useState(() => projectToEdit?.description || '');
  const [remainingWork, setRemainingWork] = useState(() => projectToEdit?.remainingWork || '');
  const [techStack, setTechStack] = useState(() => {
    if (projectToEdit && Array.isArray(projectToEdit.techStack)) {
      return [...projectToEdit.techStack];
    }
    return ['React', 'Tailwind CSS'];
  });
  const [newTagInput, setNewTagInput] = useState('');
  const [errors, setErrors] = useState({});

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleAddTag = (tagToAdd) => {
    const trimmed = (tagToAdd || newTagInput).trim();
    if (!trimmed) return;
    if (!techStack.includes(trimmed)) {
      setTechStack([...techStack, trimmed]);
    }
    setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setTechStack(techStack.filter(t => t !== tagToRemove));
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Project name is required';
    }

    const finalCategory = category === 'Other' && customCategory.trim() 
      ? customCategory.trim() 
      : category;

    if (!finalCategory) {
      newErrors.category = 'Please select or enter a category';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    const projectData = {
      ...(projectToEdit ? { id: projectToEdit.id } : { id: `proj-${Date.now()}` }),
      name: name.trim(),
      category: finalCategory,
      status,
      description: description.trim(),
      remainingWork: remainingWork.trim(),
      techStack,
      lastUpdated: today
    };

    onSave(projectData);
  };

  // Helper to append a bullet in remainingWork
  const handleInsertBullet = () => {
    const prefix = remainingWork.length === 0 || remainingWork.endsWith('\n') ? '• ' : '\n• ';
    setRemainingWork(prev => prev + prefix);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEditing ? 'Edit Project' : 'Create New Project'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing ? `Update details for "${projectToEdit.name}"` : 'Fill in the information below to add a new project to your tracker.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Project Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Project Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: null }));
              }}
              placeholder="e.g. CartoonCam, FloraWise, CloudMetrics SaaS"
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50/70 border ${errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200'} text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-500">{errors.name}</p>
            )}
          </div>

          {/* Category & Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Category</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50/70 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {category === 'Other' && (
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Specify custom category..."
                  className="mt-2 w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            {/* Status Radio Cards */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Current Status
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'Completed', label: 'Completed' },
                  { id: 'In Progress', label: 'In Progress' },
                  { id: 'Not Started', label: 'Not Started' }
                ].map((s) => {
                  const isSelected = status === s.id;
                  return (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setStatus(s.id)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-2xs font-bold'
                          : 'border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[s.id].dotBg}`} />
                      <span className="truncate">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Project Description</span>
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of the app, target platform, and architecture overview..."
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Tech Stack Tags Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                <span>Technology Stack Tags</span>
              </label>
              <span className="text-[11px] text-slate-500">Press Enter or click Add</span>
            </div>

            {/* Input + Add button */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                placeholder="e.g. React, Kotlin, Docker, Tailwind..."
                className="flex-1 px-3.5 py-2 rounded-xl text-sm bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleAddTag()}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Active Tags list */}
            {techStack.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {techStack.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-blue-500 hover:text-blue-800 ml-0.5 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Quick Suggestions Chips */}
            <div className="mt-2 flex flex-wrap items-center gap-1 text-[11px] text-slate-500">
              <span className="mr-1">Suggestions:</span>
              {COMMON_TECH_TAGS.slice(0, 8).map((suggestion) => {
                const alreadySelected = techStack.includes(suggestion);
                return (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => handleAddTag(suggestion)}
                    disabled={alreadySelected}
                    className={`px-2 py-0.5 rounded text-[11px] transition cursor-pointer ${
                      alreadySelected
                        ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                        : 'bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700'
                    }`}
                  >
                    +{suggestion}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Remaining Work / Notes */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <ListTodo className="w-3.5 h-3.5 text-blue-600" />
                <span>Remaining Work / Action Items (Notes)</span>
              </label>
              <button
                type="button"
                onClick={handleInsertBullet}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                + Insert bullet point
              </button>
            </div>
            <textarea
              rows={3}
              value={remainingWork}
              onChange={(e) => setRemainingWork(e.target.value)}
              placeholder="• Add unit tests for database sync&#10;• Optimize camera shaders&#10;• Responsive layout bug fixes..."
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed resize-none"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Tip: Start lines with "•" or "-" to have them automatically parsed as structured checklist points on cards.
            </p>
          </div>

        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-200/80 rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md shadow-blue-500/25 transition transform active:scale-95 cursor-pointer"
          >
            {isEditing ? 'Save Changes' : 'Create Project'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default function ProjectModal({ isOpen, onClose, onSave, projectToEdit }) {
  if (!isOpen) return null;

  return (
    <ProjectFormDialog
      key={projectToEdit ? projectToEdit.id : 'new-project'}
      onClose={onClose}
      onSave={onSave}
      projectToEdit={projectToEdit}
    />
  );
}
