import axios from 'axios/index';

export const GET_PESERTA_DIDIK = '[PESERTA DIDIK] GET PESERTA DIDIK';

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