function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About StudentHub</h1>
        <p>Designed to simplify administrative tasks for educators and organizations.</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            StudentHub aims to provide a lightweight, intuitive, and responsive interface 
            for managing student information without complex database overhead.
          </p>
        </section>

        <section className="about-section">
          <h2>Technologies Used</h2>
          <ul>
            <li><strong>React:</strong> For building dynamic user interface components and state management.</li>
            <li><strong>React Router:</strong> For enabling smooth client-side multi-page navigation.</li>
            <li><strong>Modern CSS:</strong> For clean layouts, responsive grids, and interactive states.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default About