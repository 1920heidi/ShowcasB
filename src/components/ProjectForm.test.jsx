import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectForm from './ProjectForm';

describe('ProjectForm', () => {
  it('calls onAdd with the typed values', async () => {
    const onAdd = vi.fn();
    render(<ProjectForm onAdd={onAdd} />);

    await userEvent.type(screen.getByLabelText('Title'), 'New Project');
    await userEvent.type(screen.getByLabelText('Description'), 'Some details');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(onAdd).toHaveBeenCalledWith({
      title: 'New Project',
      description: 'Some details',
      image: '',
    });
  });

  it('does not submit when the title is empty', async () => {
    const onAdd = vi.fn();
    render(<ProjectForm onAdd={onAdd} />);

    await userEvent.type(screen.getByLabelText('Description'), 'Only a desc');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(onAdd).not.toHaveBeenCalled();
  });

  it('pre-fills the inputs when editing an existing project', () => {
    const editing = { id: 'p1', title: 'Old', description: 'Old desc' };
    render(<ProjectForm editing={editing} onSave={() => {}} onCancel={() => {}} />);

    expect(screen.getByLabelText('Title')).toHaveValue('Old');
    expect(screen.getByLabelText('Description')).toHaveValue('Old desc');
  });
});
