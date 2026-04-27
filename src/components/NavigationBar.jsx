import Button from "./Button";

export default function NavigationBar () {
    return (
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <a className="navbar-brand" href="/">
          Trivia Game
        </a>

        <Button
        texto= "Login"
        tipo= "success"
        onClick={() => alert("Ir a login")}
        />

        <div className="collapse navbar-collapse" id="navbarContent">

          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Inicio</a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
    );
}