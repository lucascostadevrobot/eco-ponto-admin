import React from 'react';
import { Link } from 'react-router-dom';
import Datatable from './../../components/datatable';

export default class Parceiros extends React.Component {

    render() {
        return (
            <div>

                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Parceiros</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link to='/adm/parceiros/novo' className="btn btn-sm btn-outline-secondary">Adicionar</Link>
                    </div>
                </div>
                <Datatable url='parceiros' />

            </div>
        );
    }

}