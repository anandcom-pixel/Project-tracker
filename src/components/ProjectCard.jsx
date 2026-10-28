import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  Trash2, 
  Smartphone, 
  Globe, 
  Cloud, 
  Terminal, 
  Box, 
  CheckSquare, 
  ListTodo
} from 'lucide-react';
import { STATUS_CONFIG } from '../data/initialProjects';

export default function ProjectCard({ project, onEdit, onDelete, onStatusChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  const statusInfo = STATUS_CONFIG[project.status] || STATUS_CONFIG['In Progress'];

  // Category Icon helper
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Mobile App':
        return <Smartphone className="w-3.5 h-3.5" />;
      case 'Web App':
        return <Globe className="w-3.5 h-3.5" />;
      case 'SaaS':
        return <Cloud className="w-3.5 h-3.5" />;
      case 'CLI Tool':
        return <Terminal className="w-3.5 h-3.5" />;
      default:
        return <Box className="w-3.5 h-3.5" />;
    }
  };

  // Split remaining work lines
  const remainingWorkLines = project.remainingWork
    ? project.remainingWork
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-visible relative group">
      
      {/* Top Header Section */}
      <div className="p-5 pb-3">
        {/* Category & Status Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          
          {/* Category Badge */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50/80 text-blue-700 border border-blue-100">
            {getCategoryIcon(project.category)}
            <span>{project.category}</span>
          </span>

          {/* Quick Status Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
              title="Click to toggle quick status"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusInfo.badgeBg} hover:opacity-90 transition-all cursor-pointer shadow-2xs`}
            >
              <span className={`w-2 h-2 rounded-full ${statusInfo.dotBg}`} />
              <span>{project.status}</span>
              <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
            </button>

            {/* Status Change Dropdown Menu */}
            {isStatusMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-20" 
                  onClick={() => setIsStatusMenuOpen(false)} 
                />
                <div className="absolute right-0 mt-1.5 w-38 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1 text-xs">
                  {Object.keys(STATUS_CONFIG).map((statusKey) => (
                    <button
                      key={statusKey}
                      onClick={() => {
                        onStatusChange(project.id, statusKey);
                        setIsStatusMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer ${
                        project.status === statusKey 
                          ? 'font-bold text-blue-600 bg-blue-50/60' 
                          : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[statusKey].dotBg}`} />
                        <span>{statusKey}</span>
                      </div>
                      {project.status === statusKey && (
                        <CheckSquare className="w-3 h-3 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>

        {/* Project Title */}
        <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
          {project.name}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {project.description || 'No description provided.'}
        </p>

        {/* Tech Stack Pills */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 text-slate-700 border border-slate-200/80"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Expandable Remaining Work Accordion */}
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/70">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors py-1 cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <ListTodo className="w-3.5 h-3.5 text-blue-600" />
            <span>Remaining Work / Next Steps</span>
            {remainingWorkLines.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700 font-semibold">
                {remainingWorkLines.length}
              </span>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-3 pt-2 border-t border-slate-200/70 text-xs text-slate-700 animate-in fade-in duration-200">
            {remainingWorkLines.length > 0 ? (
              <ul className="space-y-1.5">
                {remainingWorkLines.map((line, idx) => {
                  const cleanText = line.replace(/^[-•*]\s*/, '');
                  return (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-blue-600 font-bold select-none">•</span>
                      <span className="flex-1">{cleanText}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-slate-400 italic text-[11px]">
                No remaining work notes listed. Project is either complete or all tasks have been completed!
              </p>
            )}
          </div>
        )}
      </div>

      {/* Card Footer: Last Updated & Action Buttons */}
      <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Updated {project.lastUpdated}</span>
        </div>

        <div className="flex items-center gap-1">
          {/* Edit Button */}
          <button
            onClick={() => onEdit(project)}
            title="Edit project"
            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(project)}
            title="Delete project"
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
