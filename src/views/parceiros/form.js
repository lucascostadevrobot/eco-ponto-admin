import React from "react";
import { Link } from "react-router-dom";
import service from './../../service/service';
import Datatable from "./../../components/datatable";
import fire from "./../../service/base";
import FileUploader from 'react-firebase-file-uploader';
import CustomUplooadButton from "react-firebase-file-uploader/lib/CustomUploadButton";

export default class ParceirosForm extends React.Component {
  state = {
    id: null,
    nome: "",
    url: "",
    descricao: "",
    imagem: null,
    isUploading: false,
    progress: 0
  };
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({
      isUploading: false
    });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ imagem: filename, progress: 100, isUploading: false });
    fire
      .storage()
      .ref("parceiros")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ url: url }));
  };
  handleSubmit = e => {
    e.preventDefault();

    const { id, nome, url, descricao } = this.state;
    let obj = {
     id, nome, url, descricao
    };

    if (this.state.id) {
      service.update(this.state.id, "parceiros", obj);
     
    } else {
      service.create("parceiros", obj);
    }

    this.props.history.push("/adm/parceiros");
  };

  handleImage = (e) => {
        if (e.target.files[0]) {
            const imagem = e.target.files[0];
            this.setState(() => ({ imagem }));

        }

    }

     componentWillMount() {
        const { id } = this.props.match.params;

        if (!(id === undefined || !id)) {
            this.setState({ id });
            service.getById('parceiros', id, (data) => {
                this.setState({ ...data });
            });


        }
    };
  render() {
    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">{this.state.id ? 'Editar parceiro': 'Novo parceiro'}</h1>
         
        </div>

    <div className="card">
        <div className="card-body">
        <form onSubmit={this.handleSubmit}>
            <div className='form-group row'>
            
            <label for="nome" class="col-sm-2 col-form-label">Nome</label>
            <div className="col-sm-10">
                <input type="text" className="form-control" id="nome" required name='nome' value={this.state.nome} onChange={ e => this.setState({nome: e.target.value })} />
            </div>

            </div>

            <div className='form-group row'>
            <label for="descricao" class="col-sm-2 col-form-label">Descrição</label>
              <div className="col-sm-10">
            <textarea class="form-control" id="descricao" rows="3" value={this.state.descricao} onChange={e =>this.setState({descricao: e.target.value})}></textarea>
            </div>


            </div>

            <div className='form-group row'>
            <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Imagem</label>
             <div className="col-sm-10">
                <FileUploader accept='*' name='imagem'  randomizeFilename style={{backgroundColor: 'rgba(241, 243, 244, 0)',}}
                                        storageRef={fire.storage().ref('parceiros')} 
                                        onUploadStart={this.handleUploadStart}
                                        onUploadError={this.handleUploadError}
                                        onUploadSuccess={this.handleUploadSuccess}
                                        onProgress={this.handleProgress}
                                        />
                                       <hr></hr>
                                        {this.state.progress !== 0? (
                                        <div class="progress">
                                            <div class="progress-bar" style={{width:this.state.progress+'%'}}>{this.state.progress}%</div>
                                        </div>
                                        ):('')}

                                        <img src={this.state.url} alt=''style={{ width: '250px', height: '250px', margin: '5px' }} />
                                        
            </div>
            </div>
        

            <button className="btn btn-primary btn-sm">{this.state.id ?  'Atualizar' : 'Salvar'}</button>
        </form>
        </div>
        </div>
      </div>
    );
  }
}
