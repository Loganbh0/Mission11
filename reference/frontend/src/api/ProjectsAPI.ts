import type { Project } from '../types/Project';

interface FetchProjectsResponse {
  projects: Project[];
  totalProjects: number;
}

const API_URL = 'https://localhost:5000/water';

export const fetchProjects = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchProjectsResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((c) => `projectTypes=${encodeURIComponent(c)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}/allprojects/?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const AddProject = async (newProject: Project): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/AddProject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject)
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(
        `Failed to add project (${response.status}): ${detail.slice(0, 200)}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

export const UpdateProject = async (projectId: number, updatedProject: Project): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/UpdateProject/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject)
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(
        `Failed to update project (${response.status}): ${detail.slice(0, 200)}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteProject/${projectId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(
        `Failed to delete project (${response.status}): ${detail.slice(0, 200)}`
      );
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};