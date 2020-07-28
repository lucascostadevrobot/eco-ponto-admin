import React from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

import service from './../../service/service';
import {
    Form, FormGroup, Label, Input, Row, Col, Button, Card, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';


export default class HorariosForm extends React.Component {
    state = {
        id: null,
        local: '',
        dias: [],
        horario: '',
        dias_base: [{ value: 1, label: 'DOM' }, { value: 2, label: 'SEG' }, { value: 3, label: 'TER' }, { value: 4, label: 'QUA' }, { value: 5, label: 'QUI' }, { value: 6, label: 'SEX' }, { value: 7, label: 'SAB' }],

    };
    handleSubmit = (e) => {
        e.preventDefault();
        const { id, local, dias, horario, } = this.state;
        let obj = {
            id, local, horario
        }

        if (obj.id) {
            service.delete(`horarios/${id}/dias`);
            service.update(id, 'horarios', obj);
            dias.map(dia => {
                delete dia.key;
                return service.create(`horarios/${id}/dias`, dia);

            })
        } else {
            service.create('horarios', obj);
            dias.map(dia => {
                return service.create(`horarios/${obj.id}/dias`, dia);

            })
        }
        this.props.history.push('/adm/horarios');
    };
    componentWillMount() {
        const { id } = this.props.match.params;
        if (!(id === undefined || !id)) {
            this.setState({ id });
            service.getById('horarios', id, (data) => {
                this.setState({ ...data })
                service.findAll(`horarios/${id}/dias`, (dataReceived) => {
                    this.setState({ dias: dataReceived })
                    console.log(dataReceived);
                });
            });

            // console.log(this.state.dias);
        }

    }
    handleChange = (dias) => {
        this.setState({ dias });
        console.log(`Option selected: `, dias);
    }

    render() {

        return (
            <div>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/adm/dashboard'>Dashboard</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/adm/horarios'>horários</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.state.id ? 'atualizar horario' : 'adicionar horario'}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div>
                    <Card>
                        <CardBody>
                            <CardTitle>{this.state.id ? 'Atualizar horário' : 'Novo horário'}</CardTitle>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label for='local' sm={2} >Local</Label>
                                    <Col sm={10}>
                                        <Input type='text' bsSize='sm' required name='local' id='local' value={this.state.local} onChange={e => this.setState({ local: e.target.value })} />
                                    </Col>
                                </FormGroup>
                                <Row>
                                    <Col md={2}>
                                        <FormGroup>
                                            <Label for='horario'>Horário</Label>
                                            <Input type='time' required bsSize='sm' name='horario' id='horario' value={this.state.horario} onChange={e => this.setState({ horario: e.target.value })} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup >

                                            <Label for='dias'>Dias</Label>
                                            <Select

                                                getOptionLabel={opt => opt.label}
                                                getOptionValue={opt => opt.value}
                                                options={this.state.dias_base}
                                                isMulti={true}
                                                onChange={this.handleChange}
                                                value={this.state.dias}
                                                placeholder={'Selecione'}
                                                noOptionsMessage={() => 'Nenhuma opção restante.'} />

                                        </FormGroup>

                                    </Col>
                                </Row>
                                <Button type='submit' color='primary' size='sm'>{this.state.id ? 'Atualizar' : 'Salvar'}</Button>
                            </Form>

                        </CardBody>

                    </Card>

                </div>

            </div>)
    }
}