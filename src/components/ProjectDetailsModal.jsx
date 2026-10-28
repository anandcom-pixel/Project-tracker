import React, { useEffect } from 'react';
import { 
  X, 
  Edit3, 
  Calendar, 
  FileText, 
  ListTodo, 
  Tag, 
  Smartphone, 
  Globe, 
  Cloud, 
  Terminal, 
  Box
} from 'lucide-react';
import { STATUS_CONFIG } from '../data/initialProjects';

export default function ProjectDetailsModal({ isOpen, onClose, onEdit, project }) {
  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const statusInfo = STATUS_CONFIG[project.status] || STATUS_CONFIG['In Progress'];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Mobile App':
        return <Smartphone className="w-4 h-4" />;
      case 'Web App':
        return <Globe className="w-4 h-4" />;
      case 'SaaS':
        return <Cloud className="w-4 h-4" />;
      case 'CLI Tool':
        return <Terminal className="w-4 h-4" />;
      default:
        return <Box className="w-4 h-4" />;
    }
  };

  const remainingWorkLines = project.remainingWork
    ? project.remainingWork
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-details-title"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            {/* Badges Bar: Category & Status */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {getCategoryIcon(project.category)}
                <span>{project.category}</span>
              </span>

              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusInfo.badgeBg} shadow-2xs`}>
                <span className={`w-2 h-2 rounded-full ${statusInfo.dotBg}`} />
                <span>{project.status}</span>
              </span>
            </div>

            {/* Title */}
            <h2 id="project-details-title" className="text-2xl font-bold tracking-tight text-slate-900">
              {project.name}
            </h2>

            {/* Last Updated */}
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Last updated: <strong className="text-slate-700 font-semibold">{project.lastUpdated}</strong></span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            aria-label="Close details modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Description Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Project Description</span>
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm text-slate-700 leading-relaxed">
              {project.description ? (
                <p className="whitespace-pre-line">{project.description}</p>
              ) : (
                <p className="text-slate-400 italic">No description provided for this project.</p>
              )}
            </div>
          </div>

          {/* Remaining Work / Next Steps Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <ListTodo className="w-4 h-4 text-blue-600" />
                <span>Remaining Work / Next Milestones</span>
              </h3>
              {remainingWorkLines.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {remainingWorkLines.length} {remainingWorkLines.length === 1 ? 'task' : 'tasks'}
                </span>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              {remainingWorkLines.length > 0 ? (
                <ul className="space-y-2.5">
                  {remainingWorkLines.map((line, idx) => {
                    const cleanText = line.replace(/^[-•*]\s*/, '');
                    return (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0 select-none" />
                        <span className="flex-1">{cleanText}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-slate-400 italic text-sm">
                  No pending work items listed. All milestones are completed or none were specified.
                </p>
              )}
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-blue-600" />
              <span>Technology Stack</span>
            </h3>
            {project.techStack && project.techStack.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic text-sm">No technology tags specified.</p>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
          <span className="text-xs font-mono text-slate-400">
            ID: {project.id}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-200/80 rounded-xl transition cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onEdit(project)}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md shadow-blue-500/25 transition transform active:scale-95 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Project</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
