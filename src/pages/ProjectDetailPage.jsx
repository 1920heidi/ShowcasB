import { useParams, Link } from 'react-router-dom';

function ProjectDetailPage({ projects }) {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <section className="card">
        <p>Sorry, that project was not found.</p>
        <Link to="/">← Back to all projects</Link>
      </section>
    );
  }

  return (
    <section className="card">
      <h2 className="card__heading">{project.title}</h2>
      {project.image && (
        <img
          className="detail__img"
          src={project.image}
          alt={project.title}
        />
      )}
      <p className="detail__description">{project.description}</p>
      <Link to="/">← Back to all projects</Link>
    </section>
  );
}

export default ProjectDetailPage;
