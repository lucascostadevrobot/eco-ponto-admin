import React from 'react';
import service from './../../service/service';

export default class CidadeForm extends React.Component {
    state = {
        id: ''
    }

    componentDidMount() {

    }
    render() {
        return (
            <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">{(this.state.id === '' ? 'Nova cidade' : 'Editar cidade')}</h1>

                </div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Cidades</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{(this.state.id === '' ? 'nova cidade' : 'editar cidade')}</li>
                    </ol>
                </nav>
                <div className='card'>
                    <div className='card-body'>
                        <form>
                            <div className="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">UF</label>
                                <div className="col-sm-10">
                                    <select class="custom-select custom-select-sm">
                                        <option selected>Selecione o estado</option>
                                        <option value="AC">Acre </option>
                                        <option value="AL">Alagoas</option>
                                        <option value="AP">Amapá</option>
                                        <option value="AM">Amazonas</option>
                                        <option value="BA">Bahia</option>
                                        <option value="CE">Ceará</option>
                                        <option value="DF">Distrito Federal</option>
                                        <option value="ES">Espírito Santo</option>
                                        <option value="GO">Goiás</option>
                                        <option value="MA">Maranhão</option>
                                        <option value="MT">Mato Grosso</option>
                                        <option value="MS">Mato Grosso do Sul</option>
                                        <option value="MG">Minas Gerais</option>
                                        <option value="PA">Pará</option>
                                        <option value="PB">Paraíba</option>
                                        <option value="PR">Paraná</option>
                                        <option value="PE">Pernambuco</option>
                                        <option value="PI">Piauí</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="RN">Rio Grande do Norte</option>
                                        <option value="RS">Rio Grande do Sul	</option>
                                        <option value="RO">Rondônia</option>
                                        <option value="RR">Roraima</option>
                                        <option value="SC">Santa Catarina</option>
                                        <option value="SP">São Paulo</option>
                                        <option value="SE">Sergipe</option>
                                        <option value="TO">Tocantins</option>


                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="inputPassword" className="col-sm-2 col-form-label">Nome</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control form-control-sm" id="inputPassword" placeholder="Itaperuna" required></input>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mb-2 btn-sm">Salvar</button>
                        </form>
                    </div>
                </div>
            </div>


        )
    }
}