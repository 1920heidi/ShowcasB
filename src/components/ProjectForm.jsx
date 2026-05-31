import { useState } from 'react';

function ProjectForm({ editing, onAdd, onSave, onCancel }) {
  const [title, setTitle] = useState(editing ? editing.title : '');
  const [description, setDescription] = useState(
    editing ? editing.description : ''
  );
  const [image, setImage] = useState(editing && editing.image ? editing.image : '');

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === '' || description.trim() === '') {
      return;
    }

    const formData = {
      title: title.trim(),
      description: description.trim(),
      image: image.trim(),
    };

    if (editing) {
      onSave(formData);
    } else {
      onAdd(formData);
      setTitle('');
      setDescription('');
      setImage('');
    }
  }

  return (
    <section className="card form-card">
      <h2 className="card__heading">{editing ? 'Edit Project' : 'Add Project'}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__field">
          <label htmlFor="title" className="form__label">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="form__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form__field">
          <label htmlFor="description" className="form__label">
            Description
          </label>
          <textarea
            id="description"
            className="form__textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
          />
        </div>

        <div className="form__field">
          <label htmlFor="image" className="form__label">
            Image URL
          </label>
          <input
            id="image"
            type="text"
            className="form__input"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://… (optional)"
          />
        </div>

        <div className="form__actions">
          <button type="submit" className="form__button">
            {editing ? 'Save changes' : 'Add'}
          </button>
          {editing && (
            <button
              type="button"
              className="form__button form__button--ghost"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ProjectForm;
