export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 pt-4 pb-3">
      <div className="container">

        <div className="row text-center text-md-start align-items-center">

          
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="fw-bold text-primary mb-1">🎮 Trivia Game</h5>
            <small className="text-muted">Proyecto Final — 2025</small>
          </div>

          
          <div className="col-md-4 mb-3 mb-md-0 text-center">
            <p className="mb-1 small text-light">
              <i className="bi bi-book-fill me-1 text-primary"></i>
              Tecnologías y Sistemas Web I
            </p>
            <p className="mb-0 small text-muted">
              <i className="bi bi-building me-1"></i>
              Universidad Técnica Nacional
            </p>
          </div>

          
          <div className="col-md-4 text-md-end">
            <p className="mb-1 small fw-bold text-light">
              <i className="bi bi-people-fill me-1 text-primary"></i>
              Equipo de desarrollo
            </p>
            <p className="mb-0 small text-muted">Dennis Marchena</p>
            <p className="mb-0 small text-muted">Brandon Valdelomar</p>
            <p className="mb-0 small text-muted">Samuel Cerdas</p>
          </div>

        </div>

        <hr className="border-secondary mt-3 mb-2" />

        <p className="text-center text-muted mb-0" style={{ fontSize: '0.75rem' }}>
          © 2025 Trivia Game · UTN Sede Guanacaste · Todos los derechos reservados
        </p>

      </div>
    </footer>
  );
}