import React from "react";
import { Link } from "react-router-dom";
export default class Sidebar extends React.Component {
  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/adm/dashboard" className="nav-link active">
                Dashboard <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/adm/pontos" className="nav-link">
                <i className="fa fa-map-marker" aria-hidden="true" /> <span />
                Pontos
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/adm/cidades" className="nav-link">
                <i className="fa fa-compass" aria-hidden="true" /> <span />
                Cidades
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/adm/parceiros" className="nav-link">
                <i className="fa fa-users" aria-hidden="true" /> <span />
                Parceiros
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
