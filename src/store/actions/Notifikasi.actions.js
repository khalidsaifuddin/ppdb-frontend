import axios from 'axios/index';

export const SIMPAN_NOTIFIKASI = '[NOTIFIKASI] SIMPAN NOTIFIKASI';
export const GET_NOTIFIKASI = '[NOTIFIKASI] GET NOTIFIKASI';

export function simpanNotifikasi(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Notifikasi/simpanNotifikasi', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_NOTIFIKASI,
                payload: response.data,
                routeParams
            })
        );
}

export function getNotifikasi(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Notifikasi/getNotifikasi', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_NOTIFIKASI,
                payload: response.data,
                routeParams
            })
        );
}