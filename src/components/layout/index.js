import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import Sidebar from './../sidebar';
import Navbar from './../navbar';
import urls from '../../urls';

export default class Layout extends React.Component {



    render() {
        return (
            <div>
                <Navbar />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar />


                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                            <React.Suspense fallback={<div>Aguarde ...</div>}>
                                <Switch>
                                    {urls.map((url, idx) => {
                                        return url.component ? (<Route key={idx} path={url.path} exact={url.exact} name={url.name} component={url.component} />) : (null);
                                    })}
                                    <Redirect from='/adm' to='/adm/dashboard' />
                                </Switch>

                            </React.Suspense>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}