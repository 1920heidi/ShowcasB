import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderApp(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
}

describe('App (routing + CRUD)', () => {
  it('READ: shows the seed projects on the home route', () => {
    renderApp('/');
    expect(screen.getByText('MVP App')).toBeInTheDocument();
    expect(screen.getByText('Figma Designs')).toBeInTheDocument();
  });

  it('routes to the About page through the nav', async () => {
    renderApp('/');
    await userEvent.click(screen.getByRole('link', { name: 'About' }));
    expect(screen.getByText('About this app')).toBeInTheDocument();
  });

  it('CREATE: adds a new project and shows it on the list', async () => {
    renderApp('/');
    await userEvent.type(screen.getByLabelText('Title'), 'Test Project');
    await userEvent.type(
      screen.getByLabelText('Description'),
      'Made in a test'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('UPDATE: clicking Edit loads the project into the form inline', async () => {
    renderApp('/');
    const card = screen.getByText('MVP App').closest('li');
    await userEvent.click(within(card).getByText('Edit'));

    expect(screen.getByLabelText('Title')).toHaveValue('MVP App');
    expect(
      screen.getByRole('button', { name: 'Save changes' })
    ).toBeInTheDocument();
  });

  it('routes to a project detail page when View is clicked', async () => {
    renderApp('/');
    const card = screen.getByText('Figma Designs').closest('li');
    await userEvent.click(within(card).getByText('View'));

    expect(
      screen.getByText('UI/UX designs for different projects.')
    ).toBeInTheDocument();
    expect(screen.getByText('← Back to all projects')).toBeInTheDocument();
  });

  it('DELETE: removes a project from the list', async () => {
    renderApp('/');
    expect(screen.getByText('Figma Designs')).toBeInTheDocument();

    const card = screen.getByText('Figma Designs').closest('li');
    const deleteBtn = within(card).getByText('Delete');
    await userEvent.click(deleteBtn);

    expect(screen.queryByText('Figma Designs')).not.toBeInTheDocument();
  });

  it('SEARCH: filters the visible projects', async () => {
    renderApp('/');
    await userEvent.type(screen.getByPlaceholderText('Search Projects'), 'MVP');

    expect(screen.getByText('MVP App')).toBeInTheDocument();
    expect(screen.queryByText('Figma Designs')).not.toBeInTheDocument();
  });
});
