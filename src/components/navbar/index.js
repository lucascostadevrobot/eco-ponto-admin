import React from 'react';
import service from './../../service/base';

export default class Navbar extends React.Component {

    handleSignOut = async e => {
        e.preventDefault();
        service.auth().signOut();

    };
    render() {
        return (

            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">ASCID</a>
                {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Buscar" aria-label="Burscar"></input> */}
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="#" onClick={this.handleSignOut}>Sair</a>
                    </li>
                </ul>


            </nav>
        )
    }
}
