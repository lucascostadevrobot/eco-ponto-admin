import React from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import service from './../../service/service';
import './../styles/panteon.css';


export default class Horarios extends React.Component {
    componentDidMount() {
        service.findAll('horarios', (datareceived) =>
            this.setState({ horarios: datareceived }));

    }
    handleDelete = async (id) => {
        service.delete('horarios', id);
    }

    state = {
        horarios: [],
    }
    render() {

        const data = {
            columns: [
                {
                    label: 'Local',
                    field: 'local',
                    'sort': 'asc',
                    'width': 100
                },
                {
                    'label': 'Dias',
                    'field': 'dias',
                    'sort': 'asc',
                    'width': 100
                },
                {
                    'label': 'Horário',
                    'field': 'horario',
                    'sort': 'asc',
                    'width': 100
                },
                {
                    'label': 'Opções',
                    'field': 'opcoes',
                    'sort': 'asc',
                    'width': 100
                }
            ],
            rows: this.state.horarios.map(horario => {

                let dias = horario.dias;


                return {
                    local: horario.local, dias: dias ? (Object.keys(dias).map(key => {
                        return <div className='mult-items' key={key}><div className='text-mult' key={key}>{dias[key].label} </div></div>
                    })) : (''),

                    horario: horario.horario, opcoes: <div> <Link to={`/adm/horarios/editar/${horario.id}`}><Button size='sm' color='default'><i className='fas fa-edit'></i></Button></Link> <Button size='sm' color='default' onClick={() => this.handleDelete(horario.id)}><i className='fas fa-trash'></i></Button></div>
                }
            })

        }
        return (
            <div>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/adm/dashboard'>Dashboard</Link></BreadcrumbItem>
                        <BreadcrumbItem active>horários</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className='mybuttons'><Link to='/adm/horarios/novo'><Button color='primary' size='sm'>Adicionar horario</Button></Link></div>
                <div>
                    <MDBDataTable className='panteon'
                        bordered
                        hover
                        data={data}
                    />
                </div>
            </div>
        )
    }
}