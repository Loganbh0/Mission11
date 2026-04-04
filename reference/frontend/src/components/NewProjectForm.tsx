import { useState } from 'react';
import type { Project } from '../types/Project';
import { AddProject } from '../api/ProjectsAPI';

interface NewProjectFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewProjectForm = ({ onSuccess, onCancel }: NewProjectFormProps) => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Project>({
    projectId: 0,
    projectName: '',
    projectType: '',
    projectRegionalProgram: '',
    projectImpact: 0,
    projectPhase: '',
    projectFunctionalityStatus: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'projectImpact') {
      const n = value === '' ? 0 : Number(value);
      setFormData({ ...formData, projectImpact: Number.isNaN(n) ? 0 : n });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      await AddProject(formData);
      onSuccess();
    } catch (err) {
      console.error(err);
      setSubmitError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Project</h2>
      {submitError && <p className="text-danger small mb-2">{submitError}</p>}
      <label>
        Project Name:
        <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} />
      </label>
      <label>
        Project Type:
        <input type="text" name="projectType" value={formData.projectType} onChange={handleChange} />
      </label>
      <label>
        Regional Program:
        <input type="text" name="projectRegionalProgram" value={formData.projectRegionalProgram} onChange={handleChange} />
      </label>
      <label>
        Impact:
        <input type="number" name="projectImpact" value={formData.projectImpact} onChange={handleChange} />
      </label>
      <label>
        Project Phase:
        <input type="text" name="projectPhase" value={formData.projectPhase} onChange={handleChange} />
      </label>
      <label>
        Project Functionality Status:
        <input type="text" name="projectFunctionalityStatus" value={formData.projectFunctionalityStatus} onChange={handleChange} />
      </label>
      <button type="submit" className="btn btn-success">Add Project</button>
      <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
    </form>
  );
};

export default NewProjectForm;
