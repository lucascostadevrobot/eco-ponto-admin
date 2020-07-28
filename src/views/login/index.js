import React from 'react';
import './style.css';
import { auth } from './../../service/base';
import { Redirect } from 'react-router-dom';
// import { Spinner } from 'reactstrap';
export default class Login extends React.Component {

    state = {
        email: '',
        password: '',
        error: '',
        redirect: false

    }



    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        try {
            auth.signInWithEmailAndPassword(email, password).then(() => {
                this.setState({ redirect: true });

            }, (response) => {
                response.code === 'auth/wrong-password' ? (this.setState({ error: 'Senha invalida!' })) : (this.setState({ error: 'Usuario não encontrado! ' }));

            });
        } catch (erro) {
            this.setState({ error: erro.message });
        }
    }


    render() {

        const { from } = this.props.location.state || '/';
        const { redirect } = this.state;

        return (
            <div>
                <dialog id='custom-links-edit-dialog'>
                    <div className='login'>
                        {redirect && (<Redirect to={from || '/adm'} />)}

                        <dialog id='edit-link-dialog'>
                            <div id='dialog-title'>Login</div>
                            <form id='login-form' onSubmit={this.handleSubmit}>
                                <div id='email' className='field-container'>
                                    <label id='title-field-name' className='field-title' aria-label='Nome'>Email</label>
                                    <div className='input-container'>
                                        <input id='email' className='field-input' type='email' autoComplete='off' tabIndex='0' required onChange={e => this.setState({ email: e.target.value })} />
                                        <div className='underline'></div>
                                    </div>
                                </div>

                                <div id='password' className='field-container'>
                                    <label id='title-field-name' className='field-title' aria-label='Senha'>Senha</label>
                                    <div className='input-container'>
                                        <input id='password' className='field-input' type='password' autoComplete='off' tabIndex='0' required spellCheck='off' onChange={e => this.setState({ password: e.target.value })} />
                                        <div className='underline'></div>

                                    </div>
                                </div>
                                <div className='filed-container'>
                                    {this.state.error && <p style={{ color: 'red', fontSize: '12px' }}>{this.state.error}</p>}
                                </div>
                                <div className="buttons-container">

                                    <span>
                                        <button hidden id="delete" className="secondary" type="button" tabIndex="0" title="Remover" aria-label="Remover React App">Remover</button>
                                    </span>
                                    <span>
                                        <button hidden id="cancel" className="secondary" type="button" tabIndex="0" title="Cancelar" aria-label="Cancelar">Cancelar</button>
                                        <button type="submit" id="done" className="primary" tabIndex="0" title="Acessar" aria-label="Acessar">Acessar</button>
                                    </span>
                                </div>



                            </form>

                        </dialog>
                    </div>
                </dialog>

             
            </div>
        );
    }



}