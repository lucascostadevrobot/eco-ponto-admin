import React from 'react';

const Horarios = React.lazy(() => import('./views/horarios'));
const HorariosForm = React.lazy(() => import('./views/horarios/form'));

const Dashboard = React.lazy(() => import('./views/dashboard'));

const Pontos = React.lazy(() => import('./views/pontos'));
const PontosForm = React.lazy(() => import('./views/pontos/form'));

const Cidades = React.lazy(() => import('./views/cidades'));
const CidadesForm = React.lazy(() => import('./views/cidades/form'));

const Parceiros = React.lazy(() =>import('./views/parceiros'));
const ParceirosForm = React.lazy(() =>import('./views/parceiros/form'));



const urls = [
    { path: '/adm/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/adm/pontos', exact: true, name: 'Pontos', component: Pontos },
    { path: '/adm/pontos/novo', name: 'Adicionar Ponto', component: PontosForm },
    { path: '/adm/pontos/editar/:id', name: 'Editar Ponto', component: PontosForm },

    { path: '/adm/horarios', exact: true, name: 'Horários', component: Horarios },
    { path: '/adm/horarios/novo', name: 'Adicionar Horário', component: HorariosForm },
    { path: '/adm/horarios/editar/:id', name: 'Editar Horário', component: HorariosForm },

    { path: '/adm/cidades', exact: true, name: 'Cidades', component: Cidades },
    { path: '/adm/cidades/novo', name: 'Adicionar Cidade', component: CidadesForm },
    { path: '/adm/cidades/editar/:id', name: 'Editar Cidade', component: CidadesForm },

    { path: '/adm/parceiros', exact: true, name: 'Parceiros', component: Parceiros },
    { path: '/adm/parceiros/novo', name: 'Adicionar Parceiro', component: ParceirosForm },
    { path: '/adm/parceiros/editar/:id', name: 'Editar Parceiro', component: ParceirosForm },


];


export default urls;
