# Personal Project Showcase App

A single-page application (SPA) built with **React + Vite** for showcasing a personal
portfolio of projects. You can **search, view, add, edit, and delete** projects, and every
change is saved to the browser so it survives a page refresh.

🔗 **Live site:** https://1920heidi.github.io/Showcase/

## What we built

This project demonstrates the core React patterns from the ground up:

- **Component-based UI** — the interface is split into small, focused, reusable components.
- **Client-side routing** — `react-router` swaps views between the home, project detail,
  and about pages without a full page reload.
- **Custom hook** — `useLocalStorage` encapsulates reading from and writing to
  `localStorage`, alongside the standard `useState`/`useEffect` hooks.
- **Controlled forms & inputs** — the add/edit form and the search box are fully
  controlled by React state.
- **Derived state** — the visible project list is computed by filtering the source list
  against the search query, rather than stored separately.
- **Persistence** — projects are read from and written to `localStorage`, so the
  portfolio is remembered between visits.
- **Tests** — a Vitest + React Testing Library suite covering the hook, components,
  routing, and CRUD behavior.

## Routes

| Page | Reached by |
|------|------------|
Home — add/edit form, search, and project list | default / "Projects" and "Add Project" in the nav |
| Project detail | the **View** button on a card |
|| About the app | "About" in the nav |

## Features

| Feature | How it works|
|---------|--------------|
| **Search** | Filters projects by **title** or **description**, case-insensitive, as you type. |
| **Add** | The "Add Project" form creates a new project (Title + Description required, Image URL optional) and adds it to the top of the list. |
| **View** | The **View** button opens a detail page for a single project. |
| **Edit** | Clicking **Edit** on a card loads that project into the same form, which switches to "Edit Project" mode and pre-fills the fields. Saving updates it in place. |
| **Delete** | The **Delete** button removes a project (and exits edit mode if that project was being edited). |
| **Image fallback** | If a project has no image — or the image URL fails to load — the card shows a placeholder thumbnail instead. |
| **Empty state** | A friendly message is shown when no projects match the search. |
| **Persistence** | All changes are saved to `localStorage` and reloaded on the next visit. |

## Getting started

```bash
npm install      
npm run dev    
```

Other scripts:

```bash
npm test         # run the test suite once
npm run test:watch  # run tests in watch mode
npm run build    # production build into dist/
npm run preview  # preview the production build locally
npm run lint     # run ESLint
npm run deploy   # build and publish to GitHub Pages
```

## Project structure

```
src/
- App.jsx                 # owns the projects state + CRUD handlers; defines the routes
- main.jsx                # React entry point (mounts <App /> inside HashRouter)

hooks/
- useLocalStorage.js  # custom hook: state synced with localStorage

pages/
- HomePage.jsx        # add/edit form, search, and the project list
- ProjectDetailPage.jsx  # single project view (route: /projects/:id)
- AboutPage.jsx       # about the app

data/
- projects.js         # seed projects shown on first load

components/
- Header.jsx          # page title bar
- NavBar.jsx          # navigation between routes / form shortcuts
- ProjectForm.jsx     # controlled form; doubles as the Add and Edit form
- SearchBar.jsx       # controlled search input
- ProjectList.jsx     # maps the filtered list; renders the empty state
- ProjectCard.jsx     # a single project row: image, title, description, actions
- Footer.jsx          # contact footer

test/
- setup.js            # test environment setup
styles/
- App.css             # app styling
- index.css               # base/global styles
```

## How the data flows

- **`App`** holds the single source of truth — the `projects` list — via the
  `useLocalStorage` hook, plus the `createProject` / `updateProject` / `removeProject`
  handlers. It passes these down to the routes.
- **`HomePage`** owns the view-local state: the search `query` and the
  `selectedProject` currently being edited. The rendered list is derived on every render
  by filtering `projects` against `query`, so there is never a stale filtered copy to keep
  in sync.

Data flows *down* through props and events flow *up* through callbacks.

## Tech stack
- **React 19**
- **React Router** (client-side routing)
- **Vite** (dev server + build)
- **Vitest + React Testing Library** (testing)
- **ESLint** (linting)

## Deployment
Deployed to **GitHub Pages** via the `gh-pages` branch.

[Deployed link](https://1920heidi.github.io/ShowcasB/)
