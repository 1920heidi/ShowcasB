import { NavLink, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  function jumpToField(fieldId) {
    navigate('/');
    setTimeout(() => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        field.focus();
      }
    }, 50);
  }

  return (
    <nav className="nav">
      <a
        href="/"
        className="nav__link"
        onClick={(event) => {
          event.preventDefault();
          jumpToField('title');
        }}
      >
        Add Project
      </a>
      <a
        href="/"
        className="nav__link"
        onClick={(event) => {
          event.preventDefault();
          jumpToField('search');
        }}
      >
        Projects
      </a>
      <NavLink to="/about" className="nav__link">
        About
      </NavLink>
    </nav>
  );
}

export default NavBar;
