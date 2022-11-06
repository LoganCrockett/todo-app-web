import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./routes/Home";
import "./app.css";

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const location = useLocation();

  return (
  <div id="app" data-testid="appComponent">
    <header className="App-header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Todo: Task Creator
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setIsOpened(!isOpened)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={isOpened ? "navbar-collapse collapse show" :"navbar-collapse collapse"}
            id="navbarColor01"
          >
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<RoutingError />} />
      </Routes>
    </div>
  </div>
  );
}

const RoutingError = () => (
  <div className="d-flex flex-column" data-testid="routingErrorComponent">
    <div className="center">
    <h1>Uh oh... It looks like that page doesn't exist.</h1>
      <Link to="/" data-testid="homeButton">
        <span style={{display: "block"}} className="text-center">
          Return to home
        </span>
      </Link>
    </div>
  </div>
);

export default App;
