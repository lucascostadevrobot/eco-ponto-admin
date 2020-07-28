import React from 'react';
import { Jumbotron } from 'reactstrap';

export default class Dashboard extends React.Component {

    render() {
        return (
            <div >
                <Jumbotron>
                    <p className="lead">Painel admiminstrativo.</p>
                    <hr className="my-2" />
                    <p><a href='http://www.ascenderideias.com.br/'>Ascender Ideias</a></p>
                    <p className="lead">

                    </p>
                </Jumbotron>
            </div>

        )
    }

}