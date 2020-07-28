import React from 'react';
import {
    Form, FormGroup, Label, Input, Col, Button, Card, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Progress, Row
} from 'reactstrap';
import service from './../../service/service';
import FileUploader from 'react-firebase-file-uploader';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { Link } from 'react-router-dom';
import fire from './../../service/base';
import Select from 'react-select';
export default class Pontos extends React.Component {
    state = {
        id: null,
        local: '',
        latitude: '',
        longitude: '',
        cidade: '',
        url: '',
        imagem: null,
        isUploading: false,
        progress: 0,
        dias: [],
        dias_base: [{ value: 1, label: 'DOM' }, { value: 2, label: 'SEG' }, { value: 3, label: 'TER' }, { value: 4, label: 'QUA' }, { value: 5, label: 'QUI' }, { value: 6, label: 'SEX' }, { value: 7, label: 'SAB' }],
        inicio: '',
        termino: '',
        descricao: '',


    };



    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleProgress = progress => this.setState({ progress });

    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleUploadSuccess = filename => {
        this.setState({ imagem: filename, progress: 100, isUploading: false });
        fire.storage().ref('imagens')
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ url: url }));
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { id, local, latitude, longitude,cidade, url, descricao, dias, inicio, termino } = this.state;
        let obj = {
            id, local, latitude, longitude, cidade, url, descricao, inicio, termino
        };

        if (this.state.id) {
            service.delete(`pontos/${id}/dias`);
            service.update(this.state.id, 'pontos', obj);
            dias.map(dia => {
                delete dia.key;

                return service.create(`pontos/${id}/dias`, dia);

            });

        } else {
            service.create('pontos', obj);
            dias.map(dia => {
                delete dia.key;
                return service.create(`pontos/${obj.id}/dias`, dia);

            });
        }

        this.props.history.push('/adm/pontos');

    };
    handleImage = (e) => {
        if (e.target.files[0]) {
            const imagem = e.target.files[0];
            this.setState(() => ({ imagem }));

        }

    }
    handleChange = (dias) => {
        this.setState({ dias });
        console.log(`Option selected: `, dias);
    }
    componentWillMount() {
        const { id } = this.props.match.params;

        if (!(id === undefined || !id)) {
            this.setState({ id });
            service.getById('pontos', id, (data) => {
                this.setState({ ...data });
                service.findAll(`pontos/${id}/dias`, (dataReceived) =>{
                    this.setState({dias: dataReceived});
                    console.log(dataReceived);
                })
            });


        }
    };



    render() {


        return (
            <div>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/adm/dashboard'>Dashboard</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/adm/pontos'>pontos</Link></BreadcrumbItem>
                        <BreadcrumbItem active >{this.state.id ? 'atualizar ponto' : 'adicionar ponto'}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div>
                    <Card>
                        <CardBody>
                            <CardTitle>{this.state.id ? ('Atualizar ponto') : ('Novo ponto')}</CardTitle>

                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label for='local' sm={2}>Local</Label>
                                    <Col sm={10}>
                                        <Input type='text' required name='local' id='local' placeholder='Local de coleta' bsSize='sm' value={this.state.local} onChange={e => this.setState({ local: e.target.value })} />
                                    </Col>
                                </FormGroup>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for='latitude' >Latitude</Label>
                                            <Input type='number' required name='latitude' id='latitude' placeholder='-11.111111' bsSize='sm' value={this.state.latitude} onChange={e => this.setState({ latitude: e.target.value })} />
                                        </FormGroup>

                                    </Col>
                                    <Col md={4}>
                                        <FormGroup >
                                            <Label for='longitude' >Longitude</Label>
                                            <Input type='number' required name='longitude' id='longitude' placeholder='-11.111111' bsSize='sm' value={this.state.longitude} onChange={e => this.setState({ longitude: e.target.value })} />
                                        </FormGroup>
                                    </Col>
                                </Row>

                               
                                    <FormGroup row> 
                                         <label for="cidade" class="col-sm-2 col-form-label">Cidade</label>
                                         <div className="col-sm-10">
                                         <input type="text" className="form-control" id="cidade" required name='cidade' value={this.state.cidade} onChange={ e => this.setState({cidade: e.target.value })} />
                                        </div>
                                    </FormGroup>
                            
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for='inicio'>Inicio</Label>
                                            <Input type='time' required name='inicio' id='inicio' bsSize='sm' value={this.state.inicio} onChange={e => this.setState({ inicio: e.target.value })} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for='termino'>Término</Label>
                                            <Input type='time' required name='termino' id='termino' bsSize='sm' value={this.state.termino} onChange={e => this.setState({ termino: e.target.value })} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup row>
                                    <Col sm={10}>
                                        <Label for='descricao'>Descrição</Label>
                                        <Input type='textarea' maxLength='268' name='descricao' onChange={e => this.setState({ descricao: e.target.value })} value={this.state.descricao} />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>Dias</Label>
                                    <Col sm={10}>
                                        <Select

                                            getOptionLabel={opt => opt.label}
                                            getOptionValue={opt => opt.value}
                                            options={this.state.dias_base}
                                            isMulti={true}
                                            onChange={this.handleChange}
                                            value={this.state.dias}
                                            placeholder={'Selecione'}
                                            noOptionsMessage={() => 'Nenhuma opção restante.'} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='imagem' sm={2}>Imagem</Label>
                                    <Col sm={10}>
                                        <FileUploader accept='*' name='imagem'  randomizeFilename storageRef={
                                            fire.storage().ref('imagens')
                                            

                                        }

                                            onUploadStart={this.handleUploadStart}
                                            onUploadError={this.handleUploadError}
                                            onUploadSuccess={this.handleUploadSuccess}
                                            onProgress={this.handleProgress}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col sm={10} >


                                        {this.state.progress !== 0 ? (
                                            <div>
                                                <div className='text-center'>{this.state.progress}%</div>
                                                <Progress value={this.state.progress} /></div>) : (null)}
                                        <img src={this.state.url} alt=''
                                            style={{ width: '250px', height: '250px', margin: '5px' }} />
                                    </Col>
                                </FormGroup>




                                <Button color='primary' size='sm'>{this.state.id ? ('Atualizar') : ('Salvar')}</Button>


                            </Form>
                        </CardBody>
                    </Card>
                </div>

            </div>

        )
    }
}