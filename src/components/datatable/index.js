import React from 'react';
import service from './../../service/service';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


$.DataTable = require('datatables.net-bs4');

export default class Table extends React.Component {
    state = {
        // data: [],
    }

    componentDidMount() {
        let parametro = this.props.url;

        function deletar(id) {
            
            swal({
                title: "Voce tem certeza?",
                text: 'Uma vez deletado, voce não poderá recuperar',
                icon: 'warning',
                buttons: true,
                
                dangerMode: true,

            }).then((result) => {
                if (result) {
                    console.log(id + " ::: " +parametro);
                    service.delete(id, parametro).then(function(value) {
                        swal('Excluido com sucesso', { icon: 'success' });
                    }, function(reason) {
                        swal("Ops! Algo deu errado", {
                            icon: "error",
                        });
                    });
                }

            })
        }

        let btn = function(link, icon, title, className) {
            if (className === undefined)
                className = 'btn-default';
            // $('[data-toggle="tooltip"]').tooltip();

            return "<a class='btn " + className + " btn-round btn-xs' href='" + link +
                "'title='" + title + "' data-toggle='tooltip' data-placement='top' data-container='body'>" +
                "<i class='" + icon + "' aria-hidden='true'></i>" +
                "</a>";
        }
        let btnEdit = function(link) {
            return btn(link, 'fa fa-pencil', 'Editar');
        }
        let btnDelete = function(id) {

            return '<button id="btnDelete" data-id="' + id + '" class="btn btn-default btn-round btn-xs"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
        }


        service.findAll(parametro, (dataReceived) => {
            // this.setState({ data: dataReceived });
            let items = dataReceived;
            console.log(items);
            this.$el = $(this.el);
            switch (parametro) {
                case 'pontos':

                    this.$el.DataTable({


                        data: items,
                        pageLength: 10,
                        language: lng,

                        destroy: true,
                        columns: [
                            { title: "Local", data: 'local', width: '80%' },
                            { title: "Inicio", data: 'inicio' },
                            { title: "Termino", data: 'termino' },
                            {title: "Cidade", data: 'cidade', defaultContent: ""},
                            { title: "", data: null, ordering: false, render: renderPontosOpcoes, },

                        ]
                    })
                    break;

                case 'cidades':


                    break;

                case 'parceiros':
                    this.$el.DataTable({


                        data: items,
                        pageLength: 10,
                        language: lng,

                        destroy: true,
                        columns: [
                            { title: "Nome", data: 'nome', width: '90%' },
                            { title: "", data: null, ordering: false, render: renderParceirosOpcoes, },

                        ]
                    })
                    break;
                default:
                    break;
            }
        });






        function renderPontosOpcoes(data, type, row) {
            return btnEdit(parametro + '/editar/' + data.id) +
                btnDelete(data.id);

        }

        function renderParceirosOpcoes(data, type, row){
             return btnEdit(parametro + '/editar/' + data.id) +
                btnDelete(data.id);
        }

        $(document).on('click', '#btnDelete', function() {
            var id = $(this).data("id");
            deletar(id);
        });
        var lng = {
            "sEmptyTable": "Nenhum registro encontrado",
            "sProcessing": "A processar...",
            "sLengthMenu": "Mostrar _MENU_ registos",
            "sZeroRecords": "Não foram encontrados resultados",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
            "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
            "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
            "sInfoPostFix": "",
            "sSearch": "Procurar:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "Primeiro",
                "sPrevious": "Anterior",
                "sNext": "Seguinte",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        }

    }

    componentWillUnmount() {

    }

    render() {
        return ( <table className="table table-bordered"style ={{width:'100%'}}ref={el => this.el = el}></table>)
    }
}