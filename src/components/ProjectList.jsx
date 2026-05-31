import ProjectCard from './ProjectCard';

function ProjectList({ projects, onEdit, onDelete }) {
  if (projects.length === 0) {
    return (
      <div className="project-list__empty">
        <p>No projects match your search.</p>
      </div>
    );
  }

  return (
    <ul className="project-list">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default ProjectList;
