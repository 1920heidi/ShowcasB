import { useState } from 'react';
import ProjectForm from '../components/ProjectForm';
import SearchBar from '../components/SearchBar';
import ProjectList from '../components/ProjectList';

function HomePage({ projects, onAdd, onSave, onDelete }) {
  const [query, setQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const visibleProjects = projects.filter((project) => {
    const term = query.toLowerCase();
    return (
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term)
    );
  });

  function editProject(project) {
    setSelectedProject(project);
    setTimeout(() => {
      const titleField = document.getElementById('title');
      if (titleField) {
        titleField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        titleField.focus();
      }
    }, 50);
  }

  function saveProject(changes) {
    onSave(selectedProject.id, changes);
    setSelectedProject(null);
  }

  function removeProject(id) {
    onDelete(id);
    if (selectedProject && selectedProject.id === id) {
      setSelectedProject(null);
    }
  }

  return (
    <>
      <ProjectForm
        key={selectedProject ? selectedProject.id : 'new'}
        editing={selectedProject}
        onAdd={onAdd}
        onSave={saveProject}
        onCancel={() => setSelectedProject(null)}
      />

      <section className="card list-card">
        <SearchBar value={query} onSearch={setQuery} />
        <ProjectList
          projects={visibleProjects}
          onEdit={editProject}
          onDelete={removeProject}
        />
      </section>
    </>
  );
}

export default HomePage;
