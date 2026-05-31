import { useState } from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ project, onEdit, onDelete }) {
  const [showImage, setShowImage] = useState(Boolean(project.image));

  return (
    <li className="project">
      <div className="project__thumb">
        {showImage && (
          <img
            className="project__img"
            src={project.image}
            alt={project.title}
            onError={() => setShowImage(false)}
          />
        )}
      </div>

      <div className="project__info">
        <h3 className="project__title">{project.title}</h3>
        <p className="project__description">{project.description}</p>
      </div>

      <div className="project__actions">
        <Link className="action-btn" to={`/projects/${project.id}`}>
          View
        </Link>
        <button className="action-btn" onClick={() => onEdit(project)}>
          Edit
        </button>
        <button
          className="action-btn action-btn--danger"
          onClick={() => onDelete(project.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default ProjectCard;
