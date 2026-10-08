import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-page">
      <div className="home-container">
        <div className="home-copy">
          <p className="portal-eyebrow">Passenger Services</p>

          <h1>Manage your frequent flyer information.</h1>

          <p>
            Use your member ID to securely retrieve available frequent flyer
            account information.
          </p>

          <div className="home-actions">
            <Link to="/portal" className="portal-button">
              Open member portal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
