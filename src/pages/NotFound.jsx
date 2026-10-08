import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <h1>Page not found</h1>

      <p>The page you requested does not exist.</p>

      <Link to="/" className="portal-button">
        Return to portal
      </Link>
    </section>
  );
}

export default NotFound;
