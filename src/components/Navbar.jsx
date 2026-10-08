import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link className="brand" to="/">
          Frequent Flyer
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link to="/">Portal</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
