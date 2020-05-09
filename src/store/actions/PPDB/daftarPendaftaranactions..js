import axios from 'axios/index';

export const GET_CALON_PESERTA_DIDIK_DAFTAR = '[CALON_PD] GET CALON PESERTA DIDIK DAFTAR';

export function getCalonPD(routeParams)
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
                type   : GET_CALON_PESERTA_DIDIK_DAFTAR,
                payload: response.data,
                routeParams
            })
        );
}