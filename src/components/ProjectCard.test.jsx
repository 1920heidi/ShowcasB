import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProjectCard from './ProjectCard';

const project = { id: 'p1', title: 'My Site', description: 'A cool site' };

function renderCard(props) {
  return render(
    <MemoryRouter>
      <ProjectCard
        project={project}
        onEdit={() => {}}
        onDelete={() => {}}
        {...props}
      />
    </MemoryRouter>
  );
}

describe('ProjectCard', () => {
  it('shows the project title and description', () => {
    renderCard();
    expect(screen.getByText('My Site')).toBeInTheDocument();
    expect(screen.getByText('A cool site')).toBeInTheDocument();
  });

  it('has a View link pointing to the detail route', () => {
    renderCard();
    expect(screen.getByText('View')).toHaveAttribute('href', '/projects/p1');
  });

  it('calls onEdit with the project when Edit is clicked', async () => {
    const onEdit = vi.fn();
    renderCard({ onEdit });
    await userEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith(project);
  });

  it('calls onDelete with the project id when Delete is clicked', async () => {
    const onDelete = vi.fn();
    renderCard({ onDelete });
    await userEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith('p1');
  });
});
