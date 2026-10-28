import { INITIAL_PROJECTS } from '../data/initialProjects';

const STORAGE_KEY = 'project_tracker_data_v1';
const THEME_KEY = 'project_tracker_theme';
const PROFILE_KEY = 'project_tracker_profile_v1';

export const DEFAULT_PROFILE = {
  name: 'Anand Mohandas',
  role: 'Project Owner',
  avatarType: 'initials',
  colorGradient: 'from-blue-600 via-indigo-600 to-sky-500'
};

export function loadStoredProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveProjects(INITIAL_PROJECTS);
      return INITIAL_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_PROJECTS;
  } catch (err) {
    console.error('Failed to parse projects from localStorage:', err);
    return INITIAL_PROJECTS;
  }
}

export function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save projects to localStorage:', err);
  }
}

export function exportProjectsToJSON(projects) {
  try {
    const dataStr = JSON.stringify(projects, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split('T')[0];
    const link = document.createElement('a');
    link.href = url;
    link.download = `projecttracker-backup-${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.error('Error exporting projects:', err);
    throw new Error('Export failed: ' + err.message);
  }
}

export function parseAndValidateProjectsJSON(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    const projectList = Array.isArray(data) ? data : (data.projects && Array.isArray(data.projects) ? data.projects : null);

    if (!projectList) {
      throw new Error('Invalid format: Expected a JSON array of projects.');
    }

    // Validate and sanitize each item
    const validProjects = projectList.map((item, index) => {
      if (!item.name || typeof item.name !== 'string') {
        throw new Error(`Project at index ${index} is missing a valid 'name' field.`);
      }
      return {
        id: item.id || `proj-import-${Date.now()}-${index}`,
        name: item.name.trim(),
        category: item.category || 'Web App',
        status: ['Completed', 'In Progress', 'Not Started'].includes(item.status) ? item.status : 'In Progress',
        description: item.description || '',
        remainingWork: item.remainingWork || '',
        techStack: Array.isArray(item.techStack) ? item.techStack : [],
        lastUpdated: item.lastUpdated || new Date().toISOString().split('T')[0]
      };
    });

    return validProjects;
  } catch (err) {
    throw new Error(err.message || 'Malformed JSON file.');
  }
}

export function loadStoredTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'dark';
  } catch {
    return 'dark';
  }
}

export function saveStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Error saving theme:', e);
  }
}

export function loadStoredProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) {
      saveStoredProfile(DEFAULT_PROFILE);
      return DEFAULT_PROFILE;
    }
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.name === 'string') {
      return {
        name: parsed.name.trim() || DEFAULT_PROFILE.name,
        role: parsed.role?.trim() || DEFAULT_PROFILE.role,
        avatarType: parsed.avatarType || DEFAULT_PROFILE.avatarType,
        colorGradient: parsed.colorGradient || DEFAULT_PROFILE.colorGradient
      };
    }
    return DEFAULT_PROFILE;
  } catch (err) {
    console.error('Failed to load profile:', err);
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile:', err);
  }
}
