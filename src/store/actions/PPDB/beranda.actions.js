import axios from 'axios/index';

export const BERANDA__GET_BERANDA_DINAS = '[BERANDA] GET_BERANDA_DINAS';
export const BERANDA__GET_BERANDA_SEKOLAH = '[BERANDA] GET_BERANDA_SEKOLAH';

export function BERANDA_getBerandaDinas(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Beranda/beranda_dinas', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : BERANDA__GET_BERANDA_DINAS,
                payload: response.data,
            })
        );
}

export function BERANDA_getBerandaSekolah(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Beranda/beranda_sekolah', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : BERANDA__GET_BERANDA_SEKOLAH,
                payload: response.data,
            })
        );
}