import React, { useState } from 'react';
import { 
  Edit3, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Smartphone, 
  Globe, 
  Cloud, 
  Terminal, 
  Box,
  CheckSquare
} from 'lucide-react';
import { STATUS_CONFIG } from '../data/initialProjects';

export default function ProjectTable({ projects, onEdit, onDelete, onStatusChange, onViewDetails }) {
  const [expandedRows, setExpandedRows] = useState({});
  const [activeStatusMenuId, setActiveStatusMenuId] = useState(null);

  const toggleRow = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4 sm:px-6">Project</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Tech Stack</th>
              <th className="py-3.5 px-4 hidden lg:table-cell">Remaining Work</th>
              <th className="py-3.5 px-4">Updated</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((project) => {
              const statusInfo = STATUS_CONFIG[project.status] || STATUS_CONFIG['In Progress'];
              const isExpanded = !!expandedRows[project.id];
              const remainingWorkLines = project.remainingWork
                ? project.remainingWork.split('\n').map(l => l.trim()).filter(Boolean)
                : [];

              return (
                <React.Fragment key={project.id}>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    {/* Project Name & Desc */}
                    <td className="py-4 px-4 sm:px-6">
                      <div>
                        <button
                          type="button"
                          onClick={() => onViewDetails && onViewDetails(project)}
                          className="font-bold text-blue-600 hover:text-blue-800 hover:underline text-left cursor-pointer transition-colors block"
                          title={`View details for ${project.name}`}
                        >
                          {project.name}
                        </button>
                      </div>
                      <div className="text-xs text-slate-500 max-w-xs truncate mt-0.5">
                        {project.description}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50/80 text-blue-700 border border-blue-100">
                        {getCategoryIcon(project.category)}
                        <span>{project.category}</span>
                      </span>
                    </td>

                    {/* Status with Quick Toggle */}
                    <td className="py-4 px-4 whitespace-nowrap relative">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setActiveStatusMenuId(activeStatusMenuId === project.id ? null : project.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusInfo.badgeBg} hover:opacity-90 transition cursor-pointer shadow-2xs`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotBg}`} />
                          <span>{project.status}</span>
                          <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeStatusMenuId === project.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-20" 
                              onClick={() => setActiveStatusMenuId(null)} 
                            />
                            <div className="absolute left-0 mt-1.5 w-38 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1 text-xs">
                              {Object.keys(STATUS_CONFIG).map((statusKey) => (
                                <button
                                  key={statusKey}
                                  onClick={() => {
                                    onStatusChange(project.id, statusKey);
                                    setActiveStatusMenuId(null);
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
                    </td>

                    {/* Tech Stack */}
                    <td className="py-4 px-4 hidden md:table-cell max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack?.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 text-slate-700 border border-slate-200/60"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack?.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-medium self-center">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Remaining Work Preview */}
                    <td className="py-4 px-4 hidden lg:table-cell max-w-xs">
                      {remainingWorkLines.length > 0 ? (
                        <button
                          onClick={() => toggleRow(project.id)}
                          className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                        >
                          <span>{remainingWorkLines.length} work items</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs italic">None</span>
                      )}
                    </td>

                    {/* Last Updated */}
                    <td className="py-4 px-4 text-xs text-slate-500 font-medium whitespace-nowrap">
                      {project.lastUpdated}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => onEdit(project)}
                          title="Edit Project"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(project)}
                          title="Delete Project"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Remaining Work Row */}
                  {isExpanded && (
                    <tr className="bg-slate-50/90">
                      <td colSpan={7} className="py-3 px-6 sm:px-8 border-t border-b border-slate-200">
                        <div className="text-xs">
                          <strong className="text-slate-800 block mb-1.5 font-bold">
                            Remaining Work & Next Milestones:
                          </strong>
                          <ul className="space-y-1 text-slate-700 pl-2">
                            {remainingWorkLines.map((line, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span>{line.replace(/^[-•*]\s*/, '')}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
