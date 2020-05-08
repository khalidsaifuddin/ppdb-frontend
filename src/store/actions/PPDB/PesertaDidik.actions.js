import axios from 'axios/index';

export const GET_PESERTA_DIDIK = '[PESERTA DIDIK] GET PESERTA DIDIK';
export const GET_CALON_PESERTA_DIDIK = '[PESERTA DIDIK] GET CALON PESERTA DIDIK';
export const SIMPAN_CALON_PESERTA_DIDIK = '[PESERTA DIDIK] SIMPAN CALON PESERTA DIDIK';
export const IMPORT_PESERTA_DIDIK = '[PESERTA DIDIK] IMPORT PESERTA DIDIK';

export function getPesertaDidik(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/PesertaDidik/get', {
        // ...routeParams
        params: {
            ...routeParams
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PESERTA_DIDIK,
                payload: response.data,
                routeParams
            })
        );
}

export function getCalonPesertaDidik(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/get', {
        // ...routeParams
        params: {
            ...routeParams
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CALON_PESERTA_DIDIK,
                payload: response.data,
                routeParams
            })
        );
}

export function importPesertaDidik(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/importDariPesertaDidikDapodik', {
        ...routeParams
        // params: {
        //     ...routeParams
        // }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : IMPORT_PESERTA_DIDIK,
                payload: response.data,
                routeParams
            })
        );
}


export function simpanCalonPesertaDidik(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/CalonPesertaDidik/save', {
        ...routeParams
        // params: {
        //     ...routeParams
        // }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_CALON_PESERTA_DIDIK,
                payload: response.data,
                routeParams
            })
        );
}