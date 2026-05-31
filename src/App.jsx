import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { seedProjects } from './data/projects';
import './styles/App.css';

function App() {
  const [projects, setProjects] = useLocalStorage('projects', seedProjects);

  // If projects.js has changed since last load, refresh the list from it;
  // otherwise keep the user's saved changes.
  useEffect(() => {
    const currentSeed = JSON.stringify(seedProjects);
    if (localStorage.getItem('projectsSeed') !== currentSeed) {
      setProjects(seedProjects);
      localStorage.setItem('projectsSeed', currentSeed);
    }
  }, [setProjects]);

  function createProject(project) {
    const newProject = { ...project, id: 'p-' + Date.now() };
    setProjects([newProject, ...projects]);
  }

  function updateProject(id, changes) {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, ...changes } : project
      )
    );
  }

  function removeProject(id) {
    setProjects(projects.filter((project) => project.id !== id));
  }

  return (
    <div className="app">
      <Header />
      <NavBar />
      <main className="app__main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                projects={projects}
                onAdd={createProject}
                onSave={updateProject}
                onDelete={removeProject}
              />
            }
          />
          <Route
            path="/projects/:id"
            element={<ProjectDetailPage projects={projects} />}
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
