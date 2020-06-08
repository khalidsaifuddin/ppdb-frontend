import axios from 'axios/index';

export const KUOTA__GET_SEKOLAH = '[KUOTA] GET SEKOLAH';
export const KUOTA__GET_SEKOLAH_DETAIL = '[KUOTA] GET SEKOLAH DETAIL';
export const KUOTA__SAVE_KUOTA = '[KUOTA] SAVE KUOTA';

export function KUOTA_getSekolah(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Kuota/sekolah', {
        ...routeParams,
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : KUOTA__GET_SEKOLAH,
                payload: response.data,
            })
        );
}

export function KUOTA_getSekolah2(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Kuota/sekolah', {
        ...routeParams,
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : KUOTA__GET_SEKOLAH_DETAIL,
                payload: response.data,
            })
        );
}

export function KUOTA_saveKuota(routeParams) {
    const request = axios.post(localStorage.getItem('api_base')+'/api/Kuota/save', {
        ...routeParams,
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : KUOTA__SAVE_KUOTA,
                payload: response.data,
            })
        );
}