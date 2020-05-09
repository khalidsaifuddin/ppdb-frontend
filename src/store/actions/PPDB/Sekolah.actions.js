import axios from 'axios/index';

export const GET_PPDB_SEKOLAH = '[SEKOLAH] GET PPDB SEKOLAH';

export function getPPDBSekolah(routeParams)
{
    const request = axios.get(localStorage.getItem('api_base')+'/api/Sekolah/get', {
        // ...routeParams
        params: {
            ...routeParams
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PPDB_SEKOLAH,
                payload: response.data,
                routeParams
            })
        );
}